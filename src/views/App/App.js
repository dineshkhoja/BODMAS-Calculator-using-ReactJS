import React, { Component } from 'react';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import './App.css';
import Calculator from '../../components/Calculator';

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      scientificMode: false,
      darkTheme: false,
    };
  }

  handleSelectScientificMode() {
    this.setState({
      scientificMode: !this.state.scientificMode,
    })
  }

  handleSwitchTheme() {
    this.setState({
      darkTheme: !this.state.darkTheme,
    })
  }

  render() {
    return (
      <>
        <div className="toggleButtons">

          <ToggleButton
            style={{ width: '300px' }}
            value="check"
            selected={this.state.scientificMode}
            onChange={this.handleSelectScientificMode.bind(this)}
          >
            Scientific mode
        </ToggleButton>

          <ToggleButtonGroup
            // value={alignment}
            exclusive
            onChange={this.handleSwitchTheme.bind(this)}
            aria-label="text alignment"
          >
            <ToggleButton style={{ width: '150px' }} value="left" aria-label="left aligned">
              Light Theme
          </ToggleButton>
            <ToggleButton style={{ width: '150px' }} value="center" aria-label="centered">
              Dark theme
          </ToggleButton>
          </ToggleButtonGroup>

        </div>

        <Calculator scientificMode={this.state.scientificMode} />
      </>
    );
  }
}
