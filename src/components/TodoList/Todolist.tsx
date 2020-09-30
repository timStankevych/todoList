import React, {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm/AddItemForm';
import {EditableSpan} from './EditableSpan/EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {FilterValueType, TaskType, TodoListType} from '../../AppWithRedux';
import {addTaskAC} from '../../state/tasks-reducer';


type PropsType = {
    id: string
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: FilterValueType, todoListID: string) => void
    changeTaskStatus: (taskId: string, todoListID: string, isDone: boolean) => void
    changeTaskTitle: (id: string, title: string, todoListID: string) => void
    filter: string
    removeTodoList: (todoListID: string) => void
    changeTodolistTitle: (newTitle: string, todoListID: string) => void
}

export function Todolist(props: PropsType) {

    let todo = useSelector<AppRootStateType, TodoListType | undefined>(
        state => state.todolists.find(todo => {
            return todo && todo.id === props.id;
        }));
    let tasksTodo = useSelector<AppRootStateType, Array<TaskType>>(state => todo ? state.tasks[todo.id] : []);
    let dispatch = useDispatch()

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);


    const addTask = (title: string) => {
        dispatch(addTaskAC(title, todo ? todo.id : ''));
    };

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    };

    const removeTodoList = () => props.removeTodoList(props.id);

    return <div>
        <h3>
            <EditableSpan value={todo ? todo.title : ''} changeValue={changeTodolistTitle}/>
            <IconButton onClick={removeTodoList} aria-label="delete">
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                tasksTodo.map(t => {
                    const removeTask = () => props.removeTask(t.id, props.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, props.id, newIsDoneValue);
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
