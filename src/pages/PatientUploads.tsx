import { useEffect, useState } from "react";
import axios from "axios";

interface Report {
  _id: string;
  reportName: string;
  reportType: string;
  name: string;
  age: number;
  gender: string;
  fileUrl: string;
  patient: {
    name: string;
    email: string;
    phone: string;
  };
}

const PatientUploads = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/reports/patient-uploads`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReports(res.data);
    } catch (error) {
      console.error("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) return <p>Loading reports...</p>;

  return (
    <div className="mt-6 space-y-4">
      {reports.map((report) => (
        <div
          key={report._id}
          className="border p-4 rounded-lg shadow bg-white"
        >
          <h3 className="font-bold text-lg text-[#0A7DCF]">
            {report.reportName}
          </h3>

          <p><strong>Report Type:</strong> {report.reportType}</p>
          <p><strong>Patient Name:</strong> {report.name}</p>
          <p><strong>Age:</strong> {report.age}</p>
          <p><strong>Gender:</strong> {report.gender}</p>
          <p><strong>Email:</strong> {report.patient?.email}</p>

          <div className="flex gap-4 mt-3">
            {/* Preview */}
            <a
              href={report.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Preview
            </a>

            {/* Download */}
            <a
              href={report.fileUrl}
              download
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Download
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientUploads;
