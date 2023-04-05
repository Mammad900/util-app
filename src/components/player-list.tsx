import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import "./player-list.scss"

export type PlayerListProps = {
    players: string[],
    setPlayers: React.Dispatch<React.SetStateAction<string[]>>
}

export default function PlayerList({players, setPlayers: onChange}: PlayerListProps) {
    return (
        <ul className="player-list">
            {players.map((name, index) => (
                <li key={index}>
                    <input
                        type="text"
                        value={name}
                        onChange={e => onChange(p => [
                            ...p.slice(0, index),
                            e.target.value,
                            ...p.slice(index + 1)
                        ])}
                        placeholder={`Player ${index + 1}`}
                        autoFocus
                    />
                    <button
                        onClick={() => onChange(p => [
                            ...p.slice(0, index),
                            ...p.slice(index + 1)
                        ])}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </li>
            ))}
            {players.length < 4 && (
                <button onClick={() => onChange(p => [...p, ''])}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            )}
        </ul>
    )
}