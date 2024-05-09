import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import { Routes, Route, Navigate } from "react-router-dom";
import { Menu } from "primereact/menu";
import * as Containers from "../";
import { Menubar } from "primereact/menubar";

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

  const itemsMenuBar = [
    {
      label: "File",
      icon: "pi pi-file",
      items: [
        {
          label: "New",
          icon: "pi pi-plus",
        },
        {
          label: "Print",
          icon: "pi pi-print",
        },
      ],
    },
    {
      label: "Search",
      icon: "pi pi-search",
    },
    {
      separator: true,
    },
    {
      label: "Sync",
      icon: "pi pi-cloud",
      items: [
        {
          label: "Import",
          icon: "pi pi-cloud-download",
        },
        {
          label: "Export",
          icon: "pi pi-cloud-upload",
        },
      ],
    },
  ];

  const itemRenderer = (item) => (
    <div className="p-menuitem-content">
      <a className="flex align-items-center p-menuitem-link" href={item?.href}>
        <span className="mx-2">{item?.label}</span>
      </a>
    </div>
  );

  let items = [
    {
      template: () => {
        return (
          <span className="inline-flex align-items-center gap-1 px-2 py-2">
            <span className="text-xl font-bold">
              СЕРВЕР<span className="text-primary"> БҮРТГЭЛ</span>
            </span>
          </span>
        );
      },
    },
    {
      separator: true,
    },
    {
      label: "Documents",
      template: itemRenderer,
    },
    {
      label: "Profile",
      template: itemRenderer,
    },
    {
      separator: true,
    },
  ];

  return (
    <div className="w-full h-full">
      <div className="grid">
        <div className="col-12">
          <Menubar model={itemsMenuBar} />
        </div>
      </div>
      <div className="grid h-full ">
        <div className="col-2 card flex justify-content-start">
          <Menu model={items} className="w-full md:w-15rem" />
        </div>
        <div className="col-10 card flex justify-content-center">
          <Menu model={items} className="w-full md:w-15rem" />
        </div>
      </div>
    </div>
  );
};

export default Index;
