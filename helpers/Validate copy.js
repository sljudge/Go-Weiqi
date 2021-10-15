class Validate {
    constructor(board, toPlay) {
        this.board = board;
        this.toPlay = toPlay;
        this.playerChar = toPlay === 'black' ? 'x' : 'o'
        this.opponentChar = toPlay === 'black' ? 'o' : 'x'
        this.boardSize = Math.sqrt(board.length)
        this.hasBeenChecked = []
        this.toBeRemoved = []
        this.startOfChain = 1

    }

    handleCapture(i) {
        this.hasBeenChecked = [i]
        this.isValid = false
        console.log('-------------HANDLE CAPTURE-------------')
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
        console.log('-------------END CAPTURE-------------')
        this.isValid = false
        return this.toBeRemoved
    }

    isChainDead(i) {
        this.isValid = undefined

        let hasLibs = this.hasLiberties(i, this.opponentChar)
        if (!hasLibs) {
            this.toBeRemoved.push(
                this.hasBeenChecked.slice(this.startOfChain, this.hasBeenChecked.length)
            )
        }
        this.startOfChain = this.hasBeenChecked.length
        console.log('has libs', i, hasLibs, this.hasBeenChecked, this.toBeRemoved, this.startOfChain)
    }

    hasLiberties(i, playingAs = this.playerChar) {
        console.log('-------------HAS LIBERTIES---------------')
        console.log('has liberty', i, this.board, playingAs)
        this.hasBeenChecked.push(i)

        let id
        const row = Math.floor((i) / this.boardSize)
        const column = i % this.boardSize

        // top
        id = (i - this.boardSize)
        if (row != 0 && !this.hasBeenChecked.includes(id)) {
            // console.log('top')
            if (this.board[id] === '.') {
                console.log('top', i, 1)
                this.isValid = true
                // return true
            } else if (this.board[id] === playingAs) {
                console.log('top', i, 2)
                this.hasLiberties(id, playingAs)
            }
            console.log('top', i, 3)
        }
        //right
        id = (i + 1)
        if (column != this.boardSize - 1 && !this.hasBeenChecked.includes(id)) {
            // console.log('right')
            if (this.board[id] === '.') {
                console.log('right', i, 1)
                this.isValid = true
                // return true
            } else if (this.board[id] === playingAs) {
                console.log('right', i, 2)
                this.hasLiberties(id, playingAs)
            }
            console.log('right', i, 3)
        }
        // bottom
        id = (i + this.boardSize)
        if (row != this.boardSize - 1 && !this.hasBeenChecked.includes(id)) {
            // console.log('bottom', i, id, this.hasBeenChecked, playingAs, this.board[id])
            // console.log(this.boardSize, this.board.length, i + this.boardSize)
            if (this.board[id] === '.') {
                console.log('bottom', i, 1)
                this.isValid = true
                // return true
            } else if (this.board[id] === playingAs) {
                console.log('bottom', i, 2)
                this.hasLiberties(id, playingAs)
            }
            console.log('bottom', i, 3)
        }
        // left
        id = (i - 1)
        if (column != 0 && !this.hasBeenChecked.includes(id)) {
            // console.log('left')
            if (this.board[id] === '.') {
                console.log('left', i, 1)
                this.isValid = true
                // return true
            } else if (this.board[id] === playingAs) {
                console.log('left', i, 2)
                this.hasLiberties(id, playingAs)
            }
            console.log('left', i, 3)
        }
        console.log('-------------END HAS LIBERTIES---------------', this.isValid)
        return this.isValid || false
    }
}

export default Validate