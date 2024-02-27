import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Tag, Form, Input, Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { psApiCalling } from "../../Component/API/Index";

export default function ClientServicesList() {
  const [cid, setCid] = useState(window.location.pathname.split("/")[2]);
  const [sites, setSites] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [col, setCol] = useState([
    {
      title: "No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Client",

      key: "cname",
      render: (item, record) => <Tag color="#0be881">{item.cname}</Tag>,
    },
    {
      title: "Service Type",
      render: (item, record) => <Tag color="#3c40c6">{item.service_type}</Tag>,
      key: "service_type",
    },
    {
      title: "Start Date",
      render: (item, record) => <Tag color="#00d8d6">{item.start_date}</Tag>,
      key: "start_date",
    },
    {
      title: "End Date",
      render: (item, record) => <Tag color="#ef5777">{item.end_date}</Tag>,
      key: "end_date",
    },
    {
      title: "No of Service",
      render: (item, record) => <Tag color="#ffdd59">{item.no_service}</Tag>,
      key: "no_service",
    },
    {
      title: "Employee",
      render: (item, record) => <Tag color="#3c40c6">{item.service_guy}</Tag>,
      key: "service_guy",
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
      fixed: "right",
      render: (item, record) => (
        <>
          <Button
            type="primary"
            href={"/viewSchedule/" + item.serviceCode + "/" + item.cname}
          >
            View Schedule
          </Button>
        </>
      ),
    },
  ]);

  const getLeadList = () => {
    let params = { action: "GET_CLIENT_ORDER_LIST", cid: cid };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setData(res);
        setFilteredData(res);
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

  const getClientSites = () => {
    let params = {
      action: "GET_CLIENT_SITE",
      cid: cid,
    };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setSites(res);
      }
    });
  };

  useEffect(() => {
    getLeadList();
    getClientSites();
  }, []);
  const onFinish = () => {};

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
              title="Orders"
              extra={
                <Form
                  name="complex-form"
                  layout="vertical"
                  onFinish={onFinish}
                  labelCol={{
                    span: 12,
                  }}
                  wrapperCol={{
                    span: 64,
                  }}
                >
                  <Form.Item
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    <Form.Item
                      label="Client Site"
                      name="select_sites"
                      rules={[
                        {
                          required: true,
                          message: "Select Site",
                        },
                      ]}
                      style={{
                        display: "inline-block",
                        width: "calc(200%)",
                        marginRight: "50px",
                      }}
                    >
                      <Select
                        defaultValue="All Sites"
                        style={{
                          width: "100%",
                        }}
                        onChange={(v) => {
                          console.log(v);
                          let arr = data.filter((item) => item.site_id === v);
                          setFilteredData(arr);
                        }}
                        options={sites}
                      />
                    </Form.Item>
                  </Form.Item>
                </Form>
              }
              style={{
                width: "98%",
                marginLeft: "1%",
                marginTop: "30px",
                overflow: "scroll",
              }}
            >
              <Table data={filteredData} col={col} />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </Box>
  );
}
