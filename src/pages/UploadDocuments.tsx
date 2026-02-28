// TypeScript (React)

import { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

const UploadDocuments = () => {
  const [form, setForm] = useState({
    patientName: "",
    age: "",
    gender: "",
    reportType: "",
    doorNumber: "",
    streetName: "",
    areaName: "",
    areaPincode: "",
    contactNumber: "",
    alternateContactNumber: "",
    email: "",
    file: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.file) return alert("Please select report file");

    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key !== "file" && value) {
        data.append(key, value as string);
      }
    });

    data.append("report", form.file);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/documents/upload`,
        data,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Document submitted successfully");

    } catch {
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#0A7DCF]">
          Submit Medical Report
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input placeholder="Patient Name" required
            onChange={(e)=>setForm({...form, patientName:e.target.value})}
            className="border p-3 rounded"/>

          <input type="number" placeholder="Age" required
            onChange={(e)=>setForm({...form, age:e.target.value})}
            className="border p-3 rounded"/>

          <select required
            onChange={(e)=>setForm({...form, gender:e.target.value})}
            className="border p-3 rounded">
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input placeholder="Report Type (Blood Test, MRI...)" required
            onChange={(e)=>setForm({...form, reportType:e.target.value})}
            className="border p-3 rounded"/>

          <input placeholder="Door Number"
            onChange={(e)=>setForm({...form, doorNumber:e.target.value})}
            className="border p-3 rounded"/>

          <input placeholder="Street Name"
            onChange={(e)=>setForm({...form, streetName:e.target.value})}
            className="border p-3 rounded"/>

          <input placeholder="Area Name"
            onChange={(e)=>setForm({...form, areaName:e.target.value})}
            className="border p-3 rounded"/>

          <input placeholder="Area Pincode"
            onChange={(e)=>setForm({...form, areaPincode:e.target.value})}
            className="border p-3 rounded"/>

          <input placeholder="Contact Number" required
            onChange={(e)=>setForm({...form, contactNumber:e.target.value})}
            className="border p-3 rounded"/>

          <input placeholder="Alternate Contact Number"
            onChange={(e)=>setForm({...form, alternateContactNumber:e.target.value})}
            className="border p-3 rounded"/>

          <input type="email" placeholder="Email" required
            onChange={(e)=>setForm({...form, email:e.target.value})}
            className="border p-3 rounded"/>

          <input type="file" required
            onChange={(e)=>setForm({...form, file:e.target.files?.[0] || null})}
            className="border p-3 rounded md:col-span-2"/>

          <button
            type="submit"
            className="md:col-span-2 bg-[#0A7DCF] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit Report
          </button>

        </form>
      </div>
    </div>
  );
};

export default UploadDocuments;
