import React from 'react';
import {getSeconds, getMinutes, getHours} from '../../utils.js'

class Countdown extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        countdown: this.props.endTime - new Date()
      };
    }

    componentDidMount() {
    this.interval = setInterval(() => {
        this.update_countdown();
    }, 1000)
    }
    update_countdown = () => {
        this.setState({countdown: this.props.endTime - new Date()})
    }

    render() {
        let total = this.state.countdown
        return (
            <div>
                <p style={{fontSize: '3em',margin: 0}}> {
                    getHours(total)+ ':' +
                    getMinutes(total) + ':' +
                    getSeconds(total)
                    } </p>
            </div>
        );
    }
}

export default Countdown