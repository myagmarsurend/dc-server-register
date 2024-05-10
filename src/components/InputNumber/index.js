import React from "react";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";

const Index = ({ value, setValue, label, key }) => {
  return (
    <div className="card flex justify-content-center">
      <FloatLabel>
        <InputNumber
          id={key}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label htmlFor={key}>{label}</label>
      </FloatLabel>
    </div>
  );
};

export default Index;
