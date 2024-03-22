import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { psApiCalling } from "../../Component/API/Index";
import moment from "moment";

export default function CurrentServiceList(props) {
  const [data, setData] = useState([]);
  const [col, setCol] = useState([
    {
      title: "Service Date",

      key: "service_date",
      render: (item, record) => <Tag color="#0be881">{item.date}</Tag>,
    },
    {
      title: "Service Guy",
      render: (item, record) => <Tag color="#3c40c6">{item.full_name}</Tag>,
      key: "service_guy",
    },
    {
      title: "Service Day",
      render: (item, record) => (
        <Tag color="#00d8d6">{getDatName(item.date)}</Tag>
      ),
      key: "service_day",
    },
    {
      title: "Status",
      render: (item, record) => (
        <>
          {item.status === "Pending" ? (
            <Tag color="#ffd32a">{item.status}</Tag>
          ) : (
            <Tag color="#0be881">{item.status}</Tag>
          )}
        </>
      ),
      key: "status",
    },
    {
      title: "View Details",
      key: "action",
      render: (item, record) => (
        <>
          {item.status === "Pending" ? (
            <Button
              type="primary"
              href={"/manageSchedule/" + item.id + "/" + item.oid}
            >
              Manage Schedule
            </Button>
          ) : (
            <Button
              type="primary"
              href={"/viewService/" + item.id + "/" + item.oid}
              style={{ background: "#0be881" }}
            >
              View Service
            </Button>
          )}
        </>
      ),
    },
  ]);

  const getLeadList = () => {
    let params = { action: "GET_TODAY_SCHEDULE_LIST" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setData(res);
      }
    });
  };
  const getDatName = (date) => {
    const dateObject = moment(date);
    const dayName = dateObject.format("dddd");
    return dayName;
  };

  useEffect(() => {
    getLeadList();
  }, []);

  const today = () => {
    let today = moment().toString();
    let format = moment(today).format("DD-MM-YYYY");
    return format;
  };

  return (
    <Box>
      <Box
        md={{ width: "100%" }}
        style={{ marginTop: "8px", overflow: "scroll" }}
      >
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
              title={"Today's (" + today() + ") Schedule"}
              style={{
                width: "98%",
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
