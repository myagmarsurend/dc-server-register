import React, { useContext, useEffect } from "react";
import { Table } from "../../components";
import { UserListColumns } from "../../enums/columns";
import { GlobalContext } from "../../context";

const Index = (props) => {
  const context = useContext(GlobalContext);
  const data = context?.resuserlist || [];

  useEffect(() => {
    document.title = "Хэрэглэгч";
  }, []);

  return (
    <>
      <Table columns={UserListColumns} data={data} />
    </>
  );
};

export default Index;
