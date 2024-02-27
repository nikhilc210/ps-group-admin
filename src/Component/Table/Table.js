import React from "react";
import { Space, Table, Tag } from "antd";

export default function Index(props) {
  return (
    <div>
      <Table
        columns={props.col}
        dataSource={props.data}
        scroll={{ x: "calc(700px + 50%)", y: 640 }}
      />
    </div>
  );
}
