import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";

const Success = () => {
  const { id: invoiceId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (invoiceId) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/api/maintenance/${invoiceId.startsWith("c") ? "consults":"repairs"}/${invoiceId}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching invoice data:", err.message);
        });
    }
  }, [invoiceId]);

  const handleDownload = () => {
    if (!data) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoice", 14, 20);

    doc.setFontSize(12);
    doc.text(`Invoice ID: ${data._id}`, 14, 30);
    doc.text(`Date: ${new Date(data.createdAt).toLocaleDateString()}`, 14, 37);

    doc.line(14, 42, 196, 42); // horizontal line

    doc.text("Customer Details:", 14, 50);
    doc.text(`Name: ${data.customerName}`, 14, 57);
    doc.text(`Mobile: ${data.mobile}`, 14, 64);

    doc.text("Device & Issue", 14, 74);
    doc.text(`Device: ${data?.device || data?.issueCategory}`, 14, 81);
    doc.text(`Issue: ${data?.issueDescription || data?.detailsOfIssue}`, 14, 88);
    doc.text(`Status: ${data.status}`, 14, 95);

    doc.line(14, 105, 196, 105);

    doc.text("Company Info:", 14, 115);
    doc.text("142/1/1 Kotugoda Road, Seeduwa", 14, 122);
    doc.text("Sri Lanka", 14, 129);
    doc.text("+94 77 067 0436", 14, 136);
    doc.text("metacomputers.lk@gmail.com", 14, 143);

    doc.save(`Invoice-${data._id}.pdf`);
  };

  if (!invoiceId) {
    return <main className="p-4">No invoice ID found in the URL.</main>;
  }

  return (
    <main className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Thank you for your order!</h1>
      <p className="mb-2">
        Your invoice ID is: <strong className='uppercase'>{invoiceId}</strong>
      </p>
      <p className="mb-6">
        If you need a copy of your invoice, you can download it below.
      </p>
      <button
        onClick={handleDownload}
        disabled={!data}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Download Invoice
      </button>
    </main>
  );
};

export default Success;
