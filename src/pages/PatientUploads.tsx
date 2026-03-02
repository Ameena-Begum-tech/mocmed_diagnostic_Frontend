// PatientUploads.tsx
// Language: TypeScript (React)

import { useEffect, useState, useMemo } from "react";
import axios from "axios";

interface Report {
  _id: string;
  reportName?: string;
  reportType?: string;
  name?: string;
  age?: number;
  gender?: string;
  fileUrl: string;
  createdAt?: string;
  patient?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

const ITEMS_PER_PAGE = 5;

const PatientUploads = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [sortOrder, setSortOrder] = useState<"NEWEST" | "OLDEST">("NEWEST");
  const [currentPage, setCurrentPage] = useState(1);

  const role = localStorage.getItem("role");

  // 🔐 Frontend Role Protection
  if (role !== "SUPERADMIN") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-lg font-semibold">
          Access Denied
        </p>
      </div>
    );
  }

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

      setReports(res.data || []);
    } catch (error) {
      console.error("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  const deleteReport = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this report?"))
      return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/reports/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReports((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ✅ Safe Filtering + Sorting
  const filteredReports = useMemo(() => {
    let data = [...reports];

    // Safe Search
    data = data.filter((report) =>
      (report.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    // Safe Filter
    if (filterType !== "ALL") {
      data = data.filter(
        (r) => (r.reportType || "") === filterType
      );
    }

    // Safe Sort
    data.sort((a, b) => {
      const dateA = a.createdAt
        ? new Date(a.createdAt).getTime()
        : 0;
      const dateB = b.createdAt
        ? new Date(b.createdAt).getTime()
        : 0;

      return sortOrder === "NEWEST"
        ? dateB - dateA
        : dateA - dateB;
    });

    return data;
  }, [reports, searchTerm, filterType, sortOrder]);

  const totalPages = Math.ceil(
    filteredReports.length / ITEMS_PER_PAGE
  );

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-[#0A7DCF] mb-6">
        Patient Uploaded Reports
      </h2>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">

        {/* Search */}
        <input
          type="text"
          placeholder="Search by patient name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-4 py-2 rounded-lg w-full md:w-72"
        />

        {/* Filter */}
        <select
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-4 py-2 rounded-lg w-full md:w-52"
        >
          <option value="ALL">All Types</option>
          {[...new Set(
            reports
              .map((r) => r.reportType)
              .filter(Boolean)
          )].map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>

        {/* Sort */}
        <button
          onClick={() =>
            setSortOrder((prev) =>
              prev === "NEWEST" ? "OLDEST" : "NEWEST"
            )
          }
          className="bg-[#0A7DCF] text-white px-4 py-2 rounded-lg"
        >
          Sort: {sortOrder === "NEWEST" ? "Newest" : "Oldest"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3">Report</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedReports.map((report) => (
              <tr key={report._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">
                  {report.reportName || "N/A"}
                </td>

                <td className="px-4 py-3">
                  <div>{report.name || "N/A"}</div>
                  <div className="text-xs text-gray-500">
                    {report.patient?.email || "N/A"}
                  </div>
                </td>

                <td className="px-4 py-3">
                  {report.age ?? "N/A"}
                </td>

                <td className="px-4 py-3">
                  {report.gender || "N/A"}
                </td>

                <td className="px-4 py-3">
                  {report.reportType || "N/A"}
                </td>

                <td className="px-4 py-3">
                  {report.createdAt
                    ? new Date(report.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <a
                      href={report.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-blue-500 text-white rounded text-xs"
                    >
                      Preview
                    </a>

                    <a
                      href={report.fileUrl}
                      download
                      className="px-3 py-1 bg-green-500 text-white rounded text-xs"
                    >
                      Download
                    </a>

                    <button
                      onClick={() => deleteReport(report._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {paginatedReports.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No reports found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-[#0A7DCF] text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientUploads;
