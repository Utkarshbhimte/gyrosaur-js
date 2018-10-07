import React, { Component } from 'react'

import Box from './Box'

class MovingWithGyro extends Component {
    state = {
        position: {
            positionX: 0,
            positionY: 0
        }
    }

    contentSize = 100

    componentWillReceiveProps(props) {
        const { rotation } = props;
        if (!!rotation) this._updateCoordinates(rotation)
    }

    _updateCoordinates = (rotation) => {
        let { position: { positionX, positionY } } = this.state;
        const { alpha, beta } = rotation;

        positionX = (positionX + beta)
        positionY = (positionY + alpha)

        this.setState({ position: { positionX, positionY } })
    }

    render() {
        return (
            <div>
                <Box {...this.state.position} >{this.state.position.positionX.toFixed(2)} : {this.state.position.positionY.toFixed(2)}</Box>
            </div>
        )
    }
}

export default MovingWithGyro