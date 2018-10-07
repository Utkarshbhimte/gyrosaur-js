import React, { Component } from 'react';
import 'antd/dist/antd.css'
import './App.css';

// components
import ReactAccelerometer from './utils/react-accelerometer'
import MovingWithGyro from './components/MovingWithGyro'
import ChartReadings from './components/ChartReadings'

let tempPosition = 0

const THRESHOLD = {
  alpha: 1.5
}
class App extends Component {

  handlingGyroData = (position, rotation) => {
    let smoothedOutAlpha = 0;
    let smoothedOutBeta = 0;

    if (!!rotation) {
      const { alpha, beta } = rotation;

      // // updating BUFFER arrays
      // const alphaBuffer = updateBuffer(alpha, 'alpha')
      // const betaBuffer = updateBuffer(beta, 'beta')
      // const gammaBuffer = updateBuffer(gamma, 'gamma')

      // smoothedOutAlpha = averageFromArray(alphaBuffer)
      // smoothedOutBeta = averageFromArray(betaBuffer)
      // smoothedOutGamma = averageFromArray(gammaBuffer)

      smoothedOutAlpha = Math.abs(alpha) < THRESHOLD.alpha ? alpha * .05 : alpha;
      smoothedOutBeta = Math.abs(beta) < THRESHOLD.alpha ? beta * .05 : beta;

      tempPosition = tempPosition + smoothedOutAlpha
    }

    const dataForGroupChart = [
      { title: `alpha`, value: smoothedOutAlpha }, { title: `beta`, value: smoothedOutBeta }
    ]

    return <div className="contain-all">
      <MovingWithGyro rotation={{ alpha: smoothedOutAlpha, beta: smoothedOutBeta }} />
      {rotation && <div>
        <ChartReadings chartWindow={120} title='Alpha Acceleration' readings={smoothedOutAlpha} />
        <ChartReadings chartWindow={120} title='Alpha and Beta Acceleration' readings={dataForGroupChart} />
        {/* <ChartReadings chartWindow={120} title='Beta Acceleration' value={smoothedOutBeta} /> */}
        {/* <ChartReadings title='Beta' value={smoothedOutBeta} /> */}
      </div>}
    </div>
  }

  render() {
    return (
      <ReactAccelerometer>
        {this.handlingGyroData}
      </ReactAccelerometer>

    );
  }
}

export default App;
