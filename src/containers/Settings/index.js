import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import { SettingsColumns } from "../../enums/columns";
import { Table } from "../../components";

const Index = (props) => {
  const context = useContext(GlobalContext);
  const data = context?.ressettingslist || [];

  useEffect(() => {
    document.title = "Тохиргоо";
  }, []);

  return (
    <>
      <Table columns={SettingsColumns} data={data} />
    </>
  );
};

export default Index;
