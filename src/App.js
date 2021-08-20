import React,{useState} from 'react';
import {MdAdd, MdCheck, MdCheckBox, MdClose, MdDelete, MdList} from 'react-icons/md';
import { FaPen } from 'react-icons/fa';
import './App.css';

const TodoCard  = ({todo ,todos , setTodos})=>{
  return(
    <div className = "todo__card">
      <div className = "card__left">
        <h4 className = {todo.isCompleted ? "completed" : ""}>{todo.todo}</h4>
        <p>{todo.time}</p>
      </div>
      <div className = "card__right">

        <div className = "complete" onClick = {
          //enable complete funtion
          ()=>{
            setTodos(todos.map(todoItem => {
              if(todoItem.id === todo.id){
                return {...todoItem, isCompleted : !todoItem.isCompleted}
              }else{
                return todoItem
              }
            }))
        }}>
          {todo.isCompleted ? <MdCheckBox/> : <MdCheck/>}
        </div>
        <div className = "del" onClick = {
          //delete the todo function
          ()=>{
          setTodos(todos.filter(todoItem => {
            return todoItem.id !== todo.id
          }))
        }}>
          <MdDelete/>
        </div>

      </div>
    </div>
  )
}


function App() {

  var todoObj = {
    todo : "",
    time : "",
    id :  "",
    isCompleted : false
  }
  var [todo,setTodo ] = useState(todoObj)
  var [todoList, setTodoList] = useState([])

  const handleInputChange = (e)=>{
    var {name,value} = e.target;
    setTodo({...todo,
      [name] : value,
    })
    
  }

  const handleAddTodo = ()=>{
    if(todo.todo !== "" && todoList.length !== 20 ){
      setTodoList([...todoList,{...todo, id : Math.random() * 100}]);
      setTodo({todo : "", time : "", id  : ""});
    }
    if(todoList.length === 20){
      alert("the maximum todo is 9")
    }
    if(todo.todo ===  ""){
      alert("Please! You must enter a todo")
    }
    //else do nothing 
  }
  return (
    <div className="app">
      {/* topBar */}
      <div className = "topBar">
        <div className = "app__title">
          <MdList className = "list__icon"/>
          <h4>TODO-LIST</h4>
        </div>

        <div className = "count">
          {/* count icon */}
          <FaPen/>
          {todoList.length}
        </div>

      </div>


      <div className = "list__of__todos">
        {/* list of cards goes here */}
        
        {todoList.length === 0 
        ?
         <div>
         </div>
        : 
          todoList.map(todoL => {
          return <TodoCard key = {todoL.id}   todo = {todoL} setTodos = {setTodoList}  todos = {todoList}/>
        })}

      </div>

      {/* button to add todo  */}
      <div className = "add__todo" onClick = {()=>{
         let addCard = document.querySelector(".add__card__background");
         addCard.style.display = "flex";
        }}>
        <MdAdd/>
      </div>


      {/* card to add todo */}
      <div className = "add__card__background">

        <div className = "add__card">
          <div className = "close"><span onClick = {()=>{
            let addCard = document.querySelector(".add__card__background");
            addCard.style.display = "none";
          }}><MdClose/></span></div>

          <h3>ADD TODO</h3>
          
          <input type = "text" maxLength = "30" placeholder = "enter todo" name = "todo" value = {todo.todo} onChange = {handleInputChange} />
          <input type = "time"  value = {todo.time} name = "time" onChange = {handleInputChange}/>

          <button onClick = {handleAddTodo}>ADD</button>
        </div>
      </div>
    </div>
  );
}

export default App;
