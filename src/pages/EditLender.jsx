import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LenderPageHeader from "../components/LenderPageHeader";
import "./EditLender.css";

/* =====================
   DEFAULT MODEL
   ===================== */
const EMPTY_LENDER = {
    id: "",
    lenderCode: "",
    lenderName: "",
    lenderType: "",
    contactPersonName: "",
    contactMobile: "",
    contactEmail: "",
    registeredAddress: "",
    state: "",
    region: "",
    gstNumber: "",
    panNumber: "",
    billingCycle: {
        from: "",
        to: "",
    },
    paymentTermsDays: "",
    idApplicable: false,
    idPercentageCap: "",
    pilotStartDate: "",
    pilotEndDate: "",
    agreementStartDate: "",
    agreementEndDate: "",
    lenderStatus: "",
    remarks: "",
    createDate: "",
    updateDate: "",
};

export default function EditLender() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        ...EMPTY_LENDER,
        id,
    });

    useEffect(() => {
        if (location.state) {
            setFormData({
                ...EMPTY_LENDER,
                ...location.state,
                billingCycle: {
                    ...EMPTY_LENDER.billingCycle,
                    ...(location.state.billingCycle || {}),
                },
            });
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.startsWith("billing_")) {
            const key = name.split("_")[1];
            setFormData((prev) => ({
                ...prev,
                billingCycle: {
                    ...prev.billingCycle,
                    [key]: value,
                },
            }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Lender:", formData);
        navigate("/lenders");
    };

    return (
        <div className="lender-form-page">
            <LenderPageHeader />

            <div className="edit-lender-page">
                <div className="card edit-lender-card full-width">
                    <h2 className="edit-lender-title">Edit Lender</h2>

                    {/* ✅ SAME STRUCTURE AS EDIT AGGREGATOR */}
                    <form className="edit-form two-column" onSubmit={handleSubmit}>
                        <label>
                            ID
                            <input value={formData.id} disabled />
                        </label>

                        <label>
                            Lender Code
                            <input name="lenderCode" value={formData.lenderCode} onChange={handleChange} />
                        </label>

                        <label>
                            Lender Name
                            <input name="lenderName" value={formData.lenderName} onChange={handleChange} />
                        </label>

                        <label>
                            Lender Type
                            <select name="lenderType" value={formData.lenderType} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="NBFC">NBFC</option>
                                <option value="Bank">Bank</option>
                            </select>
                        </label>

                        <label>
                            Contact Person Name
                            <input name="contactPersonName" value={formData.contactPersonName} onChange={handleChange} />
                        </label>

                        <label>
                            Contact Mobile
                            <input name="contactMobile" value={formData.contactMobile} onChange={handleChange} />
                        </label>

                        <label>
                            Contact Email
                            <input name="contactEmail" value={formData.contactEmail} onChange={handleChange} />
                        </label>

                        <label>
                            Registered Address
                            <input name="registeredAddress" value={formData.registeredAddress} onChange={handleChange} />
                        </label>

                        <label>
                            State
                            <input name="state" value={formData.state} onChange={handleChange} />
                        </label>

                        <label>
                            Region
                            <input name="region" value={formData.region} onChange={handleChange} />
                        </label>

                        <label>
                            GST Number
                            <input name="gstNumber" value={formData.gstNumber} onChange={handleChange} />
                        </label>

                        <label>
                            PAN Number
                            <input name="panNumber" value={formData.panNumber} onChange={handleChange} />
                        </label>

                        {/* ===== INLINE ID APPLICABLE ===== */}
                        <div className="ld-inline-field">
                            <span className="ld-inline-label">ID Applicable</span>
                            <input
                                type="checkbox"
                                name="idApplicable"
                                checked={formData.idApplicable}
                                onChange={handleChange}
                            />
                        </div>

                        <label>
                            ID Percentage Cap
                            <input
                                type="number"
                                name="idPercentageCap"
                                value={formData.idPercentageCap}
                                onChange={handleChange}
                                disabled={!formData.idApplicable}
                            />
                        </label>

                        <label>
                            Billing Cycle From
                            <input
                                type="datetime-local"
                                name="billing_from"
                                value={formData.billingCycle.from}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Billing Cycle To
                            <input
                                type="datetime-local"
                                name="billing_to"
                                value={formData.billingCycle.to}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Payment Terms Days
                            <input type="number" name="paymentTermsDays" value={formData.paymentTermsDays} onChange={handleChange} />
                        </label>

                        <label>
                            Pilot Start Date
                            <input type="date" name="pilotStartDate" value={formData.pilotStartDate} onChange={handleChange} />
                        </label>

                        <label>
                            Pilot End Date
                            <input type="date" name="pilotEndDate" value={formData.pilotEndDate} onChange={handleChange} />
                        </label>

                        <label>
                            Agreement Start Date
                            <input type="date" name="agreementStartDate" value={formData.agreementStartDate} onChange={handleChange} />
                        </label>

                        <label>
                            Agreement End Date
                            <input type="date" name="agreementEndDate" value={formData.agreementEndDate} onChange={handleChange} />
                        </label>

                        <label>
                            Lender Status
                            <select name="lenderStatus" value={formData.lenderStatus} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="INACTIVE">INACTIVE</option>
                                <option value="SUSPENDED">SUSPENDED</option>
                            </select>
                        </label>

                        <label>
                            Remarks
                            <input name="remarks" value={formData.remarks} onChange={handleChange} />
                        </label>

                        <label>
                            Create Date
                            <input type="date" name="createDate" value={formData.createDate} onChange={handleChange} />
                        </label>

                        <label>
                            Update Date
                            <input type="date" name="updateDate" value={formData.updateDate} onChange={handleChange} />
                        </label>

                        {/* FULL WIDTH – CENTERED */}
                        <div className="form-actions">
                            <button type="button" onClick={() => navigate("/lenders")}>Cancel</button>
                            <button type="submit" className="primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
