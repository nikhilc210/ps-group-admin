import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../Component/Common/Header/Header";
import Sidebar from "../../Component/Common/Sidebar/Sidebar";
import TaskList from "./TaskList";
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";
import EditTaskForm from "../../Component/EditTaskForm/EditTaskForm";

export default function EditTask() {
  const [code, setCode] = useState(window.location.pathname.split("/")[2]);
  const [id, setId] = useState(window.location.pathname.split("/")[3]);
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
              <EditTaskForm code={code} id={id} />
            </Container>
          </main>
        </Col>
      </Row>
    </Container>
  );
}
