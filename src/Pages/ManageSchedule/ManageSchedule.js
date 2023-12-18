import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Header from "../../Component/Common/Header/Header";
import Sidebar from "../../Component/Common/Sidebar/Sidebar";
import Zoom from "react-medium-image-zoom";
import { Descriptions, Card, Button, Divider, Form, Select } from "antd";
import "./ManageSchedule.css";
import { ToastContainer, toast } from "react-toastify";
import { psApiCalling } from "../../Component/API/Index";

export default function ManageSchedule() {
  const [id, setId] = useState(window.location.pathname.split("/")[2]);
  const [oid, setOId] = useState(window.location.pathname.split("/")[3]);
  const [serviceManList, setServiceManList] = useState([]);
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

  const getAllServiceMan = () => {
    let params = { action: "GET_ALL_SERVICE_MAN" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setServiceManList(res);
      }
    });
  };

  const onFinish = (values) => {
    console.log(values);
    let params = {
      action: "UPDATE_SERVICE_MAN",
      service_man: values.service_man,
      id: id,
      oid: oid,
    };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
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
    getAllServiceMan();
  }, []);

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
                  <Divider orientation="left">
                    Assign this task to someone else
                  </Divider>
                  <div>
                    <Form
                      name="complex-form"
                      layout="vertical"
                      onFinish={onFinish}
                      labelCol={{
                        span: 8,
                      }}
                      wrapperCol={{
                        span: 16,
                      }}
                    >
                      <Form.Item
                        label="Service Man"
                        name="service_man"
                        rules={[
                          {
                            required: true,
                            message: "Service man is required",
                          },
                        ]}
                        style={{
                          display: "inline-block",
                          width: "calc(100%)",
                          color: "white",
                        }}
                        labelCol={"#ffffff"}
                      >
                        <Select
                          className="login-input"
                          defaultValue="Select Service Man"
                          style={{
                            width: "50%",
                          }}
                          onChange={() => {}}
                          options={serviceManList}
                        />
                      </Form.Item>
                      <Form.Item label=" " colon={false}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{
                            width: "50%",

                            background: "#3e4095",
                            height: "50px",
                            borderRadius: "0px",
                          }}
                        >
                          Assign
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </Card>
            </Container>
          </main>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}
