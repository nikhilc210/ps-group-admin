import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { psApiCalling } from "../../Component/API/Index";

export default function AdminList() {
  const [data, setData] = useState([]);
  const [col, setCol] = useState([
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Phone Number",
      key: "phoneNumber",
      render: (_, record) => <Tag color={"purple"}>{_.phoneNumber}</Tag>,
    },
    {
      title: "Email Address",
      key: "emailAddress",
      render: (_, record) => <Tag color={"green"}>{_.emailAddress}</Tag>,
      width: "280px",
    },
    {
      title: "Admin Type",
      key: "adminType",
      render: (_, record) => <Tag color={"green"}>{_.adminType}</Tag>,
    },

    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <>
          <>{_.is_active === "1" ? <p>Active</p> : <p>Deactivated</p>}</>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          {_.is_active === "1" ? (
            <>
              <Button
                danger={true}
                onClick={() => adminAction(_.id, "Inactive")}
              >
                Make Inactive
              </Button>
            </>
          ) : (
            <>
              <Button
                type="primary"
                onClick={() => adminAction(_.id, "Active")}
              >
                Make Active
              </Button>
            </>
          )}
        </>
      ),
    },
  ]);

  const adminAction = (id, type) => {
    let params = { action: "ADMIN_ACTION", id: id, type: type };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        toast.success(res.message);
        getAdminList();
      } else {
        toast.error(res.message);
      }
    });
  };

  const getAdminList = () => {
    let params = { action: "GET_ADMIN_LIST" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setData(res);
      }
    });
  };

  useEffect(() => {
    getAdminList();
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
            title="Admin List"
            extra={
              <Button
                href="/createAdmin"
                style={{ background: "#5f27cd", color: "#FFFFFF" }}
              >
                Create New Admin
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
