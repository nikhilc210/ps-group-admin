import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { psApiCalling } from "../../Component/API/Index";
import moment from "moment";

export default function ScheduleList(props) {
  const { oid, clientName } = props;
  const [data, setData] = useState([]);
  const [col, setCol] = useState([
    // {
    //   title: "No",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: "Service Date",

      key: "service_date",
      render: (item, record) => (
        <Tag color="#0be881">
          {" "}
          {moment(item.date, "YYYY-MM-DD").format("DD-MM-YYYY")}
        </Tag>
      ),
    },
    {
      title: "Service Man",
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
              href={"/manageSchedule/" + item.id + "/" + oid + "/" + item.date}
            >
              Manage Schedule
            </Button>
          ) : (
            <Button
              type="primary"
              href={"/viewService/" + item.id + "/" + oid}
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
    let params = { action: "GET_SCHEDULE_LIST", oid: oid };
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
            title={clientName.replace(/%20/g, " ") + " Schedule"}
            style={{
              marginTop: "30px",
              msOverflowStyle: "none",
            }}
          >
            <Table data={data} col={col} />
          </Card>
        </Grid>
      </Box>
      <ToastContainer />
    </>
  );
}
