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
      calcInfo: "",
      isResultNegative: false,
      specialCharsInCalc: ['+', '-', '*', '/'],
    };
  }

  // TO check if there is extra operator sybol at the end of string
  verifyLastCharacter() {
    if (!this.state.specialCharsInCalc.includes(this.state.calcResult.slice(-1))) {
      return true;
    }
    return false;
  }

  // Checking if number of opening and closing brackets are same.
  verifyBrakets(resultString, operation) {
    let bracketsCount = {
      openingBracketCount: _.countBy(resultString)['('],
      ClosingBracketCount: _.countBy(resultString)[')'],
    }
    if (bracketsCount.openingBracketCount === bracketsCount.ClosingBracketCount) {
      return (operation === "verify") ? true : bracketsCount;
    }
    return (operation === "verify") ? false : bracketsCount;
  }

  // Taking input from calculator.
  handleInput(value) {

    let bracketCounts =this.verifyBrakets(this.state.calcResult, "counts");

    if (
      // Multiple dots(.).
      (value === '.' && this.state.calcResult.slice(-1) === '.') || 
      // Multiple square symbols (²).
      (value === '²' && this.state.calcResult.slice(-1) === '²') ||
      // Direct valie after square symbol (²).
      (this.state.calcResult.slice(-1) === '²' && !['+', '-', '*', '/', '('].includes(value)) ||
      (value === '√' && this.state.calcResult.slice(-1) === '√') ||
      // Direct square root symbol after value.
      (!['+', '-', '*', '/', ')'].includes(this.state.calcResult.slice(-1)) && value === '√')
    ) {
      // Not permitting new entry.
    } else if (
      value === ')' &&
      ((bracketCounts.openingBracketCount === undefined && bracketCounts.ClosingBracketCount === undefined) ||
      (bracketCounts.openingBracketCount <= bracketCounts.ClosingBracketCount))
    ) {
      // If there is opening bracking, not permitting to add closing bracket.
    } else if (this.state.specialCharsInCalc.includes(value) &&
      this.state.specialCharsInCalc.includes(this.state.calcResult.substr(-1))) {
      this.setState({
        calcResult: (this.state.calcResult).slice(0, -1) + value,
      });
    } else if (this.state.calcResult !== null && 
      this.state.calcResult.length < 20) {
      this.setState({
        calcResult: (this.verifyLastCharacter) ? this.state.calcResult + value : this.state.calcResult.slice(0, -1) + value,
      });
    }
     else {
       // As of now letting it be, if required can give info for snackbar.
    }
  }

  // To clear result string.
  handleClearScreen() {
    this.setState({
      calcResult: "",
    });
  }

  // To remove last character of the result string.
  handleBackspace() {
    this.setState({
      calcResult: (this.state.calcResult).slice(0, -1),
    });
  }

  // TO get square of the input.
  getSquare(inputValue) {
    return inputValue * inputValue;
  }

  // To get floor square root of the input
  getFloorSquareRoot(inputValue) {

    if (inputValue === 0 || inputValue === 1) {
      return inputValue;
    }

    for(let i = 0; i <= inputValue/2; i++) {
      if (i * i > inputValue) {
        return (i - 1) * (i - 1);
      }
    }
  }

  // To make negative or positive result value.
  handleNegation() {

    if (['+', '-', '*', '/', '(', ')'].includes()) {

    }
  }

  // To get list of operators used and respective index in the result string
  getOperatorsArray(resultString) {
    let operationsArray = [];

    for (let i=0; i < resultString.length; i++) {
      let operator = {};
      if (this.state.specialCharsInCalc.includes(resultString.charAt(i))) {
        operator = {
          symbol: resultString.charAt(i),
          index: i,
        }
        operationsArray.push(operator);
      }
    }
    return operationsArray;
  }

  // To eval one operation
  evalOperation(firstOperand, operator, secondOperand) {

    let intermediateResult;
    switch(operator) {
      case '/':
        intermediateResult = firstOperand / secondOperand;     
        break;
      case '*':
        intermediateResult = firstOperand * secondOperand;
        break;
      case '+':
        intermediateResult = firstOperand + secondOperand;
        break;
      case '-':
        intermediateResult = firstOperand - secondOperand;
        break;
      default:
        // Not required...
    }
    intermediateResult = intermediateResult.toString();
    if (intermediateResult.slice(-3) === ".00") {
      return intermediateResult.slice(0, -3);
    }
    return intermediateResult;
  }

  // To process evaluation for identified operators array.
  processOperatorsArray(resultString, operationsArray) {

    for (let i = 0; i < operationsArray.length; i++) {
      if (operationsArray[i].symbol === '√') {
        resultString = (i === 0) ?
          this.getFloorSquareRoot(parseFloat(resultString.slice(1, operationsArray[i + 1].index)))
        : (i < operationsArray.length -1) ?
          this.getFloorSquareRoot(parseFloat(resultString.slice(operationsArray[i].index + 1, operationsArray[i + 1].index)))
        :
        this.getFloorSquareRoot(parseFloat(resultString.slice(operationsArray[i].index + 1)));

        operationsArray.splice(i, 1);
      } else if (false) {

      } else if (['*', '/'].includes(operationsArray[i].symbol)) {

        if (i === 0) {
          resultString = "";
          
        } else if (i === operationsArray.length - 1) {

        } else {

        }
      }
    }
  }

  // Getting result for calculator input
  GetResult(resultString) {

    // Require to handle square and square root scenarios in the expression.

    let refinedResultString;
    if (this.verifyLastCharacter() && this.verifyBrakets(resultString, "verify")) {
      // if (resultString.includes('(') || resultString.includes(')')) {
      //   let startIndex = resultString.lastIndexOf('(');
      //   let endIndex = resultString.indexOf(')');
  
      //   // Using recursion to get done with all the brackets
      //   refinedResultString = (startIndex > -1) ? resultString.slice() : "" + this.GetResult(resultString.slice) + (endIndex < resultString.length) ? resultString.slice() : "";
      // }

      /* If srtring starts with special character and that is minus(-),
      * then puting it as <0-> otherwise ignoring it.
      */
      if (this.state.specialCharsInCalc.includes(resultString.charAt(0))) {
        refinedResultString = (resultString.charAt(0) === '-') ? "0-" + resultString.substr(1, resultString.length) : resultString.substr(1, resultString.length);
      }

      // let finalResult = eval(refinedResultString);
      // this.setState({
      //   calcResult: eval(refinedResultString),
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
                <Button onClick={() => { this.GetResult(this.state.calcResult) }} variant="outlined">=</Button>
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
                    <Button onClick={() => { this.handleInput('²') }} title="Squire" variant="outlined">x ²</Button>
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
