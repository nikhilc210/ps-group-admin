import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../Component/Common/Sidebar/Sidebar";
import Header from "../../Component/Common/Header/Header";
import { Button, Form, Input, Select, DatePicker } from "antd";
import { Card, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { Grid, Box } from "@mui/material";
import { Spin } from "antd";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
import { psApiCalling } from "../../Component/API/Index";
import UpdateEmployeeForm from "../../Component/UpdateEmployeeForm/UpdateEmployeeForm";
const { Option } = Select;
export default function UpdateEmployee() {
  const [employee_id, setEmployeeId] = useState(
    window.location.pathname.split("/")[2]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [reporting, setReporting] = useState(null);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    setIsLoading(true);
    let params = {
      employee_name: values.employee_name,
      employee_dob: values.employee_name,
      employee_gender: values.employee_name,
      employee_email: values.employee_name,
      phone_number: values.employee_name,
      employee_type: values.employee_name,
      aadhar: values.employee_name,
      pan_card: values.employee_name,
      bank_name: values.employee_name,
      ifsc: values.employee_name,
      account_number: values.employee_name,
      employee_address: values.employee_name,
      eid: employee_id,
      action: "UPDATE_EMPLOYEE",
    };
    psApiCalling(params).then((res) => {
      setIsLoading(false);
      if (res.status === "success") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  const onChangeDate = (values) => {
    let dob = moment(values.employee_dob).format("DD-MM-YYYY");
  };

  const getEmployeeDetails = () => {
    let params = { action: "GET_EMPLOYEE_DETAILS", eid: employee_id };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        setReporting(res.reporting);
        setData(res.data);
        // form.setFieldsValue({
        //   employee_name: res.data.employee_name,
        //   employee_dob: moment(res.data.employee_dob, "MM-DD-YYYY"),
        //   employee_gender: res.data.employee_gender,
        //   employee_email: res.data.employee_email,
        //   phone_number: res.data.phone_number,
        //   employee_type: res.data.employee_type,
        //   aadhar: res.data.aadhar,
        //   pan_card: res.data.pan_card,
        //   bank_name: res.data.bank_name,
        //   ifsc: res.data.ifsc,
        //   account_number: res.data.account_number,
        //   employee_address: res.data.employee_address,
        // });
      }
    });
  };

  useEffect(() => {
    getEmployeeDetails();
  }, [employee_id]);

  return (
    <Container fluid className={"mainContainer"}>
      <Row>
        <Col md={2} style={{ padding: "0px", margin: "0px" }}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Header />
          <main>
            <Container fluid>
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
                        title="Update Employee"
                        style={{
                          width: "100%",
                          marginLeft: "1%",
                          marginTop: "30px",
                        }}
                      >
                        <UpdateEmployeeForm
                          employee_id={employee_id}
                          data={data}
                          reporting={reporting}
                        />
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
                <ToastContainer />
              </Box>
            </Container>
          </main>
        </Col>
      </Row>
    </Container>
  );
}
