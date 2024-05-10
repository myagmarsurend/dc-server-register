import React, { useContext } from "react";
import { Table } from "../../components";
import { ServerListColumns } from "../../enums/columns";
import { GlobalContext } from "../../context";

const Index = (props) => {
  const context = useContext(GlobalContext);
  const data = context?.resserverlist || [];

  return (
    <>
      <Table columns={ServerListColumns} data={data} />
    </>
  );
};

export default Index;