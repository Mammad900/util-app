import GameTurn, { GameTurnIcon } from './game-turn/game-turn';
import ToDo, { ToDoIcon } from './todo/todo';

export const utilList: Record<string, {
    name: string,
    Icon: React.FunctionComponent,
    component: React.FunctionComponent
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
    }
}