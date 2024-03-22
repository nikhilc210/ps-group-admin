import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../Component/Common/Header/Header";
import Sidebar from "../../Component/Common/Sidebar/Sidebar";
import IndustryTypeList from "./IndustryTypeList";

export default function IndustryType() {
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
              <IndustryTypeList />
            </Container>
          </main>
        </Col>
      </Row>
    </Container>
  );
}
