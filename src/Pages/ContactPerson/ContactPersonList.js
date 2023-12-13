import React, { useState, useEffect, useRef } from "react";
import { Grid, Box } from "@mui/material";
import {
  Card,
  Input,
  Button,
  Modal,
  Divider,
  Form,
  Spin,
  Select,
  Tag,
} from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { LoadingOutlined } from "@ant-design/icons";
import { psApiCalling } from "../../Component/API/Index";

export default function ContactPersonList(props) {
  const [open, setOpen] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [updatedId, setUpdatedId] = useState(null);
  const [currentAdd, setCurrentAdd] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [col, setCol] = useState([
    {
      title: "ID",
      key: "id",
      render: (item) => <p>{item.id}</p>,
    },
    {
      title: "Site Address",
      key: "site_address",
      render: (item) => <p>{item.address}</p>,
    },

    {
      title: "Contact Person Name",
      key: "name",
      render: (item) => <p>{item.name}</p>,
    },
    {
      title: "Contact Person Email",
      key: "email",
      render: (item) => <Tag color={"#00d2d3"}>{item.email}</Tag>,
    },
    {
      title: "Contact Person Phone",
      key: "email",
      render: (item) => <Tag color={"#5f27cd"}>{item.phone}</Tag>,
    },

    {
      /* {
      title: "Action",
      key: "action",
      render: (item, record) => (
        <>
          <Button
            type="primary"
            style={{ background: "#feca57" }}
            onClick={() => {
              setUpdate(true);
              setCurrentAdd(item.data.address);
              setUpdatedId(item.data.id);

              form.setFieldsValue({ site_address: item.data.address });
            }}
          >
            Edit
          </Button>
        </>
      ),
    }, */
    },
  ]);

  const getClientSites = () => {
    let params = {
      action: "GET_CONTACT_PERSON_LIST",
      client_id: props.clientId,
      lead_id: props.leadId,
    };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setData(res);
      }
    });
  };

  const onFinish = (value) => {
    console.log(value);
    setIsLoading(true);
    let params = {
      action: "ADD_NEW_CONTACT_PERSON",
      site_address: value.site_address,
      name: value.name,
      email: value.email,
      phone: value.phone,
      leadId: props.leadId,
      client_id: props.clientId,
    };
    psApiCalling(params).then((res) => {
      setIsLoading(false);
      if (res.status === "success") {
        toast.success(res.message);
        setOpen(false);
        getClientSites();
      } else {
        toast.error(res.message);
      }
    });
  };
  const onFinishUpdate = (value) => {
    setIsLoading(true);
    let params = {
      action: "UPDATE_SITE_ADDRESS",
      aid: updatedId,

      address: value.site_address,
    };
    psApiCalling(params).then((res) => {
      setIsLoading(false);
      if (res.status === "success") {
        toast.success(res.message);
        setUpdate(false);
        getClientSites();
      } else {
        toast.error(res.message);
      }
    });
  };
  const getSiteList = () => {
    let params = {
      action: "GET_SITE_ADDRESS",
      client_id: props.clientId,
      lead_id: props.leadId,
    };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setAddressList(
          res.map((item) => {
            return {
              value: item.data.id,
              label: item.data.address,
            };
          })
        );
      }
    });
  };
  useEffect(() => {
    getClientSites();
  }, []);
  useEffect(() => {
    getSiteList();
  }, [props.clientId, props.leadId]);

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
              title="Contact Person"
              style={{
                width: "98%",
                marginLeft: "1%",
                marginTop: "30px",
                overflow: "scroll",
              }}
              extra={
                <Button
                  style={{ background: "#5f27cd", color: "#FFFFFF" }}
                  onClick={() => setOpen(true)}
                >
                  Add New Contact Person
                </Button>
              }
            >
              <Table data={data} col={col} />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Modal
        title="Add New Contact Person"
        centered
        open={open}
        width={600}
        footer={null}
      >
        <Divider />
        <div>
          <Form
            layout="vertical"
            style={{
              marginBottom: 0,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Select Site Address"
              name="site_address"
              rules={[
                {
                  required: true,
                  message: "Site address is required",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(99.8% - 8px)",
              }}
            >
              <Select
                style={{
                  width: "100%",
                }}
                options={addressList}
              />
            </Form.Item>
            <Form.Item
              label="Contact Person Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Name is required",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(99.8% - 8px)",
              }}
            >
              <Input placeholder="Contact Person" />
            </Form.Item>

            <Form.Item
              style={{
                marginBottom: 0,
              }}
            >
              <Form.Item
                label="Contact Person Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Contact person email is required",
                  },
                ]}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                }}
              >
                <Input placeholder="Email Address" />
              </Form.Item>
              <Form.Item
                label="Contact Person Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Phone number is required",
                  },
                ]}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                  margin: "0 8px",
                }}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
            </Form.Item>
            <Form.Item label=" " colon={false}>
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
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%", background: "#3E4095" }}
                >
                  Create Contact Person
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Modal
        title="Add New Site"
        centered
        open={update}
        width={600}
        footer={null}
        onCancel={() => setUpdate(false)}
      >
        <Divider />
        <div>
          <Form
            form={form}
            layout="vertical"
            style={{
              marginBottom: 0,
            }}
            onFinish={onFinishUpdate}
          >
            <Form.Item
              label="Site Address"
              name="site_address"
              value={currentAdd}
              rules={[
                {
                  required: true,
                  message: "Site Address is required",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(99.8% - 8px)",
              }}
            >
              <Input placeholder="Site Address" value={currentAdd} />
            </Form.Item>
            <Form.Item label=" " colon={false}>
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
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%", background: "#feca57" }}
                >
                  Update Site
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <ToastContainer />
    </Box>
  );
}
