import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../Component/Common/Header/Header";
import Sidebar from "../../Component/Common/Sidebar/Sidebar";
import EditWebsiteServiceForm from "../../Component/WebsiteService/EditWebsiteServiceForm";

export default function EditWebsiteService() {
  const [id, setId] = useState(window.location.pathname.split("/")[2]);
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
              <EditWebsiteServiceForm id={id} />
            </Container>
          </main>
        </Col>
      </Row>
    </Container>
  );
}
