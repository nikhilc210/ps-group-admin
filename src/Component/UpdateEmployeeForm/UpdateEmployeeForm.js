import React, { useState, useEffect } from "react";
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
import moment from "moment";
import { psApiCalling } from "../API/Index";
const { Option } = Select;

export default function CreateLeadForm(props) {
  console.log("props==========>", props);
  const { data } = props;
  const [form] = Form.useForm();
  const [managerList, setManagerList] = useState([[]]);
  const [designation, setDesignation] = useState([]);
  const [users, setUsers] = useState([]);
  const [reportingUser, setReportingUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const onFinish = (values) => {
    console.log(values);

    let params = {
      action: "UPDATE_EMPLOYEE",
      employee_name: values.employee_name,
      employee_dob: moment(values.employee_dob.$d).format("DD-MM-YYYY"),
      employee_gender: values.employee_gender,
      employee_email: values.employee_email,
      employee_type: values.employee_type,
      aadhar: values.aadhar,
      pan_card: values.pan_card,
      bank_name: values.bank_name,
      ifsc: values.ifsc,
      account_number: values.account_number,
      employee_address: values.employee_address,
      phone_number: values.phone_number,
      employee_role: values.employee_role,
      employee_password: values.employee_password,
      employee_designation: values.employee_designation,
      id: props.data.id,
      reporting: values.reporting,
    };
    psApiCalling(params).then((res) => {
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
  const getManager = () => {
    let params = { action: "GET_MANAGER_LIST" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setManagerList(
          res.map((item) => {
            return {
              label: item.data.full_name,
              value: item.data.id,
            };
          })
        );
      }
    });
  };

  const getDesignation = () => {
    let params = {
      action: "GET_DESIGNATION_LIST_REPORTING",
    };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        // setData(res);
        setDesignation(res);
      }
    });
  };

  const getAllUsers = () => {
    let params = { action: "GET_USERS_FOR_REPORTING" };
    psApiCalling(params).then((res) => {
      console.log(res);
      if (Array.isArray(res)) {
        setAllUsers(res);
        setUsers(
          res.map((item) => {
            return {
              label: item.label,
              value: item.value,
            };
          })
        );
      }
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      employee_name: data.full_name,
      employee_dob: moment(data.user_dob, "MM-DD-YYYY"),
      employee_gender: data.user_gender,
      employee_email: data.user_email,
      employee_role: data.employe_role,
      employee_password: data.password,
      phone_number: data.phone_number,
      employee_designation: data.employee_designation,
      reporting: data.reporting_to,
      employee_type: data.user_type,
      aadhar: data.aadhar,
      pan_card: data.pan_card,
      bank_name: data.bank_name,
      ifsc: data.ifsc,
      account_number: data.account_number,
      employee_address: data.user_address,
    });
  }, [props.data]);

  useEffect(() => {
    getManager();
  }, []);

  useEffect(() => {
    getDesignation();
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Form
        form={form}
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
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            label="Employee Name"
            name="employee_name"
            rules={[
              {
                required: true,
                message: "Employee name is required",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
            }}
          >
            <Input placeholder="Employee Name" />
          </Form.Item>
          <Form.Item
            label="Employee Dob"
            name="employee_dob"
            rules={[
              {
                required: true,
                message: "Employee dob is required",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <DatePicker onChange={onChangeDate} style={{ width: "100%" }} />
          </Form.Item>
        </Form.Item>
        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            label="Employee Gender"
            name="employee_gender"
            rules={[
              {
                required: true,
                message: "Employee gender is required",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
            }}
          >
            <Select
              defaultValue="Select Gender"
              style={{
                width: "100%",
              }}
              onChange={() => {}}
              options={[
                {
                  label: "Male",
                  value: "Male",
                },
                {
                  label: "Female",
                  value: "Female",
                },
                {
                  label: "Other",
                  value: "Other",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Employee Email"
            name="employee_email"
            rules={[
              {
                type: "email",
                message: "Email address is not valid",
              },
              {
                required: true,
                message: "Email address is required",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <Input
              type={"email"}
              placeholder="Email Address"
              inputMode={"email"}
              onInput={(e) => (e.target.value = e.target.value.toLowerCase())}
              readOnly
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            label="Employee Role"
            name="employee_role"
            rules={[
              {
                required: true,
                message: "Employee role is required",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
            }}
          >
            <Select
              defaultValue="Select Role"
              style={{
                width: "100%",
              }}
              onChange={() => {}}
              options={[
                {
                  label: "In-House",
                  value: "in_house",
                },
                {
                  label: "Service Man",
                  value: "Service Man",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Employee Password"
            name="employee_password"
            rules={[
              {
                required: true,
                message: "Employee password is required",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <Input.Password placeholder="Email Password" />
          </Form.Item>
        </Form.Item>
        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            label="Employee Phone Number"
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Employee Phone is required",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
            }}
          >
            <Input placeholder="Phone Number" maxLength={10} />
          </Form.Item>
          <Form.Item
            label="Select Designation"
            name="employee_designation"
            rules={[
              {
                required: true,
                message: "Designation is required",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(24% - 8px)",
              margin: "0 8px",
            }}
          >
            <Select
              defaultValue="Select Designation"
              style={{
                width: "100%",
              }}
              onChange={(v, i) => {
                let arr = allUsers.filter((item) => item.value === i.parent);
                console.log("arr", arr);
                //  console.log("users===>", users);
                setReportingUser(
                  arr.map((item) => {
                    return {
                      label: item.label,
                      value: item.id,
                    };
                  })
                );
              }}
              options={designation}
            />
          </Form.Item>
          <Form.Item
            label="Reporting To"
            name="reporting"
            rules={[
              {
                required: true,
                message: "Reporting is required",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(24% - 8px)",
              margin: "0 8px",
            }}
          >
            <Select
              defaultValue="Select User"
              style={{
                width: "100%",
              }}
              onChange={() => {}}
              options={reportingUser}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            label="Employee Type"
            name="employee_type"
            rules={[
              {
                required: true,
                message: "Please select employee type",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
            }}
          >
            <Select
              defaultValue="Select Employee Type"
              style={{
                width: "100%",
              }}
              onChange={() => {}}
              options={[
                {
                  label: "Fulltime",
                  value: "Fulltime",
                },
                {
                  label: "Intern",
                  value: "Intern",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Employee AADHAR"
            name="aadhar"
            rules={[
              {
                required: true,
                message: "Employee aadhar is required",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <Input placeholder="AADHAR Number" maxLength={12} />
          </Form.Item>
        </Form.Item>

        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            label="Employee PAN"
            name="pan_card"
            rules={[
              {
                required: true,
                message: "Employee pan is required",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
            }}
          >
            <Input placeholder="PAN Number" maxLength={10} />
          </Form.Item>
          <Form.Item
            label="Bank Name"
            name="bank_name"
            rules={[]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              marginLeft: "10px",
            }}
          >
            <Input placeholder="Bank Name" />
          </Form.Item>
        </Form.Item>

        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            label="Bank IFSC"
            name="ifsc"
            rules={[]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
            }}
          >
            <Input placeholder="Bank IFSC Code" />
          </Form.Item>
          <Form.Item
            label="Employee Bank Account Number"
            name="account_number"
            rules={[]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <Input placeholder="Bank Account Number" />
          </Form.Item>
        </Form.Item>

        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            label="Employee Address"
            name="employee_address"
            rules={[
              {
                required: true,
                message: "Employee Address is required",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(100% - 8px)",
            }}
          >
            <Input placeholder="Employee Address" />
          </Form.Item>
        </Form.Item>

        <Form.Item label=" " colon={false}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", background: "#3E4095" }}
          >
            Update Employee
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
