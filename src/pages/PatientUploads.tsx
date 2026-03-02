import { useEffect, useMemo, useState } from "react";
import axios from "axios";

interface DocumentType {
  _id: string;
  patientName: string;
  age: number;
  gender: string;
  reportType: string;
  fileUrl: string;
  contactNumber: string;
  email: string;
  status: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
    phone: string;
  };
}

const PatientUploads = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (role !== "SUPERADMIN") {
    return <p className="text-center mt-10">Access Denied</p>;
  }

  // Fetch documents
  const fetchDocuments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/documents/patient-uploads`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDocuments(res.data);
    } catch (error) {
      console.error("Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Search + Sort
  const filteredDocuments = useMemo(() => {
    let filtered = documents.filter((doc) =>
      (doc.patientName || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [documents, search, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Delete
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this document?"))
      return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/documents/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDocuments((prev) => prev.filter((doc) => doc._id !== id));
    } catch (error) {
      alert("Delete failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">

      <h1 className="text-2xl font-bold mb-6 text-[#0A7DCF]">
        Patient Uploaded Documents
      </h1>

      {/* Search + Sort */}
      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Search by patient name..."
          className="border p-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() =>
            setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
          }
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sort: {sortOrder === "newest" ? "Newest" : "Oldest"}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Patient</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Type</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedDocuments.map((doc) => (
              <tr key={doc._id} className="border-t">
                <td className="p-4">
                  <p className="font-semibold">{doc.patientName}</p>
                  <p className="text-sm text-gray-500">{doc.email}</p>
                </td>
                <td>{doc.age}</td>
                <td>{doc.gender}</td>
                <td>{doc.reportType}</td>
                <td>
                  {new Date(doc.createdAt).toLocaleDateString()}
                </td>
                <td className="space-x-2">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Preview
                  </a>

                  <a
                    href={doc.fileUrl}
                    download
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Download
                  </a>

                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PatientUploads;
