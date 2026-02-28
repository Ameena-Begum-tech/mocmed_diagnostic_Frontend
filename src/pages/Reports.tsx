// TypeScript (React)

import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { useAuth } from "../context/AuthContext";

interface Report {
  _id: string;
  reportName: string;
  reportType: string;
  createdAt: string;
  name: string;
  age: number;
  gender: string;
}

const Reports = () => {
  const { user } = useAuth();

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/reports/my-reports`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        setReports(res.data);
      } catch (err) {
        console.error("Failed to fetch reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handlePreview = (id: string) => {
    const token = getToken();
    window.open(
      `${import.meta.env.VITE_API_URL}/api/reports/view/${id}?token=${token}`,
      "_blank"
    );
  };

  const handleDownload = (id: string) => {
    const token = getToken();
    window.open(
      `${import.meta.env.VITE_API_URL}/api/reports/download/${id}?token=${token}`,
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading reports...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* ✅ HELLO HEADER */}
      <div className="text-center mt-10 mb-8">
        <h1 className="text-3xl font-bold text-[#0A7DCF]">
          Hello, {user?.username}
        </h1>
      </div>

      {/* PAGE TITLE */}
      <h2 className="text-3xl font-bold text-[#0A7DCF] mb-6">
        My Reports
      </h2>

      {reports.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No reports available.
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report._id}
              className="border p-6 rounded-xl shadow-sm hover:shadow-md transition flex justify-between items-center bg-white"
            >
              <div>
                <h3 className="font-semibold text-lg">
                  {report.reportName}
                </h3>

                <p className="text-sm text-gray-500">
                  {report.reportType}
                </p>

                <p className="text-sm text-gray-700 mt-1">
                  Patient: {report.name} | Age: {report.age} | Gender: {report.gender}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handlePreview(report._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Preview
                </button>

                <button
                  onClick={() => handleDownload(report._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;
