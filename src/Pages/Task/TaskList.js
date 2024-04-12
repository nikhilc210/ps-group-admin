import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { psApiCalling } from "../../Component/API/Index";

export default function TaskList() {
  const [data, setData] = useState([]);
  const [col, setCol] = useState([
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
    // {
    //   title: "Task Code",
    //   key: "code",
    //   render: (_, record) => <Tag color="blue">{_.code}</Tag>,
    // },
    {
      title: "Employee",
      key: "employee",
      render: (_, record) => <Tag color="green">{_.name}</Tag>,
    },
    {
      title: "Time",
      key: "time",
      render: (_, record) => <Tag color="green">{_.time}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="primary" href={"/viewTask/" + _.code + "/" + _.name}>
            View Tasks
          </Button>{" "}
          <Button
            style={{ background: "#f1c40f" }}
            type="primary"
            href={"/editTask/" + _.code + "/" + _.id}
          >
            Edit Task
          </Button>
        </>
      ),
    },
  ]);

  const getLeadList = () => {
    let params = { action: "GET_EMPLOYEE_FOR_TASK" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setData(res);
      }
    });
  };

  useEffect(() => {
    getLeadList();
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
              title="Employee Task"
              extra={
                <Button
                  href="/createTask"
                  style={{ background: "#5f27cd", color: "#FFFFFF" }}
                >
                  Create Task
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
