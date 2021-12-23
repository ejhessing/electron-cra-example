import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { channels } from '../shared/constants';
const { ipcRenderer } = window; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: '',
      appVersion: '',
      messages: []
    }
    ipcRenderer.send(channels.APP_INFO);
    ipcRenderer.on(channels.APP_INFO, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.APP_INFO);
      const { appName, appVersion } = arg;
      this.setState({ ...this.state, appName, appVersion });
    });
    ipcRenderer.on(channels.MESSAGE, (event, arg) => {
      const { text } = arg;
      console.log('**', { event, arg })
      this.setState({ ...this.state, messages: [...this.state.messages, text] });
    });
  }

  render() {
    console.log('inside react app')
    const { appName, appVersion, messages } = this.state;
    console.log({ messages })
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{appName} version {appVersion}</p>
          {messages.map(text => {
            return (<p key={text}>{text}</p>)
          })}
        </header>
      </div>
    );
  }
}

export default App;
