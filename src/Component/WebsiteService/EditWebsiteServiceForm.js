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
import { psApiCalling } from "../API/Index";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FileUploader } from "react-drag-drop-files";
import { SyncLoader } from "react-spinners";
import { uploadImage } from "../API/Index";
import { Image } from "react-bootstrap";
const { Option } = Select;

export default function EditWebsiteServiceForm(props) {
  const { id } = props;
  const [form] = Form.useForm();
  const fileTypes = ["jpg", "png", "gif"];
  const [isLoading, setIsLoading] = useState(false);
  const [website, setWebsite] = useState(null);
  const [description, setDescription] = useState(null);
  const onChangeDate = (v) => {};
  const onFinish = (values) => {
    if (website === null) {
      toast.error("Please select service image");
    } else if (description === null) {
      toast.error("Please enter service description");
    } else {
      let params = {
        action: "UPDATE_SERVICE",
        service_name: values.service_name,
        description: description,
        image: website,
        id: id,
      };
      psApiCalling(params).then((res) => {
        if (res.status === "success") {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      });
    }

    console.log(values);
  };

  const uploadImageToServer = (file, type) => {
    setIsLoading(true);
    if (type === "website") {
      let formdata = new FormData();
      formdata.append("image", file);
      formdata.append("action", "UPLOAD_IMAGE");
      uploadImage(formdata).then((res) => {
        //console.log(res);
        setIsLoading(false);
        if (res.data.status === "success") {
          setWebsite(res.data.imageURL);
        }
      });
    }
  };

  const getServiceDetail = () => {
    let params = { action: "GET_WEBSITE_SERVICE_DETAILS", id: id };
    psApiCalling(params).then((res) => {
      if (res.status === "success") {
        form.setFieldsValue({
          service_name: res.name,
        });
        setDescription(res.desc);
        setWebsite(res.image);
      }
    });
  };

  useEffect(() => {
    getServiceDetail();
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
              title="Edit Website Service"
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
                  label="Website Service Name"
                  name="service_name"
                  rules={[
                    {
                      required: true,
                      message: "Service name is required",
                    },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(100% - 0px)",
                  }}
                >
                  <Input placeholder="Service Name" />
                </Form.Item>
                <Form.Item
                  label="Website Service Description"
                  name="service_description"
                  rules={[
                    {
                      required: true,
                      message: "Service description is required",
                    },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(100% - 0px)",
                  }}
                >
                  <CKEditor
                    editor={ClassicEditor}
                    data={description}
                    onChange={(event, editor) => {
                      setDescription(editor.getData());
                    }}
                    onBlur={(event, editor) => {
                      console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="Website Service Image"
                  name="service_image"
                  style={{
                    display: "inline-block",
                    width: "calc(100% - 0px)",
                  }}
                >
                  <Image
                    src={website}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <FileUploader
                    handleChange={(file) => {
                      uploadImageToServer(file, "website");
                    }}
                    name="file"
                    types={fileTypes}
                    multiple={false}
                    label={"Website Service Image"}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  label=" "
                  colon={false}
                  style={{
                    display: "inline-block",
                    width: "calc(100% - 0px)",
                  }}
                >
                  {isLoading ? (
                    <SyncLoader
                      color={"#008080"}
                      size={15}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                      cssOverride={{ marginTop: "20px" }}
                      style={{ marginTop: "20px" }}
                      margin={"20px"}
                    />
                  ) : (
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%", background: "#3E4095" }}
                    >
                      Update Website Service
                    </Button>
                  )}
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
