import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../Component/Common/Sidebar/Sidebar";
import Header from "../../Component/Common/Header/Header";
import { Button, Form, Input, Select, Space, Tooltip, Typography } from "antd";
import { Card, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { Grid, Box } from "@mui/material";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { psApiCalling } from "../../Component/API/Index";
const { Option } = Select;
export default function EditList() {
  const [client_id, setClientId] = useState(
    window.location.pathname.split("/")[2]
  );
  const [id, setId] = useState(window.location.pathname.split("/")[3]);
  const [isLoading, setIsLoading] = useState(false);
  const [industryList, setIndustryList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    setIsLoading(true);
    let params = {
      client_name: values.client_name,
      client_email: values.client_email,
      client_phone: values.client_phone,
      client_gst: values.client_gst,
      industry_type: values.industry_type,
      status: values.status,
      site_name: values.site_name,
      lead_id: id,
      action: "UPDATE_LEAD",
    };
    psApiCalling(params).then((res) => {
      setIsLoading(false);
      if (res.status === "success") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  const getStatusList = () => {
    let params = { action: "GET_LEAD_LIST" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setStatusList(
          res.map((item) => {
            return {
              id: item.id,
              value: item.status,
            };
          })
        );
      }
    });
  };

  const getIndustryList = () => {
    let params = { action: "GET_INDUSTRY_TYPE_LIST" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setIndustryList(
          res.map((item) => {
            return {
              id: item.id,
              value: item.type,
            };
          })
        );
      }
    });
  };

  const getClientDetail = () => {
    let params = { action: "GET_CLIENT_DETAIL", client_id: client_id, id: id };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        form.setFieldsValue({
          client_name: res.client_name,
          client_email: res.client_email,
          client_phone: res.client_phone,
          client_gst: res.client_gst,
          industry_type: res.industry_type,
          status: res.lead_status,
          site_name: res.site_name,
        });
      }
    });
  };

  useEffect(() => {
    getStatusList();
  }, []);

  useEffect(() => {
    getIndustryList();
  }, []);

  useEffect(() => {
    getClientDetail();
  }, [client_id, id]);

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
              <Box>
                <Box md={{ width: "100%" }} style={{ marginTop: "8px" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 1, md: 1 }}
                    sx={{ flexDirection: { xs: "column", md: "row" } }}
                  >
                    <Grid
                      md={10}
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 1, md: 1 }}
                      sx={{ flexDirection: { xs: "column", md: "row" } }}
                      style={{ marginTop: "0px" }}
                    >
                      <Card
                        title="Update Lead / Client / Customer"
                        style={{
                          width: "100%",
                          marginLeft: "1%",
                          marginTop: "30px",
                        }}
                      >
                        <Form
                          form={form}
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
                            style={{
                              marginBottom: 0,
                            }}
                          >
                            <Form.Item
                              label="Client Name"
                              name="client_name"
                              rules={[
                                {
                                  required: true,
                                  message: "Client name is required",
                                },
                              ]}
                              style={{
                                display: "inline-block",
                                width: "calc(50% - 8px)",
                              }}
                            >
                              <Input placeholder="Client Name" />
                            </Form.Item>
                            <Form.Item
                              label="Client Email"
                              name="client_email"
                              rules={[
                                {
                                  required: true,
                                  message: "Client email is required",
                                },
                              ]}
                              style={{
                                display: "inline-block",
                                width: "calc(50% - 8px)",
                                margin: "0 8px",
                              }}
                            >
                              <Input placeholder="Email address" />
                            </Form.Item>
                          </Form.Item>
                          <Form.Item
                            style={{
                              marginBottom: 0,
                            }}
                          >
                            <Form.Item
                              label="Client Phone"
                              name="client_phone"
                              rules={[
                                {
                                  required: true,
                                  message: "Client phone is required",
                                },
                              ]}
                              style={{
                                display: "inline-block",
                                width: "calc(50% - 8px)",
                              }}
                            >
                              <Input placeholder="Client Phone Number" />
                            </Form.Item>
                            <Form.Item
                              label="Client GST"
                              name="client_gst"
                              rules={[]}
                              style={{
                                display: "inline-block",
                                width: "calc(50% - 8px)",
                                margin: "0 8px",
                              }}
                            >
                              <Input placeholder="GST Number" />
                            </Form.Item>
                          </Form.Item>
                          <Form.Item
                            style={{
                              marginBottom: 0,
                            }}
                          >
                            <Form.Item
                              label="Industry Type"
                              name="industry_type"
                              rules={[
                                {
                                  required: true,
                                  message: "Please selct Industry Type",
                                },
                              ]}
                              style={{
                                display: "inline-block",
                                width: "calc(50% - 8px)",
                              }}
                            >
                              <Select
                                defaultValue="Select Industry Type"
                                style={{
                                  width: "100%",
                                }}
                                onChange={() => {}}
                                options={industryList}
                              />
                            </Form.Item>
                            <Form.Item
                              label="Status"
                              name="status"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select current status",
                                },
                              ]}
                              style={{
                                display: "inline-block",
                                width: "calc(50% - 8px)",
                                margin: "0 8px",
                              }}
                            >
                              <Select
                                defaultValue="Select Status"
                                style={{
                                  width: "100%",
                                }}
                                onChange={() => {}}
                                options={statusList}
                              />
                            </Form.Item>
                          </Form.Item>

                          <Form.Item
                            style={{
                              marginBottom: 0,
                            }}
                          >
                            <Form.Item
                              label="Site Name"
                              name="site_name"
                              rules={[
                                {
                                  required: true,
                                  message: "Site name is required",
                                },
                              ]}
                              style={{
                                display: "inline-block",
                                width: "calc(100% - 8px)",
                              }}
                            >
                              <Input placeholder="Site Name" />
                            </Form.Item>
                          </Form.Item>
                          {isLoading ? (
                            <Spin
                              indicator={
                                <LoadingOutlined
                                  style={{
                                    fontSize: 24,
                                  }}
                                  spin
                                />
                              }
                            />
                          ) : (
                            <Form.Item label=" " colon={false}>
                              <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                  width: "100%",
                                  background: "#feca57",
                                }}
                              >
                                Update Client
                              </Button>
                            </Form.Item>
                          )}
                        </Form>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
                <ToastContainer />
              </Box>
            </Container>
          </main>
        </Col>
      </Row>
    </Container>
  );
}
