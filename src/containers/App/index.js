/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import { Routes, Route, Navigate } from "react-router-dom";
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

  const fetchData = useCallback(async () => {
    const requests = [
      { url: 'user/getAllUser', model: 'userlist' },
      { url: 'virtual/getAllVirtual', model: 'virtuallist' },
      { url: 'server/getAllServer', model: 'serverlist' },
      { url: 'system/getAllSystem', model: 'systemlist' },
    ];

    const requestPromises = requests.map(request =>
      context?.request({
        ...request,
        method: 'POST',
      })
    );

    await Promise.all(requestPromises);
  }, [context]);

  useEffect(() => {
    if (context?._auth) {
      fetchData();
    }
  }, [context?._auth]);

  return (
    <div className="flex w-full h-full justify-content-center align-items-center bg-yellow-50">
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
