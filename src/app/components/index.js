import React, { Component } from "react";
import { connect } from "react-redux";
import { addNew, toggleComplete, deleteTodo } from "../actions";
import Button from "./button";


class ToDo extends Component{
  constructor(props){
    super(props);

    this.state = {
      list: [...props.list],
      inputValue: ""
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.list !== prevState.list) {
      return { list: [ ...nextProps.list ] }
    }
    return null;
  }

  getUniqueId = itemValue => {
    let id = "";
    itemValue.replace(/\s/g, "");
    let idString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"+itemValue;
    for(let i = 0; i < 6; i++){
      id += idString.charAt(Math.floor(Math.random() * idString.length));
    }
    return id;
  }

  handleIputChange = event => this.setState({ inputValue : event.target.value });

  checkForDuplicate = inputValue => this.state.list.some(item => inputValue === item.content);

  handleClickAdd = () => {
    let { inputValue } = this.state;
    inputValue = inputValue.trim();
    if (inputValue !== "" && !this.checkForDuplicate(inputValue)) {
      let id = this.getUniqueId(inputValue);
      this.props.addNew({content: inputValue, id});
    } else alert("Check the Input Value");  
  }

  renderInput = () => (
    <div>
      <input onChange = {event => this.handleIputChange(event)} />
    </div>
  )

  renderAddButton = () => (
    <div>
      <Button handleClick = {() => this.handleClickAdd()} value = "Add"/>
    </div>
  )

  render(){
    return(
      <div>
        {
          this.state.list.map((item, index) => (
            <div key={item.id}>
              <p>{item.content}</p>
              <Button handleClick = {() => this.props.toggleComplete(item.id)} value={item.completed ? "Mark Uncomplete" : "Mark Completed"} />
              <Button handleClick = {() => this.props.deleteTodo(item.id)} value="Delete" />
            </div>
          ))
        }
        {this.renderInput()}
        {this.renderAddButton()}
      </div>
     )
  }
} 

const mapStateToProps = state => ({ list: state.todos.list });

export default connect(mapStateToProps, {
  addNew,
  toggleComplete,
  deleteTodo
})(ToDo);
