import React from 'react';

const list = props => {
    console.log('Will be render list...');
    return (
        <ul>
            {props.items.map(todoItem => (
                <li key={todoItem.id} onClick={props.onClick.bind(this, todoItem.id)}>
                    {todoItem.name}
                </li>
            ))}
        </ul>
    );
}

export default list;