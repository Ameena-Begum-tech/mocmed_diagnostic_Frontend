import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import Select from "react-select";

interface Patient {
  _id: string;
  name: string;
  email: string;
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
    age: "",
    gender: "",
    file: null as File | null,
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.file) return alert("Select PDF");

    const data = new FormData();
    data.append("patientId", form.patientId);
    data.append("reportName", form.reportName);
    data.append("reportType", form.reportType);
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

      setForm({
        patientId: "",
        reportName: "",
        reportType: "",
        age: "",
        gender: "",
        file: null,
      });
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

        <Select
          options={patients.map((p) => ({
            value: p._id,
            label: `${p.name} (${p.email})`,
          }))}
          placeholder="Search Patient..."
          isSearchable
          onChange={(selected: any) =>
            setForm({ ...form, patientId: selected?.value || "" })
          }
        />

        <input
          type="number"
          placeholder="Enter Age"
          className="w-full border p-3 rounded"
          value={form.age}
          onChange={(e) =>
            setForm({ ...form, age: e.target.value })
          }
          required
        />

        <select
          className="w-full border p-3 rounded"
          value={form.gender}
          onChange={(e) =>
            setForm({ ...form, gender: e.target.value })
          }
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Report Name"
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setForm({ ...form, reportName: e.target.value })
          }
          required
        />

        <Select
          options={reportTypeOptions}
          placeholder="Search Report Type..."
          isSearchable
          onChange={(selected: any) =>
            setForm({ ...form, reportType: selected?.value || "" })
          }
        />

        <input
          type="file"
          accept="application/pdf"
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
