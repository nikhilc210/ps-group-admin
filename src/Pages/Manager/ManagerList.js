import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { psApiCalling } from "../../Component/API/Index";
import { useNavigate } from "react-router-dom";
export default function ManagerList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [col, setCol] = useState([
    // {
    //   title: "ID",

    //   key: "id",
    //   render: (_, record) => <>{_.data.id}</>,
    //   width: "50px",
    // },
    // {
    //   title: "User Code",
    //   key: "code",
    //   render: (_, record) => <Tag color={"purple"}>{_.data.user_code}</Tag>,
    //   width: "130px",
    // },
    {
      title: "Fullname",
      key: "fullname",
      render: (_, record) => <>{_.data.full_name}</>,
      width: "130px",
    },
    {
      title: "Email Address",
      key: "emailAddress",
      render: (_, record) => <Tag color={"#fad390"}>{_.data.user_email}</Tag>,
      width: "180px",
    },
    {
      title: "Phone Number",
      key: "phone",
      render: (_, record) => <Tag color={"#1e3799"}>{_.data.phone_number}</Tag>,
      width: "150px",
    },
    {
      title: "DOB",
      key: "dob",
      render: (_, record) => <Tag color={"#fa983a"}>{_.data.user_dob}</Tag>,
      width: "120px",
    },
    {
      title: "Gender",
      key: "gender",
      render: (_, record) => <Tag color={"#4a69bd"}>{_.data.user_gender}</Tag>,
      width: "110px",
    },
    {
      title: "Employee Type",
      key: "type",
      render: (_, record) => <Tag color={"#e58e26"}>{_.data.user_type}</Tag>,
      width: "180px",
    },

    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <>
          {_.data.isActive === "1" ? (
            <>
              <Button
                danger={true}
                onClick={() => managerAction(_.data.id, "Inactive")}
              >
                Make Inactive
              </Button>
            </>
          ) : (
            <>
              <Button
                type="primary"
                onClick={() => managerAction(_.data.id, "Active")}
              >
                Make Active
              </Button>
            </>
          )}
        </>
      ),
      width: "150px",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            style={{ background: "#f9ca24" }}
            type="primary"
            href={"/editManager/" + _.data.id}
          >
            Edit
          </Button>
        </>
      ),
      width: "150px",
    },
  ]);

  const managerAction = (id, type) => {
    let params = { action: "MANAGER_ACTION", id: id, type: type };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        toast.success(res.message);
        getAppUserList();
      } else {
        toast.error(res.message);
      }
    });
  };

  const getAppUserList = () => {
    let params = { action: "GET_MANAGER_LIST" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setData(res);
      }
    });
  };

  useEffect(() => {
    getAppUserList();
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
            title="Manager List"
            extra={
              <Button
                href="/createManager"
                style={{ background: "#5f27cd", color: "#FFFFFF" }}
              >
                Create New Manager
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
