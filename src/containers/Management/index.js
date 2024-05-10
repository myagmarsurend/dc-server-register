import React from "react";
import { useNavigate, useLocation, Route, Routes } from "react-router-dom";
import { Menu } from "primereact/menu";
import { Menubar } from "primereact/menubar";
import { ROUTES } from "../../enums/routes";
import * as Containers from "../";

const Index = (props) => {
  const userData = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();
  const location = useLocation();

  const itemsMenuStart = (
    <span className="inline-flex align-items-center gap-1 px-2 py-2">
      <span className="text-xl font-bold text-white">
        СЕРВЕР<span className="text-orange-300"> БҮРТГЭЛ</span>
      </span>
    </span>
  );

  const itemsMenuEnd = (
    <div>
      <label className="p-mr-2 text-white font-bold">
        Ажилтны код: {userData?.code}
      </label>
    </div>
  );

  const itemRenderer = (item) => {
    const isActive = location.pathname === item.href;
    const onClick = () => {
      navigate(item?.href);
    };

    return (
      <div
        className={`p-menuitem-content border-bottom-1 border-200 ${
          isActive ? "p-menuitem-active" : ""
        }`}
        onClick={onClick}
      >
        <span className="flex align-items-center p-menuitem-link">
          <span className="mx-2">{item?.label}</span>
        </span>
      </div>
    );
  };

  let items = [
    {
      label: "Хэрэглэгчийн жагсаалт",
      template: itemRenderer,
      href: "/user",
    },
    {
      label: "Сервер",
      template: itemRenderer,
      href: "/server",
    },
    {
      label: "Виртуал",
      template: itemRenderer,
      href: "/virtual",
    },
    {
      label: "Систем",
      template: itemRenderer,
      href: "/system",
    },
    {
      label: "Мониторинг",
      template: itemRenderer,
      href: "/monitoring",
    },
  ];

  const renderRoutes = () =>
    ROUTES.flatMap((route) => [
      <Route
        key={route.path}
        path={route.path}
        element={React.createElement(Containers[route.comp])}
      />,
      ...(route.subroutes || []).map((sub) => (
        <Route
          key={sub.path}
          path={sub.path}
          element={React.createElement(Containers[sub.comp])}
        />
      )),
    ]);

  return (
    <div className="w-full h-full">
      <div className="grid">
        <div className="col-12">
          <Menubar
            start={itemsMenuStart}
            end={itemsMenuEnd}
            className="border-none border-bottom-1 bg-bluegray-700"
          />
        </div>
      </div>
      <div className="grid h-full">
        <div className="col-2 flex justify-content-start">
          <Menu
            model={items}
            className="w-full md:w-15rem border-none border-right-1 border-top-1"
          />
        </div>
        <div className="col-10 pr-3 h-full flex justify-content-start">
          <Routes location={location} key={location.pathname}>
            {/* <Route path={"server"} element={<Containers.Server />} />
            <Route path={"virtual"} element={<Containers.Virtual />} />
            <Route path={"user"} element={<Containers.User />} />
            <Route path={"system"} element={<Containers.System />} />
            <Route path={"monitoring"} element={<Containers.Monitoring />} />
            <Route path={"add"} element={<Containers.AddEdit />} />
            <Route path={"edit"} element={<Containers.AddEdit />} /> */}
            {renderRoutes()}
            {/* {renderSubRoutes()} */}
          </Routes>
        </div>
      </div>
      <Containers.AddEdit />
    </div>
  );
};

export default Index;
