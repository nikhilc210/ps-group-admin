import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../Component/Common/Header/Header";
import Sidebar from "../../Component/Common/Sidebar/Sidebar";
import AttendanceList from "./AttendanceList";

export default function ViewAttendance() {
  const [uid, setUid] = useState(window.location.pathname.split("/")[2]);
  return (
    <Container fluid className={"mainContainer"}>
      <Row>
        <Col md={2} style={{ padding: "0px", margin: "0px" }}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Header />
          <main>
            <Container fluid>
              <AttendanceList uid={uid} />
            </Container>
          </main>
        </Col>
      </Row>
    </Container>
  );
}
