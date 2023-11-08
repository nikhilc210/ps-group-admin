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

  let params = {
    action: "CREATE_EMPLOYEE",
    employee_name: values.employee_name,
    employee_dob: moment(values.employee_dob).format("DD-MM-YYYY"),
    employee_gender: values.employee_gender,
    employee_email: values.employee_email,
    employee_type: values.employee_type,
    aadhar: values.aadhar,
    pan_card: values.pan_card,
    bank_name: values.bank_name,
    ifsc: values.ifsc,
    account_number: values.account_number,
    employee_address: values.employee_address,
    phone_number: values.phone_number,
  };
  psApiCalling(params).then((res) => {
    if (res.status === "success") {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  });
};
export default function CreateLeadForm() {
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
            md={10}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            sx={{ flexDirection: { xs: "column", md: "row" } }}
            style={{ marginTop: "0px" }}
          >
            <Card
              title="Create Employee"
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
                    label="Employee Name"
                    name="employee_name"
                    rules={[
                      {
                        required: true,
                        message: "Employee name is required",
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
                    label="Employee Dob"
                    name="employee_dob"
                    rules={[
                      {
                        required: true,
                        message: "Employee dob is required",
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
                    label="Employee Gender"
                    name="employee_gender"
                    rules={[
                      {
                        required: true,
                        message: "Employee gender is required",
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
                    label="Employee Email"
                    name="employee_email"
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
                    label="Employee Type"
                    name="employee_type"
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
                      defaultValue="Select Employee Type"
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
                    label="Employee AADHAR"
                    name="aadhar"
                    rules={[
                      {
                        required: true,
                        message: "Employee aadhar is required",
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
                    label="Employee PAN"
                    name="pan_card"
                    rules={[
                      {
                        required: true,
                        message: "Employee pan is required",
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
                    label="Employee Bank Account Number"
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
                    label="Employee Address"
                    name="employee_address"
                    rules={[
                      {
                        required: true,
                        message: "Employee Address is required",
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
                    Create Employee
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
