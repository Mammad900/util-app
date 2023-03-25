import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import ToDo from './todo/todo';

export const utilList: Record<string, {
    name: string,
    icon: IconDefinition,
    component: React.FunctionComponent
}> = {
    todo: {
        name: 'Todo',
        icon: faCheck,
        component: ToDo
    }
}