import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Tag } from "antd";
import { ToastContainer, toast, useToast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { psApiCalling } from "../../Component/API/Index";

export default function LeadList() {
  const [data, setData] = useState([]);
  const [col, setCol] = useState([
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: "Employee Name",

      key: "name",
      render: (item) => <Tag color="green">{item.name}</Tag>,
    },
    {
      title: "Type",
      key: "type",
      render: (item) => <Tag color="yellow">{item.type}</Tag>,
    },
    {
      title: "No. Days",

      key: "days",
      render: (item) => <Tag color="blue">{item.days}</Tag>,
    },
    {
      title: "From Date",

      key: "from",
      render: (item) => <Tag color="purple">{item.from}</Tag>,
    },
    {
      title: "To Date",

      key: "to",
      render: (item) => <Tag color="black">{item.to}</Tag>,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },

    {
      title: "Submitted Time",

      key: "time",
      render: (item) => <Tag color="red">{item.time}</Tag>,
    },
    {
      title: "Status",

      key: "status",
      render: (item) => (
        <>
          {item.status === "0" ? (
            <Tag color="red">Not Approved</Tag>
          ) : (
            <Tag color="green">Approved</Tag>
          )}
        </>
      ),
    },
    {
      title: "Approved By",

      key: "by",
      render: (item) => (
        <>{item.approved_by === "0" ? <p>-</p> : <p>{item.aname}</p>}</>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          {_.status === "0" ? (
            <Button type="primary" onClick={() => approveLeave(_.id)}>
              Approve
            </Button>
          ) : (
            <Button danger onClick={() => rejectLeave(_.id)}>
              Reject
            </Button>
          )}
        </>
      ),
    },
  ]);

  const approveLeave = (id) => {
    //console.log(id);
    const uid = localStorage.getItem("psAdminSessionID");
    let params = { action: "APPROVE_LEAVE", id: id, uid: uid };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        toast.success(res.message);
        getLeadList();
      } else {
        toast.error(res.message);
      }
    });
  };

  const rejectLeave = (id) => {
    const uid = localStorage.getItem("psAdminSessionID");
    let params = { action: "REJECT_LEAVE", id: id, uid: uid };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        toast.success(res.message);
        getLeadList();
      } else {
        toast.error(res.message);
      }
    });
  };

  const getLeadList = () => {
    let params = { action: "GET_LEAVE_LIST" };
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
              title="Leave Application"
              style={{
                width: "98%",
                marginLeft: "1%",
                marginTop: "30px",
                overflow: "scroll",
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
