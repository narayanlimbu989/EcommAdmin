import React from "react";

const CustomInput = (props) => {
  const { type, label, name, value,max, onChange, _class } = props;
  return (
    <>
      <div className="form-floating mb-3">
        <input
          type={type}
          name={name}
          maxLength={max}
          value={value}
          onChange={onChange}
          className={`form-control ${_class}`}
          placeholder={label}
        />
        <label htmlFor={label}>{label}</label>
      </div>
    </>
  );
};

export default CustomInput;
