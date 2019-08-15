import React from 'react'

class RPSApp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    p1Wins() {
        this.setState({result: 'PLAYER ONE WINS!'})
    }

    p2Wins() {
        this.setState({result: 'PLAYER TWO WINS!'})
    }

    tie() {
        this.setState({result: 'TIE!'})
    }

    invalid() {
        this.setState({result: 'INVALID!'})
    }

    submitHandler() {
        this.props.game.play('player choice 1', 'player choice 2', this)
    }

    render() {
        return <div>
            {this.state.result}
            <button onClick={this.submitHandler.bind(this)}>PLAY</button>
        </div>
    }
}

module.exports = RPSApp
