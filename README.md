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
