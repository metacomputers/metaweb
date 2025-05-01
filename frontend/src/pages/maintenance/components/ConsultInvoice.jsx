import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getConsultById } from '../../../api/consultApi';
import { FaDownload, FaTimes } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import jsPDF from 'jspdf';

const ConsultInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const response = await getConsultById(id);
        // The API returns data in response.data
        setConsultation(response.data);
      } catch (error) {
        console.error('Error fetching consultation:', error);
        toast.error('Failed to load consultation details');
      } finally {
        setLoading(false);
      }
    };

    fetchConsultation();
  }, [id]);

  const generatePDF = () => {
    if (!consultation) return;

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
      pdf.text("CONSULTATION INVOICE", 20, 20);
      
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Date: ${new Date(consultation.createdAt).toLocaleDateString()}`, 20, 30);
      pdf.text(`Invoice #: ${consultation._id}`, 20, 35);
      
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
      pdf.text(`Name: ${consultation.customerName}`, 20, 55);
      pdf.text(`Mobile: ${consultation.mobile}`, 20, 60);
      
      // Service details
      pdf.setFontSize(12);
      pdf.setTextColor(50, 50, 50);
      pdf.text("Service Details:", 20, 75);
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Category: ${consultation.issueCategory}`, 20, 80);
      pdf.text(`Details: ${consultation.detailsOfIssue}`, 20, 85);
      
      // Status
      pdf.setFontSize(12);
      pdf.setTextColor(50, 50, 50);
      pdf.text("Status:", 20, 100);
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Current Status: ${consultation.status || 'Pending'}`, 20, 105);
      
      // Thank you note
      pdf.setFontSize(11);
      pdf.setTextColor(70, 70, 70);
      pdf.text("Thank you for choosing our services!", pdf.internal.pageSize.getWidth() / 2, 150, {align: 'center'});
      
      pdf.setFontSize(9);
      pdf.text("If you have any questions about this service, please contact our customer support.", 
               pdf.internal.pageSize.getWidth() / 2, 155, {align: 'center'});
      
      // Save PDF
      pdf.save(`Consultation-Invoice-${consultation._id}.pdf`);
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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-1/4 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!consultation) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8">
            <p className="text-white text-center">Consultation not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-2xl font-bold text-white">Consultation Invoice</h2>
            <button
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Consultation Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400">Invoice Number</p>
                  <p className="text-white">{consultation._id}</p>
                </div>
                <div>
                  <p className="text-gray-400">Date</p>
                  <p className="text-white">{new Date(consultation.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Customer Name</p>
                  <p className="text-white">{consultation.customerName}</p>
                </div>
                <div>
                  <p className="text-gray-400">Mobile</p>
                  <p className="text-white">{consultation.mobile}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Service Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400">Category</p>
                  <p className="text-white">{consultation.issueCategory}</p>
                </div>
                <div>
                  <p className="text-gray-400">Details</p>
                  <p className="text-white">{consultation.detailsOfIssue}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <p className="text-white">{consultation.status}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={generatePDF}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <FaDownload className="mr-2" />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultInvoice; 