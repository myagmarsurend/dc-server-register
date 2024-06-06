import { Tag } from "primereact/tag";
import { memo, useState } from "react";
import moment from "moment";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { SettingsPurposeType, SettingsType } from "../enums/enum";

const Formatter = ({ format, value, type, bg }) => {
  switch (format) {
    case "tag":
      return <Tag value={value} severity={type} />;
    case "isenable":
      return (
        <Tag
          value={value === 1 ? "Идэвхтэй" : "Идэвхгүй"}
          severity={value === 1 ? "success" : "danger"}
          icon={value === 1 ? "pi pi-check" : "pi pi-times"}
        />
      );
    case "role":
      return (
        <Tag
          value={value === 1 ? "Админ" : "Хэрэглэгч"}
          style={{
            background: `${
              value === 1
                ? "linear-gradient(-225deg,#AC32E4 0%,#7918F2 48%,#4801FF 100%)"
                : "linear-gradient(-225deg, #0F8 0%, #000 48%, #AC32E4 100%)"
            }`,
          }}
        />
      );
    case "locationtype":
      return getLocationTypeTag(value);
    case "ramunit":
      return getRamUnit(value);
    case "cpuunit":
      return getCpuUnit(value);
    case "os":
      return getOsUnit(value);
    case "date":
      return value && moment(value).format("YYYY-MM-DD");
    case "systemtype":
      return getSystemType(value);
    case "seemanual":
      return ViewManual(value);
    case "settingstype":
      return getSettingsType(value);
    case "settingspurposetype":
      return getSettingsPurposeType(value);
    default:
      return <Tag value={value} severity={type} />;
  }
};

const getLocationTypeTag = (value) => {
  switch (value) {
    case 1:
      return (
        <Tag
          value="Салбар-1"
          className="w-full"
          style={{ backgroundColor: "GrayText" }}
        />
      );
    case 2:
      return (
        <Tag
          value="Салбар-2"
          className="w-full"
          style={{ backgroundColor: "ActiveBorder" }}
        />
      );
    case 3:
      return (
        <Tag
          value="Салбар-3"
          className="w-full"
          style={{ backgroundColor: "rebeccapurple" }}
        />
      );
    case 4:
      return (
        <Tag
          value="Салбар-4"
          className="w-full"
          style={{ backgroundColor: "burlywood" }}
        />
      );
    case 5:
      return (
        <Tag
          value="Mobicom"
          className="w-full"
          style={{ backgroundColor: "InfoText" }}
        />
      );
    default:
      return null;
  }
};

const getRamUnit = (value) => {
  if (value === 1)
    return (
      <Tag
        value="GB"
        className="border-1"
        style={{
          backgroundColor: "transparent",
          color: "black",
          borderColor: "black",
        }}
      />
    );
  if (value === 2)
    return (
      <Tag
        value="MB"
        className="border-1"
        style={{
          backgroundColor: "transparent",
          color: "black",
          borderColor: "black",
        }}
      />
    );
};

const getCpuUnit = (value) => {
  if (value === 1)
    return (
      <Tag
        value="MHz"
        className="border-1"
        style={{
          backgroundColor: "transparent",
          color: "orange",
          borderColor: "orange",
        }}
      />
    );
  if (value === 2)
    return (
      <Tag
        value="GHz"
        className="border-1"
        style={{
          backgroundColor: "transparent",
          color: "orange",
          borderColor: "orange",
        }}
      />
    );
};

const getOsUnit = (value) => {
  switch (value) {
    case "Windows":
      return (
        <Tag
          value="Windows"
          className="w-full"
          style={{ backgroundColor: "GrayText" }}
        />
      );
    case "Ubuntu 20.04":
      return (
        <Tag
          value="Ubuntu 20.04"
          className="w-full"
          style={{ backgroundColor: "ActiveBorder" }}
        />
      );
    case "Ubuntu 22.04":
      return (
        <Tag
          value="Ubuntu 22.04"
          className="w-full"
          style={{ backgroundColor: "ButtonFace" }}
        />
      );
    case "Ubuntu 18.04":
      return (
        <Tag
          value="Ubuntu 18.04"
          className="w-full"
          style={{ backgroundColor: "burlywood" }}
        />
      );
    case "CentOs":
      return (
        <Tag
          value="CentOs"
          className="w-full"
          style={{ backgroundColor: "InfoText" }}
        />
      );
    default:
      return (
        <Tag
          value={value}
          className="w-full"
          style={{ backgroundColor: "InfoText" }}
        />
      );
  }
};

const getSystemType = (value) => {
  switch (value) {
    case 1:
      return (
        <Tag
          value="UI"
          className="w-full"
          style={{ backgroundColor: "green" }}
        />
      );
    case 2:
      return (
        <Tag
          value="DB"
          className="w-full"
          style={{ backgroundColor: "orange" }}
        />
      );
    case 3:
      return (
        <Tag
          value="API"
          className="w-full"
          style={{ backgroundColor: "blue" }}
        />
      );
    case 4:
      return (
        <Tag
          value="OTHER"
          className="w-full"
          style={{ backgroundColor: "black" }}
        />
      );
    default:
      return null;
  }
};

const ViewManual = (value) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        className="text-sm p-2 text-center"
        onClick={() => {
          setVisible(true);
        }}
      >
        Харах
      </Button>
      <Dialog
        closable
        onHide={() => {
          setVisible(false);
        }}
        header="Гарын авлага"
        visible={visible}
      >
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </Dialog>
    </>
  );
};

const getSettingsType = (value) => {
  return (
    <Tag
      value={SettingsType[value - 1].label}
      className="w-6"
      style={{ backgroundColor: "green" }}
    />
  );
};

const getSettingsPurposeType = (value) => {
  return (
    <Tag
      value={SettingsPurposeType[value - 1].label}
      className="w-6"
      style={{ backgroundColor: "purple" }}
    />
  );
};

export default memo(Formatter);
