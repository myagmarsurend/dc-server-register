import { InputText } from "primereact/inputtext";
import React from "react";

const Index = ({ id, type, placeholder, className }) => {
  return (
    <InputText
      id={id}
      type={type}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Index;
