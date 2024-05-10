import React from "react";
import { Dropdown } from "primereact/dropdown";

const Index = ({ value, setValue, data, key, placeholder }) => {
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={value}
        onChange={(e) => setValue(e.value)}
        options={data}
        optionLabel={key}
        placeholder={placeholder}
        className="w-full md:w-14rem"
      />
    </div>
  );
};

export default Index;
