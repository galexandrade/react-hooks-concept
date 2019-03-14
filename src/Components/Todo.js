import React, { useState } from 'react';

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
        console.log('HERE');
        setTodoList(todoList.concat(todoName));
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