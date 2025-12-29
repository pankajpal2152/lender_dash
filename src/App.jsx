import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";


import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import LenderMaster from "./pages/LenderMaster";
import EditLender from "./pages/EditLender";
import AddLender from "./pages/AddLender";
import ViewLender from "./pages/ViewLender";

import AggregatorMaster from "./pages/AggregatorMaster";
import AddAggregator from "./pages/AddAggregator";
import EditAggregator from "./pages/EditAggregator";
import ViewAggregator from "./pages/ViewAggregator";

import FieldEngineerMaster from "./pages/FieldEngineerMaster";
import FieldEngineerForm from "./pages/FieldEngineerForm";
import EditFieldEngineer from "./pages/EditFieldEngineer";
import FieldEngineerDetail from "./pages/FieldEngineerDetail";

import LenderBranchMaster from "./pages/LenderBranchMaster";
import EditLenderBranch from "./pages/EditLenderBranch";
import ViewLenderBranch from "./pages/ViewLenderBranch";


import WarehouseMaster from "./pages/WarehouseMaster";
import WarehouseDetail from "./pages/WarehouseDetail";
import CreateWarehouse from "./pages/CreateWarehouse";
import EditWarehouse from "./pages/EditWarehouse";

import Dashboard from "./pages/Dashboard";

import CreateUser from "./pages/CreateUser";



import "./App.css";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        closeSidebar={closeSidebar}
      />

      {/* Main content */}
      <div className="main">
        <Header toggleSidebar={toggleSidebar} />

        <Routes>
          {/* ✅ DEFAULT REDIRECT */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* DASHBOARD */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* CREATE USER */}
          <Route path="/create-user" element={<CreateUser />} />


          {/* LENDER */}
          <Route path="/lenders" element={<LenderMaster />} />
          <Route path="/lenders/add" element={<AddLender />} />
          <Route path="/lenders/edit/:id" element={<EditLender />} />
          <Route path="/lenders/view/:id" element={<ViewLender />} />

          {/* AGGREGATOR */}
          <Route path="/aggregators" element={<AggregatorMaster />} />
          <Route path="/aggregators/add" element={<AddAggregator />} />
          <Route path="/aggregators/edit/:id" element={<EditAggregator />} />
          <Route path="/aggregators/view/:id" element={<ViewAggregator />} />

          {/* FIELD ENGINEER */}
          <Route path="/engineers" element={<FieldEngineerMaster />} />
          <Route path="/engineers/add" element={<FieldEngineerForm />} />
          <Route path="/engineers/edit/:id" element={<EditFieldEngineer />} />
          <Route path="/engineers/view/:id" element={<FieldEngineerDetail />} />

          {/* WAREHOUSE */}
          <Route path="/warehouse" element={<WarehouseMaster />} />
          <Route path="/warehouse/create" element={<CreateWarehouse />} />
          <Route path="/warehouse/edit/:id" element={<CreateWarehouse />} />
          <Route path="/warehouse/view/:id" element={<WarehouseDetail />} />

          {/* LENDER BRANCH */}
          <Route path="/lender-branches" element={<LenderBranchMaster />} />
          <Route path="/lender-branches/add" element={<EditLenderBranch />} />
          <Route path="/lender-branches/edit/:id" element={<EditLenderBranch />} />
          <Route path="/lender-branches/view/:id" element={<ViewLenderBranch />} />
        </Routes>

      </div>

      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div className="overlay" onClick={closeSidebar} />
      )}
    </div>
  );
}
