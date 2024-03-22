import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { psApiCalling } from "../API/Index";
import Table from "../../Component/Table/Table";
export default function LeadsCounter() {
  const [data, setData] = useState([]);
  const [col, setCol] = useState([
    // {
    //   title: "ID",
    //   key: "id",
    //   render: (item, record) => <>{item.data.id}</>,
    // },
    {
      title: "Lead ID",
      key: "lead_id",
      render: (item, record) => <Tag color="green">{item.data.client_id}</Tag>,
    },
    {
      title: "Client Name",
      key: "client_name",
      render: (item, record) => (
        <Tag color="purple">{item.data.client_name}</Tag>
      ),
    },
    {
      title: "Lead Status",
      key: "lead_status",
      render: (item, record) => <Tag color="yellow">{item.data.status}</Tag>,
    },
    {
      title: "Client Phone",
      key: "client_phone",
      render: (item, record) => (
        <Tag color="#01a3a4">{item.data.client_phone}</Tag>
      ),
    },
    {
      title: "Client Email",
      key: "client_email",
      width: "180px",
      render: (item, record) => (
        <Tag color="#feca57">{item.data.client_email}</Tag>
      ),
    },
    {
      title: "Client Sites",

      render: (item, record) => (
        <Button
          href={"/manage_sites/" + item.data.client_id + "/" + item.data.id}
          type="primary"
          style={{ backgroundColor: "#5f27cd" }}
        >
          Sites
        </Button>
      ),
    },
    {
      title: "Contact Persons",
      width: "180px",
      render: (item, record) => (
        <Button
          href={
            "/manage_contact_person/" + item.data.client_id + "/" + item.data.id
          }
          type="primary"
          style={{ backgroundColor: "#ff9f43" }}
        >
          Contact Person
        </Button>
      ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (item, record) => (
        <>
          <Button
            href={"/edit_lead/" + item.data.client_id + "/" + item.data.id}
            type="primary"
            style={{ backgroundColor: "#f6b93b" }}
          >
            Edit Lead
          </Button>
        </>
      ),
    },
  ]);
  const getLeadsList = () => {
    let params = { action: "GET_ALL_LEADS" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setData(res);
      }
    });
  };
  useEffect(() => {
    getLeadsList();
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
              title="Leads"
              extra={
                <Button
                  href="/createLead"
                  style={{ background: "#5f27cd", color: "#FFFFFF" }}
                >
                  Create New Lead
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
