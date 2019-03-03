import React from "react";

const Button = (props) => (
  <button onClick = {props.handleClick}>{props.value}</button>
)

export default (Button);