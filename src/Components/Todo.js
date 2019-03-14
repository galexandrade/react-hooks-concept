import React, { useState, useEffect } from 'react';
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

    /**
     * `useEffect` runs after every render cycle
     */
    useEffect(() => {
        axios.get('https://todo-tasks-44aaf.firebaseio.com/todos.json')
            .then(result => {
                console.log(result);
                const todoData = result.data;
                let todos = [];
                for (const key in todoData){
                    todos.push({
                        id: key,
                        ...todoData[key]
                    })
                }

                setTodoList(todos);
            }); 
            
        return () => {
            console.log('Cleanup');
        }
    }, [todoName]);

    const mouseMoveHandler = event => {
        console.log(event.clientX, event.clientY);
    }

    useEffect(() => {
        console.log('Going to add EventListener');
        document.addEventListener('mousemove', mouseMoveHandler);

        //This will be executed before running a new call to `useEffect` callback
        return () => {
            console.log('Removing the old listener before run the `useEffect` callback again');
            document.removeEventListener('mousemove', mouseMoveHandler);
        }
    });

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
            {todoList.map(todoItem => <li key={todoItem.id}>{todoItem.name}</li>)}
        </ul>
    </React.Fragment>
};

export default todo;