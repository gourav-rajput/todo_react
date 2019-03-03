import React from "react";

const Button = (props) => <button onClick = {props.handleClick} className={props.className}>{props.value}</button>

export default (Button);