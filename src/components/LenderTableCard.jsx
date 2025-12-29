import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Eye, ArrowUp, ArrowDown } from "lucide-react";
import "./LenderTableCard.css";

export default function LenderTableCard() {
  const navigate = useNavigate();

  /* =====================
     DUMMY DATA (NOW MUTABLE)
     ===================== */
  const [lenders, setLenders] = useState([
    { id: 1, code: "LND001", name: "Shriram Finance Ltd", type: "NBFC", region: "West Bengal", active: true },
    { id: 2, code: "LND002", name: "HDFC Finance", type: "Bank", region: "Maharashtra", active: false },
    { id: 3, code: "LND003", name: "Bajaj Finserv", type: "NBFC", region: "Karnataka", active: true },
    { id: 4, code: "LND004", name: "ICICI Bank", type: "Bank", region: "Delhi", active: true },
    { id: 5, code: "LND005", name: "Axis Finance", type: "NBFC", region: "Tamil Nadu", active: false },
    { id: 6, code: "LND006", name: "Tata Capital", type: "NBFC", region: "Gujarat", active: true },
    { id: 7, code: "LND007", name: "Kotak Mahindra", type: "Bank", region: "Maharashtra", active: true },
    { id: 8, code: "LND008", name: "IDFC First Bank", type: "Bank", region: "Rajasthan", active: false },
    { id: 9, code: "LND009", name: "IndusInd Bank", type: "Bank", region: "Punjab", active: true },
    { id: 10, code: "LND010", name: "Muthoot Finance", type: "NBFC", region: "Kerala", active: true },
  ]);

  /* =====================
     TOGGLE HANDLER
     ===================== */
  const handleToggle = (id) => {
    setLenders((prev) =>
      prev.map((lender) =>
        lender.id === id
          ? { ...lender, active: !lender.active }
          : lender
      )
    );
  };

  /* =====================
     SORTING STATE
     ===================== */
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

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
     SORTED DATA
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
        return sortConfig.direction === "asc"
          ? aVal - bVal
          : bVal - aVal;
      }

      return sortConfig.direction === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [lenders, sortConfig]);

  /* =====================
     PAGINATION
     ===================== */
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = sortedData.slice(startIndex, startIndex + rowsPerPage);

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

  return (
    <div className="lender-table-wrapper">
      <div className="card lender-table-card">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>
                Lender Id <SortIcon column="id" />
              </th>
              <th onClick={() => handleSort("code")}>
                Lender Code <SortIcon column="code" />
              </th>
              <th onClick={() => handleSort("name")}>
                Lender Name <SortIcon column="name" />
              </th>
              <th onClick={() => handleSort("type")}>
                Lender Type <SortIcon column="type" />
              </th>
              <th onClick={() => handleSort("region")}>
                Region <SortIcon column="region" />
              </th>
              <th onClick={() => handleSort("active")}>
                Status <SortIcon column="active" />
              </th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((lender) => (
              <tr key={lender.id}>
                <td>{lender.id}</td>
                <td>{lender.code}</td>
                <td>{lender.name}</td>
                <td>{lender.type}</td>
                <td>{lender.region}</td>

                {/* STATUS TOGGLE */}
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={lender.active}
                      onChange={() => handleToggle(lender.id)}
                    />
                    <span className="slider" />
                  </label>
                </td>

                {/* ACTIONS: VIEW + EDIT */}
                <td>
                  {/* VIEW */}
                  <button
                    className="icon-btn"
                    onClick={() =>
                      navigate(`/lenders/view/${lender.id}`, {
                        state: lender,
                      })
                    }
                  >
                    <Eye size={16} />
                  </button>

                  {/* EDIT */}
                  <button
                    className="icon-btn"
                    onClick={() =>
                      navigate(`/lenders/edit/${lender.id}`, {
                        state: lender,
                      })
                    }
                  >
                    <Pencil size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
