import React, { useContext, useEffect } from "react";
import { Table } from "../../components";
import { VpcColumns } from "../../enums/columns";
import { GlobalContext } from "../../context";

const Index = (props) => {
  const context = useContext(GlobalContext);
  const data = context?.resvirtuallist || [];

  useEffect(() => {
    document.title = "Виртуал";
  }, []);

  return (
    <>
      <Table columns={VpcColumns} data={data} />
    </>
  );
};

export default Index;
