import React, { useContext } from "react";
import { Table } from "../../components";
import { VpcColumns } from "../../enums/columns";
import { GlobalContext } from "../../context";

const Index = (props) => {
  const context = useContext(GlobalContext);
  const data = context?.resvpclist || [];

  return (
    <>
      <Table columns={VpcColumns} data={data} />
    </>
  );
};

export default Index;
