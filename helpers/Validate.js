class Validate {
    constructor(board, toPlay, previousBoardPosition, ko) {
        this.board = board;
        this.previousBoardPosition = previousBoardPosition;
        this.ko = ko;
        this.toPlay = toPlay;
        this.playerChar = toPlay === 'black' ? 'x' : 'o'
        this.opponentChar = toPlay === 'black' ? 'o' : 'x'
        this.boardSize = Math.sqrt(board.length)
        this.hasBeenChecked = []
        this.toBeRemoved = []
        this.startOfChain = 1
        this.areas = []
    }

    validateKO(i) {
        if (this.ko) {
            return this.previousBoardPosition !== this.board.replaceAt(i, this.playerChar)
        } else {
            return true
        }
    }

    handleCapture(i) {
        this.hasBeenChecked = [i]
        this.isValid = false
        let id
        const row = Math.floor((i) / this.boardSize)
        const column = i % this.boardSize
        // top
        id = (i - this.boardSize)
        if (row != 0 && !this.hasBeenChecked.includes(id) && this.board[id] === this.opponentChar) {
            this.isChainDead(id)
        }
        // right
        id = (i + 1)
        if (column != this.boardSize - 1 && !this.hasBeenChecked.includes(id) && this.board[id] === this.opponentChar) {
            this.isChainDead(id)
        }
        // bottom
        id = (i + this.boardSize)
        if (row != this.boardSize - 1 && !this.hasBeenChecked.includes(id) && this.board[id] === this.opponentChar) {
            this.isChainDead(id)
        }
        // left
        id = (i - 1)
        if (column != 0 && !this.hasBeenChecked.includes(id) && this.board[id] === this.opponentChar) {
            this.isChainDead(id)
        }
        this.isValid = false
        return this.toBeRemoved
    }

    isChainDead(i) {
        this.isValid = undefined

        if (!this.hasLiberties(i, this.opponentChar)) {
            this.toBeRemoved.push(
                this.hasBeenChecked.slice(this.startOfChain, this.hasBeenChecked.length)
            )
        }
        this.startOfChain = this.hasBeenChecked.length
    }


    hasLiberties(i, playingAs = this.playerChar) {
        this.hasBeenChecked.push(i)

        let id
        const row = Math.floor((i) / this.boardSize)
        const column = i % this.boardSize

        // top
        id = (i - this.boardSize)
        if (row != 0 && !this.hasBeenChecked.includes(id)) {
            if (this.board[id] === '.') {
                this.isValid = true
            } else if (this.board[id] === playingAs) {
                this.hasLiberties(id, playingAs)
            }
        }
        //right
        id = (i + 1)
        if (column != this.boardSize - 1 && !this.hasBeenChecked.includes(id)) {
            if (this.board[id] === '.') {
                this.isValid = true
            } else if (this.board[id] === playingAs) {
                this.hasLiberties(id, playingAs)
            }
        }
        // bottom
        id = (i + this.boardSize)
        if (row != this.boardSize - 1 && !this.hasBeenChecked.includes(id)) {
            if (this.board[id] === '.') {
                this.isValid = true
            } else if (this.board[id] === playingAs) {
                this.hasLiberties(id, playingAs)
            }
        }
        // left
        id = (i - 1)
        if (column != 0 && !this.hasBeenChecked.includes(id)) {
            if (this.board[id] === '.') {
                this.isValid = true
            } else if (this.board[id] === playingAs) {
                this.hasLiberties(id, playingAs)
            }
        }
        return this.isValid || false
    }

    calculateAreas() {
        console.log('---------------checking areas--------------')
        this.hasBeenChecked = []
        this.startOfChain = 0
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] === '.') {

                const chainScore = this.scoreChain(i)
                this.startOfChain = this.hasBeenChecked.length
                this.chainOwner = undefined
                if (chainScore) {
                    this.areas.push(chainScore)
                }
            }
        }
        console.log(this.areas)
        return this.areas
    }


    scoreChain(i) {
        if (!this.hasBeenChecked.includes(i)) {
            this.hasBeenChecked.push(i)
        } else {
            return;
        }
        let id
        const row = Math.floor((i) / this.boardSize)
        const column = i % this.boardSize

        // top
        id = (i - this.boardSize)
        if (row != 0 && !this.hasBeenChecked.includes(id)) {
            if (this.board[id] === '.') {
                this.scoreChain(id)
            } else if (!this.chainOwner) {
                this.chainOwner = this.board[id]
            } else if (this.board[id] !== this.chainOwner) {
                this.chainOwner = '.'
            }
        }
        //right
        id = (i + 1)
        if (column != this.boardSize - 1 && !this.hasBeenChecked.includes(id)) {
            if (this.board[id] === '.') {
                this.scoreChain(id)
            } else if (!this.chainOwner) {
                this.chainOwner = this.board[id]
            } else if (this.board[id] !== this.chainOwner) {
                this.chainOwner = '.'
            }
        }
        // bottom
        id = (i + this.boardSize)
        if (row != this.boardSize - 1 && !this.hasBeenChecked.includes(id)) {
            if (this.board[id] === '.') {
                this.scoreChain(id)
            } else if (!this.chainOwner) {
                this.chainOwner = this.board[id]
            } else if (this.board[id] !== this.chainOwner) {
                this.chainOwner = '.'
            }
        }
        // left
        id = (i - 1)
        if (column != 0 && !this.hasBeenChecked.includes(id)) {
            if (this.board[id] === '.') {
                this.scoreChain(id)
            } else if (!this.chainOwner) {
                this.chainOwner = this.board[id]
            } else if (this.board[id] !== this.chainOwner) {
                this.chainOwner = '.'
            }
        }

        return { owner: this.chainOwner, chain: this.hasBeenChecked.slice(this.startOfChain, this.hasBeenChecked.length) }
    }

    handleCountEyesAndLibs(id, owner) {
        if (this.hasBeenChecked.includes(id) || this.chainEyesAndLibs.includes(id)) {
            return;
        }
        this.hasBeenChecked.push(id)
        if (this.board[id] === '.') {
            this.areas.forEach(area => {
                if (area.chain.includes(id)) {
                    if (area.owner === owner) {
                        console.log('add eye', id)
                        this.chainEyesAndLibs.push(...area.chain)
                        this.eyes.push(area.chain)
                        this.countEyesAndLibs(id, owner)
                    } else if (area.owner === '.') {
                        this.libs.push(...area.chain)
                        this.chainEyesAndLibs.push(...area.chain)
                    }
                }
            })
        } else if (this.board[id] === owner) {
            this.currentChain.push(id)
            this.countEyesAndLibs(id, owner)
        }
    }

    countEyesAndLibs(i, owner) {
        let id
        const row = Math.floor((i) / this.boardSize)
        const column = i % this.boardSize

        // top
        id = (i - this.boardSize)
        if (row != 0 && !this.hasBeenChecked.includes(id)) {
            this.handleCountEyesAndLibs(id, owner)
        }
        //right
        id = (i + 1)
        if (column != this.boardSize - 1 && !this.hasBeenChecked.includes(id)) {
            this.handleCountEyesAndLibs(id, owner)
        }
        // bottom
        id = (i + this.boardSize)
        if (row != this.boardSize - 1 && !this.hasBeenChecked.includes(id)) {
            this.handleCountEyesAndLibs(id, owner)
        }
        // left
        id = (i - 1)
        if (column != 0 && !this.hasBeenChecked.includes(id)) {
            this.handleCountEyesAndLibs(id, owner)
        }
        return { id: i, eyesAndLibs: this.chainEyesAndLibs, eyes: this.eyes, libs: this.libs, hasBeenChecked: this.hasBeenChecked, currentChain: this.currentChain }
    }


    deadBehindEnemyLines() {
        if (this.eyes.length < 2) {
            if (this.libs.length > 2) {
                return false
            } else if (this.eyes.length === 1) {
                let isDead = true
                this.eyes.forEach(eye => {
                    if (eye.length >= 3) {
                        isDead = false
                    }
                })
                return isDead
            }
            return true
        } else {
            return false
        }
    }

    checkScore() {
        this.calculateAreas()

        this.eyes = []
        this.libs = []
        this.chainEyesAndLibs = []
        this.hasBeenChecked = [temp]
        this.currentChain = []
        let temp = 9
        console.log(this.countEyesAndLibs(temp, this.board[temp]))
        // console.log('is dead', this.deadBehindEnemyLines())
        if (this.deadBehindEnemyLines()) {
            this.areas.push({
                owner: this.board[temp] === 'x' ? 'o' : 'x',
                chain: [...this.currentChain],
                capture: true
            })
            this.areas.push({
                owner: this.board[temp] === 'x' ? 'o' : 'x',
                chain: [...this.chainEyesAndLibs],
            })
        }


        // if (this.deadBehindEnemyLines()) {
        //     this.areas.push({
        //         owner: this.board[temp] === 'x' ? 'o' : 'x',
        //         chain: [...this.currentChain, ...this.chainEyesAndLibs],
        //         capture: this.currentChain
        //     })
        // }
        return this.areas
        // for (let i = 0; i < this.board.length; i++) {
        //     if (this.board[i] !== '.') {
        //         this.deadBehindEnemyLines(i, this.board[i])
        //     }
        // }
    }


}

export default Validate