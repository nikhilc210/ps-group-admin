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
