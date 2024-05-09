import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import { Routes, Route, Navigate } from "react-router-dom";
import { Menu } from "primereact/menu";
import * as Containers from "../";

const PrivateRoute = ({ Page, ...props }) => {
  if (!props.islogin && !props._auth) {
    return <Navigate to={"/login"} />;
  } else {
    return <Page {...props} />;
  }
};

const Index = (props) => {
  const context = useContext(GlobalContext);

  const fetchData = async () => {
    await context?.request({
      url: `user/getAllUser`,
      model: "userlist",
      method: "POST",
    });
    await context?.request({
      url: `virtual/getAllVirtual`,
      model: "vpclist",
      method: "POST",
    });
    await context?.request({
      url: `server/getAllServer`,
      model: "serverlist",
      method: "POST",
    });
    await context?.request({
      url: `system/getAllSystem`,
      model: "systemlist",
      method: "POST",
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex w-full h-full justify-content-center align-items-center">
      <Routes>
        <Route
          path="/*"
          element={<PrivateRoute {...context} Page={Containers.Management} />}
        />
        <Route path="/login" element={<Containers.Login {...context} />} />
      </Routes>
    </div>
  );
};

export default Index;
