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

    getAdjacentNodes(id) {
        const row = Math.floor((id) / this.boardSize)
        const column = id % this.boardSize
        const output = []
        // top
        if (row != 0) {
            output.push(id - this.boardSize)
        }
        // right
        if (column != this.boardSize - 1) {
            output.push(id + 1)
        }
        // bottom
        if (row != this.boardSize - 1) {
            output.push(id + this.boardSize)
        }
        // left
        if (column != 0) {
            output.push(id - 1)
        }
        return output
    }

    hasLiberties(id, playingAs = this.playerChar, board = this.board) {
        this.hasBeenChecked.add(id)
        const nodesToBeChecked = this.getAdjacentNodes(id)

        nodesToBeChecked.forEach(node => {
            if (!this.hasBeenChecked.has(node)) {
                if (board[node] === '.') {
                    this.isValid = true
                } else if (board[node] === playingAs) {
                    this.hasLiberties(node, playingAs, board)
                }
            }
        })

        return this.isValid || false
    }

    captureChain(id) {
        this.hasBeenChecked.add(id)
        this.isValid = false
        const nodesToBeChecked = this.getAdjacentNodes(id)

        nodesToBeChecked.forEach(node => {
            if (this.board[node] === this.opponentChar && !this.hasBeenChecked.has(node)) {
                this.isValid = undefined
                const hasLibs = this.hasLiberties(node, this.opponentChar)
                if (!hasLibs) {
                    this.toBeRemoved.add(
                        Array.from(this.hasBeenChecked).slice(this.startOfChain, this.hasBeenChecked.size)
                    )
                }
                this.startOfChain = this.hasBeenChecked.size
            }
        })

        this.isValid = false
        return Array.from(this.toBeRemoved)
    }

    calculateAreas() {
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
        return this.areas
    }


    scoreChain(id) {
        if (!this.hasBeenChecked.has(id)) {
            this.hasBeenChecked.add(id)
        } else {
            return;
        }
        const nodesToBeChecked = this.getAdjacentNodes(id)

        nodesToBeChecked.forEach(node => {
            if (!this.hasBeenChecked.has(node)) {
                if (this.board[node] === '.') {
                    this.scoreChain(node)
                } else if (!this.currentChain.owner) {
                    this.currentChain.owner = this.board[node]
                } else if (this.board[node] !== this.currentChain.owner) {
                    this.currentChain.owner = '.'
                }
            }
        })

        return { owner: this.currentChain.owner, chain: Array.from(this.hasBeenChecked).slice(this.startOfChain, this.hasBeenChecked.size) }
    }

    countEyesAndLibs(id, owner, board = this.board) {
        const nodesToBeChecked = this.getAdjacentNodes(id)

        nodesToBeChecked.forEach(node => {
            if (!this.hasBeenChecked.has(node) && !this.currentChain.eyesAndLibs.has(node)) {
                this.hasBeenChecked.add(node)
                // console.log(node, [...this.hasBeenChecked])

                if (board[node] === '.') {
                    this.areas.forEach(area => {
                        if (area.chain.includes(node)) {
                            if (area.owner === owner) {
                                area.chain.forEach(node => this.currentChain.eyesAndLibs.add(node))
                                this.currentChain.eyes.add(area.chain)
                                this.countEyesAndLibs(node, owner, board)
                            } else if (area.owner === '.') {
                                this.currentChain.libs.add(node)
                                this.currentChain.eyesAndLibs.add(node)
                            }
                        }
                    })
                } else if (board[node] === owner && !this.currentChain.chain.has(node)) {
                    this.currentChain.chain.add(node)
                    this.countEyesAndLibs(node, owner, board)
                }
            }
        })

        console.log('---------------counting eyes and libs--------------')
        return { id: id, hasBeenChecked: this.hasBeenChecked, currentChain: this.currentChain, owner: owner, board: board }
    }


    deadBehindEnemyLines(id) {

        // more than two eyes
        if (this.currentChain.eyes.size >= 2) {
            console.log('DBL - 1')
            return false
        }
        // more than two liberties??
        if (this.currentChain.libs.size > 3) {
            console.log('DBL - 2')
            return false
        }
        if (this.currentChain.eyes.size == 0 && this.currentChain.libs.size < 2) {
            console.log('DBL - 3')
            return true
        }
        // LIBS three or under
        // capture or extend??

        // else SEKI





        // SEKI: shared liberties / one eye each && one liberty each
        if (
            this.currentChain.eyesAndLibs.size == 2 ||
            this.currentChain.eyes.size == 1 && this.currentChain.eyesAndLibs.size == 3 && this.currentChain.libs.size == 2
        ) {
            console.log('DBL - 4')
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
            console.log('DBL - 5')
            return !Array.from(this.currentChain.eyes).some(eye => eye.length >= 3)
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
        let checkOne, checkTwo
        let tempInSeki = []
        let tempCheck

        if (eyes.length == 0 && libs.length == 2) {
            console.log('---------SEKI ONE-----------------')
            // ----------------------------------
            // split liberties
            // ----------------------------------
            // add current chain to potential collection of seki nodes
            tempInSeki.push(...this.currentChain.chain)
            // for each spare liberty
            libs.forEach((node, i) => {
                tempBoard = this.board
                tempBoard = tempBoard.replaceAt(node, this.board[id] === 'x' ? 'o' : 'x')
                this.clearChainData()
                // if on either side there is only one liberty/eye space left then seki
                if (this.currentChain.eyesAndLibs.size == 1) {
                    tempCheck = true
                } else if (this.currentChain.eyesAndLibs.size == 2) {
                    // else if two options available then check both
                    tempCheck = (
                        !this.hasLiberties(node, this.board[id], tempBoard.replaceAt(this.currentChain.eyesAndLibs[0], this.board[id])) ||
                        !this.hasLiberties(node, this.board[id], tempBoard.replaceAt(this.currentChain.eyesAndLibs[1], this.board[id]))
                    )
                }
                // if either side has passed then stones are in seki
                if (tempCheck) {
                    this.currentChain.chain.delete(node)
                    tempInSeki.push(...this.currentChain.chain)
                }
                if (i == 0) {
                    checkOne = tempCheck
                } else {
                    checkTwo = tempCheck
                }
            })
            if (checkOne || checkTwo) {
                tempInSeki.forEach(node => this.inSeki.add(node))
                return true
            } else {
                this.currentChain.chain = chain
                return false
            }
        }
        if (eyes.length == 0 && libs.length == 1) {
            console.log('---------SEKI TWO-----------------')
            // ----------------------------------
            // sharing two liberties
            // ----------------------------------
            const checkTwoLiberties = (playingAs, eyesAndLibs, board) => {
                this.hasBeenChecked = new Set
                board = board.replaceAt(eyesAndLibs[0], playingAs)
                board = board.replaceAt(eyesAndLibs[1], playingAs === 'x' ? 'o' : 'x')
                return (
                    !this.hasLiberties(eyesAndLibs[0], playingAs, board) &&
                    !this.hasLiberties(eyesAndLibs[1], playingAs === 'x' ? 'o' : 'x', board)
                )
            }
            // check white at 0 && check black at 1
            checkOne = checkTwoLiberties('x', chainEyesAndLibs, tempBoard)
            // check black at 0 and white at 1
            checkTwo = checkTwoLiberties('o', chainEyesAndLibs, tempBoard)
            console.log('SEKI has been checked - ONE', id, checkOne, checkTwo, chain, this.hasBeenChecked)
            // both groups die in both eventualities
            if (checkOne && checkTwo) {
                Array.from(this.hasBeenChecked)
                    .filter(id => id === chainEyesAndLibs[0] || id === chainEyesAndLibs[1] ? false : true)
                    .forEach(id => this.inSeki.add(id))
                return true
            } else {
                return false
            }
        }
        // ------------------------------------------
        // one eye each and one shared liberty
        // ------------------------------------------
        if (eyes.length == 1 && eyes[0].length == 1 && libs.length == 1) {
            console.log('---------SEKI THREE-----------------')

            // fill shared liberty and check that only one liberty remains
            const checkOneEyeEach = (a, playingAs, board) => {
                this.clearChainData()
                board = board.replaceAt(a, playingAs)
                console.log(playingAs, this.countEyesAndLibs(a, playingAs, board))
                return this.currentChain.eyesAndLibs.size == 1
            }

            // check black
            checkOne = checkOneEyeEach(libs[0], 'x', tempBoard)
            if (checkOne) {
                this.currentChain.chain.delete(libs[0])
                tempInSeki.push(...this.currentChain.chain)
            }
            // check white
            checkTwo = checkOneEyeEach(libs[0], 'o', tempBoard)
            if (checkTwo) {
                this.currentChain.chain.delete(libs[0])
                tempInSeki.push(...this.currentChain.chain)
            }
            console.log('SEKI has been checked - THREE', checkOne, checkTwo)
            if (checkOne && checkTwo) {
                tempInSeki.forEach(id => this.inSeki.add(id))
                return true
            } else {
                // return to previous chain for removal
                this.currentChain.chain = chain
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
            if (this.currentChain.chain.size == 0) {
                console.log('removing from board 1')
                this.board = this.board.replaceAt(i, '.')
            } else {
                console.log('removing from board 2')
                this.currentChain.chain.forEach(node => this.board = this.board.replaceAt(node, '.'))
            }
            this.calculateAreas()
        }
    }

    checkScore() {
        console.log(this.board.length)
        this.blackDraftCaptures = 0
        this.whiteDraftCaptures = 0
        this.calculateAreas()

        // this.scoreDraftCaptures(54)
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