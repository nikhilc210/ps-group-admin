import React, { useMemo, useState, useEffect } from "react";
import { Space, Table, Tag, Input } from "antd";
import FilterComponent from "../../Component/FilterComponent/Index";
export default function Index(props) {
  const propData = props.data;
  const [filterText, setFilterText] = React.useState("");
  const [data, setData] = useState(propData);
  const [filteredData, setFilteredData] = useState(propData);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const filterData = (q) => {
    const filteredItems = data.filter(
      (item) =>
        JSON.stringify(item).toLowerCase().indexOf(q.toLowerCase()) !== -1
    );
    setFilteredData(filteredItems);
  };

  useEffect(() => {
    setData(props.data);
    setFilteredData(props.data);
  }, [props]);

  return (
    <div>
      <div>
        <Input
          placeholder={"Search"}
          style={{ width: "20%", float: "right", marginBottom: 10 }}
          onChange={(v) => filterData(v.target.value)}
        />
      </div>
      <Table
        columns={props.col}
        dataSource={filteredData}
        style={{ minHeight: "800px" }}
      />
    </div>
  );
}
