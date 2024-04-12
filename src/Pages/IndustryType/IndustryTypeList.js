import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Spin, Modal, Form, Divider, Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../Component/Table/Table";
import { psApiCalling } from "../../Component/API/Index";
import { LoadingOutlined } from "@ant-design/icons";

export default function IndustryTypeList() {
  const [data, setData] = useState([]);
  const [updateForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [iid, setIid] = useState(null);
  const [col, setCol] = useState([
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setUpdate(true);
              setIid(_.id);
              updateForm.setFieldsValue({
                industry: _.type,
              });
            }}
          >
            Edit
          </Button>{" "}
          <Button
            danger
            onClick={() => {
              deleteIndustry(_.id);
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ]);
  const onFinishUpdate = (values) => {
    let params = {
      action: "UPDATE_INDUSTRY_TYPE",
      iid: iid,
      name: values.industry,
    };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        toast.success(res.message);
        getLeadList();
        setUpdate(false);
      } else {
        toast.error(res.message);
      }
    });
  };

  const deleteIndustry = (id) => {
    let params = { action: "DELETE_INDUSTRY_TYPE", id: id };
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
    let params = { action: "GET_INDUSTRY_TYPE_LIST" };
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
                title="Industry Type List"
                extra={
                  <Button
                    href="/createIndustryType"
                    style={{ background: "#5f27cd", color: "#FFFFFF" }}
                  >
                    Create Industry Type
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
      <Modal
        title="Update Industry Type"
        centered
        open={update}
        width={600}
        footer={null}
        onCancel={() => setUpdate(false)}
      >
        <Divider />
        <div>
          <Form
            form={updateForm}
            layout="vertical"
            style={{
              marginBottom: 0,
            }}
            onFinish={onFinishUpdate}
          >
            <Form.Item
              label="Industry type"
              name="industry"
              rules={[
                {
                  required: true,
                  message: "Industry type is required",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(99.8% - 8px)",
              }}
            >
              <Input placeholder="Industry type" />
            </Form.Item>
            <Form.Item label=" " colon={false}>
              {isLoading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 24,
                      }}
                      spin
                    />
                  }
                />
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%", background: "#3E4095" }}
                >
                  Update Industry Type
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}
