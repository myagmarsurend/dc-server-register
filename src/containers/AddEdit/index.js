import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import UserAddEdit from "./user";
import { Dialog } from "primereact/dialog";
import { GlobalContext } from "../../context";
import ServerAddEdit from "./server";
import VirtualAddEdit from "./virtual";
import SystemAddEdit from "./system";

const Index = (props) => {
  const context = useContext(GlobalContext);
  const location = useLocation();

  const getModal = () => {
    switch (location?.pathname) {
      case "/user":
        return <UserAddEdit data={location?.state?.data} />;
      case "/server":
        return <ServerAddEdit data={location?.state?.data} />;
      case "/virtual":
        return <VirtualAddEdit data={location?.state?.data} />;
      case "/sytem":
        return <SystemAddEdit data={location?.state?.data} />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      className="px-10"
      visible={context?.modal?.visible}
      onHide={() => context?.setModal({ visible: false, data: null })}
    >
      {getModal()}
    </Dialog>
  );
};

export default Index;
