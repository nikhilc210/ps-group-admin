import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { psApiCalling } from "../../Component/API/Index";

export default function OrderList() {
  const [data, setData] = useState([]);
  const [col, setCol] = useState([
    // {
    //   title: "No",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: "Client",

      key: "cname",
      render: (item, record) => <Tag color="#0be881">{item.cname}</Tag>,
    },

    {
      title: "View Details",
      key: "details",
      render: (item, record) => (
        <>
          <Button type="primary" href={"/serviceList/" + item.cid}>
            View Services
          </Button>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (item, record) => (
        <>
          <Button
            type="primary"
            href={"/editService/" + item.id + "/" + item.serviceCode}
          >
            Edit
          </Button>
        </>
      ),
    },
  ]);

  const getLeadList = () => {
    let params = { action: "GET_ORDER_LIST" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setData(filterUniqueCid(res));
      }
    });
  };

  const filterUniqueCid = (data) => {
    const uniqueCidMap = new Map();
    data.forEach((item) => {
      uniqueCidMap.set(item.cid, item);
    });

    return Array.from(uniqueCidMap.values());
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
            title="Client's Schedule"
            extra={
              <Button
                href="/createNewOrder"
                style={{ background: "#5f27cd", color: "#FFFFFF" }}
              >
                Create New Schedule
              </Button>
            }
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
