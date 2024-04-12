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
      render: (item) => (
        <div dangerouslySetInnerHTML={{ __html: item.desc }}></div>
      ),
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
