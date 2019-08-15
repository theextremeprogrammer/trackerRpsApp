import RPSApp from '../src/RPSApp'

import React from 'react'
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

    describe('when the play use case tells the UI that the input is a tie', () => {
        beforeEach(() => {
            renderApp({
                play: (p1, p2, observer) => observer.tie()
            })
        })

        it('by default does not display a game result', () => {
            expect(page()).not.toContain('TIE!')
        })

        it('tells the user that their input is a tie', () => {
            submitForm()


            expect(page()).toContain('TIE!')
        })
    })

    describe('when the play use case tells the UI that the input is player one wins', () => {
        beforeEach(() => {
            renderApp({
                play: (p1, p2, observer) => observer.p1Wins()
            })
        })

        it('by default does not display a game result', () => {
            expect(page()).not.toContain('PLAYER ONE WINS!')
        })

        it('tells the user that their input is a player one wins', () => {
            submitForm()


            expect(page()).toContain('PLAYER ONE WINS!')
        })
    })

    describe('when the play use case tells the UI that the input is player two wins', () => {
        beforeEach(() => {
            renderApp({
                play: (p1, p2, observer) => observer.p2Wins()
            })
        })

        it('by default does not display a game result', () => {
            expect(page()).not.toContain('PLAYER TWO WINS!')
        })

        it('tells the user that their input is a player two wins', () => {
            submitForm()


            expect(page()).toContain('PLAYER TWO WINS!')
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
