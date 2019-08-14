describe('play', () => {
    let requests, observer

    beforeEach(() => {
        requests = new Game()
    })

    describe('player 1 wins scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['p1Wins'])
        })

        it('rock vs scissors', () => {
            requests.play('rock', 'scissors', observer)


            expect(observer.p1Wins).toHaveBeenCalled()
        })

        it('scissors vs paper', () => {
            requests.play('scissors', 'paper', observer)


            expect(observer.p1Wins).toHaveBeenCalled()
        })

        it('paper vs rock', () => {
            requests.play('paper', 'rock', observer)


            expect(observer.p1Wins).toHaveBeenCalled()
        })
    })

    describe('player 2 wins scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['p2Wins'])
        })

        it('scissors vs rock', () => {
            requests.play('scissors', 'rock', observer)


            expect(observer.p2Wins).toHaveBeenCalled()
        })

        it('paper vs scissors', () => {
            requests.play('paper', 'scissors', observer)


            expect(observer.p2Wins).toHaveBeenCalled()
        })

        it('rock vs paper', () => {
            requests.play('rock', 'paper', observer)


            expect(observer.p2Wins).toHaveBeenCalled()
        })
    })

    describe('tie scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['tie'])
        })

        it('rock vs rock', () => {
            requests.play('rock', 'rock', observer)


            expect(observer.tie).toHaveBeenCalled()
        })

        it('scissors vs scissors', () => {
            requests.play('scissors', 'scissors', observer)


            expect(observer.tie).toHaveBeenCalled()
        })

        it('paper vs paper', () => {
            requests.play('paper', 'paper', observer)


            expect(observer.tie).toHaveBeenCalled()
        })
    })

    describe('invalid scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['invalid'])
        })

        it('invalid vs rock', () => {
            requests.play('sailboat', 'rock', observer)


            expect(observer.invalid).toHaveBeenCalled()
        })

        it('rock vs invalid', () => {
            requests.play('rock', 'sailboat', observer)


            expect(observer.invalid).toHaveBeenCalled()
        })

        it('invalid vs invalid', () => {
            requests.play('sailboat', 'sailboat', observer)


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
