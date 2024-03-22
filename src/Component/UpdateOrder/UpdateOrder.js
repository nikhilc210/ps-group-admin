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
import DatePickerNew from "react-multi-date-picker";

const { Option } = Select;

export default function UpdateOrder(props) {
  const { oid, code } = props;
  const [form] = Form.useForm();
  const [value, setValue] = useState(new Date());
  const [clientList, setClientList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [filteredLocation, setFilteredLocation] = useState([]);
  const [industryList, setIndustryList] = useState([]);
  const [serviceGuyList, setServiceGuyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showWeek, setShowWeek] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [showCal, setShowCal] = useState(false);
  const [showType, setShowType] = useState(false);
  const [weekDayType, setWeekDayType] = useState(false);
  const [showOcu, setShowOcu] = useState(true);
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
    let ends_on;
    if (value.ends_on === undefined) {
      ends_on = "1";
    } else {
      ends_on = value.ends_on;
    }
    if (value.repetation === "Weekly") {
      days.map((item) => {
        if (item.checked === true) {
          day.push(item.id);
        }
      });
    } else {
    }
    if (value.repetation === "Monthly") {
      let day = [];
      let week;
      let selected_day;

      if (value.week === undefined) {
        week = "";
      } else {
        week = value.week;
      }

      days.map((item) => {
        if (item.checked === true) {
          day.push(item.id);
        }
      });
      if (value.selected_day === undefined) {
        selected_day = "";
      } else {
        selected_day = value.selected_day;
      }

      let params = {
        client_name: value.client_name,
        client_site: value.client_site,
        service_type: value.service_type,
        service_date: date,
        service_time: time,
        repeat_every: value.repeat_every,
        repetation: value.repetation,
        ends_on: ends_on,
        service_guy: value.service_guy,
        type: value.type,
        week: week,
        selected_day: selected_day,
        days: day,
        oid: oid,
        code: code,
        action: "UPDATE_ORDER_FOR_MONTH",
      };
      psApiCalling(params).then((res) => {
        if (res.status === "success") {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      });
    } else {
      let params = {
        client_name: value.client_name,
        client_site: value.client_site,
        service_type: value.service_type,
        service_date: date,
        service_time: time,
        repeat_every: value.repeat_every,
        repetation: value.repetation,
        ends_on: ends_on,
        service_guy: value.service_guy,
        action: "UPDATE_NEW_ORDER",
        days: day,
        oid: oid,
        code: code,
      };
      psApiCalling(params).then((res) => {
        if (res.status === "success") {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      });
    }
  };

  const getOrderDetail = () => {
    let params = { action: "GET_ORDER_DETAILS", oid: oid };
    psApiCalling(params).then((res) => {
      console.log(res);
      if (res.status === "success") {
        form.setFieldsValue({
          client_name: res.data.cid,
          client_site: res.data.site_id,
          service_type: res.data.service_type,
          service_date: moment(res.data.start_date, "YYYY-MM-DD"),
          service_time: moment(res.data.service_time, "HH:mm"),
          repeat_every: res.data.repeat_every,
          repetation: res.data.repetation,
          ends_on: res.data.ends_on,
          service_guy: res.data.service_guy,
        });
        if (res.data.repetation === "Weekly") {
          setShowWeek(true);
          setShowType(false);
          setShowOcu(true);
        } else if (res.data.repetation === "Monthly") {
          setShowWeek(false);
          setShowType(true);
          setShowOcu(true);
        } else if (res.data.repetation === "Does not repeat") {
          setShowWeek(false);
          setShowType(false);
          setShowOcu(false);
        } else if (res.data.repetation === "Daily") {
          setShowOcu(true);
        }
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
  useEffect(() => {
    getOrderDetail();
  }, [oid]);
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
              title="Update Schedule"
              style={{
                width: "100%",
                marginLeft: "1%",
                marginTop: "30px",
              }}
            >
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
                      showSearch={true}
                      // filterOption
                      optionFilterProp="children"
                      defaultValue="Select Client"
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
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
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      style={{
                        width: "100%",
                      }}
                      onChange={() => {}}
                      options={locationList.map((item) => {
                        return {
                          value: item.aid,
                          label: item.address,
                        };
                      })}
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
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
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
                    <TimePicker onChange={onChangeTime} format="h:mm a" />
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
                          setShowType(false);
                          setShowOcu(true);
                        } else if (v === "Monthly") {
                          setShowWeek(false);
                          setShowType(true);
                          setShowOcu(true);
                        } else if (v === "Does not repeat") {
                          setShowWeek(false);
                          setShowType(false);
                          setShowOcu(false);
                        } else if (v === "Daily") {
                          setShowOcu(true);
                        }
                      }}
                      options={repeation}
                    />
                  </Form.Item>
                  {showType ? (
                    <Form.Item
                      label="Type"
                      name="type"
                      rules={[
                        {
                          required: true,
                          message: "Type is required",
                        },
                      ]}
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 0px)",
                      }}
                    >
                      <Select
                        defaultValue="Select Type"
                        style={{
                          width: "100% - 8px",
                        }}
                        onChange={(v) => {
                          if (v === "Day Wise") {
                            setShowWeek(true);
                            setShowCal(false);
                            setWeekDayType(true);
                          } else {
                            setShowWeek(false);
                            setShowCal(true);
                            setWeekDayType(false);
                          }
                        }}
                        options={[
                          {
                            label: "Date Wise",
                            value: "Date Wise",
                          },
                          {
                            label: "Day Wise",
                            value: "Day Wise",
                          },
                        ]}
                      />
                    </Form.Item>
                  ) : null}
                  {weekDayType ? (
                    <Form.Item
                      label="Week"
                      name="week"
                      rules={[
                        {
                          required: true,
                          message: "Week is required",
                        },
                      ]}
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 0px)",
                      }}
                    >
                      <Select
                        defaultValue="Select Week"
                        style={{
                          width: "100% - 8px",
                          marginLeft: "5px",
                        }}
                        onChange={(v) => {}}
                        options={[
                          {
                            label: "1st",
                            value: "1",
                          },
                          {
                            label: "2nd",
                            value: "2",
                          },
                          {
                            label: "3rd",
                            value: "3",
                          },
                          {
                            label: "4th",
                            value: "4",
                          },
                        ]}
                      />
                    </Form.Item>
                  ) : null}

                  {showCal ? (
                    <Form.Item
                      label="Day"
                      name="selected_day"
                      rules={[
                        {
                          required: true,
                          message: "Day is required",
                        },
                      ]}
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 0px)",
                      }}
                    >
                      <Select
                        mode={"multiple"}
                        style={{
                          width: "100% - 8px",
                          marginLeft: "5px",
                        }}
                        onChange={(v) => {
                          console.log(v);
                        }}
                        options={[
                          {
                            label: "1",
                            value: "1",
                          },
                          {
                            label: "2",
                            value: "2",
                          },
                          {
                            label: "3",
                            value: "3",
                          },
                          {
                            label: "4",
                            value: "4",
                          },
                          {
                            label: "5",
                            value: "5",
                          },
                          {
                            label: "6",
                            value: "6",
                          },
                          {
                            label: "7",
                            value: "7",
                          },
                          {
                            label: "8",
                            value: "8",
                          },
                          {
                            label: "9",
                            value: "9",
                          },
                          {
                            label: "10",
                            value: "10",
                          },
                          {
                            label: "11",
                            value: "11",
                          },
                          {
                            label: "12",
                            value: "12",
                          },
                          {
                            label: "13",
                            value: "13",
                          },
                          {
                            label: "14",
                            value: "14",
                          },
                          {
                            label: "15",
                            value: "15",
                          },
                          {
                            label: "16",
                            value: "16",
                          },
                          {
                            label: "17",
                            value: "17",
                          },
                          {
                            label: "18",
                            value: "18",
                          },
                          {
                            label: "19",
                            value: "19",
                          },
                          {
                            label: "20",
                            value: "20",
                          },
                          {
                            label: "21",
                            value: "21",
                          },
                          {
                            label: "22",
                            value: "22",
                          },
                          {
                            label: "23",
                            value: "23",
                          },
                          {
                            label: "24",
                            value: "24",
                          },
                          {
                            label: "25",
                            value: "25",
                          },
                          {
                            label: "26",
                            value: "26",
                          },
                          {
                            label: "27",
                            value: "27",
                          },
                          {
                            label: "28",
                            value: "28",
                          },
                          {
                            label: "29",
                            value: "29",
                          },
                          {
                            label: "30",
                            value: "30",
                          },
                          {
                            label: "31",
                            value: "31",
                          },
                        ]}
                      />
                    </Form.Item>
                  ) : null}
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
                  {showOcu ? (
                    <>
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
                        <InputNumber
                          min={1}
                          max={365}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </>
                  ) : null}
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
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
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
                      Update Order
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
