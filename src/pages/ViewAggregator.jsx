import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LenderPageHeader from "../components/LenderPageHeader";
import "./EditLender.css";

/* =====================
   DUMMY AGGREGATOR
   ===================== */
const DUMMY_AGGREGATOR = {
  id: "agg-001",
  aggregatorName: "Xconics Aggregation Pvt Ltd",
  aggregatorCode: "AGG-XCN-01",
  state: "West Bengal",
  district: "Kolkata",
  aggregatorStatus: "ACTIVE",
};

/* =====================
   DUMMY FIELD ENGINEERS
   ===================== */
const ALL_FIELD_ENGINEERS = [
  { id: 1, name: "Rahul Das", mobile: "9876543210", region: "West Bengal", active: true },
  { id: 2, name: "Amit Singh", mobile: "9123456780", region: "Bihar", active: true },
  { id: 3, name: "Sourav Pal", mobile: "9988776655", region: "Odisha", active: false },
  { id: 4, name: "Ravi Kumar", mobile: "9090909090", region: "Jharkhand", active: true },
];

export default function ViewAggregator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  /* =====================
     SAFE AGGREGATOR MERGE
     ===================== */
  const [aggregator, setAggregator] = useState({
    ...DUMMY_AGGREGATOR,
    ...(location.state || {}),
    id: location.state?.id || id || DUMMY_AGGREGATOR.id,
  });

  const [mappedEngineers, setMappedEngineers] = useState([]);

  /* =====================
     LOAD MAPPED ENGINEERS
     ===================== */
  useEffect(() => {
    // Dummy mapped engineers (always non-empty)
    setMappedEngineers([
      ALL_FIELD_ENGINEERS[0],
      ALL_FIELD_ENGINEERS[1],
    ]);
  }, []);

  return (
    <div className="lender-form-page">
      {/* HEADER */}
      <LenderPageHeader
        title="Aggregator Master"
        breadcrumbLabel="Aggregator > View"
      />

      {/* =====================
         AGGREGATOR DETAILS
         ===================== */}
      <div className="edit-lender-page">
        <div className="card edit-lender-card full-width">
          <h2 className="edit-lender-title">Aggregator Details</h2>

          <div className="edit-form">
            <label>
              Aggregator ID
              <input value={aggregator.id} disabled />
            </label>

            <label>
              Aggregator Name
              <input value={aggregator.aggregatorName} disabled />
            </label>

            <label>
              Aggregator Code
              <input value={aggregator.aggregatorCode} disabled />
            </label>

            <label>
              State
              <input value={aggregator.state} disabled />
            </label>

            <label>
              District
              <input value={aggregator.district} disabled />
            </label>

            <label>
              Status
              <input value={aggregator.aggregatorStatus} disabled />
            </label>
          </div>
        </div>
      </div>

      {/* =====================
         FIELD ENGINEER MAPPING
         ===================== */}
      <div className="edit-lender-page">
        <div className="card edit-lender-card full-width">
          <h2 className="edit-lender-title">Mapped Field Engineers</h2>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Region</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {mappedEngineers.map((fe) => (
                <tr key={fe.id}>
                  <td>{fe.name}</td>
                  <td>{fe.mobile}</td>
                  <td>{fe.region}</td>
                  <td>{fe.active ? "Active" : "Inactive"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="form-actions" style={{ marginTop: "16px" }}>
            <button type="button" onClick={() => navigate("/aggregators")}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
