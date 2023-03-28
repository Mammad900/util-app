import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./game-turn.scss";

export function GameTurnIcon() {
    return (
        <svg version="1.1" x="0px" y="0px" viewBox="0 0 100 100">
            <circle style={{ fill: 'currentcolor' }} cx="20" cy="20" r="10" />
            <line style={{ stroke: 'currentcolor', strokeWidth: 7, strokeLinecap: 'round' }} x1="37.5" y1="20" x2="62.5" y2="20" />
            <polygon style={{ stroke: 'currentcolor', strokeWidth: 7, strokeLinejoin: 'round' }} points="62.5,20 54.5,15 54.5,25 " />
            <circle style={{ fill: 'currentcolor' }} cx="80" cy="20" r="10" />
            <line style={{ stroke: 'currentcolor', strokeWidth: 7, strokeLinecap: 'round' }} x1="80" y1="37.5" x2="80" y2="62.5" />
            <polygon style={{ stroke: 'currentcolor', strokeWidth: 7, strokeLinejoin: 'round' }} points="80,62.5 85,54.5 75,54.5 " />
            <circle style={{ fill: 'currentcolor' }} cx="80" cy="80" r="10" />
            <line style={{ stroke: 'currentcolor', strokeWidth: 7, strokeLinecap: 'round' }} x1="62.5" y1="80" x2="37.5" y2="80" />
            <polygon style={{ stroke: 'currentcolor', strokeWidth: 7, strokeLinejoin: 'round' }} points="37.5,80 45.5,85 45.5,75 " />
            <circle style={{ fill: 'currentcolor' }} cx="20" cy="80" r="10" />
            <line style={{ stroke: 'currentcolor', strokeWidth: 7, strokeLinecap: 'round' }} x1="20" y1="62.5" x2="20" y2="37.5" />
            <polygon style={{ stroke: 'currentcolor', strokeWidth: 7, strokeLinejoin: 'round' }} points="20,37.5 15,45.5 25,45.5 " />
        </svg>
    )
}

export default function GameTurn() {
    const [players, setPlayers] = React.useState<string[]>(['']);
    const [turn, setTurn] = React.useState(-1);

    return (
        <main
            id="game-turn"
            className={turn === -1 ? 'add-players' : 'turn'}
            onClick={() => turn !== -1 && setTurn((turn + 1) % players.length)}
        >
            {turn === -1 ? (
                <>
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
                        <button onClick={() => setPlayers(p => [...p, ''])}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </ul>
                    <button
                        className="go"
                        onClick={() => setTurn(0)}
                        disabled={players.length === 0 || players.some(n => n.length === 0)}
                    >
                        GO
                    </button>
                </>
            ) : (
                <>
                    <div className="player">
                        {players[turn]}
                    </div>
                        <button
                            className="end"
                            onClick={e => {
                                e.stopPropagation();
                                setTurn(-1);
                            }}
                        >
                        End
                    </button>
                </>
            )}
        </main>
    )
}