import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

interface Report {
  _id: string;
  reportName: string;
  reportType: string;
  createdAt: string;
}

const Reports = () => {
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

  const handleDownload = async (id: string) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/reports/download/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Download failed or unauthorized");
    }
  };

  const handlePreview = (id: string) => {
    const token = getToken();
    window.open(
      `${import.meta.env.VITE_API_URL}/api/reports/view/${id}?token=${token}`,
      "_blank"
    );
  };

  if (loading)
    return <div className="text-center mt-20">Loading reports...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#0A7DCF] mb-6">My Reports</h1>

      {reports.length === 0 ? (
        <p>No reports available</p>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report._id}
              className="border p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{report.reportName}</h2>
                <p className="text-sm text-gray-500">{report.reportType}</p>
                <p className="text-xs text-gray-400">
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handlePreview(report._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Preview
                </button>

                <button
                  onClick={() => handleDownload(report._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
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
