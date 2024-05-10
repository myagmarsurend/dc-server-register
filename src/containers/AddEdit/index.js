import React from "react";
import { useLocation } from "react-router-dom";

const Index = (props) => {
  const location = useLocation();
  console.log("🚀 ~ Index ~ location:", location?.state?.data);

  return <div>ADDEDIT</div>;
};

export default Index;
