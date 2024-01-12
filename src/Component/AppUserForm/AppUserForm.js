import React from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Tooltip,
  Typography,
  DatePicker,
} from "antd";
import { Card, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { Grid, Box } from "@mui/material";
import moment from "moment";
import { psApiCalling } from "../API/Index";
const { Option } = Select;
const onFinish = (values) => {
  console.log(values);
  if (values.password === values.cnf_password) {
    let params = {
      action: "CREATE_APP_USER",
      full_name: values.full_name,
      user_dob: moment(values.user_dob).format("DD-MM-YYYY"),
      user_gender: values.user_gender,
      user_email: values.user_email,
      password: values.password,
      user_type: values.user_type,
      aadhar: values.aadhar,
      pan_card: values.pan_card,
      bank_name: values.bank_name,
      ifsc: values.ifsc,
      account_number: values.account_number,
      user_address: values.user_address,
      phone_number: values.phone_number,
    };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  } else {
    toast.error("Both password should be same");
  }
};
export default function AppUserForm() {
  const onChangeDate = (values) => {
    let dob = moment(values.employee_dob).format("DD-MM-YYYY");
  };

  return (
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
              title="Create App User"
              style={{
                width: "100%",
                marginLeft: "1%",
                marginTop: "30px",
              }}
            >
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
                    <Input placeholder="Email Address" />
                  </Form.Item>
                </Form.Item>

                <Form.Item
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Form.Item
                    label="User Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "User password is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                    }}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                  <Form.Item
                    label="Confirm Password"
                    name="cnf_password"
                    rules={[
                      {
                        required: true,
                        message: "Confirm Password address is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <Input.Password placeholder="COnfirm Password" />
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
                    label="User Phone Number"
                    name="user_number"
                    rules={[
                      {
                        required: true,
                        message: "User Phone is required",
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
                    style={{ width: "100%", background: "#3E4095" }}
                  >
                    Create App User
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </Box>
  );
}
