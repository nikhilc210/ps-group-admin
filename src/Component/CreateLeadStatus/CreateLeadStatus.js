import React from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Tooltip,
  Typography,
  DatePicker,
} from "antd";
import { Card, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { Grid, Box } from "@mui/material";
import { psApiCalling } from "../API/Index";
const { Option } = Select;

export default function CreateLeadStatus() {
  const onChangeDate = (v) => {};
  const onFinish = (values) => {
    let params = {
      action: "CREATE_STATUS",
      lead_status: values.lead_status,
    };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

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
              title="Create Lead Status"
              style={{
                width: "100%",
                marginLeft: "1%",
                marginTop: "30px",
              }}
            >
              <Form
                name="complex-form"
                layout="vertical"
                onFinish={onFinish}
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
              >
                <Form.Item
                  label="Lead Status Name"
                  name="lead_status"
                  rules={[
                    {
                      required: true,
                      message: "Lead status is required",
                    },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <Input placeholder="Lead Status" />
                </Form.Item>
                <Form.Item label=" " colon={false}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "50%", background: "#3E4095" }}
                  >
                    Create Status
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </Box>
  );
}
