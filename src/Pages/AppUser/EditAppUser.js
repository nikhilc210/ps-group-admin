import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../Component/Common/Sidebar/Sidebar";
import Header from "../../Component/Common/Header/Header";
import { Button, Form, Input, Select, DatePicker } from "antd";
import { Card, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { Grid, Box } from "@mui/material";
import { Spin } from "antd";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
import { psApiCalling } from "../../Component/API/Index";
const { Option } = Select;
export default function EditAppUser() {
  const [uid, setUid] = useState(window.location.pathname.split("/")[2]);
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    setIsLoading(true);
    let params = {
      full_name: values.full_name,
      user_dob: values.user_dob,
      user_gender: values.user_gender,
      user_email: values.user_email,
      phone_number: values.phone_number,
      user_type: values.user_type,
      aadhar: values.aadhar,
      pan_card: values.pan_card,
      bank_name: values.bank_name,
      ifsc: values.ifsc,
      account_number: values.account_number,
      user_address: values.user_address,
      uid: uid,
      action: "UPDATE_APP_USER",
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

  const onChangeDate = (values) => {
    let dob = moment(values.employee_dob).format("DD-MM-YYYY");
  };

  const getEmployeeDetails = () => {
    let params = { action: "GET_APP_USER_DETAILS", uid: uid };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        form.setFieldsValue({
          full_name: res.data.full_name,
          user_dob: moment(res.data.user_dob, "YYYY-MM-DD"),
          user_gender: res.data.user_gender,
          user_email: res.data.user_email,
          phone_number: res.data.phone_number,
          user_type: res.data.user_type,
          aadhar: res.data.aadhar,
          pan_card: res.data.pan_card,
          bank_name: res.data.bank_name,
          ifsc: res.data.ifsc,
          account_number: res.data.account_number,
          user_address: res.data.user_address,
        });
      }
    });
  };

  useEffect(() => {
    getEmployeeDetails();
  }, [uid]);

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
                      md={12}
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 1, md: 1 }}
                      sx={{ flexDirection: { xs: "column", md: "row" } }}
                      style={{ marginTop: "0px" }}
                    >
                      <Card
                        title="Update App Users"
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
                              label="Full Name"
                              name="full_name"
                              rules={[
                                {
                                  required: true,
                                  message: "Full name is required",
                                },
                              ]}
                              style={{
                                display: "inline-block",
                                width: "calc(50% - 8px)",
                              }}
                            >
                              <Input placeholder="Employee Name" />
                            </Form.Item>
                            <Form.Item
                              label="User Dob"
                              name="user_dob"
                              rules={[
                                {
                                  required: true,
                                  message: "User dob is required",
                                },
                              ]}
                              style={{
                                display: "inline-block",
                                width: "calc(50% - 8px)",
                                margin: "0 8px",
                              }}
                            >
                              <DatePicker
                                onChange={onChangeDate}
                                style={{ width: "100%" }}
                              />
                            </Form.Item>
                          </Form.Item>
                          <Form.Item
                            style={{
                              marginBottom: 0,
                            }}
                          >
                            <Form.Item
                              label="User Gender"
                              name="user_gender"
                              rules={[
                                {
                                  required: true,
                                  message: "User gender is required",
                                },
                              ]}
                              style={{
                                display: "inline-block",
                                width: "calc(50% - 8px)",
                              }}
                            >
                              <Select
                                defaultValue="Select Gender"
                                style={{
                                  width: "100%",
                                }}
                                onChange={() => {}}
                                options={[
                                  {
                                    label: "Male",
                                    value: "Male",
                                  },
                                  {
                                    label: "Female",
                                    value: "Female",
                                  },
                                  {
                                    label: "Other",
                                    value: "Other",
                                  },
                                ]}
                              />
                            </Form.Item>
                            <Form.Item
                              label="User Email"
                              name="user_email"
                              rules={[
                                {
                                  required: true,
                                  message: "Email address is required",
                                },
                              ]}
                              style={{
                                display: "inline-block",
                                width: "calc(50% - 8px)",
                                margin: "0 8px",
                              }}
                            >
                              <Input placeholder="Email Address" readOnly />
                            </Form.Item>
                          </Form.Item>

                          <Form.Item
                            style={{
                              marginBottom: 0,
                            }}
                          >
                            <Form.Item
                              label="Employee Phone Number"
                              name="phone_number"
                              rules={[
                                {
                                  required: true,
                                  message: "Employee Phone is required",
                                },
                              ]}
                              style={{
                                display: "inline-block",
                                width: "calc(100% - 8px)",
                              }}
                            >
                              <Input placeholder="Phone Number" />
                            </Form.Item>
                          </Form.Item>

                          <Form.Item
                            style={{
                              marginBottom: 0,
                            }}
                          >
                            <Form.Item
                              label="User Type"
                              name="user_type"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select employee type",
                                },
                              ]}
                              style={{
                                display: "inline-block",
                                width: "calc(50% - 8px)",
                              }}
                            >
                              <Select
                                defaultValue="Select User Type"
                                style={{
                                  width: "100%",
                                }}
                                onChange={() => {}}
                                options={[
                                  {
                                    label: "Fulltime",
                                    value: "Fulltime",
                                  },
                                  {
                                    label: "Intern",
                                    value: "Intern",
                                  },
                                ]}
                              />
                            </Form.Item>
                            <Form.Item
                              label="User AADHAR"
                              name="aadhar"
                              rules={[
                                {
                                  required: true,
                                  message: "User aadhar is required",
                                },
                              ]}
                              style={{
                                display: "inline-block",
                                width: "calc(50% - 8px)",
                                margin: "0 8px",
                              }}
                            >
                              <Input placeholder="AADHAR Number" />
                            </Form.Item>
                          </Form.Item>

                          <Form.Item
                            style={{
                              marginBottom: 0,
                            }}
                          >
                            <Form.Item
                              label="User PAN"
                              name="pan_card"
                              rules={[
                                {
                                  required: true,
                                  message: "User pan is required",
                                },
                              ]}
                              style={{
                                display: "inline-block",
                                width: "calc(50% - 8px)",
                              }}
                            >
                              <Input placeholder="PAN Number" />
                            </Form.Item>
                            <Form.Item
                              label="Bank Name"
                              name="bank_name"
                              rules={[]}
                              style={{
                                display: "inline-block",
                                width: "calc(50% - 8px)",
                                marginLeft: "10px",
                              }}
                            >
                              <Input placeholder="Bank Name" />
                            </Form.Item>
                          </Form.Item>

                          <Form.Item
                            style={{
                              marginBottom: 0,
                            }}
                          >
                            <Form.Item
                              label="Bank IFSC"
                              name="ifsc"
                              rules={[]}
                              style={{
                                display: "inline-block",
                                width: "calc(50% - 8px)",
                              }}
                            >
                              <Input placeholder="Bank IFSC Code" />
                            </Form.Item>
                            <Form.Item
                              label="User Bank Account Number"
                              name="account_number"
                              rules={[]}
                              style={{
                                display: "inline-block",
                                width: "calc(50% - 8px)",
                                margin: "0 8px",
                              }}
                            >
                              <Input placeholder="Bank Account Number" />
                            </Form.Item>
                          </Form.Item>

                          <Form.Item
                            style={{
                              marginBottom: 0,
                            }}
                          >
                            <Form.Item
                              label="User Address"
                              name="user_address"
                              rules={[
                                {
                                  required: true,
                                  message: "User Address is required",
                                },
                              ]}
                              style={{
                                display: "inline-block",
                                width: "calc(100% - 8px)",
                              }}
                            >
                              <Input placeholder="Employee Address" />
                            </Form.Item>
                          </Form.Item>

                          <Form.Item label=" " colon={false}>
                            <Button
                              type="primary"
                              htmlType="submit"
                              style={{ width: "100%", background: "#f1c40f" }}
                            >
                              Update App User
                            </Button>
                          </Form.Item>
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
