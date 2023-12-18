import React, { useState, useEffect } from "react";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CNavTitle,
  CNavItem,
  CBadge,
  CNavGroup,
  CSidebarToggler,
} from "@coreui/react";
import {
  MdSpaceDashboard,
  MdLeaderboard,
  MdOutlineAdminPanelSettings,
  MdSupervisedUserCircle,
  MdHomeRepairService,
  MdOutlineFavoriteBorder,
} from "react-icons/md";
import { CgCalendarToday } from "react-icons/cg";
import { AiOutlinePullRequest } from "react-icons/ai";
import { GrStatusGood } from "react-icons/gr";
import { FaIndustry } from "react-icons/fa";
import { TbStatusChange } from "react-icons/tb";

import { Box } from "@mui/material";
import "./Sidebar.css";

export default function Sidebar() {
  const [menu, setMenu] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const getSession = () => {
    let uid = localStorage.getItem("psAdminSessionID");
    let uname = localStorage.getItem("psAdminSessionName");

    if (uid === null) {
      window.location.href = "/";
    } else {
      setName(uname);
    }
  };
  useEffect(() => {
    getSession();
  });

  const menuUpdate = () => {
    setMenu([
      {
        id: 1,
        menu: "Dashboard",
        link: "/dashboard",
        icon: (
          <MdSpaceDashboard
            customClassName="nav-icon"
            style={{ marginRight: "10px" }}
            color={"#ffffff"}
          />
        ),
      },
      {
        id: 13,
        menu: "Today's Service",
        link: "/currentService",
        icon: (
          <CgCalendarToday
            customClassName="nav-icon"
            style={{ marginRight: "10px" }}
            color={"#ffffff"}
          />
        ),
      },
      {
        id: 2,
        menu: "Leads",
        link: "/leads",
        icon: (
          <MdLeaderboard
            customClassName="nav-icon"
            style={{ marginRight: "10px" }}
            color={"#ffffff"}
          />
        ),
      },
      {
        id: 3,
        menu: "Orders",
        link: "/orders",
        icon: (
          <MdOutlineFavoriteBorder
            customClassName="nav-icon"
            style={{ marginRight: "10px" }}
            color={"#ffffff"}
          />
        ),
      },
      {
        id: 4,
        menu: "Admin",
        link: "/admin",
        icon: (
          <MdOutlineAdminPanelSettings
            customClassName="nav-icon"
            style={{ marginRight: "10px" }}
            color={"#ffffff"}
          />
        ),
      },
      {
        id: 5,
        menu: "Employee",
        link: "/employee",
        icon: (
          <MdSupervisedUserCircle
            customClassName="nav-icon"
            style={{ marginRight: "10px" }}
            color={"#ffffff"}
          />
        ),
      },
      {
        id: 6,
        menu: "App Users",
        link: "/app_users",
        icon: (
          <MdSupervisedUserCircle
            customClassName="nav-icon"
            style={{ marginRight: "10px" }}
            color={"#ffffff"}
          />
        ),
      },
      {
        id: 7,
        menu: "Website Service",
        link: "/website_service",
        icon: (
          <MdHomeRepairService
            customClassName="nav-icon"
            style={{ marginRight: "10px" }}
            color={"#ffffff"}
          />
        ),
      },
      {
        id: 8,
        menu: "Website Request",
        link: "/website_request",
        icon: (
          <AiOutlinePullRequest
            customClassName="nav-icon"
            style={{ marginRight: "10px" }}
            color={"#ffffff"}
          />
        ),
      },
      {
        id: 9,
        menu: "Employee Attandance",
        link: "/attandance",
        icon: (
          <AiOutlinePullRequest
            customClassName="nav-icon"
            style={{ marginRight: "10px" }}
            color={"#ffffff"}
          />
        ),
      },
      {
        id: 10,
        menu: "Leave Application",
        link: "/leave_application",
        icon: (
          <AiOutlinePullRequest
            customClassName="nav-icon"
            style={{ marginRight: "10px" }}
            color={"#ffffff"}
          />
        ),
      },
      {
        id: 11,
        menu: "Lead Status",
        link: "/lead_status",
        icon: (
          <TbStatusChange
            customClassName="nav-icon"
            style={{ marginRight: "10px", color: "#FFF" }}
            color={"#ffffff"}
          />
        ),
      },
      {
        id: 12,
        menu: "Industry Type",
        link: "/industry_type",
        icon: (
          <FaIndustry
            customClassName="nav-icon"
            style={{ marginRight: "10px", color: "#FFF" }}
            color={"#ffffff"}
          />
        ),
      },
    ]);
  };
  //14
  useEffect(() => {
    menuUpdate();
  }, []);

  return (
    <div style={{ padding: "0px", margin: "0px" }}>
      <Box md={{ width: "100%" }}>
        <CSidebar
          style={{
            width: "105%",
            minHeight: "100vh",
            position: "relative",
            padding: "10px",
          }}
          className="adminSidebar"
          colorScheme="dark"
        >
          <CSidebarBrand>Hello, {name}</CSidebarBrand>
          {menu.map((item) => {
            return (
              <CSidebarNav
                key={item.id}
                style={{
                  display: "flex",
                  overflow: "auto",
                }}
              >
                <CNavItem href={item.link}>
                  {item.icon} {item.menu}
                </CNavItem>
              </CSidebarNav>
            );
          })}
        </CSidebar>
      </Box>
    </div>
  );
}
