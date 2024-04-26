import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Admin from "../Pages/Admin/Admin";
import Employee from "../Pages/Employee/Employee";
import WebsiteService from "../Pages/WebsiteService/WebsiteService";
import WebsiteRequest from "../Pages/WebsiteRequest/WebsiteRequest";
import Leads from "../Pages/Leads/Leads";
import CreateLead from "../Pages/Leads/CreateLead";
import CreateAdmin from "../Pages/Admin/CreateAdmin";
import CreateEmployee from "../Pages/Employee/CreateEmployee";
import CreateWebsiteService from "../Pages/WebsiteService/CreateWebsiteService";
import LeadStatus from "../Pages/LeadStatus/LeadStatus";
import IndustryType from "../Pages/IndustryType/IndustryType";
import AppUser from "../Pages/AppUser/AppUser";
import CreateAppUser from "../Pages/AppUser/CreateAppUser";
import ViewAttendance from "../Pages/Attendance/ViewAttendance";
import Leave from "../Pages/Leave/Leave";
import Sites from "../Pages/Sites/Sites";
import ContactPerson from "../Pages/ContactPerson/ContactPerson";
import EditList from "../Pages/Leads/EditList";
import Order from "../Pages/Orders/Order";
import NewOrder from "../Pages/Orders/NewOrder";
import Schedule from "../Pages/Schedule/Schedule";
import UpdateEmployee from "../Pages/Employee/UpdateEmployee";
import EditAppUser from "../Pages/AppUser/EditAppUser";
import CreateLeadStatus from "../Pages/LeadStatus/CreateLeadStatus";
import CreateIndustryType from "../Pages/IndustryType/CreateIndustryType";
import Login from "../Pages/Login/Login";
import ViewService from "../Pages/ViewService/ViewService";
import ManageSchedule from "../Pages/ManageSchedule/ManageSchedule";
import CurrentService from "../Pages/CurrentService/CurrentService";
import Manager from "../Pages/Manager/Manager";
import CreateManager from "../Pages/Manager/CreateManager";
import ServiceList from "../Pages/ServiceList/ServiceList";
import Designation from "../Pages/Designation/Designation";
import Task from "../Pages/Task/Task";
import CreateTask from "../Pages/Task/CreateTask";
import ViewTask from "../Pages/Task/ViewTask";
import EditManager from "../Pages/Manager/EditManager";
import EditWebsiteService from "../Pages/WebsiteService/EditWebsiteService";
import EditOrder from "../Pages/Orders/EditOrder";
import EditTask from "../Pages/Task/EditTask";
export default function Index() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/employee" element={<Employee />}></Route>
        <Route path="/website_service" element={<WebsiteService />}></Route>
        <Route path="/website_request" element={<WebsiteRequest />}></Route>
        <Route path="/leads" element={<Leads />}></Route>
        <Route path="/createLead" element={<CreateLead />}></Route>
        <Route path="/createAdmin" element={<CreateAdmin />}></Route>
        <Route path="/createEmployee" element={<CreateEmployee />}></Route>
        <Route
          path="/createWebsiteService"
          element={<CreateWebsiteService />}
        ></Route>
        <Route path="/lead_status" element={<LeadStatus />}></Route>
        <Route path="/industry_type" element={<IndustryType />}></Route>
        <Route path="/app_users" element={<AppUser />}></Route>
        <Route path="/createAppUser" element={<CreateAppUser />}></Route>
        <Route path="/view_attendance/:id" element={<ViewAttendance />}></Route>
        <Route path="/leave_application" element={<Leave />}></Route>
        <Route path="/manage_sites/:client_id/:id" element={<Sites />}></Route>
        <Route
          path="/manage_contact_person/:client_id/:id"
          element={<ContactPerson />}
        ></Route>
        <Route path="/edit_lead/:client_id/:id" element={<EditList />}></Route>
        <Route path="/orders" element={<Order />}></Route>
        <Route path="/createNewOrder" element={<NewOrder />}></Route>
        <Route path="/viewSchedule/:id/:client" element={<Schedule />}></Route>
        <Route path="/updateEmployee/:id" element={<UpdateEmployee />}></Route>
        <Route path="/editAppUser/:id" element={<EditAppUser />}></Route>
        <Route path="/createLeadStatus" element={<CreateLeadStatus />}></Route>
        <Route path="/manager" element={<Manager />}></Route>
        <Route path="/createManager" element={<CreateManager />}></Route>
        <Route
          path="/createIndustryType"
          element={<CreateIndustryType />}
        ></Route>
        <Route path="/viewService/:id/:oid" element={<ViewService />}></Route>
        <Route
          path="/manageSchedule/:id/:oid/:date"
          element={<ManageSchedule />}
        ></Route>
        <Route path="/currentService" element={<CurrentService />}></Route>
        <Route path="/serviceList/:cid" element={<ServiceList />}></Route>
        <Route path="/designation" element={<Designation />}></Route>
        <Route path="/task" element={<Task />}></Route>
        <Route path="/createTask" element={<CreateTask />}></Route>
        <Route path="/viewTask/:code/:name" element={<ViewTask />}></Route>
        <Route path="/editManager/:id" element={<EditManager />}></Route>
        <Route
          path="/editWebsiteService/:id"
          element={<EditWebsiteService />}
        ></Route>
        <Route path="/editService/:id/:code" element={<EditOrder />}></Route>
        <Route path="/editTask/:id/:code" element={<EditTask />}></Route>
      </Routes>
    </Router>
  );
}
