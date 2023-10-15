import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../Component/Common/Header/Header";
import "./Dashboard.css";
import Sidebar from "../../Component/Common/Sidebar/Sidebar";

export default function Dashboard() {
  return (
    <Container fluid className={"mainContainer"}>
      <Row>
        <Col md={2} style={{ padding: "0px", margin: "0px" }}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Header />
        </Col>
      </Row>
    </Container>
  );
}
