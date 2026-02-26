// TypeScript (React)

import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import Select from "react-select";

interface Patient {
  _id: string;
  name: string;
  email: string;
  age?: number;
  gender?: string;
}

const reportTypeOptions = [
  { value: "Blood Test", label: "Blood Test" },
  { value: "MRI", label: "MRI" },
  { value: "CT Scan", label: "CT Scan" },
  { value: "X-Ray", label: "X-Ray" },
];

const AdminUpload = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  const [form, setForm] = useState({
    patientId: "",
    reportName: "",
    reportType: "",
    name: "",
    age: "",
    gender: "",
    file: null as File | null,
  });

  // ⭐ Fetch patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/patients`,
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );
        setPatients(res.data);
      } catch {
        alert("Not authorized");
      }
    };

    fetchPatients();
  }, []);

  // ⭐ When patient selected → auto-fill fields
  const handlePatientSelect = (selected: any) => {
    const patient = patients.find((p) => p._id === selected?.value);

    setForm((prev) => ({
      ...prev,
      patientId: selected?.value || "",
      name: patient?.name || "",
      age: patient?.age ? String(patient.age) : "",
      gender: patient?.gender || "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.file) return alert("Select PDF");

    const data = new FormData();
    data.append("patientId", form.patientId);
    data.append("reportName", form.reportName);
    data.append("reportType", form.reportType);
    data.append("name", form.name);
    data.append("age", form.age);
    data.append("gender", form.gender);
    data.append("report", form.file);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/reports/upload`,
        data,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Report uploaded successfully");
    } catch {
      alert("Upload failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow rounded-xl bg-white">
      <h2 className="text-2xl font-bold text-[#0A7DCF] mb-4">
        Upload Patient Report
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* ⭐ PRO SEARCHABLE PATIENT SELECT */}
        <Select
          options={patients.map((p) => ({
            value: p._id,
            label: `${p.name} (${p.email})`,
          }))}
          placeholder="Search Patient..."
          isSearchable
          onChange={handlePatientSelect}
        />

        <input
          type="text"
          placeholder="Report Name"
          className="w-full border p-3 rounded"
          onChange={(e) => setForm({ ...form, reportName: e.target.value })}
          required
        />

        {/* ⭐ SEARCHABLE REPORT TYPE */}
        <Select
          options={reportTypeOptions}
          placeholder="Search Report Type..."
          isSearchable
          onChange={(selected: any) =>
            setForm({ ...form, reportType: selected?.value || "" })
          }
        />

        {/* ⭐ AUTO-FILLED READONLY FIELDS */}
        <input
          type="text"
          value={form.name}
          readOnly
          className="w-full border p-3 rounded bg-gray-100"
          placeholder="Patient Name (Auto-filled)"
        />

        <input
          type="number"
          value={form.age}
          readOnly
          className="w-full border p-3 rounded bg-gray-100"
          placeholder="Age (Auto-filled)"
        />

        <input
          type="text"
          value={form.gender}
          readOnly
          className="w-full border p-3 rounded bg-gray-100"
          placeholder="Gender (Auto-filled)"
        />

        <input
          type="file"
          accept="application/pdf"
          className="w-full"
          onChange={(e) =>
            setForm({
              ...form,
              file: e.target.files ? e.target.files[0] : null,
            })
          }
          required
        />

        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Upload Report
        </button>
      </form>
    </div>
  );
};

export default AdminUpload;
