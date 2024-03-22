import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { psApiCalling } from "../API/Index";
import { Image } from "react-bootstrap";
export default function WebsiteService() {
  const [data, setData] = useState([]);
  const [col, setCol] = useState([
    // {
    //   title: "ID",
    //   key: "id",
    //   render: (item) => <p>{item.id}</p>,
    // },
    {
      title: "Service Name",
      key: "service_name",
      render: (item) => <Tag color="green">{item.name}</Tag>,
    },
    {
      title: "Service Image",
      key: "service_image",
      render: (item) => (
        <>
          <Image
            src={item.image}
            fluid
            style={{ width: "100px", height: "100px" }}
          />
        </>
      ),
    },
    {
      title: "Service Description",
      key: "desc",
      render: (item) => <>{item.desc}</>,
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <>
          <Button
            style={{ background: "#f9ca24" }}
            type="primary"
            href={"/editWebsiteService/" + item.id}
          >
            Edit
          </Button>{" "}
          <Button
            danger
            type="primary"
            onClick={() => {
              deleteService(item.id);
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ]);

  const deleteService = (id) => {
    let params = { action: "DELETE_WEBSITE_SERVICE", id: id };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        getServiceList();
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  const getServiceList = () => {
    let params = { action: "GET_SERVICE_LIST" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setData(res);
      }
    });
  };

  useEffect(() => {
    getServiceList();
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
