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
import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlinePullRequest } from "react-icons/ai";
import { GrUserAdmin, GrUserManager, GrServices } from "react-icons/gr";
import { Box } from "@mui/material";
import "./Sidebar.css";

export default function Sidebar() {
  const [menu, setMenu] = useState([]);
  const [name, setName] = useState("");

  const menuUpdate = () => {
    setMenu([
      {
        id: 1,
        menu: "Dashboard",
        link: "/",
        icon: (
          <MdSpaceDashboard
            customClassName="nav-icon"
            style={{ marginRight: "10px" }}
            color={"#ffffff"}
          />
        ),
      },
      {
        id: 2,
        menu: "Admin",
        link: "/admin",
        icon: (
          <GrUserAdmin
            customClassName="nav-icon"
            style={{ marginRight: "10px" }}
            color={"#ffffff"}
          />
        ),
      },
      {
        id: 3,
        menu: "Employee",
        link: "/employee",
        icon: (
          <GrUserManager
            customClassName="nav-icon"
            style={{ marginRight: "10px" }}
            color={"#ffffff"}
          />
        ),
      },
      {
        id: 4,
        menu: "Website Service",
        link: "/website_service",
        icon: (
          <GrServices
            customClassName="nav-icon"
            style={{ marginRight: "10px" }}
            color={"#ffffff"}
          />
        ),
      },
      {
        id: 5,
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
    ]);
  };

  useEffect(() => {
    menuUpdate();
  }, []);

  return (
    <div style={{ padding: "0px", margin: "0px" }}>
      <Box md={{ width: "100%" }}>
        <CSidebar
          style={{ width: "100%" }}
          className="adminSidebar"
          colorScheme="dark"
        >
          <CSidebarBrand>Hello, {name}</CSidebarBrand>
          {menu.map((item) => {
            return (
              <CSidebarNav
                key={item.id}
                style={{ display: "flex", overflow: "auto" }}
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
