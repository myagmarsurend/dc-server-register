import React from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

const Index = ({ value, setValue, label, id }) => {
  return (
    <div className="card flex justify-content-center">
      <FloatLabel>
        <InputText
          id={id}
        />
        <label htmlFor={id}>{label}</label>
      </FloatLabel>
    </div>
  );
};

export default Index;
