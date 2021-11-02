export default [
    {
        copy: (
            <>
                The game of GO (or wéiqí) has been played for over 2500 years.<br /><br />
                It is very simple to learn and yet extremely hard to master.<br /><br />
                The aim of the game is to try and control more area than your opponent by taking it in turn to place stones on the board.<br /><br />
                You can place stones on the board by clicking on the intersections between the lines.
            </>
        ),
        board: '.'.repeat(81)
    },
    {
        copy: (
            <>
                Starting in the corners is usually a good idea as it takes fewer stones to encircle an area.<br /><br />
                Once the corners have been taken it is then a good idea to move onto the centre of the board.<br /><br />
                Have a play around with the current board position to try and make areas.<br /><br />
                You can undo a move by clicking the <span className="text-red-400">red</span> icon in the bottom left hand corner.
            </>
        ),
        board: '....................x...o...............x...............x...o....................',
        toPlay: 'white'
    },
    {
        copy: (
            <>
                If an area touches both black and white stones then it is owned by nobody.<br /><br />
                If you want to check the state of the board then click the <span className="text-green-500">green</span> icon in the bottom left hand corner.<br /><br />
                See what happens if you place stones within enemy territory.
            </>
        ),
        board: '..................xxx.x......xx.xxxx....x....ooo.x..oo...o..o...o.o..o.....o..o..'
    },
    {
        copy: (
            <>
                Stones on the board can be captured by the enemy if they become fully encircled and lose all of their 'liberties'.<br /><br />
                Caputured stones are then added to players score once the game is over.<br /><br />
                Take a look at the position in the centre of the board and capture the white stone.<br /><br />
            </>
        ),
        board: '...............................x........ox.......x...............................',
        toPlay: 'black'
    },
    {
        copy: (
            <>
                Stones that are in contact with stones of the same colour form 'chains'.<br /><br />
                Chains share their liberties.<br /><br />
                When a stone or chain only has one liberty left it is said to be in 'atari'.<br /><br />
                Capture the chain in the centre of the board.
            </>
        ),
        board: '..............................xxx.....xooox.....x.x..............................',
        toPlay: 'black'
    },
    {
        copy: (
            <>
                A player can't place stones in a position where they won't have any liberties.<br /><br />
                Unless the move results in a capture.<br /><br />
                Take the white stone in the centre of the board.
            </>
        ),
        board: '..............................ox......o.ox......ox...............................',
        toPlay: 'black'
    },
    {
        copy: (
            <>
                If a stone is captured the opponent can't immediately recapture if this results in an identical position.<br /><br />
                This rule is called KO and stops the game from repeating indefinitely.<br /><br />
                Try out the position on the board for yourself. White must ignore the atari and place their stone elsewhere on the board.
            </>
        ),
        board: '..............................ox......o.ox......ox...............................',
        toPlay: 'black'
    },
    {
        copy: (
            <>
                The white chain on the board is called a ladder.<br /><br />
                Ladders are an important concept in GO. They normally occur when a player is trying to escape capture.<br /><br />
                A player who doesn't understand ladders can lose many stones!
            </>
        ),
        board: '...................xxx......xoox......xoox......xoox......xo........x............',
        toPlay: 'black'
    },
]