import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ask from './api'

class App extends Component {
  constructor(props) {
    super(props)
    this.getAnswer = this.getAnswer.bind(this)
    this.state = {  
      answer: null
    }
  }

  getAnswer = () => ask().then(answer => this.setState({ answer }))

  render() {
    return (
      <div>
        <div className='question'>
          <input type='text' placeholder='What is your question?' />
          <button
            type='submit'
            onClick={ this.getAnswer }>
            Ask God!
          </button>
        </div>

        { this.state.answer && <div className='answer'>
          <h1>{ this.state.answer.answer }</h1>
          <img src={this.state.answer.image} />
        </div> }
      </div>
    );
  }
}

export default App;
