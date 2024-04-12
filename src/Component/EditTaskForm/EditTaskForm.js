import React, { useState, useEffect } from "react";
import { psApiCalling } from "../../Component/API/Index";
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
import dayjs from "dayjs";
const { Option } = Select;

export default function CreateTaskForm(props) {
  const { code, id } = props;
  const [form] = Form.useForm();
  const [value, setValue] = useState(new Date());
  const [priority, setPriority] = useState([
    {
      label: "Low",
      value: "Low",
    },
    {
      label: "Medium",
      value: "Medium",
    },
    {
      label: "High",
      value: "High",
    },
  ]);
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

  const getAllEmployeeList = () => {
    let params = { action: "GET_EMPLOYEE_LIST" };
    psApiCalling(params).then((res) => {
      if (Array.isArray(res)) {
        setClientList(
          res.map((item) => {
            return {
              value: item.data.id,
              label: item.data.full_name,
            };
          })
        );
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
        employee_name: value.employee_name,
        start_date: date,
        time: time,
        repeat_every: value.repeat_every,
        repetation: value.repetation,
        ends_on: ends_on,
        type: value.type,
        week: week,
        selected_day: selected_day,
        days: day,
        task: value.task,
        task_header: value.task_header,
        created_by: value.created_by,
        priority: value.priority,
        id: id,
        code: code,
        action: "UPDATE_TASK_FOR_MONTH",
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
        employee_name: value.employee_name,
        start_date: date,
        time: time,
        repeat_every: value.repeat_every,
        repetation: value.repetation,
        ends_on: ends_on,
        action: "UPDATE_NEW_TASK",
        days: day,
        task_header: value.task_header,
        created_by: value.created_by,
        priority: value.priority,
        task: value.task,
        id: id,
        code: code,
      };
      console.log("params======>", params);
      psApiCalling(params).then((res) => {
        if (res.status === "success") {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      });
    }
  };

  const getTaskDetail = (id) => {
    let params = { action: "GET_TASK_DETAILS", id: id };
    psApiCalling(params).then((res) => {
      setDate(res.data.start_date);
      setTime(res.data.time);
      form.setFieldsValue({
        created_by: res.data.by_id,
        priority: res.data.priority,
        employee_name: res.data.eid,
        start_date: dayjs(res.data.start_date, "YYYY-MM-DD"),
        start_time: dayjs(res.data.time, "HH:mm a"),
        repeat_every: res.data.repeat_every,
        repetation: res.data.repetation,
        ends_on: res.data.ends_on,
        task_header: res.data.header,
        task: res.data.task,
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
    });
  };

  useEffect(() => {
    getTaskDetail(id);
  }, []);

  useEffect(() => {
    getAllEmployeeList();
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
              title="Update Task"
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
                    label="Created By"
                    name="created_by"
                    rules={[
                      {
                        required: true,
                        message: "Created By Employee is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                    }}
                  >
                    <Select
                      defaultValue="Select Employee"
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
                    label="Task Priority"
                    name="priority"
                    rules={[
                      {
                        required: true,
                        message: "Task Priority is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                      marginLeft: "10px",
                    }}
                  >
                    <Select
                      defaultValue="Select Priority"
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
                      onChange={(v) => {}}
                      options={priority}
                    />
                  </Form.Item>
                </Form.Item>

                <Form.Item
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Form.Item
                    label="Select Employee"
                    name="employee_name"
                    rules={[
                      {
                        required: true,
                        message: "Employee is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(100% - 8px)",
                    }}
                  >
                    <Select
                      defaultValue="Select Employee"
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
                </Form.Item>
                <Form.Item
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Form.Item
                    label="Start Date"
                    name="start_date"
                    rules={[
                      {
                        required: true,
                        message: "Start date is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(48%)",
                    }}
                  >
                    <DatePicker
                      onChange={onChangeDate}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Start Time"
                    name="start_time"
                    rules={[
                      {
                        required: true,
                        message: "Start time is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50%)",
                      marginLeft: "10px",
                    }}
                  >
                    <TimePicker
                      onChange={onChangeTime}
                      style={{ width: "100%" }}
                      format="h:mm a"
                    />
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
                      defaultValue="Select Task Repetation"
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
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
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
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
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
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
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
                          width: "calc(100% - 8px)",
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
                </Form.Item>
                <Form.Item
                  style={{
                    marginTop: 20,
                  }}
                >
                  <Form.Item
                    label="Header"
                    name="task_header"
                    rules={[
                      {
                        required: true,
                        message: "Task Header is required",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(100% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <Input placeholder={"Task Header"} />
                  </Form.Item>
                </Form.Item>
                <Form.Item
                  style={{
                    marginTop: 20,
                  }}
                >
                  <Form.Item
                    label="Task for this employee"
                    name="task"
                    rules={[
                      {
                        required: true,
                        message: "Task Message",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(100% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <Input.TextArea rows={5} />
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
                      Update Task
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
