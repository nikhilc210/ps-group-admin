import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { psApiCalling } from "../../Component/API/Index";

export default function AdminList() {
  const [data, setData] = useState([]);
  const [col, setCol] = useState([
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Phone Number",
      key: "phoneNumber",
      render: (_, record) => <Tag color={"purple"}>{_.phoneNumber}</Tag>,
    },
    {
      title: "Email Address",
      key: "emailAddress",
      render: (_, record) => <Tag color={"green"}>{_.emailAddress}</Tag>,
    },
    {
      title: "Admin Type",
      key: "adminType",
      render: (_, record) => <Tag color={"green"}>{_.adminType}</Tag>,
    },
    {
      title: "Created Time",
      key: "created_time",
      render: (_, record) => <Tag color={"green"}>{_.created_time}</Tag>,
    },

    {
      title: "Status",
      key: "status",
      render: (_, record) => <></>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <></>,
    },
  ]);

  const getAdminList = () => {
    let params = { action: "GET_ADMIN_LIST" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setData(res);
      }
    });
  };

  useEffect(() => {
    getAdminList();
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
              title="Admin List"
              extra={
                <Button
                  href="/createAdmin"
                  style={{ background: "#5f27cd", color: "#FFFFFF" }}
                >
                  Create New Admin
                </Button>
              }
              style={{
                width: "98%",
                marginLeft: "1%",
                marginTop: "30px",
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
