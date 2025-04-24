import React, { useEffect } from "react";
import { FaFileDownload, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";
import jsPDF from "jspdf";

const UserReportPopup = ({ 
  showReport, 
  setShowReport, 
  userDetails 
}) => {
  // Debug logging when component renders
  useEffect(() => {
    console.log("UserReportPopup - Raw user details:", userDetails);
    if (userDetails?.createdAt) {
      console.log("createdAt type:", typeof userDetails.createdAt);
      console.log("createdAt value:", userDetails.createdAt);
    }
    if (userDetails?.updatedAt) {
      console.log("updatedAt type:", typeof userDetails.updatedAt);
      console.log("updatedAt value:", userDetails.updatedAt);
    }
  }, [userDetails]);

  // Helper function to safely format dates with extensive debugging
  const formatDate = (dateValue) => {
    console.log("formatDate input:", dateValue, "type:", typeof dateValue);
    
    if (!dateValue) {
      console.log("formatDate: dateValue is falsy");
      return 'N/A';
    }
    
    try {
      // If it's a string, try to parse it
      if (typeof dateValue === 'string') {
        console.log("Treating as string date");
        const date = new Date(dateValue);
        console.log("Parsed string date result:", date);
        return date.toLocaleString();
      }
      
      // If it's an object, check for MongoDB format
      if (typeof dateValue === 'object') {
        console.log("Treating as object date");
        
        // Check if it's a MongoDB date object
        if (dateValue.$date) {
          console.log("Found MongoDB $date property:", dateValue.$date);
          const date = new Date(dateValue.$date);
          console.log("Parsed MongoDB date result:", date);
          return date.toLocaleString();
        }
        
        // Check if it's already a Date object
        if (dateValue instanceof Date) {
          console.log("Value is a Date instance");
          return dateValue.toLocaleString();
        }
        
        // Try JSON path for deeply nested MongoDB structure
        if (dateValue.createdAt?.$date) {
          console.log("Found nested createdAt.$date");
          return new Date(dateValue.createdAt.$date).toLocaleString();
        }
        if (dateValue.updatedAt?.$date) {
          console.log("Found nested updatedAt.$date");
          return new Date(dateValue.updatedAt.$date).toLocaleString();
        }
        
        // Try treating the object itself as a date
        console.log("Attempting to convert object to date");
        const date = new Date(dateValue);
        if (!isNaN(date.getTime())) {
          console.log("Object converted to date:", date);
          return date.toLocaleString();
        }
      }
      
      // As a last resort, try to stringify and parse
      console.log("Last resort attempt");
      const dateStr = dateValue.toString();
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        console.log("String conversion worked:", date);
        return date.toLocaleString();
      }
      
      console.log("All parsing attempts failed");
      return 'N/A';
    } catch (error) {
      console.error("Date formatting error:", error);
      return 'N/A';
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
      
      // Debug date values before PDF generation
      console.log("PDF generation - createdAt:", userDetails.createdAt);
      console.log("PDF generation - updatedAt:", userDetails.updatedAt);
      
      // Add report title
      pdf.setFontSize(20);
      pdf.setTextColor(50, 50, 50);
      pdf.text("User Report", 20, 20);
      
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
      
      // User info
      pdf.setFontSize(12);
      pdf.setTextColor(50, 50, 50);
      pdf.text("User Details:", 20, 50);
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      
      // Handle different user data formats
      const username = userDetails.username || '';
      const firstName = userDetails.firstName || '';
      const lastName = userDetails.lastName || '';
      const fullName = `${firstName} ${lastName}`.trim() || 'N/A';
      const email = userDetails.email || 'N/A';
      const role = userDetails.role || 'N/A';
      
      // Format dates with detailed debug info
      console.log("Attempting to format createdAt for PDF");
      const createdDate = formatDate(userDetails.createdAt);
      console.log("createdDate result:", createdDate);
      
      console.log("Attempting to format updatedAt for PDF");
      const updatedDate = formatDate(userDetails.updatedAt);
      console.log("updatedDate result:", updatedDate);
      
      pdf.text(`Username: ${username}`, 20, 55);
      pdf.text(`Full Name: ${fullName}`, 20, 60);
      pdf.text(`Email: ${email}`, 20, 65);
      pdf.text(`Role: ${role}`, 20, 70);
      
      // Timestamps
      pdf.text(`Account Created: ${createdDate}`, 20, 80);
      pdf.text(`Last Updated: ${updatedDate}`, 20, 85);

      // Footer
      pdf.setFontSize(9);
      pdf.setTextColor(150, 150, 150);
      pdf.text("Generated by META Computers", 20, 290);
      
      // Save the PDF
      pdf.save(`UserReport-${username}.pdf`);
      
      toast.dismiss();
      toast.success("User report downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.dismiss();
      toast.error("Failed to generate PDF");
    }
  };

  if (!showReport) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-3xl max-h-screen overflow-y-auto">
        <div className="sticky top-0 z-10 bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">User Report</h2>
          <div className="flex space-x-2">
            <button 
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-300 flex items-center"
            >
              <FaFileDownload className="mr-2" />
              Download PDF
            </button>
            <button 
              onClick={() => setShowReport(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700"
            >
              <FaTimes />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="text-white">
            <h3 className="text-xl font-bold mb-4">User Report Details</h3>
            <div className="grid grid-cols-1 gap-2">
              <p><strong>Username:</strong> {userDetails.username || 'N/A'}</p>
              <p><strong>First Name:</strong> {userDetails.firstName || 'N/A'}</p>
              <p><strong>Last Name:</strong> {userDetails.lastName || 'N/A'}</p>
              <p><strong>Email:</strong> {userDetails.email || 'N/A'}</p>
              <p><strong>Role:</strong> {userDetails.role || 'N/A'}</p>
              
              {/* Debug info for dates */}
              <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                <p className="text-yellow-300 font-semibold">Date Info:</p>
                <p><strong>Raw createdAt:</strong> {JSON.stringify(userDetails.createdAt)}</p>
                <p><strong>Raw updatedAt:</strong> {JSON.stringify(userDetails.updatedAt)}</p>
                <p><strong>Formatted createdAt:</strong> {formatDate(userDetails.createdAt)}</p>
                <p><strong>Formatted updatedAt:</strong> {formatDate(userDetails.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReportPopup;