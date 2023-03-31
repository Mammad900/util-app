import React from "react";
import DotGameGame from "./game";
import "./dot-game.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

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
    const [width, setWidth] = React.useState(10);
    const [height, setHeight] = React.useState(10);
    const [players, setPlayers] = React.useState<string[]>(['Player 1', 'Player 2']);
    const [go, setGo] = React.useState(false);

    return (
        <main id="dot-game">
            {go ? (
                <Game
                    width={width}
                    height={height}
                    players={players}
                    onBack={() => setGo(false)}
                />
            ) : (
                <div className="options">
                    <div className="size">
                        <div className="label">Board size</div>
                        <div className="inputs">
                            <input
                                min={3}
                                max={20}
                                value={width}
                                onChange={e => setWidth(e.target.valueAsNumber)}
                                type="number"
                            />
                            <span>x</span>
                            <input
                                min={3}
                                max={20}
                                value={height}
                                onChange={e => setHeight(e.target.valueAsNumber)}
                                type="number"
                            />
                        </div>
                    </div>

                    <ul>
                        {players.map((name, index) => (
                            <li key={index}>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setPlayers(p => [
                                        ...p.slice(0, index),
                                        e.target.value,
                                        ...p.slice(index + 1)
                                    ])}
                                    placeholder="Player name"
                                    autoFocus
                                />
                                <button
                                    onClick={() => setPlayers(p => [
                                        ...p.slice(0, index),
                                        ...p.slice(index + 1)
                                    ])}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </li>
                        ))}
                        {players.length < 4 && (
                            <button onClick={() => setPlayers(p => [...p, 'Player ' + (p.length + 1)])}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        )}
                    </ul>

                    <button
                        className="start"
                        onClick={() => setGo(true)}
                        disabled={players.length === 0 || players.some(n => n.length === 0)}
                    >
                        Start
                    </button>
                </div>
            )}
        </main>
    );
}
function Game({ width, height, players, onBack }: { width: number, height: number, players: string[], onBack(): void }) {
    const canvasSquaresRef = React.useRef<HTMLCanvasElement>(null);
    const canvasLinesRef = React.useRef<HTMLCanvasElement>(null);
    const canvasNewLineRef = React.useRef<HTMLCanvasElement>(null);
    const canvasDotsRef = React.useRef<HTMLCanvasElement>(null);
    const [game, setGame] = React.useState<DotGameGame | null>(null);
    const [scores, setScores] = React.useState<number[]>(Array(players.length).fill(0));
    const [turn, setTurn] = React.useState(0);
    const [win, setWin] = React.useState<number[] | undefined>(undefined);

    React.useEffect(() => {
        const game = new DotGameGame(
            width, height,
            players.length,
            canvasSquaresRef.current!,
            canvasLinesRef.current!,
            canvasNewLineRef.current!,
            canvasDotsRef.current!
        );
        setGame(game);
        game.updatePlayerScores = () => {
            setScores([...game.playerScores]);
        }
        game.updateTurn = () => setTurn(game.playerTurn);
        game.onGameEnded = setWin;
    }, []);

    function move(e: React.MouseEvent | React.TouchEvent) { game?.onMouseMove(e.nativeEvent) };
    function down(e: React.MouseEvent | React.TouchEvent) { game?.onMouseDown(e.nativeEvent) };
    function up(e: React.MouseEvent | React.TouchEvent) { game?.onMouseUp(e.nativeEvent) };
    function leave(e: React.MouseEvent | React.TouchEvent) { game?.onMouseLeave(e.nativeEvent) };

    return (
        <div className="game">
            <div className="players">
                {players.map((name, index) => (
                    <div key={index} className={`player ${turn === index ? 'turn' : ''}`}>
                        <div className="content">
                            <h2>
                                {name}
                            </h2>
                            <div className="score">
                                {scores[index]}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="canvases">
                <canvas ref={canvasSquaresRef} />
                <canvas ref={canvasLinesRef} />
                <canvas ref={canvasNewLineRef} />
                <canvas ref={canvasDotsRef}
                    onMouseMove={move} onMouseDown={down} onMouseUp={up} onMouseLeave={leave}
                    onTouchMove={move} onTouchStart={down} onTouchEnd={up} onTouchCancel={leave} />
                
                {win && (
                    <h1 className="win-modal">
                        {win.length > 1 ? (
                            <div>Draw: {win.map(i => players[i]).join(' and ')} win!</div>
                        ) : (
                            <div>{players[win[0]]} wins!</div>
                        )}

                        <button onClick={onBack}>
                            Play again
                        </button>
                    </h1>
                )}
            </div>
        </div>
    );
}