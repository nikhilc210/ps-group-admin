import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../Component/Common/Header/Header";
import Sidebar from "../../Component/Common/Sidebar/Sidebar";

import CreateIndustrtTypeForm from "../../Component/IndustryType/CreateIndustrtTypeForm";

export default function CreateIndustryType() {
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
              <CreateIndustrtTypeForm />
            </Container>
          </main>
        </Col>
      </Row>
    </Container>
  );
}
