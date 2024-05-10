import React from "react";
import { Password } from "primereact/password";
import { FloatLabel } from "primereact/floatlabel";

const Index = ({ value, setValue, key = "password", label = "Нууц үг" }) => {
  return (
    <div className="card flex justify-content-center">
      <FloatLabel>
        <Password
          value={value}
          onChange={(e) => setValue(e.target.value)}
          toggleMask
        />
        <label htmlFor={key}>{label}</label>
      </FloatLabel>
    </div>
  );
};

export default Index;
