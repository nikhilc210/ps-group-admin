import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { psApiCalling } from "../../Component/API/Index";
import { useNavigate } from "react-router-dom";
export default function ManagerList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [col, setCol] = useState([
    {
      title: "ID",

      key: "id",
      render: (_, record) => <>{_.data.id}</>,
    },
    {
      title: "User Code",
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
      render: (_, record) => <Tag color={"#fad390"}>{_.data.user_email}</Tag>,
    },
    {
      title: "Phone Number",
      key: "phone",
      render: (_, record) => <Tag color={"#1e3799"}>{_.data.phone_number}</Tag>,
    },
    {
      title: "Employee DOB",
      key: "dob",
      render: (_, record) => <Tag color={"#fa983a"}>{_.data.user_dob}</Tag>,
    },
    {
      title: "User Gender",
      key: "gender",
      render: (_, record) => <Tag color={"#4a69bd"}>{_.data.user_gender}</Tag>,
    },
    {
      title: "Employee Type",
      key: "type",
      render: (_, record) => <Tag color={"#e58e26"}>{_.data.user_type}</Tag>,
    },
    {
      title: "Created Time",
      key: "created_time",
      render: (_, record) => <Tag color={"#b71540"}>{_.data.created_time}</Tag>,
    },
    {
      title: "Location",
      key: "location",
      render: (_, record) => (
        <>
          <Button type="primary">View Location</Button>
        </>
      ),
    },
    {
      title: "Attendance",
      key: "attendance",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              navigate("/view_attendance/" + _.data.id);
            }}
          >
            View Attendance
          </Button>
        </>
      ),
    },

    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <>
          {_.data.isActive === "1" ? (
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
            href={"/editAppUser/" + _.data.id}
          >
            Edit
          </Button>
        </>
      ),
    },
  ]);

  const getAppUserList = () => {
    let params = { action: "GET_MANAGER_LIST" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setData(res);
      }
    });
  };

  useEffect(() => {
    getAppUserList();
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
              title="Manager List"
              extra={
                <Button
                  href="/createManager"
                  style={{ background: "#5f27cd", color: "#FFFFFF" }}
                >
                  Create New Manager
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
