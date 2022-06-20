import React from "react";

function Selecter(props) {
  return (
    <div className="formInput">
      <label style={{ marginBottom: "10px" }}>Image Format</label>
      <select
        style={{ padding: "5px", marginBottom: "20px" }}
        name="cars"
        id="cars"
        onChange={(e) => props.setVal(e.target.value)}
      >
        <option value="jpg">JPG</option>
        <option value="png">PNG</option>
      </select>
    </div>
  );
}

export default Selecter;
