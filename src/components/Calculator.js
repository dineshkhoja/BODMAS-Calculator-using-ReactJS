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

  // Hanle negatioon has to be completed.

  constructor(props) {
    super(props);
    this.state = {
      calcResult: "0",
      accumlatorArray: [],
      calcInfo: "",
      isResultNegative: false,
      specialCharsInCalc: ['+', '-', '*', '/'],
      sciOperators: []
    };
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

  // TO check if there is extra operator sybol at the end of string.
  verifyLastCharacter() {
    if (!this.state.specialCharsInCalc.includes(this.state.calcResult.slice(-1))) {
      return true;
    }
    return false;
  }

  // Taking input from calculator.
  handleInput(value) {

    let bracketCounts =this.verifyBrakets(this.state.calcResult, "counts");

    if (
      // Not allowing any operator symbol other then <-> or <√> at the starting.
      (this.state.calcResult.length === 0 && ['^(2)', '/', '*', '+'].includes(value)) ||
      // Not opening bracket without any previous symbol.
      (value === '(' && !['/', '*', '+', '-'].includes(this.state.calcResult.slice(-1))) ||
      // Not adding value after closing bracket without any operator symbol
      (this.state.calcResult.slice(-1) === ')' && !['/', '*', '+', '-'].includes(value)) ||
      // Not allowing closing bracket with less number of opening brackets opening bracket.
      (value === ')' &&
      ((bracketCounts.openingBracketCount === undefined && bracketCounts.ClosingBracketCount === undefined) ||
      (bracketCounts.openingBracketCount <= bracketCounts.ClosingBracketCount))) ||
      // Multiple dots(.).
      (value === '.' && this.state.calcResult.slice(-1) === '.') || 
      // Multiple square symbols (^(2)).
      (value === '^(2)' && this.state.calcResult.slice(-4) === '^(2)') ||
      // Operator sign before square sign
      (value === '^(2)' && ['√', '/', '*', '+'].includes(this.state.calcResult.slice(-1))) ||
      // Direct valie after square symbol (^(2)).
      (this.state.calcResult.slice(-4) === '^(2)' && !['+', '-', '*', '/', '('].includes(value)) ||
      // Not allowing square root without any previous operator symbol.
      (value === '√' && !['/', '*', '+', '-'].includes(this.state.calcResult.slice(-1)))
    ) {
      // Not permitting new entry.
    } else if (this.state.calcResult.length === 0 && value === '-') {
      this.setState({
        calcResult: '0' + value, // Adding initial <0> for <->.
      });   
    }
    // Replacing existing last operator symbol, if we are getting new operator symbol.
    else if (this.state.specialCharsInCalc.includes(value) &&
      this.state.specialCharsInCalc.includes(this.state.calcResult.substr(-1))) {
      this.setState({
        calcResult: (this.state.calcResult).slice(0, -1) + value,
      });
    }
    // Finally accepting the input to be added at the last.
    else if (this.state.calcResult !== null && 
      this.state.calcResult.length < 20) {
      this.setState({
        calcResult: (this.verifyLastCharacter) ? this.state.calcResult + value : this.state.calcResult.slice(0, -1) + value,
      });
    } else {
      // As of now letting it be, if required can give info for snackbar.
    }
  }

  // To clear result string.
  handleClearScreen() {
    this.setState({
      calcResult: "0",
    });
  }

  // To remove last character of the result string.
  handleBackspace() {
    // Handling removing square sign.
    this.setState({
      calcResult: (this.state.calcResult.slice(-4) === '^(2)') ?
                  (this.state.calcResult).slice(0, -4)
                  : (this.state.calcResult).slice(0, -1),
    });
  }

  // To make negative or positive result value.
  handleNegation() {

    if (['+', '-', '*', '/', '(', ')'].includes()) {

    }
  }

  // To check if String contains any character from the given array.
  checkForArrayCharactersInString(symbolArray, string) {
    let containsSymbol = false;
    for(let i = 0; i < symbolArray.length; i++) {
      if (string.includes(symbolArray[i])) {
        containsSymbol = true;
      }
    }
    return containsSymbol;
  }

  // To get all the operands and operators in result string.
  getLiteralsArray(resultString) {

    let operatorSymbolsArray = ['^','√' , '/', '*', '+', '-'];
    let literalsArray = [];
    let lastSymbolIndex = -1;
  
    for(let i =0; i< resultString.length; i++) {
      let existingSubstr = resultString.slice(i);

      if (operatorSymbolsArray.includes(resultString.charAt(i))) {

        // When first character is under root symbol directly putting it to array.
        if (resultString.charAt(i) === '√') {
          lastSymbolIndex = i;
          literalsArray.push(resultString.charAt(i));
        }
        // When symbol is for square
        else if (resultString.charAt(i) === '^') {
          let literal1 = resultString.slice(lastSymbolIndex + 1, i);
          let literal2 = "^(2)";
          let literal3 = resultString.charAt(i + 4);
          lastSymbolIndex = i + 4;
          i += 4;
          literalsArray.push(literal1, literal2, literal3);
        } else if (
          resultString.charAt(i) === '/' ||
          resultString.charAt(i) === '*' ||
          resultString.charAt(i) === '+' ||
          resultString.charAt(i) === '-'
        ) {
          let literal1 = resultString.slice(lastSymbolIndex + 1, i);
          let literal2 = resultString.charAt(i);
          lastSymbolIndex = i;
          literalsArray.push(literal1, literal2);
        }
      } else if (!this.checkForArrayCharactersInString(operatorSymbolsArray, existingSubstr)) {
        literalsArray.push(existingSubstr);
        break;
      }
    }
    return literalsArray;
  }

  // To get square of the input.
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

  // Processing square and square root from accumulator. 
  processOrders(resultArray, callback) {

    // Checking for square and square root.
    if (resultArray.includes("^(2)") || resultArray.includes("√")) {
      for(let i = 0; i < resultArray.length; i++) {
        if (resultArray[i] === "^(2)") {
          let result = this.getSquare(resultArray[i-1]);
          resultArray.splice(i - 1, 2, result);
          i--;
        } else if (resultArray[i] === "√") {
          let result = this.getFloorSquareRoot(resultArray[i + 1]);
          resultArray.splice(i, 2, result)
          i--;
        }
      }
    }
    callback(null, resultArray);
  }

  // To eval one operation
  evalOperation(firstOperandP, operator, secondOperandP) {
    let firstOperand = parseInt(firstOperandP);
    let secondOperand = parseInt(secondOperandP);

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
    // intermediateResult = intermediateResult.toString();
    // if (intermediateResult.slice(-3) === ".00") {
    //   return intermediateResult.slice(0, -3);
    // }
    return intermediateResult;
  }

  // Processing divide and multiply from accumulator. 
  processDM(resultArray, callback) {

    if (resultArray.includes("/") || resultArray.includes("*")) {
      for(let i = 0; i < resultArray.length; i++) {
        if (resultArray[i] === "/" || resultArray[i] === "*") {
          let result = this.evalOperation(resultArray[i - 1], resultArray[i], resultArray[i + 1]);
          resultArray.splice(i - 1, 3, result);
          i-=2;
        }
      }
    }

    callback(null, resultArray);
  }

  // Processing Add and substract from accumulator. 
  processAS(resultArray, callback) {

    if (!resultArray.includes("/") && !resultArray.includes("*")) {
      for(let i = 0; i < resultArray.length; i++) {
        if (resultArray[i] === "+" || resultArray[i] === "-") {
          let result = this.evalOperation(resultArray[i - 1], resultArray[i], resultArray[i + 1]);
          resultArray.splice(i - 1, 3, result)
          i-=2;
        }
      }
    }

    callback(null, resultArray);
  }

  // Processing eval, if still there are some more oprations are in pending.
  processPendingEval(resultArray, callback) {
    if (resultArray.length > 1) {
      document(null, this.ProcessLiteralsArray(resultArray));
    } else {
      let finalResult = resultArray[0];
      callback(null,finalResult.toString() );
    }
  }

  // Processing stored literals to get evaluate dresult.
  ProcessLiteralsArray(literalsArray, callback) {

    let updatedLiteralsArray = literalsArray;

    this.processOrders(updatedLiteralsArray, (err, result1) => {
      this.processDM(result1, (err, result2) => {
        this.processAS(result2, (err, result3) => {
          this.processPendingEval(result3, (err, result4) => {
            callback(null, result4);
          });
        });
      });
    });
  }

  // Resolving brackets in the result expression.
  handleBracket(resultString) {

  }

  // Getting result for calculator input.
  getResult(resultString) {
    // Require to handle square and square root scenarios in the expression.

    // let refinedResultString;
    if (this.verifyLastCharacter() && this.verifyBrakets(resultString, "verify")) {
      if (resultString.includes('(') || resultString.includes(')')) {
      //   let startIndex = resultString.lastIndexOf('(');
      //   let endIndex = resultString.indexOf(')');
  
      //   // Using recursion to get done with all the brackets
      //   refinedResultString = (startIndex > -1) ? resultString.slice() : "" + this.getResult(resultString.slice) + (endIndex < resultString.length) ? resultString.slice() : "";
      }

      this.ProcessLiteralsArray(this.getLiteralsArray(resultString), (error, result) => {
        this.setState({
          calcResult: result,
        },() => {
          // console.log("Testing----final-----result---------------", this.state.calcResult);
        });
      });
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
                <Button onClick={() => { this.getResult(this.state.calcResult) }} variant="outlined">=</Button>
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
                    <Button onClick={() => { this.handleInput('^(2)') }} title="Squire" variant="outlined">x²</Button>
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
