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
        this.inSeki = []
        this.toBeRemoved = []
        this.startOfChain = 1
        this.areas = []
        this.blackDraftCaptures = 0
        this.whiteDraftCaptures = 0
    }

    validateKO(i) {
        if (this.ko) {
            return this.previousBoardPosition !== this.board.replaceAt(i, this.playerChar)
        } else {
            return true
        }
    }

    captureChain(i) {
        this.hasBeenChecked = [i]
        this.isValid = false
        let id
        const row = Math.floor((i) / this.boardSize)
        const column = i % this.boardSize
        // top
        id = (i - this.boardSize)
        if (row != 0 && !this.hasBeenChecked.includes(id) && this.board[id] === this.opponentChar) {
            this.handleCaptureChain(id)
        }
        // right
        id = (i + 1)
        if (column != this.boardSize - 1 && !this.hasBeenChecked.includes(id) && this.board[id] === this.opponentChar) {
            this.handleCaptureChain(id)
        }
        // bottom
        id = (i + this.boardSize)
        if (row != this.boardSize - 1 && !this.hasBeenChecked.includes(id) && this.board[id] === this.opponentChar) {
            this.handleCaptureChain(id)
        }
        // left
        id = (i - 1)
        if (column != 0 && !this.hasBeenChecked.includes(id) && this.board[id] === this.opponentChar) {
            this.handleCaptureChain(id)
        }
        this.isValid = false
        return this.toBeRemoved
    }

    handleCaptureChain(i) {
        this.isValid = undefined

        const hasLibs = this.hasLiberties(i, this.opponentChar)
        console.log('has libs', i, this.opponentChar, hasLibs)

        if (!hasLibs) {
            this.toBeRemoved.push(
                this.hasBeenChecked.slice(this.startOfChain, this.hasBeenChecked.length)
            )
        }
        this.startOfChain = this.hasBeenChecked.length
    }


    hasLiberties(i, playingAs = this.playerChar, board = this.board) {
        this.hasBeenChecked.push(i)


        let id
        const row = Math.floor((i) / this.boardSize)
        const column = i % this.boardSize
        // console.log('has liberties', i, playingAs, board, board.length, row, column)

        // top
        id = (i - this.boardSize)
        if (row != 0 && !this.hasBeenChecked.includes(id)) {
            // console.log('has libs top', id)
            this.handleHasLiberties(id, playingAs, board)
        }
        //right
        id = (i + 1)
        if (column != this.boardSize - 1 && !this.hasBeenChecked.includes(id)) {
            // console.log('has libs right', id)
            this.handleHasLiberties(id, playingAs, board)
        }
        // bottom
        id = (i + this.boardSize)
        if (row != this.boardSize - 1 && !this.hasBeenChecked.includes(id)) {
            // console.log('has libs bottom', id)
            this.handleHasLiberties(id, playingAs, board)
        }
        // left
        id = (i - 1)
        if (column != 0 && !this.hasBeenChecked.includes(id)) {
            // console.log('has libs left', id)
            this.handleHasLiberties(id, playingAs, board)
        }
        return this.isValid || false
    }

    handleHasLiberties(id, playingAs, board) {
        if (board[id] === '.') {
            // console.log('-------------libs END 1------------------', this.hasBeenChecked)
            this.isValid = true
        } else if (board[id] === playingAs) {
            // console.log('libs CONTINUE ', id)
            this.hasLiberties(id, playingAs, board)
        }
    }

    calculateAreas() {
        console.log('---------------checking areas--------------')
        this.areas = []
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
            this.handleScoreChain(id)
        }
        //right
        id = (i + 1)
        if (column != this.boardSize - 1 && !this.hasBeenChecked.includes(id)) {
            this.handleScoreChain(id)
        }
        // bottom
        id = (i + this.boardSize)
        if (row != this.boardSize - 1 && !this.hasBeenChecked.includes(id)) {
            this.handleScoreChain(id)
        }
        // left
        id = (i - 1)
        if (column != 0 && !this.hasBeenChecked.includes(id)) {
            this.handleScoreChain(id)
        }
        return { owner: this.chainOwner, chain: this.hasBeenChecked.slice(this.startOfChain, this.hasBeenChecked.length) }
    }

    handleScoreChain(id) {
        if (this.board[id] === '.') {
            this.scoreChain(id)
        } else if (!this.chainOwner) {
            this.chainOwner = this.board[id]
        } else if (this.board[id] !== this.chainOwner) {
            this.chainOwner = '.'
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
        console.log('---------------counting eyes and libs--------------')
        return { id: i, eyesAndLibs: this.chainEyesAndLibs, eyes: this.eyes, libs: this.libs, hasBeenChecked: this.hasBeenChecked, currentChain: this.currentChain, owner: owner }
    }

    handleCountEyesAndLibs(id, owner) {
        if (this.chainEyesAndLibs.includes(id)) {
            return;
        }
        this.hasBeenChecked.push(id)
        if (this.board[id] === '.') {
            this.areas.forEach(area => {
                if (area.chain.includes(id)) {
                    if (area.owner === owner) {
                        this.chainEyesAndLibs.push(...area.chain)
                        this.eyes.push(area.chain)
                        this.countEyesAndLibs(id, owner)
                    } else if (area.owner === '.') {
                        this.libs.push(id)
                        this.chainEyesAndLibs.push(id)
                    }
                }
            })
        } else if (this.board[id] === owner && !this.currentChain.includes(id)) {
            this.currentChain.push(id)
            this.countEyesAndLibs(id, owner)
        }
    }


    deadBehindEnemyLines(id) {

        if (this.eyes.length >= 2) {
            return false
        }
        if (this.libs.length > 2) {
            return false
        }
        if (this.chainEyesAndLibs.length == 2) {
            if (this.inSeki.includes(id)) {
                return false
            } else if (this.checkForSeki(id)) {
                this.inSeki.push(...this.currentChain)
                return false
            }
        }
        if (this.eyes.length === 1) {
            let isDead = true
            this.eyes.forEach(eye => {
                if (eye.length >= 3) {
                    isDead = false
                }
            })
            return isDead
        }
        return true
    }

    checkForSeki(id) {
        console.log('---------checking for seki-----------------')
        let tempBoard = this.board

        // check white at 0 && check black at 1
        tempBoard = tempBoard.replaceAt(this.chainEyesAndLibs[0], 'o')
        tempBoard = tempBoard.replaceAt(this.chainEyesAndLibs[1], 'x')
        const checkOne = this.hasLiberties(this.chainEyesAndLibs[0], 'o', tempBoard)
        const checkTwo = this.hasLiberties(this.chainEyesAndLibs[1], 'x', tempBoard)

        // check black at 0 and white at 1
        tempBoard = tempBoard.replaceAt(this.chainEyesAndLibs[0], 'x')
        tempBoard = tempBoard.replaceAt(this.chainEyesAndLibs[1], 'o')
        const checkThree = this.hasLiberties(this.chainEyesAndLibs[0], 'x', tempBoard)
        const checkFour = this.hasLiberties(this.chainEyesAndLibs[1], 'o', tempBoard)

        console.log(checkOne, checkTwo, checkThree, checkFour)
        console.log('SEKI has been checked', this.currentChain)
        return ![checkOne, checkTwo, checkThree, checkFour].includes(true)


    }

    scoreDraftCaptures(i) {
        this.eyes = []
        this.libs = []
        this.chainEyesAndLibs = []
        this.hasBeenChecked = []
        this.currentChain = [i]
        console.log('count', i, this.countEyesAndLibs(i, this.board[i]))
        const deadBehindEnemyLines = this.deadBehindEnemyLines(i)
        console.log('dead behind lines', deadBehindEnemyLines, this.currentChain, this.inSeki)
        if (deadBehindEnemyLines) {
            if (this.board[i] === 'o') {
                this.blackDraftCaptures += this.currentChain.length
            } else {
                this.whiteDraftCaptures += this.currentChain.length
            }
            this.currentChain.forEach(node => this.board = this.board.replaceAt(node, '.'))
            this.calculateAreas()
        }
    }

    checkScore() {
        console.log(this.board.length)
        this.blackDraftCaptures = 0
        this.whiteDraftCaptures = 0
        this.calculateAreas()

        // this.scoreDraftCaptures(15)
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] !== '.') {
                this.scoreDraftCaptures(i)
            }
        }

        console.log(this.areas)

        return { areas: this.areas, blackDraftCaptures: this.blackDraftCaptures, whiteDraftCaptures: this.whiteDraftCaptures }
    }


}

export default Validate