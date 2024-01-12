import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { psApiCalling } from "../../Component/API/Index";
export default function EmployeeList(props) {
  const [data, setData] = useState([]);

  const [col, setCol] = useState([
    {
      title: "ID",

      key: "id",
      render: (_, record) => <>{_.data.id}</>,
    },
    {
      title: "Date",
      key: "code",
      render: (_, record) => <Tag color={"purple"}>{_.data.date}</Tag>,
    },
    {
      title: "In-Time",
      key: "inTime",
      render: (_, record) => <Tag color={"green"}>{_.data.in_time}</Tag>,
    },
    {
      title: "Out Time",
      key: "outTime",
      render: (_, record) => <Tag color={"red"}>{_.data.out_time}</Tag>,
    },
    {
      title: "IN Location",
      key: "in_location",
      render: (_, record) => (
        <Button
          type="primary"
          href={
            "https://maps.google.com?q=" +
            _.data.punch_in_lattitude +
            "," +
            _.data.punch_in_longittude
          }
          target={"_blank"}
        >
          View Location
        </Button>
      ),
    },
    {
      title: "Out Location",
      key: "out_location",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          href={
            "https://maps.google.com?q=" +
            _.data.punch_out_lattitude +
            "," +
            _.data.punch_out_longittude
          }
          target={"_blank"}
        >
          View Location
        </Button>
      ),
    },
  ]);

  const getEmployeAttendanceList = () => {
    let params = { action: "GET_EMPLOYEE_ATTENDANCE", uid: props.uid };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setData(res);
      }
    });
  };

  useEffect(() => {
    getEmployeAttendanceList();
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
              title="Attendance List"
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
