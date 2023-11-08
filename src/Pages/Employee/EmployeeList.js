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
      render: (_, record) => <Tag color={"purple"}>{_.data.employee_code}</Tag>,
    },
    {
      title: "Fullname",
      key: "fullname",
      render: (_, record) => <>{_.data.employee_name}</>,
    },
    {
      title: "Email Address",
      key: "emailAddress",
      render: (_, record) => <Tag color={"green"}>{_.data.employee_email}</Tag>,
    },
    {
      title: "Phone Number",
      key: "phone",
      render: (_, record) => <Tag color={"green"}>{_.data.phone_number}</Tag>,
    },
    {
      title: "Employee DOB",
      key: "dob",
      render: (_, record) => <Tag color={"green"}>{_.data.employee_dob}</Tag>,
    },
    {
      title: "Employee Gender",
      key: "gender",
      render: (_, record) => (
        <Tag color={"green"}>{_.data.employee_gender}</Tag>
      ),
    },
    {
      title: "Employee Type",
      key: "type",
      render: (_, record) => <Tag color={"green"}>{_.data.employee_type}</Tag>,
    },
    {
      title: "Created Time",
      key: "created_time",
      render: (_, record) => <Tag color={"green"}>{_.data.created_time}</Tag>,
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
      render: (_, record) => <></>,
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
            md={10}
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
