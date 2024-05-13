import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, Route, Routes } from "react-router-dom";
import { Menu } from "primereact/menu";
import { Menubar } from "primereact/menubar";
import { ROUTES } from "../../enums/routes";
import * as Containers from "../";
import { GlobalContext } from "../../context";
import { Dialog } from "primereact/dialog";
import { UserType } from "../../enums/enum";
import { Button } from "primereact/button";

const Index = () => {
  const userData = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(GlobalContext);
  const [visible, setVisible] = useState(false);
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("auth");
    localStorage.removeItem("access_token");
    context?.setLogin(false);
  };

  const itemsMenuStart = (
    <span className="inline-flex align-items-center gap-1 px-2 py-2">
      <span className="text-xl font-bold text-white">
        СЕРВЕР<span className="text-orange-300"> БҮРТГЭЛ</span>
      </span>
    </span>
  );

  const itemsMenuEnd = (
    <div>
      <div onClick={() => setVisible(true)}>
        <label className="p-mr-2 text-white font-bold hover:cursor-pointer">
          Ажилтны код: {userData?.code}
        </label>
      </div>
      <Dialog visible={visible} onHide={() => setVisible(false)}>
        <div className="flex flex-column">
          <div className="field">
            <label className="label">Ажилтны код: {userData?.code}</label>
          </div>
          <div className="field">
            <label className="label">Овог: {userData?.fname}</label>
          </div>
          <div className="field">
            <label className="label">Нэр: {userData?.lname}</label>
          </div>
          <div className="field">
            <label className="label">
              Төрөл: {UserType?.find((x) => x.value === userData?.role).label}
            </label>
          </div>
          <Button
            label="Гарах"
            className="p-button-danger text-xs"
            icon="pi pi-sign-out"
            onClick={logout}
          />
        </div>
      </Dialog>
    </div>
  );

  const itemRenderer = (item) => {
    const onClick = () => {
      navigate(item?.href);
    };
    const isActive = activePath === item.href;

    return (
      <div
        className={`p-menuitem-content border-bottom-1 border-200 ${
          isActive ? "p-menuitem-active" : ""
        }`}
        onClick={onClick}
      >
        <span
          className={`flex align-items-center p-menuitem-link ${
            isActive ? "p-menuitem-active-text" : ""
          }`}
        >
          <span className="mx-2">{item?.label}</span>
        </span>
      </div>
    );
  };

  let adminItems = [
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
    // {
    //   label: "Мониторинг",
    //   template: itemRenderer,
    //   href: "/monitoring",
    // },
  ];

  let userItems = [
    {
      label: "Систем",
      template: itemRenderer,
      href: "/system",
    },
    // {
    //   label: "Мониторинг",
    //   template: itemRenderer,
    //   href: "/monitoring",
    // },
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
            className="border-none border-bottom-1 bg-bluegray-700 border-noround"
          />
        </div>
      </div>
      <div className="grid h-full">
        <div className="col-2 flex justify-content-start">
          <Menu
            model={userData?.role === 1 ? adminItems : userItems}
            className="w-full md:w-15rem border-none border-right-1 border-top-1"
          />
        </div>
        <div className="col-10 pr-3 h-full flex justify-content-start">
          <Routes location={location} key={location.pathname}>
            {renderRoutes()}
          </Routes>
        </div>
      </div>
      <Containers.AddEdit />
    </div>
  );
};

export default Index;
