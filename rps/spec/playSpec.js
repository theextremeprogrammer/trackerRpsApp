describe('play', () => {
    let game, observer

    beforeEach(() => {
        game = new Game()
    })

    describe('player 1 wins scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['p1Wins'])
        })

        it('rock vs scissors', () => {
            game.play('rock', 'scissors', observer)


            expect(observer.p1Wins).toHaveBeenCalled()
        })

        it('scissors vs paper', () => {
            game.play('scissors', 'paper', observer)


            expect(observer.p1Wins).toHaveBeenCalled()
        })

        it('paper vs rock', () => {
            game.play('paper', 'rock', observer)


            expect(observer.p1Wins).toHaveBeenCalled()
        })
    })

    describe('player 2 wins scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['p2Wins'])
        })

        it('scissors vs rock', () => {
            game.play('scissors', 'rock', observer)


            expect(observer.p2Wins).toHaveBeenCalled()
        })

        it('paper vs scissors', () => {
            game.play('paper', 'scissors', observer)


            expect(observer.p2Wins).toHaveBeenCalled()
        })

        it('rock vs paper', () => {
            game.play('rock', 'paper', observer)


            expect(observer.p2Wins).toHaveBeenCalled()
        })
    })

    describe('tie scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['tie'])
        })

        it('rock vs rock', () => {
            game.play('rock', 'rock', observer)


            expect(observer.tie).toHaveBeenCalled()
        })

        it('scissors vs scissors', () => {
            game.play('scissors', 'scissors', observer)


            expect(observer.tie).toHaveBeenCalled()
        })

        it('paper vs paper', () => {
            game.play('paper', 'paper', observer)


            expect(observer.tie).toHaveBeenCalled()
        })
    })

    describe('invalid scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['invalid'])
        })

        it('invalid vs rock', () => {
            game.play('spock', 'rock', observer)


            expect(observer.invalid).toHaveBeenCalled()
        })

        it('rock vs invalid', () => {
            game.play('rock', 'spock', observer)


            expect(observer.invalid).toHaveBeenCalled()
        })

        it('invalid vs invalid', () => {
            game.play('spock', 'spock', observer)


            expect(observer.invalid).toHaveBeenCalled()
        })
    })
})

function Game() {
    this.play = (p1, p2, observer) => {
        if (['rock', 'scissors', 'paper'].includes(p1) === false ||
            ['rock', 'scissors', 'paper'].includes(p2) === false ) {
            observer.invalid()
        } else if (p1 === p2) {
            observer.tie()
        } else if (p1 === 'rock' && p2 === 'scissors' ||
            p1 === 'scissors' && p2 === 'paper' ||
            p1 === 'paper' && p2 === 'rock') {
            observer.p1Wins()
        } else {
            observer.p2Wins()
        }
    }
}
