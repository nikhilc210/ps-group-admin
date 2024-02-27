import React, { useState, useEffect, useRef } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Input, Button, Modal, Divider, Form, Spin, Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { LoadingOutlined } from "@ant-design/icons";
import { psApiCalling } from "../../Component/API/Index";

export default function DesignationList() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatedId, setUpdatedId] = useState(null);
  const [currentAdd, setCurrentAdd] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [designtionList, setDesigntionList] = useState([]);
  const [col, setCol] = useState([
    {
      title: "ID",
      key: "id",
      render: (item) => <p>{item.id}</p>,
    },
    {
      title: "Designation",
      key: "designation",
      render: (item) => <p>{item.designation}</p>,
    },

    {
      title: "Parent Designation",
      key: "parent",
      render: (item) => <p>{item.parent}</p>,
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (item, record) => (
    //     <>
    //       <Button
    //         type="primary"
    //         style={{ background: "#feca57" }}
    //         onClick={() => {}}
    //       >
    //         Delete
    //       </Button>
    //     </>
    //   ),
    // },
  ]);

  const getDesignation = () => {
    let params = {
      action: "GET_DESIGNATION_LIST",
    };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        // setData(res);
        setDesigntionList(res);
      }
    });
  };

  const onFinish = (value) => {
    console.log(value);
    let params = {
      action: "CREATE_DESIGNATION",
      designation: value.designation,
      parent: value.parent,
    };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        toast.success(res.message);
        getDesignation();
        getAllDesignation();
        setOpen(false);
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
      } else {
        toast.error(res.message);
      }
    });
  };

  const getAllDesignation = () => {
    let params = { action: "GET_ALL_DESIGNATION_LIST" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setData(res);
      }
    });
  };

  useEffect(() => {
    getDesignation();
  }, []);

  useEffect(() => {
    getAllDesignation();
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
            md={10}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            sx={{ flexDirection: { xs: "column", md: "row" } }}
            style={{ marginTop: "0px" }}
          >
            <Card
              title="Designations"
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
                  Add New Designation
                </Button>
              }
            >
              <Table data={data} col={col} />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Modal
        title="Add New Designation"
        centered
        open={open}
        width={600}
        footer={null}
        onCancel={() => setOpen(false)}
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
              label="Designation Name"
              name="designation"
              rules={[
                {
                  required: true,
                  message: "Designation name is required",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(99.8% - 8px)",
              }}
            >
              <Input placeholder="Designation Name" />
            </Form.Item>
            <Form.Item
              label="Parent Designation"
              name="parent"
              rules={[
                {
                  required: true,
                  message: "Parent Designation is required",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(99.8% - 8px)",
              }}
            >
              <Select
                placeholder={"Select Parent Designation"}
                options={designtionList}
              />
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
                  Create Site
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
