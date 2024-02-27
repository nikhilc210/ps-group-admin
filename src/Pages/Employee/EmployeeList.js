import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Tag, Modal, Form, Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { psApiCalling } from "../../Component/API/Index";
export default function EmployeeList() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedPassword, setSelectedPassword] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinishPassword = (values) => {
    let params = {
      action: "UPDATE_EMPLOYEE_PASSWORD",
      uid: selectedId,
      password: values.employee_password,
    };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        toast.success(res.message);
        getEmployeList();
      } else {
        toast.error(res.message);
      }
    });
  };
  const [col, setCol] = useState([
    {
      title: "ID",

      key: "id",
      render: (_, record) => <>{_.data.id}</>,
    },
    {
      title: "Employee Code",
      key: "code",
      render: (_, record) => <Tag color={"purple"}>{_.data.user_code}</Tag>,
    },
    {
      title: "Fullname",
      key: "fullname",
      render: (_, record) => <>{_.data.full_name}</>,
    },
    {
      title: "Employee Designation",
      key: "type",
      render: (_, record) => <Tag color={"#b8e994"}>{_.designation}</Tag>,
    },
    {
      title: "Email Address",
      key: "emailAddress",
      render: (_, record) => <Tag color={"green"}>{_.data.user_email}</Tag>,
    },

    {
      title: "Phone Number",
      key: "phone",
      render: (_, record) => <Tag color={"#30336b"}>{_.data.phone_number}</Tag>,
    },
    {
      title: "Employee DOB",
      key: "dob",
      render: (_, record) => <Tag color={"#16a085"}>{_.data.user_dob}</Tag>,
    },
    {
      title: "Employee Gender",
      key: "gender",
      render: (_, record) => <Tag color={"#d35400"}>{_.data.user_gender}</Tag>,
    },
    {
      title: "Employee Role",
      key: "type",
      render: (_, record) => <Tag color={"#b8e994"}>{_.data.employe_role}</Tag>,
    },
    {
      title: "Created Time",
      key: "created_time",
      render: (_, record) => <Tag color={"#1e3799"}>{_.data.created_time}</Tag>,
    },

    // {
    //   title: "Status",
    //   key: "status",
    //   render: (_, record) => (
    //     <>
    //       {_.data.status === "1" ? (
    //         <>
    //           <Button danger={true}>Make Inactive</Button>
    //         </>
    //       ) : (
    //         <>
    //           <Button type="primary">Make Active</Button>
    //         </>
    //       )}
    //     </>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <div style={{ display: "inline-block" }}>
          <Button
            style={{ background: "#f9ca24" }}
            type="primary"
            href={"/updateEmployee/" + _.data.id}
          >
            Edit
          </Button>
          {localStorage.getItem("psAdminSessionType") === "Super Admin" ? (
            <Button
              style={{ background: "#16a085" }}
              type="primary"
              onClick={() => {
                setIsModalOpen(true);
                setSelectedId(_.data.id);
                setSelectedPassword(_.data.password);

                form.setFieldsValue({
                  employee_password: _.data.password,
                });
              }}
            >
              Change Password
            </Button>
          ) : null}
        </div>
      ),
    },
  ]);

  const getEmployeList = () => {
    let params = { action: "GET_EMPLOYEE_LIST" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setData(res);
      }
    });
  };

  useEffect(() => {
    getEmployeList();
  }, []);

  return (
    <Box style={{ width: "100%" }}>
      <Box style={{ marginTop: "8px" }}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 1, md: 1 }}
          md={{ flexDirection: { xs: "column", md: "row" } }}
        >
          <Grid
            md={12}
            style={{ width: "100%", marginTop: "0px" }}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            sx={{ flexDirection: { xs: "column", md: "row" } }}
          >
            <Card
              title="Employee List"
              extra={
                <Button
                  href="/createEmployee"
                  style={{ background: "#5f27cd", color: "#FFFFFF" }}
                >
                  Create New Employee
                </Button>
              }
              style={{
                width: "100%",
                marginLeft: "1%",
                marginTop: "30px",
                overflow: "scroll",
              }}
            >
              <Table data={data} col={col} />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
      <Modal
        title="Password"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="complex-form"
          layout="vertical"
          onFinish={onFinishPassword}
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
              label="Employee Password"
              name="employee_password"
              rules={[
                {
                  required: true,
                  message: "Employee password is required",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(100% - 0px)",
              }}
            >
              <Input.Password
                placeholder="Employee Password"
                value={selectedPassword}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", background: "#f1c40f" }}
            >
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Box>
  );
}
