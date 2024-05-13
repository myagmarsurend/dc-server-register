import React, { useContext, useEffect } from "react";
import { Table } from "../../components";
import { SystemListColumns } from "../../enums/columns";
import { GlobalContext } from "../../context";

const Index = (props) => {
  const context = useContext(GlobalContext);
  const data = context?.ressystemlist || [];


  useEffect(() => {
    document.title = "Систем";
  }, []);

  return (
    <>
      <Table columns={SystemListColumns} data={data} />
    </>
  );
};

export default Index;
