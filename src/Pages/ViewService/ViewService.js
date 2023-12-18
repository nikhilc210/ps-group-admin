import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Header from "../../Component/Common/Header/Header";
import Sidebar from "../../Component/Common/Sidebar/Sidebar";
import Zoom from "react-medium-image-zoom";
import { Descriptions, Card, Button } from "antd";
import "./ViewService.css";
import { psApiCalling } from "../../Component/API/Index";

export default function ViewService() {
  const [id, setId] = useState(window.location.pathname.split("/")[2]);
  const [oid, setOId] = useState(window.location.pathname.split("/")[3]);
  const [clientDetails, setClientDetails] = useState({
    clientName: "",
    serviceName: "",
    repetation: "",
    siteName: "",
  });
  const [serviceDetails, setServiceDetails] = useState({
    started_time: "",
    starting_lat: "",
    starting_long: "",
    completed_time: "",
    service_man_review: "",
    verified_by: "",
    service_man: "",
  });
  const [completedDetail, setCompletedDetail] = useState({});
  const [images, setImages] = useState([]);

  const getServiceImages = () => {
    let params = { action: "GET_ALL_SCHEDULE_SERVICE_IMAGE", sid: id };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setImages(res);
      }
    });
  };

  const getClientDetail = () => {
    let params = { action: "ADMIN_CLIENT_DETAILS", sid: id, oid: oid };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        setClientDetails(res);
      }
    });
  };

  const getCompletedServiceDetail = () => {
    let params = {
      action: "ADMIN_COMPLETED_SERVICE_DETAILS",
      sid: id,
      oid: oid,
    };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        setServiceDetails(res);
      }
    });
  };

  useEffect(() => {
    getCompletedServiceDetail();
  }, [id]);

  useEffect(() => {
    getClientDetail();
  }, [id]);

  useEffect(() => {
    getServiceImages();
  }, [id]);

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
              <Card
                hoverable
                title="Service Details"
                bordered={true}
                style={{
                  width: "100%",
                  marginTop: "50px",
                  marginRight: "15px",
                  marginLeft: "15px",
                }}
              >
                <div className={"client-details"}>
                  <Descriptions title="Client Details">
                    <Descriptions.Item label="Client Name">
                      {clientDetails.clientName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Service Code">
                      {oid}
                    </Descriptions.Item>
                    <Descriptions.Item label="Service Type">
                      {clientDetails.serviceName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Repetation">
                      {clientDetails.repetation}
                    </Descriptions.Item>
                    <Descriptions.Item label="Site Address">
                      {clientDetails.siteName}
                    </Descriptions.Item>
                  </Descriptions>
                </div>

                <div className={"client-details"}>
                  <Descriptions title="Service Details">
                    <Descriptions.Item label="Starting Time">
                      {serviceDetails.started_time}
                    </Descriptions.Item>
                    <Descriptions.Item label="Starting Location">
                      <Button
                        type="primary"
                        href={
                          "https://maps.google.com?q=" +
                          serviceDetails.starting_lat +
                          "," +
                          serviceDetails.starting_long
                        }
                        style={{ background: "#0be881" }}
                        target={"_blank"}
                      >
                        View Location
                      </Button>
                    </Descriptions.Item>
                    <Descriptions.Item label="Completion Time">
                      {serviceDetails.completed_time}
                    </Descriptions.Item>
                    <Descriptions.Item label="Service Man">
                      {serviceDetails.service_man}
                    </Descriptions.Item>
                    <Descriptions.Item label="Service Man Review">
                      {serviceDetails.service_man_review}
                    </Descriptions.Item>
                    <Descriptions.Item label="Service Verified By">
                      {serviceDetails.verified_by}
                    </Descriptions.Item>
                  </Descriptions>
                </div>
                <div className={"client-details"}>
                  <Descriptions title="Service Images">
                    <Container fluid>
                      <Row>
                        {images.map((item) => {
                          return (
                            <Col
                              md={2}
                              key={item.id}
                              style={{ marginTop: "10px", padding: "10px" }}
                            >
                              <Zoom>
                                <Image
                                  src={item.image}
                                  alt={"Service Image"}
                                  fluid
                                />
                              </Zoom>
                            </Col>
                          );
                        })}
                      </Row>
                    </Container>
                  </Descriptions>
                </div>
              </Card>
            </Container>
          </main>
        </Col>
      </Row>
    </Container>
  );
}
