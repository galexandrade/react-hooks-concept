import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import axios from 'axios';
import List from './List';

//Importing a custom hook
import { useFormInput } from '../hooks/forms';

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
    //const [inputIsValid, setInputIsValid] = useState(false);
    const todoInput = useFormInput();

    /**
     * `useRef` creates a reference to be possible access some HTML element properties later 
     */
    //const todoInputRef = useRef(); /** Commented due to using custom hook for this purpose */ 

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

    /*
    useEffect(() => {
        console.log('Going to add EventListener');
        document.addEventListener('mousemove', mouseMoveHandler);

        //This will be executed before running a new call to `useEffect` callback
        return () => {
            console.log('Removing the old listener before run the `useEffect` callback again');
            document.removeEventListener('mousemove', mouseMoveHandler);
        }
    });
    */

    /** Commented due to using `useRef` hook for this purpose
    const inputChangeHandler = (event) => {
        setTodoName(event.target.value);
    }
    */

    const todoAddHandler = () => {
        // `todoInputRef.current` gets the current HTML properties
        //let todoName = todoInputRef.current.value;

        let todoName = todoInput.value;

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

    /* Commented due to using custom hook for this purpose
    const inputValidationHandler = (event) => {
        if(event.target.value.trim() === '')
            setInputIsValid(false);
        else
            setInputIsValid(true);
    }
    */

    /**
     * `useMemo` is used to avoid unnecessary rerenders on the component
     * In this case, the `<List>` component only will be rerendered if the `todoList` is changed
     * 
     * It takes two parameters
     * [0] - The function  returning the element to be rendered
     * [1] - An array of all the elements that if changed will trigger the function on the first parameter
     */
    const listComponent = useMemo(() => <List items={todoList} onClick={todoRemoveHandler} />, [todoList]);

    return <React.Fragment>
        <input 
            type="text" 
            placeholder="Todo" 
            onChange={todoInput.onChange}
            value={todoInput.value}
            style={{backgroundColor: todoInput.validity ? 'transparent' : 'red'}}/>
        <button type="button" onClick={todoAddHandler}>Add</button>

        {listComponent}
    </React.Fragment>
};

export default todo;