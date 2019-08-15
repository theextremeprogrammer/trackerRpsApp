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

    inputChanged(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler() {
        this.props.game.play(this.state.p1Choice, this.state.p2Choice, this)
    }

    render() {
        return <div>
            <input name='p1Choice' onChange={this.inputChanged.bind(this)}/>
            <input name='p2Choice' onChange={this.inputChanged.bind(this)}/>

            {this.state.result}
            <button onClick={this.submitHandler.bind(this)}>PLAY</button>
        </div>
    }
}

module.exports = RPSApp
