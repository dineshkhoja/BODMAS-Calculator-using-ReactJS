import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import './Calculator.css';

export default class Calculator extends Component {

  constructor(props) {
    super(props)

    this.state = {
    };
  }

  onTypingNumber() {

  }

  onTypingSign() {

  }

  clearScreen() {

  }

  BackSpace() {

  }

  GetResult() {

  }

  render() {
    return (
      <div className="cardContainer">
        <Card className="card">
          <CardContent>
            <Grid container spacing={1}>

              <Grid className="outputScreenContainer" item xs={12}>
                <Paper className="outputScreen">3,50,000</Paper>
              </Grid>

              <Grid item xs={3}>
                <Button variant="outlined">1</Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="outlined">2</Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="outlined">3</Button>
              </Grid>
              <Grid item xs={3}>
                <Button title="Add" variant="outlined">+</Button>
              </Grid>

              <Grid item xs={3}>
                <Button variant="outlined">4</Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="outlined">5</Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="outlined">6</Button>
              </Grid>
              <Grid item xs={3}>
                <Button title="Substract" variant="outlined">-</Button>
              </Grid>

              <Grid item xs={3}>
                <Button variant="outlined">7</Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="outlined">8</Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="outlined">9</Button>
              </Grid>
              <Grid item xs={3}>
                <Button title="Muliply" variant="outlined">*</Button>
              </Grid>

              <Grid item xs={3}>
                <Button variant="outlined">.</Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="outlined">0</Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="outlined">=</Button>
              </Grid>
              <Grid item xs={3}>
                <Button title="Divide" variant="outlined">/</Button>
              </Grid>

              <Grid item xs={3}>
                <Button title="Clear screen" variant="outlined">Clear</Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="outlined">(</Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="outlined">)</Button>
              </Grid>
              <Grid item xs={3}>
                <Button title="Backspace" variant="outlined">⌫</Button>
              </Grid>

              {
                // Conditionaly showing scientific view.
                (this.props.scientificMode) ?
                <>
                  <Grid item xs={4}>
                    <Button title="Reverce sign" variant="outlined">+ / -</Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button title="Squire" variant="outlined">n ²</Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button title="Square root" variant="outlined">√</Button>
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
