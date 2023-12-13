import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import logo from "../../assets/logo.png";
import login from "../../assets/login.png";
import { Button, Form, Input, Select } from "antd";
import "./Login.css";
import { psApiCalling } from "../../Component/API/Index";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const onFinish = (values) => {
    let params = {
      action: "ADMIN_LOGIN",
      account_type: values.account_type,
      email_address: values.email_address,
      user_password: values.user_password,
    };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        localStorage.setItem("psAdminSessionID", res.id);
        localStorage.setItem("psAdminSessionName", res.fullname);
        localStorage.setItem("psAdminSessionType", values.account_type);
        window.location.href = "/dashboard";
      } else {
        toast.error(res.message);
      }
    });
  };
  return (
    <Container fluid className="main-container-login">
      <Row>
        <Col md={8} className="brand-holder">
          <div className="logo-holder">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="animation-holder">
            <Image fluid src={login} alt="login" className="animation-image" />
          </div>
        </Col>
        <Col md={4} className="input-holder">
          <div className="container">
            <div className="login-form-container">
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
                <div className="welcome-text-container">
                  <h3 className="welcome-text">Welcome Back</h3>
                  <p className="welcome-text-para">Sign In to your account</p>
                </div>
                <Form.Item
                  label="Account Type"
                  name="account_type"
                  rules={[
                    {
                      required: true,
                      message: "Account type is required",
                    },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(100%)",
                    color: "white",
                  }}
                  labelCol={"#ffffff"}
                >
                  <Select
                    className="login-input"
                    defaultValue="Select Account Type"
                    style={{
                      width: "100%",
                    }}
                    onChange={() => {}}
                    options={[
                      {
                        label: "Super Admin",
                        value: "Super Admin",
                      },
                      {
                        label: "Admin",
                        value: "Admin",
                      },
                      {
                        label: "Sales",
                        value: "Sales",
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="Email Address"
                  name="email_address"
                  rules={[
                    {
                      required: true,
                      message: "Email address is required",
                    },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(100%)",
                    color: "white",
                  }}
                  labelCol={"#ffffff"}
                >
                  <Input placeholder="Email address" className="login-input" />
                </Form.Item>
                <Form.Item
                  label="User Password"
                  name="user_password"
                  rules={[
                    {
                      required: true,
                      message: "Password is required",
                    },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(100%)",
                    color: "white",
                  }}
                  labelCol={"#ffffff"}
                >
                  <Input.Password
                    placeholder="Password"
                    className="login-input"
                    style={{ background: "#ffffff" }}
                  />
                </Form.Item>

                <Form.Item label=" " colon={false}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      width: "100%",

                      background: "#ED3237",
                      height: "50px",
                      borderRadius: "0px",
                    }}
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}
