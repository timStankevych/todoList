import {TaskType} from '../../AppWithRedux';
import React, {ChangeEvent} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../state/tasks-reducer';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {useDispatch} from 'react-redux';

type TaskPropsType = {
    todolistId: string
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {

    const dispatch = useDispatch();
    const onRemoveTask =() => {
        dispatch(removeTaskAC(props.task.id, props.todolistId));
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(props.task.id, props.todolistId, newIsDoneValue));
    }

    const onChangeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(props.task.id, title, props.todolistId));
    }

    return (
        <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox onChange={onChangeHandler} checked={props.task.isDone}/>
            <EditableSpan value={props.task.title} changeValue={onChangeTaskTitle}/>
            <IconButton onClick={onRemoveTask} aria-label="delete">
                <Delete/>
            </IconButton>
        </li>
    );
});