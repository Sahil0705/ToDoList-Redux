import React, { useState, useEffect } from "react";
import todo from "../images/todo.png"
import todolight from "../images/todolight.png"
import {addItems, deleteItems, updateItems, removeAllItems } from '../actions/index';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// get the localStorage data back

let list_ls;

const getLocalData = () => {
  list_ls = localStorage.getItem("todolist_redux");
  console.log(list_ls);
  if (list_ls) {
    return JSON.parse(list_ls);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  let [theme, setTheme] = useState("dark");
  const dispatch  = useDispatch();
  let list  = useSelector((state)=> state.functionality.list);
  const toggle  = useSelector((state)=> state.functionality.toggle);

  function changeTheme()
  {
    // alert(theme);
    if(theme=='dark')
    {
        document.body.style.backgroundColor='#F0FFFF';
        document.getElementById('IdOfInput').style.backgroundColor='rgb(85, 41, 220)';
        document.getElementById('IdOfInput').focus();
        document.getElementById('IdOfInput').classList.add('your-class');
        document.getElementById('cap').style.color='black';
        document.getElementById('faw').classList.replace("fa-sun","fa-moon");
        document.getElementById('faw').title='Dark Theme..?';
        document.getElementById('themebtn').style.color='black';
        document.getElementById('i').src=todolight;
        setTheme('light');
    }
    else if(theme='light')
    {
        document.body.style.backgroundColor='#060822';
        document.getElementById('IdOfInput').style.backgroundColor='white';
        document.getElementById('IdOfInput').focus();
        document.getElementById('IdOfInput').classList.remove('your-class');
        document.getElementById('cap').style.color='white';
        document.getElementById('faw').classList.replace("fa-moon","fa-sun");
        document.getElementById('faw').title='Light Theme..?'
        document.getElementById('themebtn').style.color='white';
        document.getElementById('i').src=todo;
        setTheme('dark');
    }
  }

  useEffect(() => {
    document.getElementById("IdOfInput").focus();
    localStorage.setItem("todolist_redux", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
        <button id='themebtn' onClick={changeTheme}><i className="far fa-sun" title='Light Theme..?' id="faw"></i></button>
          <figure style={{display:"inline"}}>
          <img src={todo} alt='todo' id='i'/>
          <div className="theme" style={{display:"inline", height:"300", width:"300"}}>
          
          </div>
            <figcaption ><b id='cap'>Add Your List...✌</b>
            </figcaption>
            
          </figure>
          
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add an Item..."
              autoComplete="off"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
              id='IdOfInput'
            />
            
            {toggle ? (
              <i className="far fa-edit add-btn" title='Edit Item' onClick={()=> 
              {
                  document.getElementById("cap").innerHTML = 'Add Your List...✌';
                  dispatch(addItems(inputdata,"Edit"));
                  setInputData("");
              }
            }></i>
            ) : (
              <i className="fa fa-plus add-btn" title='Add Item' onClick={()=> 
              {
                  dispatch(addItems(inputdata,"Add"));
                  setInputData("");
              }
            }></i>
            )}
          </div>
          
          <div className="showItems">
            {list.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.data}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={()=> 
                        {
                          document.getElementById("cap").innerHTML = 'Update Your List...✌';
                          document.getElementById("IdOfInput").focus();
                          dispatch(updateItems(curElem.id,curElem.data));
                          setInputData(curElem.data);
                        }
                      } 
                    title='Edit Item'></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={()=> {
                      dispatch(deleteItems(curElem.id))
                      }} title='Delete Item'></i>
                  </div>
                </div>
              );
            })}
          </div>

            {list.length!=0 ? 
              <div>
                    <button
                      className="btn_remove"
                      onClick={()=> dispatch(removeAllItems())}
                      >
                      <span style={{fontFamily:'Convergence'}}>Remove All</span>
                    </button>
                  </div>
            : null}
          
        </div>
      </div>
    </>
  );
};

export default Todo;