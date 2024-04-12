import React from "react";
import { Button, Form, Input, Select, Space, Tooltip, Typography } from "antd";
import { Card, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { Grid, Box } from "@mui/material";
import { psApiCalling } from "../API/Index";
const { Option } = Select;

const onFinish = (values) => {
  let params = {
    action: "CREATE_ADMIN",
    admin_name: values.admin_name,
    admin_email: values.admin_email,
    admin_phone: values.admin_phone,
    admin_password: values.admin_password,
    admin_type: values.admin_type,
  };
  psApiCalling(params).then((res) => {
    if (res.status === "success") {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  });
};
export default function CreateAdminForm() {
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
              title="Create Admin"
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
                    label="Admin Name"
                    name="admin_name"
                    rules={[
                      {
                        required: true,
                        message: "Admin name is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                    }}
                  >
                    <Input placeholder="Admin Name" />
                  </Form.Item>
                  <Form.Item
                    label="Admin Email"
                    name="admin_email"
                    rules={[
                      {
                        required: true,
                        message: "Admin email is required",
                      },
                      {
                        type: "email",
                        message: "Email address is not valid",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <Input
                      placeholder="Email address"
                      inputMode={"email"}
                      onInput={(e) =>
                        (e.target.value = e.target.value.toLowerCase())
                      }
                    />
                  </Form.Item>
                </Form.Item>
                <Form.Item
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Form.Item
                    label="Admin Phone"
                    name="admin_phone"
                    rules={[
                      {
                        required: true,
                        message: "Admin phone is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                    }}
                  >
                    <Input
                      placeholder="Admin Phone Number"
                      maxLength={10}
                      type="number"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="admin_password"
                    rules={[
                      {
                        required: true,
                        message: "Password is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                </Form.Item>
                <Form.Item
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Form.Item
                    label="Admin Type"
                    name="admin_type"
                    rules={[
                      {
                        required: true,
                        message: "Please select admin type",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(100% - 8px)",
                    }}
                  >
                    <Select
                      defaultValue="Select Admin Type"
                      style={{
                        width: "100%",
                      }}
                      onChange={() => {}}
                      options={[
                        {
                          label: "Super Admin",
                          value: "Super Admin",
                        },
                        {
                          label: "Admin",
                          value: "Admin",
                        },
                      ]}
                    />
                  </Form.Item>
                </Form.Item>

                <Form.Item label=" " colon={false}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%", background: "#3E4095" }}
                  >
                    Create Admin
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
