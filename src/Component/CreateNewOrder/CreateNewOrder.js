import React, { useState, useEffect } from "react";
import { psApiCalling } from "../API/Index";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Tooltip,
  Typography,
  DatePicker,
  TimePicker,
  InputNumber,
} from "antd";
import { Card, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { Grid, Box } from "@mui/material";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import "./CreateNewOrder.css";
const { Option } = Select;

export default function CreateNewOrder() {
  const [clientList, setClientList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [filteredLocation, setFilteredLocation] = useState([]);
  const [industryList, setIndustryList] = useState([]);
  const [serviceGuyList, setServiceGuyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showWeek, setShowWeek] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [repeation, setRepeation] = useState([
    {
      label: "Does not repeat",
      value: "Does not repeat",
    },
    {
      label: "Daily",
      value: "Daily",
    },
    {
      label: "Weekly",
      value: "Weekly",
    },
    {
      label: "Monthly",
      value: "Monthly",
    },
    {
      label: "Yearly",
      value: "Yearly",
    },
  ]);
  const [days, setDays] = useState([
    {
      id: 1,
      name: "Monday",
      initials: "M",
      checked: false,
    },
    {
      id: 2,
      name: "Tuesday",
      initials: "T",
      checked: false,
    },
    {
      id: 3,
      name: "Wednesday",
      initials: "W",
      checked: false,
    },
    {
      id: 4,
      name: "Thursday",
      initials: "T",
      checked: false,
    },
    {
      id: 5,
      name: "Friday",
      initials: "F",
      checked: false,
    },
    {
      id: 6,
      name: "Saturday",
      initials: "S",
      checked: false,
    },
    {
      id: 7,
      name: "Sunday",
      initials: "S",
      checked: false,
    },
  ]);
  const onChangeDate = (date, dateString) => {
    console.log(dateString);
    setDate(dateString);
  };
  const onChangeTime = (time, timeString) => {
    console.log(timeString);
    setTime(timeString);
  };

  const getAllClientList = () => {
    let params = { action: "GET_ALL_LEADS" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setClientList(
          res.map((item) => {
            return {
              value: item.data.id,
              label: item.data.client_name,
            };
          })
        );
      }
    });
  };

  const getAllLocation = () => {
    let params = { action: "GET_ALL_LOCATION" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setLocationList(res);
      }
    });
  };

  const getServiceList = () => {
    let params = { action: "GET_SERVICES_TYPE_LIST" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setIndustryList(
          res.map((item) => {
            return {
              value: item.id,
              label: item.name,
            };
          })
        );
      }
    });
  };

  const getServiceGuyList = () => {
    let params = { action: "GET_SERVICE_GUY_LIST" };
    psApiCalling(params).then((res) => {
      if (Array.isArray) {
        setServiceGuyList(res);
      }
    });
  };

  const onFinish = (value) => {
    let day = [];
    if (value.repetation === "Weekly") {
      days.map((item) => {
        if (item.checked === true) {
          day.push(item.id);
        }
      });
    } else {
    }
    let params = {
      client_name: value.client_name,
      client_site: value.client_site,
      service_type: value.service_type,
      service_date: date,
      service_time: time,
      repeat_every: value.repeat_every,
      repetation: value.repetation,
      ends_on: value.ends_on,
      service_guy: value.service_guy,
      action: "CREATE_NEW_ORDER",
      days: day,
    };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  useEffect(() => {
    getAllClientList();
  }, []);
  useEffect(() => {
    getAllLocation();
  }, []);
  useEffect(() => {
    getServiceList();
  }, []);

  useEffect(() => {
    getServiceGuyList();
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
              title="Create New Order"
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
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Form.Item
                    label="Client Name"
                    name="client_name"
                    rules={[
                      {
                        required: true,
                        message: "Client name is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                    }}
                  >
                    <Select
                      defaultValue="Select Client"
                      style={{
                        width: "100%",
                      }}
                      onChange={(v) => {
                        if (locationList.length > 0) {
                          let filter = locationList.filter(
                            (item) => item.lead_id === v
                          );
                          setFilteredLocation(
                            filter.map((item) => {
                              return {
                                value: item.aid,
                                label: item.address,
                              };
                            })
                          );
                        }
                      }}
                      options={clientList}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Client Site"
                    name="client_site"
                    rules={[
                      {
                        required: true,
                        message: "Client email is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <Select
                      defaultValue="Select Client Site"
                      style={{
                        width: "100%",
                      }}
                      onChange={() => {}}
                      options={filteredLocation}
                    />
                  </Form.Item>
                </Form.Item>
                <Form.Item
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Form.Item
                    label="Service Type"
                    name="service_type"
                    rules={[
                      {
                        required: true,
                        message: "Please selct service type",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                    }}
                  >
                    <Select
                      defaultValue="Select Service Type"
                      style={{
                        width: "100%",
                      }}
                      onChange={() => {}}
                      options={industryList}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Service Date"
                    name="service_date"
                    rules={[
                      {
                        required: true,
                        message: "Service date is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(23%)",
                      margin: "0 8px",
                    }}
                  >
                    <DatePicker onChange={onChangeDate} />
                  </Form.Item>
                  <Form.Item
                    label="Service Time"
                    name="service_time"
                    rules={[
                      {
                        required: true,
                        message: "Service time is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(23%)",
                      margin: "0 8px",
                    }}
                  >
                    <TimePicker onChange={onChangeTime} />
                  </Form.Item>
                </Form.Item>

                <Form.Item
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Form.Item
                    label="Repeat Every"
                    name="repeat_every"
                    rules={[
                      {
                        required: true,
                        message: "Repeat every is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <InputNumber min={1} max={365} style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    label="Repeation"
                    name="repetation"
                    rules={[
                      {
                        required: true,
                        message: "Repeation is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                    }}
                  >
                    <Select
                      defaultValue="Select Service Repetation"
                      style={{
                        width: "100%",
                      }}
                      onChange={(v) => {
                        if (v === "Weekly") {
                          setShowWeek(true);
                        } else {
                          setShowWeek(false);
                        }
                      }}
                      options={repeation}
                    />
                  </Form.Item>
                </Form.Item>
                {showWeek === true ? (
                  <Form.Item
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    {days.map((item, index) => {
                      return (
                        <>
                          {item.checked === true ? (
                            <div
                              key={item}
                              style={{
                                display: "inline-block",
                                textAlign: "center",
                              }}
                              title={item.name}
                              onClick={() => {
                                const updatedDays = [...days]; // Create a copy of the days array
                                updatedDays[index] = {
                                  ...updatedDays[index],
                                  checked: false,
                                }; // Update the checked property for the specified index

                                setDays(updatedDays);
                              }}
                            >
                              <div className="days_button_checked">
                                <p className="initial_checked">
                                  {item.initials}
                                </p>
                              </div>
                              <p className="week_name">{item.name}</p>
                            </div>
                          ) : (
                            <div
                              key={item}
                              style={{
                                display: "inline-block",
                                textAlign: "center",
                              }}
                              title={item.name}
                              onClick={() => {
                                const updatedDays = [...days]; // Create a copy of the days array
                                updatedDays[index] = {
                                  ...updatedDays[index],
                                  checked: true,
                                }; // Update the checked property for the specified index

                                setDays(updatedDays);
                              }}
                            >
                              <div className="days_button">
                                <p className="initial">{item.initials}</p>
                              </div>
                              <p className="week_name">{item.name}</p>
                            </div>
                          )}
                        </>
                      );
                    })}
                  </Form.Item>
                ) : null}
                <Form.Item
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Form.Item
                    label="Ends after Occurrences"
                    name="ends_on"
                    rules={[
                      {
                        required: true,
                        message: "Service end required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <InputNumber min={1} max={365} style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    label="Service Guy"
                    name="service_guy"
                    rules={[
                      {
                        required: true,
                        message: "Service Guy is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                    }}
                  >
                    <Select
                      defaultValue="Select Service Guy"
                      style={{
                        width: "100%",
                      }}
                      onChange={() => {}}
                      options={serviceGuyList}
                    />
                  </Form.Item>
                </Form.Item>
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
                  <Form.Item label=" " colon={false}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%", background: "#3E4095" }}
                    >
                      Create New Order
                    </Button>
                  </Form.Item>
                )}
              </Form>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </Box>
  );
}
