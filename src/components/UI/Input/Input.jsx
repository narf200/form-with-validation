import React from "react";
import classes from "./Input.module.css";

export default function Input({
  labelName,
  type,
  id,
  value,
  onChange,
  onBlur,
}) {
  return (
    <div
      className={`${classes.control} ${
        value.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={id}>{labelName}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}
