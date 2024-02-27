import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../Component/Common/Header/Header";
import Sidebar from "../../Component/Common/Sidebar/Sidebar";
import TaskList from "./TaskList";
import EmployeeTaskList from "./EmployeeTaskList";

export default function ViewTask() {
  const [code, setCode] = useState(window.location.pathname.split("/")[2]);
  const [name, setName] = useState(window.location.pathname.split("/")[3]);
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
              <EmployeeTaskList code={code} name={name} />
            </Container>
          </main>
        </Col>
      </Row>
    </Container>
  );
}
