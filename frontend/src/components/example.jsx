import React from "react";
import {
    FaReceipt,
    FaFileDownload,
    FaTimes,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import jsPDF from 'jspdf';

const InvoicePopup = ({
    showInvoice,
    setShowInvoice,
    invoiceNumber,
    orderDate,
    fullName,
    email,
    mobileNo,
    deliveryAddress,
    district,
    deliveryMethod,
    paymentMethod,
    cardNumber,
    cartItems,
    totalAmount,
    deliveryFee,
    grandTotal,
    setCartItems
}) => {
    // We don't need invoiceRef anymore since we're generating PDF directly

    const handleDownloadPDF = () => {
        // Create a simplified version that should work more reliably
        const invoiceData = {
            invoiceNumber,
            orderDate,
            customerInfo: {
                name: fullName,
                email,
                phone: mobileNo,
                address: deliveryAddress,
                district
            },
            paymentMethod,
            deliveryMethod,
            items: cartItems.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.qty,
                total: item.price * item.qty
            })),
            subtotal: totalAmount,
            deliveryFee,
            total: grandTotal
        };

        try {
            // Show loading toast
            toast.loading("Generating PDF...");

            // Create new PDF document
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // Add company header
            pdf.setFontSize(20);
            pdf.setTextColor(50, 50, 50);
            pdf.text("INVOICE", 20, 20);

            pdf.setFontSize(10);
            pdf.setTextColor(100, 100, 100);
            pdf.text(`Date: ${orderDate}`, 20, 30);
            pdf.text(`Invoice #: ${invoiceNumber}`, 20, 35);

            // Company info
            pdf.setFontSize(14);
            pdf.setTextColor(50, 50, 50);
            pdf.text("META Computers", 150, 20);
            pdf.setFontSize(10);
            pdf.setTextColor(100, 100, 100);
            pdf.text("142/1/1 Kotugoda Road, Seeduwa,", 150, 25);
            pdf.text("Sri Lanka", 150, 25);
            pdf.text("+94 11 123 4567", 150, 30);
            pdf.text("metacomputers.lk@gmail.com", 150, 35);

            // Customer info
            pdf.setFontSize(12);
            pdf.setTextColor(50, 50, 50);
            pdf.text("Bill To:", 20, 50);
            pdf.setFontSize(10);
            pdf.setTextColor(100, 100, 100);
            pdf.text(invoiceData.customerInfo.name, 20, 55);
            pdf.text(invoiceData.customerInfo.email, 20, 60);
            pdf.text(invoiceData.customerInfo.phone, 20, 65);

            // Shipping info
            pdf.setFontSize(12);
            pdf.setTextColor(50, 50, 50);
            pdf.text("Ship To:", 100, 50);
            pdf.setFontSize(10);
            pdf.setTextColor(100, 100, 100);
            pdf.text(invoiceData.customerInfo.address, 100, 55);
            pdf.text(invoiceData.customerInfo.district, 100, 60);
            pdf.text(`Delivery Method: ${invoiceData.deliveryMethod}`, 100, 65);

            // Payment info
            pdf.setFontSize(12);
            pdf.setTextColor(50, 50, 50);
            pdf.text("Payment Details:", 20, 80);
            pdf.setFontSize(10);
            pdf.setTextColor(100, 100, 100);
            pdf.text(`Method: ${invoiceData.paymentMethod}`, 20, 85);
            pdf.text("Status: Paid", 20, 90);

            // Table header
            let y = 105;
            pdf.setFillColor(240, 240, 240);
            pdf.rect(20, y, 170, 7, 'F');
            pdf.setFontSize(10);
            pdf.setTextColor(50, 50, 50);
            pdf.text("Product", 22, y + 5);
            pdf.text("Quantity", 85, y + 5);
            pdf.text("Price", 120, y + 5);
            pdf.text("Total", 160, y + 5);

            // Table content
            y += 10;
            invoiceData.items.forEach(item => {
                pdf.setTextColor(70, 70, 70);
                pdf.text(item.name.substring(0, 30), 22, y);
                pdf.text(item.quantity.toString(), 85, y);
                pdf.text(`Rs.${item.price.toLocaleString()}`, 120, y);
                pdf.text(`Rs.${(item.total).toLocaleString()}`, 160, y);
                y += 7;
            });

            // Draw line
            y += 5;
            pdf.setDrawColor(200, 200, 200);
            pdf.line(100, y, 190, y);

            // Totals
            y += 7;
            pdf.setTextColor(70, 70, 70);
            pdf.text("Subtotal:", 120, y);
            pdf.text(`Rs.${invoiceData.subtotal.toLocaleString()}`, 160, y);

            y += 7;
            pdf.text("Delivery Fee:", 120, y);
            pdf.text(invoiceData.deliveryFee === 0 ? "Free" : `Rs.${invoiceData.deliveryFee.toLocaleString()}`, 160, y);

            y += 7;
            pdf.setDrawColor(200, 200, 200);
            pdf.line(120, y, 190, y);

            y += 7;
            pdf.setFontSize(12);
            pdf.setTextColor(50, 50, 50);
            pdf.text("Total:", 120, y);
            pdf.text(`Rs.${invoiceData.total.toLocaleString()}`, 160, y);

            // Thank you note
            y += 20;
            pdf.setDrawColor(200, 200, 200);
            pdf.line(20, y, 190, y);

            y += 10;
            pdf.setFontSize(11);
            pdf.setTextColor(70, 70, 70);
            pdf.text("Thank you for your order!", pdf.internal.pageSize.getWidth() / 2, y, { align: 'center' });

            y += 5;
            pdf.setFontSize(9);
            pdf.text("If you have any questions about this invoice, please contact our customer support.",
                pdf.internal.pageSize.getWidth() / 2, y + 5, { align: 'center' });

            // Save PDF
            pdf.save(`Invoice-${invoiceNumber}.pdf`);
            toast.dismiss();
            toast.success("Invoice downloaded successfully!");
        } catch (error) {
            console.error("PDF generation error:", error);
            toast.dismiss();
            toast.error("Failed to generate PDF");
        }
    };

    if (!showInvoice) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-3xl max-h-screen overflow-y-auto">
                <div className="sticky top-0 z-10 bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white flex items-center">
                        <FaReceipt className="mr-2 text-purple-500" />
                        Order Invoice
                    </h2>
                    <div className="flex space-x-2">
                        <button
                            onClick={handleDownloadPDF}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-300 flex items-center"
                        >
                            <FaFileDownload className="mr-2" />
                            Download PDF
                        </button>
                        <button
                            onClick={() => {
                                setShowInvoice(false);
                                setCartItems([]);
                            }}
                            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {/* Invoice Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-1">INVOICE</h1>
                            <p className="text-gray-400">{orderDate}</p>
                            <p className="text-purple-400 font-medium mt-1">#{invoiceNumber}</p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-xl font-bold text-white">META Computers PVT Ltd</h2>
                            <p className="text-gray-400">142/1/1 Kotugoda Road, Seeduwa, Sri Lanka</p>
                            <p className="text-gray-400">+94 11 123 4567</p>
                            <p className="text-gray-400">metacomputers.lk@gmail.com</p>
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-gray-300 text-sm font-semibold uppercase mb-3">Bill To</h3>
                            <p className="text-white font-medium">{fullName}</p>
                            <p className="text-gray-400">{email}</p>
                            <p className="text-gray-400">{mobileNo}</p>
                        </div>
                        <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                            <h3 className="text-gray-300 text-sm font-semibold uppercase mb-3">Ship To</h3>
                            <p className="text-white font-medium">{deliveryAddress}</p>
                            <p className="text-gray-400">{district}</p>
                            <p className="text-gray-400">Delivery Method: {deliveryMethod}</p>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="mb-8 bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                        <h3 className="text-gray-300 text-sm font-semibold uppercase mb-3">Payment Details</h3>
                        <p className="text-white font-medium">Payment Method: {paymentMethod}</p>
                        {paymentMethod === "Credit/Debit Card" && cardNumber && (
                            <p className="text-gray-400">Card: •••• •••• •••• {cardNumber.slice(-4)}</p>
                        )}
                        <p className="text-gray-400">Status: <span className="text-green-400 font-medium">Paid</span></p>
                    </div>

                    {/* Order Items */}
                    <div className="mb-8">
                        <h3 className="text-gray-300 text-sm font-semibold uppercase mb-3">Order Summary</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-700 bg-opacity-50 text-left">
                                        <th className="p-3 text-gray-300 font-medium">Product</th>
                                        <th className="p-3 text-gray-300 font-medium text-center">Quantity</th>
                                        <th className="p-3 text-gray-300 font-medium text-right">Price</th>
                                        <th className="p-3 text-gray-300 font-medium text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.product} className="border-b border-gray-700">
                                            <td className="p-3 text-white">{item.name}</td>
                                            <td className="p-3 text-gray-400 text-center">{item.qty}</td>
                                            <td className="p-3 text-gray-400 text-right">Rs.{item.price.toLocaleString()}</td>
                                            <td className="p-3 text-white text-right">Rs.{(item.qty * item.price).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Order Totals */}
                    <div className="flex justify-end">
                        <div className="w-full md:w-1/2 space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Subtotal:</span>
                                <span className="text-white">Rs.{totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Delivery Fee:</span>
                                <span className="text-white">{deliveryFee === 0 ? "Free" : `Rs.${deliveryFee.toLocaleString()}`}</span>
                            </div>
                            <div className="flex justify-between border-t border-gray-700 pt-3 mt-3">
                                <span className="text-white font-medium">Total:</span>
                                <span className="text-purple-400 font-bold text-xl">Rs.{grandTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Thank You Note */}
                    <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                        <h3 className="text-white font-medium mb-2">Thank you for your order!</h3>
                        <p className="text-gray-400">If you have any questions about this invoice, please contact our customer support.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoicePopup;