import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { Card, Space, Button, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";

export default function WebsiteService() {
  const [data, setData] = useState([]);

  useEffect(() => {}, []);

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
            md={10}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            sx={{ flexDirection: { xs: "column", md: "row" } }}
            style={{ marginTop: "0px" }}
          >
            <Card
              title="Website Service"
              extra={
                <Button
                  href="/createWebsiteService"
                  style={{ background: "#5f27cd", color: "#FFFFFF" }}
                >
                  Create Website Service
                </Button>
              }
              style={{
                width: "98%",
                marginLeft: "1%",
                marginTop: "30px",
              }}
            ></Card>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </Box>
  );
}
