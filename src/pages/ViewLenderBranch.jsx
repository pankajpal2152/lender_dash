import { useLocation, useNavigate } from "react-router-dom";
import LenderPageHeader from "../components/LenderPageHeader";
import "./EditLender.css";

/* =====================
   FULL DUMMY BRANCH DATA
   ===================== */
const DUMMY_BRANCH = {
  lenderId: "lnd-1",
  lenderName: "HDFC Bank",
  branchCode: "BR-001",
  branchName: "Kolkata Branch",
  branchType: "PUBLIC",
  contactPersonName: "Ramesh Kumar",
  contactMobile: "9876543210",
  contactEmail: "kolkata.branch@hdfc.com",
  address: "Salt Lake Sector V, Kolkata",
  state: "West Bengal",
  district: "Kolkata",
  pincode: "700091",
  latitude: "22.5726",
  longitude: "88.3639",
  locationUpdatedAt: "2025-12-29T10:30",
  billingApplicable: true,
  status: "ACTIVE",
  remarks: "Main operational branch for eastern region",
  createdAt: "2025-12-01T09:00",
  updatedAt: "2025-12-29T12:15",
};

export default function ViewLenderBranch() {
  const navigate = useNavigate();
  const { state } = useLocation();

  /* =====================
     SAFE DATA MERGE
     ===================== */
  const branch = {
    ...DUMMY_BRANCH,
    ...(state || {}),
  };

  return (
    <div className="lender-form-page">
      {/* ✅ HEADER */}
      <LenderPageHeader
        title="Lender Branch"
        breadcrumbLabel="Lender Branch > View"
      />

      {/* =====================
         VIEW CARD
         ===================== */}
      <div className="edit-lender-page">
        <div className="card edit-lender-card full-width">
          <h2 className="edit-lender-title">Lender Branch Details</h2>

          {/* ✅ TWO COLUMN READ-ONLY FORM */}
          <div className="edit-form two-column">
            <label>
              Lender
              <input value={branch.lenderName} disabled />
            </label>

            <label>
              Branch Code
              <input value={branch.branchCode} disabled />
            </label>

            <label>
              Branch Name
              <input value={branch.branchName} disabled />
            </label>

            <label>
              Branch Type
              <input value={branch.branchType} disabled />
            </label>

            <label>
              Contact Person Name
              <input value={branch.contactPersonName} disabled />
            </label>

            <label>
              Contact Mobile
              <input value={branch.contactMobile} disabled />
            </label>

            <label>
              Contact Email
              <input value={branch.contactEmail} disabled />
            </label>

            <label>
              Address
              <input value={branch.address} disabled />
            </label>

            <label>
              State
              <input value={branch.state} disabled />
            </label>

            <label>
              District
              <input value={branch.district} disabled />
            </label>

            <label>
              Pincode
              <input value={branch.pincode} disabled />
            </label>

            <label>
              Latitude
              <input value={branch.latitude} disabled />
            </label>

            <label>
              Longitude
              <input value={branch.longitude} disabled />
            </label>

            <label>
              Location Updated At
              <input
                value={branch.locationUpdatedAt.replace("T", " ")}
                disabled
              />
            </label>

            {/* ✅ INLINE BOOLEAN FIELD */}
            <div className="ld-inline-field">
              <span className="ld-inline-label">Billing Applicable</span>
              <input type="checkbox" checked={branch.billingApplicable} disabled />
            </div>

            <label>
              Status
              <input value={branch.status} disabled />
            </label>

            <label className="full-width">
              Remarks
              <input value={branch.remarks} disabled />
            </label>

            <label>
              Created At
              <input value={branch.createdAt.replace("T", " ")} disabled />
            </label>

            <label>
              Updated At
              <input value={branch.updatedAt.replace("T", " ")} disabled />
            </label>

            {/* ✅ ACTIONS */}
            <div className="form-actions">
              <button type="button" onClick={() => navigate("/lender-branches")}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
