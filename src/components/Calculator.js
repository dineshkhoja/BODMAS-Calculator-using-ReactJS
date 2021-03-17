import React, { Component } from 'react';

import _ from'lodash';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import './Calculator.css';

export default class Calculator extends Component {

  constructor(props) {
    super(props)

    this.state = {
      calcResult: "",
      isResultNegative: false,
      specialCharsInCalc: ['+', '-', '*', '/'],
    };
  }

  verifyLastCharacter() {
    let specialCharacters = this.state.specialCharsInCalc;
    let resultLastChar = this.state.calcResult.slice(-1);
    if (!specialCharacters.includes(resultLastChar)) {
      return true;
    }
    return false;
  }

  verifyBrakets(resultString) {
    let openingBracketCount = (resultString) => _.sumBy(resultString, char => char === '(');
    let ClosingBracketCount = (resultString) => _.sumBy(resultString, char => char === ')');

    if (openingBracketCount === ClosingBracketCount) {
      return true;
    }
    return false;
  }

  handleInput(value) {
    this.setState({
      calcResult: (this.verifyLastCharacter) ? this.state.calcResult + value : this.state.calcResult.slice(0, -1) + value,
    });
  }

  handleClearScreen() {
    this.setState({
      calcResult: "",
    });
  }

  handleBackspace() {
    this.setState({
      calcResult: (this.state.calcResult).slice(0, -1),
    });
  }

  handleNegation() {

    let str = "50+20-2(1+5*3)/4"

    console.log("Testing alert>>>>>>>>>>>>>>>>>>>", parseFloat(str));
    
    // console.log("Before negation", this.state.calcResult);
    // if (!(_.some(this.state.specialCharsInCalc, (el) => _.includes(this.state.calcResult, el)))) {
    //   this.setState({
    //     calcResult: (-1) * parseFloat(this.state.calcResult),
    //   });
    // }
    // console.log("After negation", this.state.calcResult);
  }

  GetResult() {
    if (this.verifyLastCharacter && this.verifyBrakets) {
      // console.log("Tetsing----------", eval(this.state.calcResult));
      // this.setState({
      //   calcResult: eval(this.state.calcResult),
      // });
    }
  }

  render() {
    return (
      <div className="cardContainer">
        <Card className="card">
          <CardContent>
            <Grid container spacing={1}>

              <Grid item xs={12}>
                <Paper className="outputScreen">
                <Typography className="resultContainer" variant="h5" gutterBottom>
                  {this.state.calcResult}
                </Typography>
                </Paper>
              </Grid>

              <Grid item xs={3}>
                <Button onClick={() => { this.handleInput(1) }} variant="outlined">1</Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => { this.handleInput(2) }} variant="outlined">2</Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => { this.handleInput(3) }} variant="outlined">3</Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => { this.handleInput('+') }} title="Add" variant="outlined">+</Button>
              </Grid>

              <Grid item xs={3}>
                <Button onClick={() => { this.handleInput(4) }} variant="outlined">4</Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => { this.handleInput(5) }} variant="outlined">5</Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => { this.handleInput(6) }} variant="outlined">6</Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => { this.handleInput('-') }} title="Substract" variant="outlined">-</Button>
              </Grid>

              <Grid item xs={3}>
                <Button onClick={() => { this.handleInput(7) }} variant="outlined">7</Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => { this.handleInput(8) }} variant="outlined">8</Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => { this.handleInput(9) }} variant="outlined">9</Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => { this.handleInput('*') }} title="Muliply" variant="outlined">X</Button>
              </Grid>

              <Grid item xs={3}>
                <Button onClick={() => { this.handleInput('.') }} variant="outlined">.</Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => { this.handleInput(0) }} variant="outlined">0</Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => { this.GetResult() }} variant="outlined">=</Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => { this.handleInput('/') }} title="Divide" variant="outlined">/</Button>
              </Grid>

              <Grid item xs={3}>
                <Button onClick={this.handleClearScreen.bind(this)} title="Clear screen" variant="outlined">Clear</Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => { this.handleInput('(') }} variant="outlined">(</Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => { this.handleInput(')') }} variant="outlined">)</Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={this.handleBackspace.bind(this)} title="Backspace" variant="outlined">⌫</Button>
              </Grid>

              {
                // Conditionaly showing scientific view.
                (this.props.scientificMode) ?
                <>
                  {
                    (this.state.isResultNegative) ?
                    <Grid item xs={4}>
                      <Button onClick={this.handleNegation} title="Change sign to negative" variant="outlined">-ive</Button>
                    </Grid>
                    :
                    <Grid item xs={4}>
                      <Button onClick={this.handleNegation.bind(this)} title="change sign to positive" variant="outlined">+ive</Button>
                    </Grid>
                  }
                  <Grid item xs={4}>
                    <Button onClick={() => { this.handleInput('') }} title="Squire" variant="outlined">x ²</Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button onClick={() => { this.handleInput('√') }} title="Square root" variant="outlined">√</Button>
                  </Grid>
                </>
                : undefined
              }

            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}
