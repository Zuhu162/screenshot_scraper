import React from "react";

function FormInput(props) {
  return (
    <div className="formInput">
      <label style={{ marginBottom: "5px" }}>{props.label}</label>
      <input
        className="input"
        onChange={(e) => props.setVal(e.currentTarget.value)}
        placeholder={props.placeholder}
        required={true}
        pattern={props.pattern}
        type={props.type}
      ></input>
      <span className="error">{props.error}</span>
    </div>
  );
}

export default FormInput;
