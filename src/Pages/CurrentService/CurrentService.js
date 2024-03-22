import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../Component/Common/Header/Header";
import Sidebar from "../../Component/Common/Sidebar/Sidebar";
import ScheduleList from "../Schedule/ScheduleList";
import CurrentServiceList from "./CurrentServiceList";

export default function CurrentService() {
  const [oid, setOid] = useState(window.location.pathname.split("/")[2]);
  const [clientName, setClientName] = useState(
    window.location.pathname.split("/")[3]
  );
  return (
    <Container fluid className={"mainContainer"}>
      <Row>
        <Col md={2} style={{ padding: "0px", margin: "0px" }}>
          <Sidebar to={window.location.pathname} />
        </Col>
        <Col md={10}>
          <Header />
          <main>
            <Container fluid>
              <CurrentServiceList />
            </Container>
          </main>
        </Col>
      </Row>
    </Container>
  );
}
