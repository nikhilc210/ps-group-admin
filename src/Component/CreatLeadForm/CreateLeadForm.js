import React from "react";
import { Button, Form, Input, Select, Space, Tooltip, Typography } from "antd";
import { Card, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { Grid, Box } from "@mui/material";
const { Option } = Select;
const onFinish = (values) => {
  console.log("Received values of form: ", values);
};
export default function CreateLeadForm() {
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
              title="Create Lead / Client / Customer"
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
                      options={[]}
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
                      options={[]}
                    />
                  </Form.Item>
                </Form.Item>

                <Form.Item
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Form.Item
                    label="Contact Person Name"
                    name="contact_person_name"
                    rules={[
                      {
                        required: true,
                        message: "Contact Person Name is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(32.8% - 8px)",
                    }}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    label="Contact Person Number"
                    name="contact_person_phone"
                    rules={[
                      {
                        required: true,
                        message: "Contact Person Number is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(32.8% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <Input placeholder="Contact Person Phone" />
                  </Form.Item>
                  <Form.Item
                    label="Contact Person Email"
                    name="contact_person_email"
                    rules={[]}
                    style={{
                      display: "inline-block",
                      width: "calc(32.8% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                </Form.Item>

                <Form.Item
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Form.Item
                    label="Site Address"
                    name="site_address"
                    rules={[
                      {
                        required: true,
                        message: "Site Address is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(100% - 8px)",
                    }}
                  >
                    <Input placeholder="Site Address" />
                  </Form.Item>
                </Form.Item>

                <Form.Item label=" " colon={false}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%", background: "#3E4095" }}
                  >
                    Create Client
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
