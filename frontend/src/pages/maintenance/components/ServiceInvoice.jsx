import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaReceipt, FaFileDownload, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";
import jsPDF from 'jspdf';
import { getRepairById } from "../../../api/repairApi";
import { getConsultById } from "../../../api/consultApi";

const ServiceInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        // Try to fetch as repair first
        try {
          const response = await getRepairById(id);
          setServiceData({ ...response.data, type: 'repair' });
        } catch (repairError) {
          // If not a repair, try consultation
          const response = await getConsultById(id);
          setServiceData({ ...response.data, type: 'consultation' });
        }
      } catch (error) {
        setError("Failed to fetch service details");
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [id]);

  const handleDownloadPDF = () => {
    if (!serviceData) return;

    try {
      toast.loading("Generating PDF...");
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Add company header
      pdf.setFontSize(20);
      pdf.setTextColor(50, 50, 50);
      pdf.text("SERVICE INVOICE", 20, 20);
      
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Date: ${new Date(serviceData.createdAt).toLocaleDateString()}`, 20, 30);
      pdf.text(`Invoice #: ${serviceData._id}`, 20, 35);
      
      // Company info
      pdf.setFontSize(14);
      pdf.setTextColor(50, 50, 50);
      pdf.text("META Computers", 150, 20);
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text("142/1/1 Kotugoda Road, Seeduwa,", 150, 25);
      pdf.text("Sri Lanka", 150, 30);
      pdf.text("+94 11 123 4567", 150, 35);
      pdf.text("metacomputers.lk@gmail.com", 150, 40);
      
      // Customer info
      pdf.setFontSize(12);
      pdf.setTextColor(50, 50, 50);
      pdf.text("Customer Details:", 20, 50);
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Name: ${serviceData.customerName}`, 20, 55);
      pdf.text(`Mobile: ${serviceData.mobile}`, 20, 60);
      
      // Service details
      pdf.setFontSize(12);
      pdf.setTextColor(50, 50, 50);
      pdf.text("Service Details:", 20, 75);
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      
      if (serviceData.type === 'repair') {
        pdf.text(`Device: ${serviceData.device}`, 20, 80);
        pdf.text(`Issue: ${serviceData.issueDescription}`, 20, 85);
      } else {
        pdf.text(`Category: ${serviceData.issueCategory}`, 20, 80);
        pdf.text(`Details: ${serviceData.detailsOfIssue}`, 20, 85);
      }
      
      // Status
      pdf.setFontSize(12);
      pdf.setTextColor(50, 50, 50);
      pdf.text("Status:", 20, 100);
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Current Status: ${serviceData.status || 'Pending'}`, 20, 105);
      
      // Thank you note
      pdf.setFontSize(11);
      pdf.setTextColor(70, 70, 70);
      pdf.text("Thank you for choosing our services!", pdf.internal.pageSize.getWidth() / 2, 150, {align: 'center'});
      
      pdf.setFontSize(9);
      pdf.text("If you have any questions about this service, please contact our customer support.", 
               pdf.internal.pageSize.getWidth() / 2, 155, {align: 'center'});
      
      // Save PDF
      pdf.save(`Service-Invoice-${serviceData._id}.pdf`);
      toast.dismiss();
      toast.success("Invoice downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.dismiss();
      toast.error("Failed to generate PDF");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">{error}</div>
      </div>
    );
  }

  if (!serviceData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Service not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-10 px-4">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <FaReceipt className="mr-2 text-purple-500" />
              Service Invoice
            </h1>
            <div className="flex space-x-2">
              <button 
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-300 flex items-center"
              >
                <FaFileDownload className="mr-2" />
                Download PDF
              </button>
              <button 
                onClick={() => navigate(-1)}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
              <h3 className="text-gray-300 text-sm font-semibold uppercase mb-3">Customer Details</h3>
              <p className="text-white font-medium">{serviceData.customerName}</p>
              <p className="text-gray-400">{serviceData.mobile}</p>
            </div>
            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
              <h3 className="text-gray-300 text-sm font-semibold uppercase mb-3">Service Details</h3>
              {serviceData.type === 'repair' ? (
                <>
                  <p className="text-white font-medium">Device: {serviceData.device}</p>
                  <p className="text-gray-400">Issue: {serviceData.issueDescription}</p>
                </>
              ) : (
                <>
                  <p className="text-white font-medium">Category: {serviceData.issueCategory}</p>
                  <p className="text-gray-400">Details: {serviceData.detailsOfIssue}</p>
                </>
              )}
            </div>
          </div>

          <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
            <h3 className="text-gray-300 text-sm font-semibold uppercase mb-3">Status</h3>
            <p className="text-white font-medium">Current Status: {serviceData.status || 'Pending'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInvoice; 