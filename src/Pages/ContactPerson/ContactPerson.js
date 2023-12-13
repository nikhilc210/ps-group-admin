import React, { useState, useEffect } from "react";
import { psApiCalling } from "../../Component/API/Index";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../Component/Common/Header/Header";
import Sidebar from "../../Component/Common/Sidebar/Sidebar";
import ContactPersonList from "./ContactPersonList";

export default function ContactPerson() {
  const [client_id, setClientId] = useState(
    window.location.pathname.split("/")[2]
  );
  const [leadId, setLeadId] = useState(window.location.pathname.split("/")[3]);

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
              <ContactPersonList clientId={client_id} leadId={leadId} />
            </Container>
          </main>
        </Col>
      </Row>
    </Container>
  );
}
