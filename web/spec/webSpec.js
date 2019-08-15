import ReactDOM from 'react-dom'

describe('play form', () => {
    beforeEach(() => {
        setupDOM()
    })

    afterEach(() => {
        teardownDOM()
    })

    describe('when the play use case tells the UI that the input is invalid', () => {
        beforeEach(() => {
            renderApp({
                play: (p1, p2, observer) => observer.invalid()
            })
        })

        it('by default does not display a game result', () => {
            expect(page()).not.toContain('INVALID!')
        })

        it('tells the user that their input is invalid', () => {
            submitForm()


            expect(page()).toContain('INVALID!')
        })
    })

    let domFixture

    function setupDOM() {
        domFixture = document.createElement('div')
        document.body.appendChild(domFixture)
    }

    function teardownDOM() {
        domFixture.remove()
    }

    function renderApp(alwaysInvalidGame) {
        ReactDOM.render(
            <RPSApp game={alwaysInvalidGame}/>,
            domFixture
        )
    }

    function submitForm() {
        document.querySelector('button').click()
    }

    function page() {
        return domFixture.innerText
    }
})

import React from 'react'

class RPSApp extends React.Component {
    constructor() {
        super()

        this.state = {}
    }

    submitHandler() {
        this.setState({
            result: 'INVALID!',
        })
    }

    render() {
        return <div>
            {this.state.result}
            <button onClick={this.submitHandler.bind(this)}>PLAY</button>
        </div>
    }
}
