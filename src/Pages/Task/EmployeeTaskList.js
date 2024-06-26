import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { psApiCalling } from "../../Component/API/Index";
import moment from "moment";

export default function EmployeeTaskList(props) {
  const [data, setData] = useState([]);
  const [col, setCol] = useState([
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: "Task Date",
      key: "date",
      render: (_, record) => (
        <Tag color="blue">{moment(_.date).format("DD-MM-YYYY")}</Tag>
      ),
    },
    {
      title: "Task",
      key: "task",
      render: (_, record) => <p>{_.task}</p>,
    },
    {
      title: "Status",
      key: "action",
      render: (_, record) => (
        <>
          {_.status === "Pending" ? (
            <Tag color="#f1c40f">{_.status}</Tag>
          ) : (
            <Tag color="#27ae60">{_.status}</Tag>
          )}
        </>
      ),
    },
    {
      title: "Updated Date",
      key: "task",
      render: (_, record) => <p>{moment(_.new_date).format("DD-MM-YYYY")}</p>,
    },
    {
      title: "Comment",
      key: "task",
      render: (_, record) => <p>{_.comment}</p>,
    },
  ]);

  const getLeadList = () => {
    let params = { action: "GET_EMPLOYEE_TASK", code: props.code };
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
              title={props.name.replace("%20", " ") + " Task"}
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
