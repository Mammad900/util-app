import React from 'react';
import DotGame, { DotGameIcon } from './dot-game/dot-game';
import GameTurn, { GameTurnIcon } from './game-turn/game-turn';
import PhysicsCheatSheet, { PhysicsCheatSheetIcon, PhysicsCheatSheetRoutes } from './physics-cheatsheet/physics-cheatsheet';
import ToDo, { ToDoIcon } from './todo/todo';
import { Calculator, CalculatorIcon } from './calculator/calculator';

export const utilList: Record<string, {
    name: string,
    Icon: React.FunctionComponent,
    component: React.FunctionComponent,
    subRoutes?: () => React.ReactNode
}> = {
    'todo': {
        name: 'Todo',
        Icon: ToDoIcon,
        component: ToDo
    },
    'game-turn': {
        name: 'Game Turn',
        Icon: GameTurnIcon,
        component: GameTurn
    },
    'dot-game': {
        name: 'Dot Game',
        Icon: DotGameIcon,
        component: DotGame
    },
    'physics-cheat-sheet': {
        name: 'Physics CheatSheet',
        Icon: PhysicsCheatSheetIcon,
        component: PhysicsCheatSheet,
        subRoutes: PhysicsCheatSheetRoutes
    },
    'calculator': {
        name: 'Calculator',
        Icon: CalculatorIcon,
        component: Calculator
    }
}