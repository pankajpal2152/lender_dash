import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Eye, ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { getLenders, updateLender, deleteLender } from "../api/lenderApi";
import "./LenderTableCard.css";

export default function LenderTableCard() {
  const navigate = useNavigate();

  /* =====================
     STATE MANAGEMENT
     ===================== */
  const [lenders, setLenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  /* =====================
     PAGINATION
     ===================== */
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  /* =====================
     SORTING STATE
     ===================== */
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  /* =====================
     FETCH LENDERS
     ===================== */
  const fetchLenders = async () => {
    setLoading(true);
    setError(null);

    const offset = (currentPage - 1) * rowsPerPage;
    const params = {
      search: searchTerm || undefined,
      offset,
      limit: rowsPerPage,
    };

    const result = await getLenders(params);

    if (result.success) {
      setLenders(result.data);
      setTotalPages(result.maxPage);
    } else {
      setError(result.error);
      setLenders([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchLenders();
  }, [currentPage, searchTerm]);

  /* =====================
     TOGGLE STATUS - CALLS UPDATE API
     ===================== */
  const handleToggle = async (id, currentLender) => {
    // Optimistic update
    const newStatus = currentLender.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    
    setLenders((prev) =>
      prev.map((lender) =>
        lender.id === id ? { ...lender, status: newStatus } : lender
      )
    );

    setUpdatingId(id);

    try {
      // Prepare complete payload with all required fields
      const payload = {
        lenderCode: currentLender.lenderCode,
        lenderName: currentLender.lenderName,
        lenderType: currentLender.lenderType,
        contactPersonName: currentLender.contactPersonName,
        contactMobile: currentLender.contactMobile,
        contactEmail: currentLender.contactEmail,
        headOfficeAddress: currentLender.headOfficeAddress,
        region: currentLender.region,
        gstNumber: currentLender.gstNumber,
        panNumber: currentLender.panNumber,
        incorporationDate: currentLender.incorporationDate,
        businessVerticals: currentLender.businessVerticals,
        status: newStatus, // Only change status
        remarks: currentLender.remarks || "",
      };

      console.log("Updating lender status:", { id, newStatus, payload });

      const result = await updateLender(id, payload);

      if (!result.success) {
        // Revert on failure
        setLenders((prev) =>
          prev.map((lender) =>
            lender.id === id ? { ...lender, status: currentLender.status } : lender
          )
        );
        alert(`Failed to update status: ${result.error}`);
        console.error("Update failed:", result.error);
      } else {
        console.log("Status updated successfully");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      // Revert on error
      setLenders((prev) =>
        prev.map((lender) =>
          lender.id === id ? { ...lender, status: currentLender.status } : lender
        )
      );
      alert("An error occurred while updating status");
    } finally {
      setUpdatingId(null);
    }
  };

  /* =====================
     DELETE HANDLER
     ===================== */
  const handleDelete = async (id, lenderName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${lenderName}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(id);

    const result = await deleteLender(id);

    if (result.success) {
      alert("Lender deleted successfully!");
      fetchLenders();
    } else {
      alert(`Error: ${result.error}`);
    }

    setDeletingId(null);
  };

  /* =====================
     SORTING
     ===================== */
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: null, direction: null };
      }
      return { key, direction: "asc" };
    });
  };

  /* =====================
     SORTED DATA (CLIENT-SIDE)
     ===================== */
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return lenders;

    return [...lenders].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (typeof aVal === "boolean") {
        return sortConfig.direction === "asc"
          ? Number(aVal) - Number(bVal)
          : Number(bVal) - Number(aVal);
      }

      if (typeof aVal === "number") {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      return sortConfig.direction === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [lenders, sortConfig]);

  /* =====================
     SORT ICON
     ===================== */
  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return null;
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={14} />
    ) : (
      <ArrowDown size={14} />
    );
  };

  /* =====================
     SEARCH HANDLER
     ===================== */
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="lender-table-wrapper">
      <div className="card lender-table-card">
        {/* SEARCH BAR */}
        <div style={{ padding: "1rem", borderBottom: "1px solid #e0e0e0" }}>
          <input
            type="text"
            placeholder="Search lenders..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "0.9rem",
            }}
          />
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#f8d7da",
              color: "#721c24",
              borderRadius: "4px",
              margin: "1rem",
            }}
          >
            {error}
          </div>
        )}

        {/* TABLE */}
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("lenderCode")}>
                Lender Code <SortIcon column="lenderCode" />
              </th>
              <th onClick={() => handleSort("lenderName")}>
                Lender Name <SortIcon column="lenderName" />
              </th>
              <th onClick={() => handleSort("lenderType")}>
                Lender Type <SortIcon column="lenderType" />
              </th>
              <th onClick={() => handleSort("region")}>
                Region <SortIcon column="region" />
              </th>
              <th>Contact</th>
              <th onClick={() => handleSort("status")}>
                Status <SortIcon column="status" />
              </th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              // LOADING SKELETON
              [...Array(5)].map((_, index) => (
                <tr key={index}>
                  {[...Array(7)].map((_, colIndex) => (
                    <td key={colIndex}>
                      <div className="skeleton-line" />
                    </td>
                  ))}
                </tr>
              ))
            ) : sortedData.length === 0 ? (
              // NO DATA
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "2rem" }}>
                  No lenders found
                </td>
              </tr>
            ) : (
              // DATA ROWS
              sortedData.map((lender) => (
                <tr key={lender.id}>
                  <td>{lender.lenderCode}</td>
                  <td>{lender.lenderName}</td>
                  <td>
                    <span
                      style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        backgroundColor: 
                          lender.lenderType === "NBFC" ? "#e3f2fd" : 
                          lender.lenderType === "BANK" ? "#e8f5e9" : "#fff3e0",
                        color: 
                          lender.lenderType === "NBFC" ? "#1976d2" : 
                          lender.lenderType === "BANK" ? "#2e7d32" : "#f57c00",
                      }}
                    >
                      {lender.lenderType}
                    </span>
                  </td>
                  <td>{lender.region}</td>
                  <td>{lender.contactMobile}</td>

                  {/* STATUS TOGGLE */}
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={lender.status === "ACTIVE"}
                        onChange={() => handleToggle(lender.id, lender)}
                        disabled={updatingId === lender.id}
                      />
                      <span className="slider" />
                    </label>
                    {updatingId === lender.id && (
                      <span style={{ fontSize: "0.8rem", color: "#666", marginLeft: "0.5rem" }}>
                        Updating...
                      </span>
                    )}
                  </td>

                  {/* ACTIONS: VIEW + EDIT + DELETE */}
                  <td>
                    {/* VIEW */}
                    <button
                      className="icon-btn"
                      onClick={() => navigate(`/lenders/view/${lender.id}`)}
                      title="View"
                    >
                      <Eye size={16} />
                    </button>

                    {/* EDIT */}
                    <button
                      className="icon-btn"
                      onClick={() => navigate(`/lenders/edit/${lender.id}`)}
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>

                    {/* DELETE */}
                    <button
                      className="icon-btn delete-btn"
                      onClick={() => handleDelete(lender.id, lender.lenderName)}
                      disabled={deletingId === lender.id}
                      title="Delete"
                      style={{ color: "#dc3545" }}
                    >
                      {deletingId === lender.id ? (
                        <span className="spinner-small" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="pagination">
          <button
            disabled={currentPage === 1 || loading}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
              disabled={loading}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || loading}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
