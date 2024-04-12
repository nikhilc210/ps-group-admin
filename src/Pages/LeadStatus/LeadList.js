import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { psApiCalling } from "../../Component/API/Index";

export default function LeadList() {
  const [data, setData] = useState([]);
  const [col, setCol] = useState([
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => <></>,
    // },
  ]);

  const getLeadList = () => {
    let params = { action: "GET_LEAD_LIST" };
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
            title="Lead Status"
            extra={
              <Button
                href="/createLeadStatus"
                style={{ background: "#5f27cd", color: "#FFFFFF" }}
              >
                Create Lead Status
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
