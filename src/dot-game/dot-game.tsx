import React from "react";
import DotGameGame from "./game";
import "./dot-game.scss";

export function DotGameIcon() {
    return (
        <svg version="1.1" viewBox="0 0 100 100">
            <rect x="20" y="20" style={{ fill: 'none', stroke: 'currentcolor', strokeWidth: 8 }} width="60" height="60" />
            <circle style={{ fill: 'currentcolor' }} cx="20" cy="20" r="10" />
            <circle style={{ fill: 'currentcolor' }} cx="80" cy="20" r="10" />
            <circle style={{ fill: 'currentcolor' }} cx="20" cy="80" r="10" />
            <circle style={{ fill: 'currentcolor' }} cx="80" cy="80" r="10" />
        </svg>
    );
}

export default function DotGame() {
    const canvasSquaresRef = React.useRef<HTMLCanvasElement>(null);
    const canvasLinesRef = React.useRef<HTMLCanvasElement>(null);
    const canvasNewLineRef = React.useRef<HTMLCanvasElement>(null);
    const canvasDotsRef = React.useRef<HTMLCanvasElement>(null);
    const [game, setGame] = React.useState<DotGameGame | null>(null);
    const [scores, setScores] = React.useState<number[]>(Array(2).fill(0));
    const [turn, setTurn] = React.useState(0);

    React.useEffect(() => {
        const game = new DotGameGame(
            10, 10,
            canvasSquaresRef.current!,
            canvasLinesRef.current!,
            canvasNewLineRef.current!,
            canvasDotsRef.current!
        );
        setGame(game);
        game.updatePlayerScores = () => {
            console.log(game.playerScores)
            setScores([...game.playerScores]);
        }
        game.updateTurn = () => setTurn(game.playerTurn);
    }, []);

    function move(e: React.MouseEvent | React.TouchEvent) { game?.onMouseMove(e.nativeEvent) };
    function down(e: React.MouseEvent | React.TouchEvent) { game?.onMouseDown(e.nativeEvent) };
    function up(e: React.MouseEvent | React.TouchEvent) { game?.onMouseUp(e.nativeEvent) };
    function leave(e: React.MouseEvent | React.TouchEvent) { game?.onMouseLeave(e.nativeEvent) };

    return (
        <main id="dot-game">
            <div className="game">
                <div className="players">
                    {scores.map((score, index) => (
                        <div key={index} className={`player ${turn === index ? 'turn' : ''}`}>
                            <div className="content">
                                <h2>
                                    Player {index+1}
                                </h2>
                                <div className="score">
                                    {score}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="canvases">
                    <canvas ref={canvasSquaresRef} />
                    <canvas ref={canvasLinesRef} />
                    <canvas ref={canvasNewLineRef} />
                    <canvas ref={canvasDotsRef} onMouseMove={move} onMouseDown={down} onMouseUp={up} onMouseLeave={leave} onTouchMove={move} onTouchStart={down} onTouchEnd={up} onTouchCancel={leave} />
                </div>
            </div>
        </main >
    );
}