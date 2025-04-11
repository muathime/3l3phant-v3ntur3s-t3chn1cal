import React, { useState, useMemo, useEffect } from "react";
import Modal from "./Modal";
import { HiEye } from "react-icons/hi";
import { fetchWantedList } from "../api/api";
import toast from "react-hot-toast";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

interface Record {
  uid: string;
  title: string;
  status: string;
  description: string;
  nationality: string | null;
  scars_and_marks: string | null;
  race: string | null;
  images: {
    large: string;
    caption: string;
  }[];
}

const Table: React.FC = () => {
  const [wantedList, setWantedList] = useState([]);

  const [statusFilter, setStatusFilter] = useState("");
  const [nationalityFilter, setNationalityFilter] = useState("");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const pageSize = 10;

  const filteredData = useMemo(() => {
    return wantedList.filter((r: Record) => {
      const matchesSearch = r.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus = statusFilter ? r.status === statusFilter : true;
      const matchesNationality = nationalityFilter
        ? r.nationality === nationalityFilter
        : true;
      return matchesSearch && matchesStatus && matchesNationality;
    });
  }, [search, statusFilter, nationalityFilter, wantedList]);

  const uniqueStatuses = useMemo(() => {
    return Array.from(
      new Set(wantedList.map((r: Record) => r.status).filter(Boolean))
    );
  }, [wantedList]);

  const uniqueNationalities = useMemo(() => {
    return Array.from(
      new Set(wantedList.map((r: Record) => r.nationality).filter(Boolean))
    );
  }, [wantedList]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleView = (record: Record) => {
    setSelectedRecord(record);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchWantedList(localStorage.getItem("token"));
        setWantedList(data.items);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        // toast.success("Data fetched successfully 🐘"); //Aesthetically doesn't look good
      }
    };

    getData();
  }, []);

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">Wanted List</h1>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:max-w-xs"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:max-w-xs"
        >
          <option value="">All Statuses</option>
          {uniqueStatuses.map((status) => (
            <option key={status ?? "unknown"} value={status ?? ""}>
              {status ?? "Unknown"}
            </option>
          ))}
        </select>

        <select
          value={nationalityFilter}
          onChange={(e) => setNationalityFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:max-w-xs"
        >
          <option value="">All Nationalities</option>
          {uniqueNationalities.map((nat) => (
            <option key={nat ?? "unknown"} value={nat ?? ""}>
              {nat ?? "Unknown"}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Nationality</th>
            <th className="border border-gray-300 p-2">Race</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((record: Record) => (
            <tr key={record.uid}>
              <td className="border p-2 text-center">
                {record.images?.[0]?.large && (
                  <img
                    src={record.images[0].large}
                    alt={record.title}
                    className="w-16 h-16 object-cover rounded-full mx-auto"
                  />
                )}
              </td>
              <td className="border p-2">{record.title}</td>
              <td className="border p-2">{record.description || "N/A"}</td>
              <td className="border p-2">{record.status}</td>
              <td className="border p-2">{record.nationality || "N/A"}</td>
              <td className="border p-2 capitalize">{record.race || "N/A"}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleView(record)}
                  className="bg-blue-800 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition duration-200"
                >
                  <HiEye className="text-white" />
                  <span>View</span>
                </button>
              </td>
            </tr>
          ))}
          {paginatedData.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center p-4">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 mx-6"
        >
          <HiOutlineChevronLeft />
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 mx-6"
        >
          <HiOutlineChevronRight />
        </button>
      </div>

      {selectedRecord && (
        <Modal onClose={() => setSelectedRecord(null)}>
          <h2 className="text-xl font-bold mb-2">Quick Details</h2>
          {selectedRecord.images?.[0]?.large && (
            <img
              src={selectedRecord.images[0].large}
              alt={selectedRecord.title}
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            />
          )}
          <p>
            <strong>Name:</strong> {selectedRecord.title}
          </p>
          <p>
            <strong>Status:</strong> {selectedRecord.status}
          </p>
          <p>
            <strong>Nationality:</strong> {selectedRecord.nationality || "N/A"}
          </p>
          <p>
            <strong>Race:</strong> {selectedRecord.race || "N/A"}
          </p>
          <p>
            <strong>Scars & Marks:</strong>{" "}
            {selectedRecord.scars_and_marks || "N/A"}
          </p>
          <p className="mt-2">
            <strong>Description:</strong> {selectedRecord.description}
          </p>

          <p className="mt-6 text-center">
            <a
              href="https://tips.fbi.gov/home"
              className="text-blue-600 hover:text-blue-800 font-semibold underline transition duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              FBI Electronic Tip Form
            </a>
          </p>
        </Modal>
      )}
    </div>
  );
};

export default Table;
