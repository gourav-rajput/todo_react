import React, { Component } from "react";
import { connect } from "react-redux";
import { addNew, editTodo, toggleComplete, deleteTodo } from "../actions";
import Button from "./button";


class ToDo extends Component{
  constructor(props){
    super(props);

    this.state = {
      list: [...props.list],
      inputValue: "",
      openedEditBoxId: "",
      editValue: ""
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

  handleNewIputChange = inputValue => this.setState({ inputValue });

  handleEditInputChange = editValue => this.setState({ editValue });

  checkForDuplicate = inputValue => this.state.list.some(item => inputValue === item.content);

  handleClickAdd = () => {
    let { inputValue } = this.state;
    inputValue = inputValue.trim();
    if (inputValue !== "" && !this.checkForDuplicate(inputValue)) {
      let id = this.getUniqueId(inputValue);
      this.props.addNew({content: inputValue, id});
    } else alert("Check the Input Value");  
  }

  editTodo = listItem => this.setState({ openedEditBoxId: listItem.id, editValue: listItem.content });

  onEnterChange = id => {
    let { editValue } = this.state;
    editValue = editValue.trim();
    if (editValue !== "" && !this.checkForDuplicate(editValue)) {
      this.props.editTodo({ content: editValue, id});
      this.setState({ openedEditBoxId: ""});
    } else alert("Check the Input Value"); 
  }

  renderInput = () => <input className="new-task" onChange = {event => this.handleNewIputChange(event.target.value)} type="text" />

  renderAddButton = () => <Button handleClick = {() => this.handleClickAdd()} value = "Add" className="add-btn" />

  renderList = () => (
    <ul>
      {
        this.state.list.map((item, index) => (
          <li key={item.id}>
            {
              item.id === this.state.openedEditBoxId ?
                <div className="edit-box-container">
                  <input value={this.state.editValue} type="text" onChange = {event => this.handleEditInputChange(event.target.value)} />
                  <Button handleClick = {() => this.onEnterChange(item.id)} className="change" value="Change" />
                </div>
              :
                <div>
                  <input checked = {item.completed} onChange = {() => this.props.toggleComplete(item.id)} type="checkbox" />
                    <label className={item.completed ? "completed-task" : ""}>
                      {item.content}
                    </label>
                    <Button handleClick = {() => this.editTodo(item)} className="edit" value="Edit" />
                    <Button handleClick = {() => this.props.deleteTodo(item.id)} className="delete" value="Delete" />
                </div>
            }
          </li>
        ))
      }
    </ul>
  )

  render(){
    return(
      <div className="container">
        <h2>TODO LIST</h2>
         <h3>Add Item</h3>
         <p>
           {this.renderInput()}
           {this.renderAddButton()}
         </p>
         <h3>ToDos</h3>
          {this.renderList()}
      </div>
     )
  }
} 

const mapStateToProps = state => ({ list: state.todos.list });

export default connect(mapStateToProps, {
  addNew,
  editTodo,
  toggleComplete,
  deleteTodo
})(ToDo);
