import React, { useState } from "react";
import { FaFileDownload } from "react-icons/fa";
import jsPDF from 'jspdf';

const QuotationPDF = ({ quotationItems }) => {

    const [isGenerating, setIsGenerating] = useState(false);

    const generateQuotationPDF = async () => {
        try {
            setIsGenerating(true);

            //Create new PDF
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            //Date Formatting
            const currentDate = new Date();
            const dateFormatted = currentDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            //Company Header
            pdf.setFontSize(22);
            pdf.setTextColor(50, 50, 50);
            pdf.text("QUOTATION", 20, 20);

            pdf.setFontSize(10);
            pdf.setTextColor(100, 100, 100);
            pdf.text(`Date: ${dateFormatted}`, 20, 30);

            //Company Info - Right aligned
            pdf.setFontSize(16);
            pdf.setTextColor(50, 50, 50);
            pdf.text("META Computers", 140, 20);
            pdf.setFontSize(10);
            pdf.setTextColor(100, 100, 100);
            pdf.text("142/1/1, Kotugoda Road,", 140, 25);
            pdf.text("Seeduwa, Sri Lanka", 140, 30);
            pdf.text("+94 77 067 0436", 140, 35);

            // Draw a horizontal line
            pdf.setDrawColor(220, 220, 220);
            pdf.setLineWidth(0.5);
            pdf.line(20, 40, 190, 40);

            // Table header with better alignment
            let y = 50;
            pdf.setFillColor(240, 240, 240);
            pdf.rect(20, y, 170, 8, 'F');
            pdf.setFontSize(10);
            pdf.setTextColor(50, 50, 50);
            pdf.text("Product", 25, y + 5.5);
            pdf.text("Quantity", 95, y + 5.5);
            pdf.text("Price (LKR)", 125, y + 5.5);
            pdf.text("Total (LKR)", 170, y + 5.5);

            // Table content with better spacing
            y += 14;
            let totalSum = 0;

            quotationItems.forEach((product) => {

                const productTotal = product.price * product.qty;
                totalSum += productTotal;

                pdf.setTextColor(70, 70, 70);
                pdf.text(product.name.substring(0, 40), 25, y);
                pdf.text(product.qty.toString(), 95, y);
                pdf.text(`${product.price.toLocaleString()}`, 125, y);
                pdf.text(`${productTotal.toLocaleString()}`, 170, y);
                y += 8;
            });

            // Draw line after items
            y += 5;
            pdf.setDrawColor(200, 200, 200);
            pdf.line(20, y, 190, y);

            // Total section with better formatting
            y += 10;
            pdf.setFontSize(12);
            pdf.setTextColor(50, 50, 50);
            pdf.text("Total Amount:", 120, y);
            pdf.text(`LKR ${totalSum.toLocaleString()}`, 162, y);

            // Add contact information at bottom of page
            pdf.setFontSize(10);
            pdf.setTextColor(100, 100, 100);
            pdf.text("Contact us for any inquiries. Thank you.", 105, 280, { align: 'center' });

            //PDF save
            pdf.save(`Quotation_${new Date().toISOString().split('T')[0]}.pdf`);
            console.log("PDF generated successfully");
            setIsGenerating(false);

        } catch (error) {
            console.error("PDF generation error: ", error);
            alert("Failed to generate PDF...");
            setIsGenerating(false);
        }
    }

    return (
        <button
            className={`bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition flex items-center ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={generateQuotationPDF}
            disabled={isGenerating}
        >

            <FaFileDownload className="mr-2" />
            {isGenerating ? 'Generating PDF...' : 'Download Quotation'}
        </button >
    );
}

export { QuotationPDF };