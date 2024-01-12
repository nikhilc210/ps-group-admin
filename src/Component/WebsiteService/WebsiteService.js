import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { psApiCalling } from "../API/Index";
export default function WebsiteService() {
  const [data, setData] = useState([]);
  const [col, setCol] = useState([
    {
      title: "ID",
      key: "id",
      render: (item) => <p>{item.id}</p>,
    },
    {
      title: "Service Name",
      key: "service_name",
      render: (item) => <Tag color="green">{item.name}</Tag>,
    },
    {
      title: "Service Image",
      key: "service_image",
      render: (item) => <></>,
    },
    {
      title: "Service Desc",
      key: "desc",
      render: (item) => <></>,
    },
    {
      title: "Action",
      key: "action",
      render: (item) => <></>,
    },
  ]);

  useEffect(() => {
    let params = { action: "GET_SERVICE_LIST" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setData(res);
      }
    });
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
              title="Website Service"
              extra={
                <Button
                  href="/createWebsiteService"
                  style={{ background: "#5f27cd", color: "#FFFFFF" }}
                >
                  Create Website Service
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
