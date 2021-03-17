import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { ThemeProvider } from '@material-ui/core'

import './App.css';
import Calculator from '../../components/Calculator';


const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  }
});

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  }
});

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      scientificMode: false,
      selectedTheme: "lightTheme",
    };
  }

  handleSelectScientificMode() {
    this.setState({
      scientificMode: !this.state.scientificMode,
    });
  }

  async handleSwitchTheme(event, newSelectedTheme) {
    await this.setState({...this.state ,
      selectedTheme: (newSelectedTheme !== null) ? newSelectedTheme : this.state.selectedTheme
    });
  }

  render() {
    return (
      <ThemeProvider theme={(this.state.selectedTheme === "lightTheme") ? lightTheme : darkTheme}>

        <CssBaseline />

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
            value={this.state.selectedTheme}
            exclusive
            onChange={this.handleSwitchTheme.bind(this)}
            aria-label="text alignment"
          >
            <ToggleButton style={{ width: '150px' }} value="lightTheme" aria-label="left aligned">
              Light Theme
          </ToggleButton>
            <ToggleButton style={{ width: '150px' }} value="darkTheme" aria-label="centered">
              Dark theme
          </ToggleButton>
          </ToggleButtonGroup>

        </div>

        <Calculator scientificMode={this.state.scientificMode} />

      </ThemeProvider>
    );
  }
}
