import React from "react";
import { FaTimes, FaFileInvoice, FaMapMarkerAlt, FaPhoneAlt, FaTruck, FaDownload } from "react-icons/fa";
import { toast } from "react-hot-toast";
import jsPDF from 'jspdf';

const OrderDetailsModal = ({ show, onClose, order }) => {
  if (!show) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500";
      case "processing":
        return "bg-blue-500";
      case "shipped":
        return "bg-purple-500";
      case "delivered":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleDownloadPDF = () => {
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
      pdf.text(`Date: ${formatDate(order.createdAt)}`, 20, 30);
      pdf.text(`Invoice #: ${order.invoiceNumber}`, 20, 35);
      
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
      pdf.text(order.user ? `${order.user.firstName} ${order.user.lastName}` : 'N/A', 20, 55);
      pdf.text(order.user?.email || 'N/A', 20, 60);
      pdf.text(order.mobileNo || 'N/A', 20, 65);
      
      // Shipping info
      pdf.setFontSize(12);
      pdf.setTextColor(50, 50, 50);
      pdf.text("Ship To:", 100, 50);
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(order.deliveryAddress || 'N/A', 100, 55);
      pdf.text(order.district || 'N/A', 100, 60);
      pdf.text(`Delivery Method: ${order.deliveryMethod || 'N/A'}`, 100, 65);
      
      // Payment info
      pdf.setFontSize(12);
      pdf.setTextColor(50, 50, 50);
      pdf.text("Payment Details:", 20, 80);
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Method: ${order.paymentMethod || 'N/A'}`, 20, 85);
      pdf.text(`Status: ${order.isPaid ? 'Paid' : 'Pending'}`, 20, 90);
      
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
      order.orderItems.forEach(item => {
        pdf.setTextColor(70, 70, 70);
        pdf.text(item.name.substring(0, 30), 22, y);
        pdf.text(item.qty.toString(), 85, y);
        pdf.text(`Rs.${item.price.toLocaleString()}`, 120, y);
        pdf.text(`Rs.${(item.price * item.qty).toLocaleString()}`, 160, y);
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
      pdf.text(`Rs.${order.totalPaid.toLocaleString()}`, 160, y);
      
      y += 7;
      pdf.text("Delivery Fee:", 120, y);
      pdf.text(order.district === "Colombo" && order.deliveryMethod === "Courier" ? "Free" : "Rs.500", 160, y);
      
      y += 7;
      pdf.setDrawColor(200, 200, 200);
      pdf.line(120, y, 190, y);
      
      y += 7;
      pdf.setFontSize(12);
      pdf.setTextColor(50, 50, 50);
      pdf.text("Total:", 120, y);
      pdf.text(`Rs.${order.totalPaid.toLocaleString()}`, 160, y);
      
      // Thank you note
      y += 20;
      pdf.setDrawColor(200, 200, 200);
      pdf.line(20, y, 190, y);
      
      y += 10;
      pdf.setFontSize(11);
      pdf.setTextColor(70, 70, 70);
      pdf.text("Thank you for your order!", pdf.internal.pageSize.getWidth() / 2, y, {align: 'center'});
      
      y += 5;
      pdf.setFontSize(9);
      pdf.text("If you have any questions about this invoice, please contact our customer support.", 
               pdf.internal.pageSize.getWidth() / 2, y + 5, {align: 'center'});
      
      // Save PDF
      pdf.save(`Invoice-${order.invoiceNumber}.pdf`);
      toast.dismiss();
      toast.success("Invoice downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.dismiss();
      toast.error("Failed to generate PDF");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-gray-800 w-full max-w-4xl rounded-xl shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <FaFileInvoice className="text-purple-500 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-white">Order Details</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleDownloadPDF}
                className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <FaDownload className="mr-2" />
                Download Invoice
              </button>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="mb-6">
                <h3 className="text-purple-400 font-semibold mb-2">Order Information</h3>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Invoice Number</p>
                      <p className="text-white">{order.invoiceNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Order Date</p>
                      <p className="text-white">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Status</p>
                      <div className="flex items-center">
                        <span className={`${getStatusColor(order.deliveryStatus)} w-3 h-3 rounded-full mr-2`}></span>
                        <span className="text-white capitalize">{order.deliveryStatus}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Payment</p>
                      <p className="text-white">{order.isPaid ? "Paid" : "Not Paid"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-purple-400 font-semibold mb-2">Delivery Information</h3>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-start mb-3">
                    <FaMapMarkerAlt className="text-gray-400 mt-1 mr-2" />
                    <div>
                      <p className="text-gray-400 text-sm">Delivery Address</p>
                      <p className="text-white">{order.deliveryAddress}</p>
                      <p className="text-white">{order.district}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-3">
                    <FaPhoneAlt className="text-gray-400 mt-1 mr-2" />
                    <div>
                      <p className="text-gray-400 text-sm">Contact</p>
                      <p className="text-white">{order.mobileNo}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaTruck className="text-gray-400 mt-1 mr-2" />
                    <div>
                      <p className="text-gray-400 text-sm">Delivery Method</p>
                      <p className="text-white">{order.deliveryMethod}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-purple-400 font-semibold mb-2">Payment Information</h3>
              <div className="bg-gray-700 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Payment Method</p>
                    <p className="text-white">{order.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Payment Status</p>
                    <p className={`${order.isPaid ? "text-green-400" : "text-yellow-400"}`}>
                      {order.isPaid ? `Paid on ${formatDate(order.paidAt)}` : "Pending"}
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-purple-400 font-semibold mb-2">Order Summary</h3>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-400 text-sm mb-2">Items ({order.orderItems.length})</p>
                <div className="max-h-40 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-600 last:border-0">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-600 rounded-md mr-3 flex items-center justify-center overflow-hidden">
                          {item.image ? (
                            <img src={`../../../public/uploads/${item.image}`} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs text-gray-400">No img</span>
                          )}
                        </div>
                        <div>
                          <p className="text-white text-sm">{item.name}</p>
                          <p className="text-gray-400 text-xs">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <p className="text-white text-sm">Rs.{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-600 pt-3">
                  <div className="flex justify-between mb-1">
                    <p className="text-gray-400">Subtotal</p>
                    <p className="text-white">Rs.{order.totalPaid.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between mb-1">
                    <p className="text-gray-400">Delivery Fee</p>
                    <p className="text-white">
                      {order.district === "Colombo" && order.deliveryMethod === "Courier" 
                        ? "Free" 
                        : "Rs.500"}
                    </p>
                  </div>
                  <div className="flex justify-between mt-3 pt-3 border-t border-gray-600">
                    <p className="text-white font-semibold">Total</p>
                    <p className="text-white font-bold text-lg">Rs.{order.totalPaid.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;