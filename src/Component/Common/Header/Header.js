import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MdOutlineLogout } from "react-icons/md";
import { Button } from "antd";
import "./Header.css";
export default function Header() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
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
  return (
    <Container fluid className={"header-top-bar"}>
      <Row>
        <Col md={3}></Col>
        <Col md={3}></Col>
        <Col md={3}></Col>
        <Col md={3}>
          <Row>
            <Col
              md={8}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <p style={{ marginTop: "15px", fontWeight: "bold" }}>
                Hi, {name}
              </p>
            </Col>
            <Col md={2}>
              <Button
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  background: "transparent",
                  border: "0px",
                }}
                onClick={() => {
                  localStorage.removeItem("psAdminSessionID");
                  localStorage.removeItem("psAdminSessionName");
                  localStorage.removeItem("psAdminSessionType");
                  window.location.href = "/";
                }}
                title={"Logout"}
              >
                <MdOutlineLogout size={30} color={"red"} />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
