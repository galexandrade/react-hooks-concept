import React, { useState } from 'react';
import axios from 'axios';

const todo = props => {
    /**
     * `useState` is an array with two rows:
     * [0] - The current state
     * [1] - Returns a function to manipulate the state
     * 
     * Only use at the top of the functional component
     * Only call `useState()` at the root level of the component
     */
    const [todoName, setTodoName] = useState('');
    const [todoList, setTodoList] = useState([]);

    const inputChangeHandler = (event) => {
        setTodoName(event.target.value);
    }

    const todoAddHandler = () => {
        setTodoList(todoList.concat(todoName));
        axios.post('https://todo-tasks-44aaf.firebaseio.com/todos.json', {name: todoName})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return <React.Fragment>
        <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={todoName}/>
        <button type="button" onClick={todoAddHandler}>Add</button>

        <ul>
            {todoList.map((todoItem, idx) => <li key={idx}>{todoItem}</li>)}
        </ul>
    </React.Fragment>
};

export default todo;