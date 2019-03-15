## React hooks

Implementing React Hooks (https://reactjs.org/docs/hooks-intro.html) with an app of tasks todo.

### `useState`

`useState` returns an array with two rows:
* [0] - The current state
* [1] - Returns a function to manipulate the state

General conventions
* Only use at the top of the functional component
* Only call `useState()` at the root level of the component

### `useEffect`

`useEffect` runs after every render cycle.
It takes two argumens:
* [0] - The functions to be executed
* [1] - The array with the elements that will change to trigger that function calls. If one of the elements on the list changes, the callback will be triggered
    - To reproduce `componentDidMount` use the this as `useEffect(() => console.log('some action'), [])`
    - To reproduce `componentDidUpdate` use the this as `useEffect(() => console.log('some action'), [someState])`
    - If no second parameter is passed, it will be executed every render cycle

To make a cleanup before running the function again you can return a function  on the callback:
```
useEffect(() => {
    console.log('Going to add EventListener');
    document.addEventListener('mousemove', mouseMoveHandler);

    //This will be executed before running a new call to `useEffect` callback
    return () => {
        console.log('Removing the old listener before run the `useEffect` callback again');
        document.removeEventListener('mousemove', mouseMoveHandler);
    }
});
```

To reproduce the behavior of the `componentDidUnmount` use:
```
useEffect(() => {
    //This will be executed when the component is unmounted
    return () => {
        console.log('componentDidUnmount');
    }
}, []);
```

### `useContext`

If you do not know the `React Context` take a look: (https://reactjs.org/docs/context.html)
`useContext` is used to get the context provided earlier. It is pretty similar the the Redux `mapStateToProps` and `mapDispatchToProps`, but the advantage is that you can get this data inside a functional component.

Step 1 - Create the context (it is not related to the hooks itself)
```
const authContext = React.createContext({status: false, login: () => {}});
```

Step 2 - Provide the context (it is not related to the hooks itself)
```
<AuthContext.Provider value={{status: authStatus, login: login}}>
    ...
</AuthContext.Provider>
```

Step 3 - Use the hook to get the context from  a functional component
```
import React, { useContext } from 'react';
import AuthContext from '../auth-context';

const auth = props => {
    const auth = useContext(AuthContext);

    return (
        <button onClick={auth.login}>Log In</button> 
    )
};

export default auth;
```

### `useReducer`

`useReducer` is a new feature to dispatch actions and get access to its state inside a functional component
It takes three parameters:
* [0] - The reducer
* [1] - The initial state
* [0] - (Optional) the fist action

It returns an array with two elements:
* [0] - The current state
* [1] - The dispatch function to emmit actions

Step 1 - Define the reducer function
```
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
```

Step 2 - Call `useReducer` hook
```
const [todoList, dispatch] = useReducer(todoListReducer, []);
```

Step 3 - Dispatch actions
```
dispatch({
    type: 'ADD',
    payload: todoItem
});
```

### `useRef`

`useRef` creates a reference to be possible access some HTML element properties later 

Step 1 - Create the reference
```
const todoInputRef = useRef();
```

Step 2 - Hook it up on the HTML element you want to reference
```
<input type="text" placeholder="Todo" ref={todoInputRef}/>
```

Step 3 - Access properties of the referencied element
```
const todoAddHandler = () => {
    // `todoInputRef.current` gets the current HTML properties
    let todoName = todoInputRef.current.value;
}
```
