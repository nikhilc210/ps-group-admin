import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Admin from "../Pages/Admin/Admin";
import Employee from "../Pages/Employee/Employee";
import WebsiteService from "../Pages/WebsiteService/WebsiteService";
import WebsiteRequest from "../Pages/WebsiteRequest/WebsiteRequest";
export default function Index() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/employee" element={<Employee />}></Route>
        <Route path="/website_service" element={<WebsiteService />}></Route>
        <Route path="/website_request" element={<WebsiteRequest />}></Route>
      </Routes>
    </Router>
  );
}
