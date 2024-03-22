import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../Component/Common/Header/Header";
import Sidebar from "../../Component/Common/Sidebar/Sidebar";
import UpdateOrder from "../../Component/UpdateOrder/UpdateOrder";

export default function EditOrder() {
  const [oid, setOid] = useState(window.location.pathname.split("/")[2]);
  const [code, setCode] = useState(window.location.pathname.split("/")[3]);
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
              <UpdateOrder oid={oid} code={code} />
            </Container>
          </main>
        </Col>
      </Row>
    </Container>
  );
}
