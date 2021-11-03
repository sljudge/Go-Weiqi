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
                You can undo a move by clicking the <span className="text-red-400">red</span> undo icon.
            </>
        ),
        board: '....................x...o...............x...............x...o....................',
        toPlay: 'white'
    },
    {
        copy: (
            <>
                If an area touches both black and white stones then it is owned by nobody.<br /><br />
                If you want to check the state of the board then click the <span className="text-green-500">green</span> analyse icon.<br /><br />
                See what happens if you place stones within enemy territory.<br /><br />
                <em>(When scoring the application may remove stones deemed 'dead behind enemy lines'. More on this later...)</em>
            </>
        ),
        board: '..................xxx.x......xx.xxxx....x....ooo.x..oo...o..o...o.o..o.....o..o..'
    },
    {
        copy: (
            <>
                Stones on the board can be captured by the enemy if they become fully encircled and lose all of their 'liberties' (adjacent intersections with no stones).<br /><br />
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
        board: '..............................xxx.....xooox.....xox..............................',
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
                In the current board position, black is currently in ownership of the three spaces in the bottom left hand corner.<br /><br />
                However, if white is allowed to place three stones without reply within this area the black stones will now be captured.<br /><br />
                Have a go and capture the black stones.
            </>
        ),
        board: '......................................................ooooo....xxxxo.......xo....',
        toPlay: 'white'
    },
    {
        copy: (
            <>
                In order to save the chain black must create two 'eyes'.<br /><br />
                An eye is an area controlled by a chain. If a chain has two eyes then it will never be killed as the opponent will never be able to play two stones simultaneously.<br /><br />
                A chain with two eyes is 'alive'.
            </>
        ),
        board: '......................................................ooooo....xxxxo.....x.xo....',
        toPlay: 'white'
    },
    {
        copy: (
            <>
                Take a look at the board position. Black is currently under threat.<br /><br />
                See if you can save the black stones by creating at least two eyes.
            </>
        ),
        board: '...........oooo.o...oxxxo...ox...xo..oxx.xxo...ooxxoo.....oo.....................',
        toPlay: 'black'
    },
    {
        copy: (
            <>
                The white chain on the board is called a ladder.<br /><br />
                Ladders are an important concept in GO. They normally occur when a player is trying to escape capture.<br /><br />
                A player who doesn't understand ladders can lose many stones!<br /><br />
                Capture the ladder.
            </>
        ),
        board: '...........x.......xox......xoox......xoox......xoox......xo........x............',
        toPlay: 'black'
    },
    {
        copy: (
            <>
                The position on the board is what is called 'seki' (loosely translated as 'mutual life').<br /><br />
                Seki is a state in which neither player can capture as any attempt will be suicidal.<br /><br />
                Try for yourself!
            </>
        ),
        board: 'x.ox.....x.ox.....xxox.....ooxx.......oo.........................................',
        toPlay: 'black'
    },
    {
        copy: (
            <>
                Take a look at the position on the board.<br /><br />
                See if you can save the black group by making seki.<br /><br />
                (Once you are happy click the analyse button to check if the chains are in seki)
            </>
        ),
        board: '......................................o.........ooxx....oxxox....ox.ox....ox.o...',
        toPlay: 'black'
    },
    {
        copy: (
            <>
                The game is over once both players pass.<br /><br />
                The score is then calculated by adding up all of the occupied territories along with any captured stones.<br /><br />
                To avoid unecessary moves both players must agree if certain groups are alive or dead.<br /><br />
                Take a look at the chain in the top left hand corner - it currently only has one liberty and can therefore be deemed 'dead'. The white stone in the top right equally has no chance of life as it will be unable to make two eyes.<br /><br />
                Analyse the board, play a few moves and analyse again to see if the white stones can be rescued.<br /><br />
                Once you are happy with the board, try passing twice using the yellow hand icon to see the score.
            </>
        ),
        board: '.ox..x...oxxxxxo.xoooooxxx.xoxoxox.x.x.x.oxx.ooxx.ox.x..oxx.xx...oxxooox..oxo...o',
        toPlay: 'black'
    },
]