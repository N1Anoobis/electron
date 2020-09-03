import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  state = {
    status: 'off',
    time: 1200,
    timer: 1,
  }

  step = () => {
    const { time } = this.state;
    const { status } = this.state;
    this.setState({
      time: time - 1,
    });
    if (time === 0) {
      if (status === 'work') {
        this.playBell();
        this.setState({
          time: 20,
          status: 'rest',
        })
      }
      if (status === 'rest') {
        this.playBell();
        this.setState({
          time: 1200,
          status: 'work',
        })
      }
    }
  };

  startTimer = () => {
    this.playBell();
    this.setState({
      timer: setInterval(this.step, 1000),
      time: 1200,
      status: 'work',
    });
  }

  stopTimer = () => {
    clearInterval(this.state.timer)
    this.setState({
      time: 1200,
      status: 'off',
    });
  }

  playBell = () => {
    const audio = new Audio('./sounds/bell.wav')
    audio.play();
  }

  closeApp = () => {
    window.close()
  }

  formatTime() {
    const { time } = this.state;
    const minutes = Math.floor(time / 60);
    const secunds = time % 60;
    return `${minutes < 10 ?
      '0' + minutes :
      minutes}:${secunds < 10 ?
        '0' + secunds :
        secunds}`;
  };

  render() {
    const { status } = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {status === 'off' ?
          <div><p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p></div> :
          null}
        {status === 'work' ?
          <img src="./images/Work.png" /> :
          null}
        {status === 'rest' ?
          <img src="./images/Rest.png" /> :
          null}
        {status === 'work' || 'rest' ?
          <div className="timer">
            {this.formatTime()}
          </div> :
          null}
        {status === 'off' ?
          <button className="btn" onClick={this.startTimer}>Start</button> :
          null}
        {status === 'work' || 'rest' ?
          <button className="btn" onClick={this.stopTimer}>Stop</button> :
          null}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
