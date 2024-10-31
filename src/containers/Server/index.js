import React, { useContext, useEffect } from "react";
import { Table } from "../../components";
import { ServerListColumns } from "../../enums/columns";
import { GlobalContext } from "../../context";

const Index = (props) => {
  const context = useContext(GlobalContext);
  const data = context?.resserverlist || [];

  useEffect(() => {
    document.title = "Хост";
  }, []);

  return (
    <>
      <Table columns={ServerListColumns} data={data} />
    </>
  );
};

export default Index;
