import React, { useState, useEffect, useRef } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Input, Button, Modal, Divider, Form, Spin, Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { LoadingOutlined } from "@ant-design/icons";
import { psApiCalling } from "../../Component/API/Index";

export default function DesignationList() {
  const [updateForm] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatedId, setUpdatedId] = useState(null);
  const [currentAdd, setCurrentAdd] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [designtionList, setDesigntionList] = useState([]);
  const [updatedID, setUpdatedID] = useState(null);
  const [updatedName, setUpdatedName] = useState(null);
  const [updatedParent, setUpdatedParent] = useState(null);
  const [col, setCol] = useState([
    // {
    //   title: "ID",
    //   key: "id",
    //   render: (item) => <p>{item.id}</p>,
    // },
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

    {
      title: "Action",
      key: "action",
      render: (item, record) => (
        <>
          <Button
            type="primary"
            style={{ background: "#fdcb6e" }}
            onClick={() => {
              setUpdate(true);
              setUpdatedID(item.id);
              setUpdatedName(item.designation);
              setUpdatedParent(item.pid);
              updateForm.setFieldsValue({
                designation: item.designation,
                parent: item.pid,
              });
            }}
          >
            Edit
          </Button>{" "}
          <Button
            type="primary"
            style={{ background: "#d63031" }}
            onClick={() => {
              deleteDesignation(item.id);
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ]);

  const deleteDesignation = (id) => {
    let params = { action: "DELETE_DESIGNATION", id: id };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        toast.success(res.message);
        getAllDesignation();
      } else {
        toast.error(res.message);
      }
    });
  };

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
      action: "UPDATE_DESIGNATION",
      id: updatedID,
      name: value.designation,
      parent: value.parent,
    };
    psApiCalling(params).then((res) => {
      setIsLoading(false);
      if (res.status === "success") {
        getAllDesignation();
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
    <>
      <Box style={{ marginTop: "8px" }}>
        <Grid
          md={12}
          style={{
            marginTop: "0px",
            msOverflowStyle: "none",
            scrollbarWidth: "0px",
          }}
        >
          <Card
            title="Designations"
            style={{
              marginTop: "30px",
              msOverflowStyle: "none",
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
      </Box>
      <ToastContainer />
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
                  Create Designation
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Modal
        title="Update Designation"
        centered
        open={update}
        width={600}
        footer={null}
        onCancel={() => setUpdate(false)}
      >
        <Divider />
        <div>
          <Form
            form={updateForm}
            layout="vertical"
            style={{
              marginBottom: 0,
            }}
            onFinish={onFinishUpdate}
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
                  Update Designation
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}
