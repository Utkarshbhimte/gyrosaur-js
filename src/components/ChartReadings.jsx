import React, { Component } from 'react'
import styled, { consolidateStreamedStyles } from 'styled-components'
// import { Line } from 'react-chartjs-2';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, } from 'recharts';
import { Card } from 'antd';
import { relativeTimeRounding } from 'moment';
import { Object } from 'core-js';

const CardValueChipWrap = styled.div`
    display: flex;
    justify-content: center;
`

const converArrayToObject = (arr, keyForEntry) => {
    if (!keyForEntry) throw new Error(`keyForEntry not defined`)

    let result = {};
    arr.forEach((entry, i) => {
        const key = entry[keyForEntry]

        if (!key) throw new Error(`couln't find key=${keyForEntry} in element=${i}`)

        result[entry[keyForEntry]] = entry
    })

    return result
}

const COLORS = ['#e85a71', '#0080ff', '#bd1550']

class ReadingMonitor {
    constructor(threshold = 100) {

        this._buffer = []
        this._threshold = threshold

        this._latestValue = 0
    }

    set value(value) {

        this._latestValue = value;
        this._buffer.push(value);

        if (this._buffer.length >= this._threshold) {
            this._buffer.shift()
        }

    }

    get bufferArray() {
        return this._buffer
    }

    get getMovingAverage() {
        return this._buffer.reduce((total, curr) => total + curr, 0) / this._buffer.length
    }

    get MAX() {
        return Math.max(...this._buffer)
    }

    get MIN() {
        return Math.min(...this._buffer)
    }

    get length() {
        return this.bufferArray.length
    }

    set threshold(val) {
        return this._threshold = val
    }
}



class ChartReadings extends Component {
    constructor(props) {
        super(props);

        this.multipleXAxis = Array.isArray(props.readings)
        this.XAxisValue = {}
    }



    componentWillReceiveProps(props) {
        let { readings } = props;

        if (!this.multipleXAxis) readings = [{ title: 'readings', value: readings }]

        readings.forEach((element) => {
            if (!!element) {
                if (!this.XAxisValue[element.title]) this.XAxisValue[element.title] = new ReadingMonitor()
                this.XAxisValue[element.title].value = element.value
            }
        });
    }


    componentDidMount() {
        // setInterval(this._showReadings, 300)
    }

    // _updateReadingsMeter = () => {
    //     const { value } = this.props;
    //     if (!!value) this.setState({ readingValue: value })
    // }

    render() {
        let data = [];
        const readingKeys = Object.keys(this.XAxisValue);

        if (readingKeys.length) {

            // const data = [...this.state.graphReading].map((value, index) => ({ name: index, alpha: value[0], beta: value[1] }))
            data = new Array(100).fill((_, i) => i).map((_, index) => {
                let readingValues = {}

                readingKeys.forEach(key => {
                    readingValues[key] = this.XAxisValue[key].bufferArray[index]
                })

                const data = {
                    name: index,
                    ...readingValues
                }

                console.log({ data })

                return data
            })
        }

        console.log({ data });

        const chartWidth = window.innerWidth - 48
        return (
            <Card
                title={this.props.title}
            >
                <LineChart width={chartWidth} height={150} data={data}>
                    <YAxis />
                    <XAxis hide={true} />
                    {readingKeys.map((key, i) => <Line type="monotone" dataKey={key} stroke={COLORS[i]} />)}
                </LineChart>

            </Card>
        )
    }
}

export default ChartReadings