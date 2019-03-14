import React, { Component } from 'react';
import Todo from './Components/Todo';
import Header from './Components/Header';
import Auth from './Components/Auth';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <hr/>
        <Todo />
        <Auth />
      </div>
    );
  }
}

export default App;
