import React, { useState, useEffect } from "react";
import { psApiCalling } from "../API/Index";
import { Container, Row, Col } from "react-bootstrap";
import "./DashboardCounter.css";

export default function DashboardCounter() {
  const [data, setData] = useState([]);

  const getData = () => {
    let params = { action: "GET_DASHBOARD_COUNTER" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setData(res);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container fluid>
      <Row>
        {data.map((item) => {
          return (
            <Col md={2} key={item.id} style={{ padding: "15px" }}>
              <div
                className={"dashboardCounterBox"}
                style={{ background: item.background }}
              >
                <br></br>
                <br></br>
                <br></br>
                <div className="title-holder text-center">
                  <h3 className="counter-title">{item.title}</h3>
                </div>
                <center>
                  <div className="counter-num-box text-center">
                    <p className="nums">{item.nums}</p>
                  </div>
                </center>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
