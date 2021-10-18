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

    countScore() {
        this.hasBeenChecked = []
        for (let i = 0; i < this.board.length; i++) {

        }
    }

    hasLiberties(i, playingAs = this.playerChar, countScore = false) {
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
}

export default Validate