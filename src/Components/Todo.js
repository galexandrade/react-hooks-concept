import React, { useState, useEffect, useReducer, useRef } from 'react';
import axios from 'axios';

const URL = 'https://todo-tasks-44aaf.firebaseio.com/todos';

const todo = props => {
    /**
     * `useState` returns an array with two elements:
     * [0] - The current state
     * [1] - Returns a function to manipulate the state
     * 
     * Only use at the top of the functional component
     * Only call `useState()` at the root level of the component
     */
    //const [todoName, setTodoName] = useState(''); /** Commented due to using `useRef` hook for this purpose */
    //const [todoList, setTodoList] = useState([]); /** Commented due to using useReducer hook for this purpose */

    /**
     * `useRef` creates a reference to be possible access some HTML element properties later 
     */
    const todoInputRef = useRef();

    // This is the reducer, pretty similar to Redux
    const todoListReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'REMOVE':
                return state.filter(todo => todo.id !== action.payload);
            default:
                return state;
        }
    }

    /**
     * `useReducer` takes three parameters
     * [0] - The reducer
     * [1] - The initial state
     * [0] - (Optional) the fist action
     * 
     * It returns an array with two elements:
     * [0] - The current state
     * [1] - The dispatch function to emmit actions
     */
    const [todoList, dispatch] = useReducer(todoListReducer, []);

    /**
     * `useEffect` runs after every render cycle
     */
    useEffect(() => {
        axios.get(URL + '.json')
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

                dispatch({
                    type: 'SET',
                    payload: todos
                });
            }); 
            
        return () => {
            console.log('Cleanup');
        }
    }, []);

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

    /** Commented due to using `useRef` hook for this purpose
    const inputChangeHandler = (event) => {
        setTodoName(event.target.value);
    }
    */

    const todoAddHandler = () => {
        // `todoInputRef.current` gets the current HTML properties
        let todoName = todoInputRef.current.value;
        axios.post(URL + '.json', {name: todoName})
            .then(res => {
                console.log(res);
                const todoItem = {
                    id: res.data.name,
                    name: todoName
                }
                dispatch({
                    type: 'ADD',
                    payload: todoItem
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    const todoRemoveHandler = todoId => {
        axios.delete(`${URL}/${todoId}.json`)
            .then(res => {
                dispatch({
                    type: 'REMOVE',
                    payload: todoId
                });
            })
            .catch(err => console.log(err));
    }

    return <React.Fragment>
        <input type="text" placeholder="Todo" ref={todoInputRef}/>
        <button type="button" onClick={todoAddHandler}>Add</button>

        <ul>
            {todoList.map(todoItem => <li key={todoItem.id} onClick={todoRemoveHandler.bind(this, todoItem.id)}>{todoItem.name}</li>)}
        </ul>
    </React.Fragment>
};

export default todo;