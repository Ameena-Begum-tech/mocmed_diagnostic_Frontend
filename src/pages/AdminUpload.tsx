import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

interface Patient {
  _id: string;
  name: string;
  email: string;
}

const AdminUpload = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [form, setForm] = useState({
    patientId: "",
    reportName: "",
    reportType: "",
    file: null as File | null,
  });

  // fetch patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/patients", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setPatients(res.data);
      } catch (err) {
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
    data.append("report", form.file);

    try {
      await axios.post("http://localhost:5000/api/reports/upload", data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });

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
        <select
          className="w-full border p-3 rounded"
          onChange={(e) => setForm({ ...form, patientId: e.target.value })}
          required
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} ({p.email})
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Report Name"
          className="w-full border p-3 rounded"
          onChange={(e) => setForm({ ...form, reportName: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Report Type (CBC, MRI...)"
          className="w-full border p-3 rounded"
          onChange={(e) => setForm({ ...form, reportType: e.target.value })}
          required
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
