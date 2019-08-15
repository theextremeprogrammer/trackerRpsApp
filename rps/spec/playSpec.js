describe('play', () => {
    let game, outcomeObserver

    beforeEach(() => {
        game = new Game()
    })

    describe('player 1 wins scenarios', () => {
        beforeEach(() => {
            outcomeObserver = jasmine.createSpyObj('outcomeObserver', ['player1Wins'])
        })

        it('rock vs scissors', () => {
            game.play('rock', 'scissors', outcomeObserver)


            expect(outcomeObserver.player1Wins).toHaveBeenCalled()
        })

        it('scissors vs paper', () => {
            game.play('scissors', 'paper', outcomeObserver)


            expect(outcomeObserver.player1Wins).toHaveBeenCalled()
        })

        it('paper vs rock', () => {
            game.play('paper', 'rock', outcomeObserver)


            expect(outcomeObserver.player1Wins).toHaveBeenCalled()
        })
    })

    describe('player 2 wins scenarios', () => {
        beforeEach(() => {
            outcomeObserver = jasmine.createSpyObj('outcomeObserver', ['player2Wins'])
        })

        it('scissors vs rock', () => {
            game.play('scissors', 'rock', outcomeObserver)


            expect(outcomeObserver.player2Wins).toHaveBeenCalled()
        })

        it('paper vs scissors', () => {
            game.play('paper', 'scissors', outcomeObserver)


            expect(outcomeObserver.player2Wins).toHaveBeenCalled()
        })

        it('rock vs paper', () => {
            game.play('rock', 'paper', outcomeObserver)


            expect(outcomeObserver.player2Wins).toHaveBeenCalled()
        })
    })

    describe('tie scenarios', () => {
        beforeEach(() => {
            outcomeObserver = jasmine.createSpyObj('outcomeObserver', ['tie'])
        })

        it('rock vs rock', () => {
            game.play('rock', 'rock', outcomeObserver)


            expect(outcomeObserver.tie).toHaveBeenCalled()
        })

        it('scissors vs scissors', () => {
            game.play('scissors', 'scissors', outcomeObserver)


            expect(outcomeObserver.tie).toHaveBeenCalled()
        })

        it('paper vs paper', () => {
            game.play('paper', 'paper', outcomeObserver)


            expect(outcomeObserver.tie).toHaveBeenCalled()
        })
    })

    describe('invalid scenarios', () => {
        beforeEach(() => {
            outcomeObserver = jasmine.createSpyObj('outcomeObserver', ['invalid'])
        })

        it('invalid vs rock', () => {
            game.play('spock', 'rock', outcomeObserver)


            expect(outcomeObserver.invalid).toHaveBeenCalled()
        })

        it('rock vs invalid', () => {
            game.play('rock', 'spock', outcomeObserver)


            expect(outcomeObserver.invalid).toHaveBeenCalled()
        })

        it('invalid vs invalid', () => {
            game.play('spock', 'spock', outcomeObserver)


            expect(outcomeObserver.invalid).toHaveBeenCalled()
        })
    })
})

function Game() {
    this.play = (player1Choice, player2Choice, outcomeObserver) => {
        new PlayRound(player1Choice, player2Choice, outcomeObserver).process()
    }
}

function PlayRound(player1Choice, player2Choice, outcomeObserver) {
    this.process = () => {
        if (invalidScenario(player1Choice) ||
            invalidScenario(player2Choice)) {
            outcomeObserver.invalid()
        } else if (tieScenario()) {
            outcomeObserver.tie()
        } else if (player1WinsScenarios()) {
            outcomeObserver.player1Wins()
        } else {
            outcomeObserver.player2Wins()
        }
    }

    function invalidScenario(playerChoice) {
        return VALID_THROWS.includes(playerChoice) === false
    }

    function player1WinsScenarios() {
        return player1Choice === Choice.ROCK && player2Choice === Choice.SCISSORS ||
            player1Choice === Choice.SCISSORS && player2Choice === Choice.PAPER ||
            player1Choice === Choice.PAPER && player2Choice === Choice.ROCK
    }

    function tieScenario() {
        return player1Choice === player2Choice
    }

    const Choice = {
        ROCK: 'rock',
        SCISSORS: 'scissors',
        PAPER: 'paper',
    }

    const VALID_THROWS = [Choice.ROCK, Choice.SCISSORS, Choice.PAPER]
}
