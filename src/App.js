import React, { useState } from 'react';
import Todo from './Components/Todo';
import Header from './Components/Header';
import Auth from './Components/Auth';

const app = props => {

  const [page, setPage] = useState('auth');

  return (
    <div className="App">
      <Header onLoadAuth={() => setPage('auth')} onLoadTodos={() => setPage('todos')} />
      
      <hr/>
      {page === 'auth' ? <Auth /> : <Todo />}
    </div>
  );
}

export default app;
