import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { psApiCalling } from "../../Component/API/Index";
export default function EmployeeList() {
  const [data, setData] = useState([]);

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
      title: "Email Address",
      key: "emailAddress",
      render: (_, record) => <Tag color={"green"}>{_.data.user_email}</Tag>,
    },
    {
      title: "Employee Type",
      key: "type",
      render: (_, record) => <Tag color={"#b8e994"}>{_.data.user_type}</Tag>,
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

    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <>
          {_.data.status === "1" ? (
            <>
              <Button danger={true}>Make Inactive</Button>
            </>
          ) : (
            <>
              <Button type="primary">Make Active</Button>
            </>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            style={{ background: "#f9ca24" }}
            type="primary"
            href={"/updateEmployee/" + _.data.id}
          >
            Edit
          </Button>
        </>
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
    </Box>
  );
}
