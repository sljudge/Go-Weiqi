class Validate {
    constructor(board, toPlay, previousBoardPosition, ko) {
        this.board = board;
        this.previousBoardPosition = previousBoardPosition;
        this.ko = ko;
        this.toPlay = toPlay;
        this.playerChar = toPlay === 'black' ? 'x' : 'o'
        this.opponentChar = toPlay === 'black' ? 'o' : 'x'
        this.boardSize = Math.sqrt(board.length)
        this.hasBeenChecked = new Set
        this.currentChain = {
            owner: undefined,
            chain: new Set,
            eyesAndLibs: new Set,
            eyes: new Set,
            libs: new Set
        }
        this.inSeki = new Set
        this.toBeRemoved = new Set
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

    clearChainData() {
        this.hasBeenChecked = new Set
        this.currentChain = {
            owner: undefined,
            chain: new Set,
            eyesAndLibs: new Set,
            eyes: new Set,
            libs: new Set
        }
    }

    captureChain(i) {
        this.hasBeenChecked.add(i)
        this.isValid = false
        let id
        const row = Math.floor((i) / this.boardSize)
        const column = i % this.boardSize
        // top
        id = (i - this.boardSize)
        if (row != 0 && !this.hasBeenChecked.has(id) && this.board[id] === this.opponentChar) {
            this.handleCaptureChain(id)
        }
        // right
        id = (i + 1)
        if (column != this.boardSize - 1 && !this.hasBeenChecked.has(id) && this.board[id] === this.opponentChar) {
            this.handleCaptureChain(id)
        }
        // bottom
        id = (i + this.boardSize)
        if (row != this.boardSize - 1 && !this.hasBeenChecked.has(id) && this.board[id] === this.opponentChar) {
            this.handleCaptureChain(id)
        }
        // left
        id = (i - 1)
        if (column != 0 && !this.hasBeenChecked.has(id) && this.board[id] === this.opponentChar) {
            this.handleCaptureChain(id)
        }
        this.isValid = false
        return Array.from(this.toBeRemoved)
    }

    handleCaptureChain(i) {
        this.isValid = undefined

        const hasLibs = this.hasLiberties(i, this.opponentChar)
        console.log('has libs', i, this.opponentChar, hasLibs)

        if (!hasLibs) {
            this.toBeRemoved.add(
                Array.from(this.hasBeenChecked).slice(this.startOfChain, this.hasBeenChecked.size)
            )
        }
        this.startOfChain = this.hasBeenChecked.size
    }


    hasLiberties(i, playingAs = this.playerChar, board = this.board) {
        this.hasBeenChecked.add(i)


        let id
        const row = Math.floor((i) / this.boardSize)
        const column = i % this.boardSize

        // top
        id = (i - this.boardSize)
        if (row != 0 && !this.hasBeenChecked.has(id)) {
            console.log('L - top', id)
            this.handleHasLiberties(id, playingAs, board)
        }
        //right
        id = (i + 1)
        if (column != this.boardSize - 1 && !this.hasBeenChecked.has(id)) {
            console.log('L - right', id)
            this.handleHasLiberties(id, playingAs, board)
        }
        // bottom
        id = (i + this.boardSize)
        if (row != this.boardSize - 1 && !this.hasBeenChecked.has(id)) {
            console.log('L - bottom', id)
            this.handleHasLiberties(id, playingAs, board)
        }
        // left
        id = (i - 1)
        if (column != 0 && !this.hasBeenChecked.has(id)) {
            console.log('L - left', id)
            this.handleHasLiberties(id, playingAs, board)
        }
        console.log('END has libs: ', i, this.isValid || false, this.hasBeenChecked)
        return this.isValid || false
    }

    handleHasLiberties(id, playingAs, board) {
        console.log('handle has libs', id, playingAs)
        if (board[id] === '.') {
            console.log('-------------libs END 1------------------', this.hasBeenChecked)
            this.isValid = true
        } else if (board[id] === playingAs) {
            console.log('libs CONTINUE ', id)
            this.hasLiberties(id, playingAs, board)
        } else {
            console.log('no libs', id)
        }
    }

    calculateAreas() {
        console.log('---------------checking areas--------------')
        this.areas = []
        this.hasBeenChecked = new Set
        this.startOfChain = 0
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] === '.') {

                const chainScore = this.scoreChain(i)
                this.startOfChain = this.hasBeenChecked.size
                this.currentChain.owner = undefined
                if (chainScore) {
                    this.areas.push(chainScore)
                }
            }
        }
        console.log('-------------checking areas END----------', this.areas)
        return this.areas
    }


    scoreChain(i) {
        if (!this.hasBeenChecked.has(i)) {
            this.hasBeenChecked.add(i)
        } else {
            return;
        }
        let id
        const row = Math.floor((i) / this.boardSize)
        const column = i % this.boardSize

        // top
        id = (i - this.boardSize)
        if (row != 0 && !this.hasBeenChecked.has(id)) {
            this.handleScoreChain(id)
        }
        //right
        id = (i + 1)
        if (column != this.boardSize - 1 && !this.hasBeenChecked.has(id)) {
            this.handleScoreChain(id)
        }
        // bottom
        id = (i + this.boardSize)
        if (row != this.boardSize - 1 && !this.hasBeenChecked.has(id)) {
            this.handleScoreChain(id)
        }
        // left
        id = (i - 1)
        if (column != 0 && !this.hasBeenChecked.has(id)) {
            this.handleScoreChain(id)
        }
        return { owner: this.currentChain.owner, chain: Array.from(this.hasBeenChecked).slice(this.startOfChain, this.hasBeenChecked.size) }
    }

    handleScoreChain(id) {
        if (this.board[id] === '.') {
            this.scoreChain(id)
        } else if (!this.currentChain.owner) {
            this.currentChain.owner = this.board[id]
        } else if (this.board[id] !== this.currentChain.owner) {
            this.currentChain.owner = '.'
        }
    }

    countEyesAndLibs(i, owner, board = this.board) {
        let id
        const row = Math.floor((i) / this.boardSize)
        const column = i % this.boardSize

        // top
        id = (i - this.boardSize)
        if (row != 0 && !this.hasBeenChecked.has(id)) {
            this.handleCountEyesAndLibs(id, owner, board)
        }
        //right
        id = (i + 1)
        if (column != this.boardSize - 1 && !this.hasBeenChecked.has(id)) {
            this.handleCountEyesAndLibs(id, owner, board)
        }
        // bottom
        id = (i + this.boardSize)
        if (row != this.boardSize - 1 && !this.hasBeenChecked.has(id)) {
            this.handleCountEyesAndLibs(id, owner, board)
        }
        // left
        id = (i - 1)
        if (column != 0 && !this.hasBeenChecked.has(id)) {
            this.handleCountEyesAndLibs(id, owner, board)
        }
        console.log('---------------counting eyes and libs--------------')
        return { id: i, hasBeenChecked: this.hasBeenChecked, currentChain: this.currentChain, owner: owner, board: board }
    }

    handleCountEyesAndLibs(id, owner, board) {
        if (this.currentChain.eyesAndLibs.has(id)) {
            return;
        }
        this.hasBeenChecked.add(id)
        if (board[id] === '.') {
            this.areas.forEach(area => {
                if (area.chain.includes(id)) {
                    if (area.owner === owner) {
                        this.currentChain.eyesAndLibs.add(...area.chain)
                        this.currentChain.eyes.add(area.chain)
                        this.countEyesAndLibs(id, owner, board)
                    } else if (area.owner === '.') {
                        this.currentChain.libs.add(id)
                        this.currentChain.eyesAndLibs.add(id)
                    }
                }
            })
        } else if (board[id] === owner && !this.currentChain.chain.has(id)) {
            this.currentChain.chain.add(id)
            this.countEyesAndLibs(id, owner, board)
        }
    }


    deadBehindEnemyLines(id) {

        console.log('DOA current chain: ', this.currentChain)

        // more than two eyes
        if (this.currentChain.eyes.size >= 2) {
            return false
        }
        // more than two liberties??
        if (this.currentChain.libs.size > 2) {
            return false
        }
        // SEKI: shared liberties / one eye each && one liberty each
        if (
            this.currentChain.eyesAndLibs.size == 2 ||
            this.currentChain.eyes.size == 1 && this.currentChain.eyesAndLibs.size == 3 && this.currentChain.libs.size == 2
        ) {
            if (this.inSeki.has(id)) {
                return false
            } else {
                const seki = this.checkForSeki(id)
                console.log('**********************************')
                console.log('seki', seki, id, this.inSeki)
                console.log('**********************************')
                if (seki) {
                    return false
                }
            }
        }
        // One eye of certain length -> needs to be able to make 2 eyes (to do)
        if (this.currentChain.eyes.size === 1) {

            let isDead = true
            this.currentChain.eyes.forEach(eye => {
                if (eye.length >= 3) {
                    isDead = false
                }
            })
            return isDead
        }
        return true
    }

    checkForSeki(id) {
        console.log('---------checking for seki-----------------', id)
        let tempBoard = this.board
        const eyes = Array.from(this.currentChain.eyes)
        const libs = Array.from(this.currentChain.libs)
        const chainEyesAndLibs = Array.from(this.currentChain.eyesAndLibs)
        const chain = Array.from(this.currentChain.chain)
        const owner = tempBoard[id]
        let blackCheck, whiteCheck
        let tempInSeki = []

        // sharing two liberties
        if (eyes.length == 0) {
            console.log('---------SEKI ONE-----------------')
            const checkTwoLiberties = (playingAs, eyesAndLibs, board) => {
                // this.clearChainData()
                this.hasBeenChecked = new Set
                board = board.replaceAt(eyesAndLibs[0], playingAs)
                board = board.replaceAt(eyesAndLibs[1], playingAs === 'x' ? 'o' : 'x')
                return (
                    !this.hasLiberties(eyesAndLibs[0], playingAs, board) &&
                    !this.hasLiberties(eyesAndLibs[1], playingAs === 'x' ? 'o' : 'x', board)
                )
            }
            // check white at 0 && check black at 1
            blackCheck = checkTwoLiberties('x', chainEyesAndLibs, tempBoard)
            // check black at 0 and white at 1
            whiteCheck = checkTwoLiberties('o', chainEyesAndLibs, tempBoard)
            console.log('SEKI has been checked - ONE', id, blackCheck, whiteCheck, chain, this.hasBeenChecked)
            if (blackCheck && whiteCheck) {
                chain.filter(id => id !== libs[0])
                chain.forEach(id => this.inSeki.add(id))
                return true
            } else {
                return false
                // tempBoard = tempBoard.replaceAt(chainEyesAndLibs[0], this.board[id])
                // tempBoard = tempBoard.replaceAt(chainEyesAndLibs[1], this.board[id])

                // let tempA, tempB

                // this.clearChainData()
                // this.countEyesAndLibs(chainEyesAndLibs[0], this.board[id] === 'x' ? 'o' : 'x', tempBoard)
                // // exit if nodes adjacent
                // console.log('nodes adjacent', this.currentChain.chain, chainEyesAndLibs[0], chainEyesAndLibs[1], tempBoard)
                // if (this.currentChain.chain.has(chainEyesAndLibs[0]) && this.currentChain.chain.has(chainEyesAndLibs[1])) {
                //     return false
                // }
                // tempA = this.currentChain.eyesAndLibs.size == 1
                // console.log('A seki', this.currentChain)
                // if (tempA) {
                //     tempInSeki.push(...this.currentChain.chain)
                // }

                // this.clearChainData()
                // this.countEyesAndLibs(chainEyesAndLibs[1], this.board[id] === 'x' ? 'o' : 'x', tempBoard)
                // tempB = this.currentChain.eyesAndLibs.size == 1
                // console.log('B seki', this.currentChain)
                // if (tempB) {
                //     tempInSeki.push(...this.currentChain.chain)
                // }


                // if (tempA && tempB) {
                //     tempInSeki.push(...chain)
                //     tempInSeki = tempInSeki.filter(id => {
                //         if (id == chainEyesAndLibs[0] || id == chainEyesAndLibs[1]) {
                //             return false
                //         } else {
                //             return true
                //         }
                //     })
                //     console.log('SEKI has been checked 1.5', id, tempInSeki, chainEyesAndLibs[0], chainEyesAndLibs[1])
                //     tempInSeki.forEach(id => this.inSeki.add(id))
                //     return true
                // } else {
                //     return false
                // }
            }
        }

        // one eye each and one shared liberty
        if (eyes.length == 1 && eyes[0].length == 1 && libs.length == 1) {
            console.log('---------SEKI TWO-----------------')

            const checkOneEyeEach = (a, playingAs, board) => {
                this.clearChainData()
                board = board.replaceAt(a, playingAs)
                console.log(playingAs, this.countEyesAndLibs(a, playingAs, board))
                return this.currentChain.eyesAndLibs.size == 1
            }

            // check black for life
            blackCheck = checkOneEyeEach(libs[0], 'x', tempBoard)
            if (blackCheck) {
                this.currentChain.chain.delete(libs[0])
                tempInSeki.push(...this.currentChain.chain)
            }
            whiteCheck = checkOneEyeEach(libs[0], 'o', tempBoard)
            if (whiteCheck) {
                this.currentChain.chain.delete(libs[0])
                tempInSeki.push(...this.currentChain.chain)
            }
            console.log('SEKI has been checked - TWO', blackCheck, whiteCheck)
            if (blackCheck && whiteCheck) {
                tempInSeki.forEach(id => this.inSeki.add(id))
                return true
            } else {
                // return to previous chain for removal
                this.currentChain.chain = chain
                return false
            }
        }
        // one false eye
        if (eyes.length == 1 && chainEyesAndLibs.length == 3 && libs.length == 2) {
            console.log('------------------------------SEKI THREE-----------------------------')
            console.log('THREE', eyes, libs, chainEyesAndLibs, chain, owner)

            this.clearChainData()
            tempBoard = tempBoard.replaceAt(eyes[0][0], owner === 'x' ? 'o' : 'x')
            tempBoard = tempBoard.replaceAt(libs[0], owner === 'x' ? 'o' : 'x')
            let doesCapture = false
            for (let id of chain) {
                if (doesCapture) {
                    continue;
                }
                if (!this.hasLiberties(id, owner, tempBoard)) {
                    doesCapture = true
                }
            }
            console.log('SEKI has been checked - THREE', doesCapture, chain)
            // if capture then check for mutual 
            if (doesCapture) {
                tempBoard = tempBoard.replaceAt(libs[1], owner)
                console.log(this.countEyesAndLibs(libs[0], owner === 'x' ? 'o' : 'x', tempBoard))
                if (this.currentChain.eyesAndLibs.size == 0) {
                    chain.filter(id => id !== libs[0])
                    chain.forEach(id => this.inSeki.add(id))
                    this.currentChain.chain.delete(libs[0])
                    this.currentChain.chain.forEach(id => this.inSeki.add(id))
                    return true
                }
            } else {
                return false
            }
        }
    }

    scoreDraftCaptures(i) {
        this.clearChainData()
        console.log('count', i, this.countEyesAndLibs(i, this.board[i]))
        const deadBehindEnemyLines = this.deadBehindEnemyLines(i)
        console.log('dead behind lines: DOA: ', deadBehindEnemyLines, '  chain:', this.currentChain.chain, '   seki: ', this.inSeki)
        if (deadBehindEnemyLines) {
            if (this.board[i] === 'o') {
                this.blackDraftCaptures += this.currentChain.chain.size
            } else {
                this.whiteDraftCaptures += this.currentChain.chain.size
            }
            this.currentChain.chain.forEach(node => this.board = this.board.replaceAt(node, '.'))
            this.calculateAreas()
        }
    }

    checkScore() {
        console.log(this.board.length)
        this.blackDraftCaptures = 0
        this.whiteDraftCaptures = 0
        this.calculateAreas()

        // this.scoreDraftCaptures(1)
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] !== '.' && !this.inSeki.has(i)) {
                this.scoreDraftCaptures(i)
            }
        }

        console.log('***********************')
        console.log('SCORE: ', this.areas, this.inSeki)
        console.log('***********************')

        return { areas: this.areas, blackDraftCaptures: this.blackDraftCaptures, whiteDraftCaptures: this.whiteDraftCaptures }
    }


}

export default Validate