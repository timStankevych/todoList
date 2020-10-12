import React from 'react';
import {action} from '@storybook/addon-actions';
import {Task} from './Task';
import {Provider} from 'react-redux';
import {store} from '../../state/store';
import {ReduxStoreProviderDecorator} from '../../decorators/ReduxStoreProviderDecorator';

export default {
    title: 'Task Stories',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
};

let changeTaskStatus = action('Clicked changeTaskStatus');
let changeTaskTitle = action('Clicked changeTaskTitle');
let removeTask = action('Clicked removeTask');

export const TasksBaseExample = (props: any) => {
    return (<>
        <Task todolistId={'1'} task={{id: '123', isDone: true, title: 'hiyo'}}
        />
        <Task todolistId={'2'} task={{id: '12', isDone: true, title: 'hiyomkl'}}
        />
    </>);
};


