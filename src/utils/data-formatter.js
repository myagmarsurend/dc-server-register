import { Tag } from "primereact/tag";
import { memo } from "react";
import { LocationUnit } from "../enums/enum";
import moment from "moment";

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
                : "linear-gradient(-225deg, #D78BF8 0%, #00F 48%, #AC32E4 100%)"
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
    case "date":
      return value && moment(value).format("YYYY-MM-DD");
    default:
      return <Tag value={value} severity={type} />;
  }
};

const getLocationTypeTag = (value) => {
  switch (value) {
    case LocationUnit.Салбар_1:
      return (
        <Tag
          value="Салбар-1"
          className="w-full"
          style={{ backgroundColor: "GrayText" }}
        />
      );
    case LocationUnit.Салбар_2:
      return (
        <Tag
          value="Салбар-2"
          className="w-full"
          style={{ backgroundColor: "GrayText" }}
        />
      );
    case LocationUnit.Салбар_3:
      return (
        <Tag
          value="Салбар-3"
          className="w-full"
          style={{ backgroundColor: "GrayText" }}
        />
      );
    case LocationUnit.Салбар_4:
      return (
        <Tag
          value="Салбар-4"
          className="w-full"
          style={{ backgroundColor: "GrayText" }}
        />
      );
    case LocationUnit.Mobicom:
      return (
        <Tag
          value="Mobicom"
          className="w-full"
          style={{ backgroundColor: "GrayText" }}
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

export default memo(Formatter);
