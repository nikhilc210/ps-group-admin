import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Space, Tooltip, Typography } from "antd";
import { Card, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { Grid, Box } from "@mui/material";
import { psApiCalling } from "../API/Index";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function CreateLeadForm() {
  const [statusList, setStatusList] = useState([]);
  const [industryList, setIndustryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    let client_id = "PS" + Math.floor(100000 + Math.random() * 900000);
    setIsLoading(true);
    let params = {
      client_name: values.client_name,
      client_email: values.client_email,
      client_phone: values.client_phone,
      client_gst: values.client_gst,
      industry_type: values.industry_type,
      status: values.status,
      site_name: values.site_name,
      client_id: client_id,
      site_type: values.site_type,
      action: "CREATE_LEAD",
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
              value: item.id,
              label: item.status,
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
              value: item.id,
              label: item.type,
            };
          })
        );
      }
    });
  };

  useEffect(() => {
    getStatusList();
  }, []);

  useEffect(() => {
    getIndustryList();
  }, []);

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
                    <Input
                      placeholder="Client Phone Number"
                      maxLength={10}
                      type="number"
                    />
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
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
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
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      style={{
                        width: "100%",
                      }}
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
                      width: "calc(50% - 8px)",
                    }}
                  >
                    <Input placeholder="Site Name" />
                  </Form.Item>
                  <Form.Item
                    label="Site Type"
                    name="site_type"
                    rules={[
                      {
                        required: true,
                        message: "Site type is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                      marginLeft: "10px",
                    }}
                  >
                    <Select
                      defaultValue="Select Type"
                      style={{
                        width: "100%",
                      }}
                      onChange={() => {}}
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      options={[
                        {
                          label: "Commercial",
                          value: "Commercial",
                        },
                        {
                          label: "Residential",
                          value: "Residential",
                        },
                      ]}
                    />
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
                      style={{ width: "100%", background: "#3E4095" }}
                    >
                      Create Client
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
  );
}
