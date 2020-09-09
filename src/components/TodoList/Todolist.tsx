import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValueType, TaskType} from '../../App';
import {AddItemForm} from './AddItemForm/AddItemForm';
import {EditableSpan} from './EditableSpan/EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: FilterValueType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (id: string, title: string, todoListID: string) => void
    filter: string
    removeTodoList: (todoListID: string) => void
    changeTodolistTitle: (newTitle: string, todoListID: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);


    const addTask = (title: string) => {
        props.addTask(title, props.id);
    };

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    };

    const removeTodoList = () => props.removeTodoList(props.id);

    return <div>
        <h3>
            <EditableSpan value={props.title} changeValue={changeTodolistTitle}/>
            <IconButton onClick={removeTodoList} aria-label="delete">
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const removeTask = () => props.removeTask(t.id, props.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    };

                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.id);
                    };
                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                            <EditableSpan value={t.title} changeValue={changeTaskTitle}/>
                            <IconButton onClick={removeTask} aria-label="delete">
                                <Delete/>
                            </IconButton>
                        </li>
                    );
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}>
                All
            </Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'text'}
                    color={'primary'} onClick={onActiveClickHandler}>
                Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'contained' : 'text'}
                    color={'secondary'} onClick={onCompletedClickHandler}>
                Completed
            </Button>
        </div>
    </div>;
}
