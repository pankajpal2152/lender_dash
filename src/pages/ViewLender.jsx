import { useLocation, useNavigate, useParams } from "react-router-dom";
import LenderPageHeader from "../components/LenderPageHeader";
import "./ViewAggregator.css"; // reuse existing view styles

// ✅ Helper to format dates safely
const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB");
};

export default function ViewLender() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const lender = location.state;

    /* =====================
       SAFETY FALLBACK
       ===================== */
    if (!lender) {
        return (
            <div className="lender-page">
                <LenderPageHeader
                    title="Lender View"
                    breadcrumbLabel="Lender > View"
                />

                <div className="view-card-wrapper">
                    <div className="card view-card">
                        <h3>No data found for Lender ID: {id}</h3>
                        <p>Please go back and select a lender again.</p>

                        <div className="view-actions">
                            <button
                                className="add-more-btn secondary"
                                onClick={() => navigate("/lenders")}
                            >
                                Back to Lenders
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* =====================
       VIEW UI
       ===================== */
    return (
        <div className="lender-page">
            {/* HEADER */}
            <LenderPageHeader
                title="Lender View"
                breadcrumbLabel="Lender > View"
            />

            <div className="view-card-wrapper">
                <div className="card view-card">
                    <div className="view-grid">

                        {/* ID */}
                        <div className="view-field">
                            <label>ID</label>
                            <span>{lender.id}</span>
                        </div>

                        <div className="view-field">
                            <label>Lender Code</label>
                            <span>{lender.lenderCode}</span>
                        </div>

                        <div className="view-field">
                            <label>Lender Name</label>
                            <span>{lender.lenderName}</span>
                        </div>

                        <div className="view-field">
                            <label>Lender Type</label>
                            <span>{lender.lenderType}</span>
                        </div>

                        <div className="view-field">
                            <label>Contact Person Name</label>
                            <span>{lender.contactPersonName}</span>
                        </div>

                        <div className="view-field">
                            <label>Contact Mobile</label>
                            <span>{lender.contactMobile}</span>
                        </div>

                        <div className="view-field">
                            <label>Contact Email</label>
                            <span>{lender.contactEmail}</span>
                        </div>

                        <div className="view-field">
                            <label>Registered Address</label>
                            <span>{lender.registeredAddress}</span>
                        </div>

                        <div className="view-field">
                            <label>State</label>
                            <span>{lender.state}</span>
                        </div>

                        <div className="view-field">
                            <label>Region</label>
                            <span>{lender.region}</span>
                        </div>

                        <div className="view-field">
                            <label>GST Number</label>
                            <span>{lender.gstNumber}</span>
                        </div>

                        <div className="view-field">
                            <label>PAN Number</label>
                            <span>{lender.panNumber}</span>
                        </div>

                        <div className="view-field">
                            <label>ID Applicable</label>
                            <span>{lender.ldApplicable ? "Yes" : "No"}</span>
                        </div>

                        <div className="view-field">
                            <label>ID Percentage Cap</label>
                            <span>{lender.ldPercentageCap ?? "-"}</span>
                        </div>

                        <div className="view-field">
                            <label>Billing Cycle</label>
                            <span>{lender.billingCycle}</span>
                        </div>

                        <div className="view-field">
                            <label>Payment Terms Days</label>
                            <span>{lender.paymentTermsDays ?? "-"}</span>
                        </div>

                        <div className="view-field">
                            <label>Pilot Start Date</label>
                            <span>{formatDate(lender.pilotStartDate)}</span>
                        </div>

                        <div className="view-field">
                            <label>Pilot End Date</label>
                            <span>{formatDate(lender.pilotEndDate)}</span>
                        </div>

                        <div className="view-field">
                            <label>Agreement Start Date</label>
                            <span>{formatDate(lender.agreementStartDate)}</span>
                        </div>

                        <div className="view-field">
                            <label>Agreement End Date</label>
                            <span>{formatDate(lender.agreementEndDate)}</span>
                        </div>

                        <div className="view-field">
                            <label>Lender Status</label>
                            <span>{lender.status}</span>
                        </div>

                        <div className="view-field full-width">
                            <label>Remarks</label>
                            <span>{lender.remarks || "-"}</span>
                        </div>

                        <div className="view-field">
                            <label>Create Date</label>
                            <span>{formatDate(lender.createdAt)}</span>
                        </div>

                        <div className="view-field">
                            <label>Update Date</label>
                            <span>{formatDate(lender.updatedAt)}</span>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="view-actions">
                        <button
                            className="add-more-btn secondary"
                            onClick={() => navigate("/lenders")}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
