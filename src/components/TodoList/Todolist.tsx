import React, {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm/AddItemForm';
import {EditableSpan} from './EditableSpan/EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {FilterValueType, TaskType, TodoListType} from '../../AppWithRedux';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../state/tasks-reducer';
import {isBoolean} from 'util';


type PropsType = {
    id: string
    changeFilter: (value: FilterValueType, todoListID: string) => void
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
    let dispatch = useDispatch();

    const onAllClickHandler = () => props.changeFilter('all', todo ? todo.id : '');
    const onActiveClickHandler = () => props.changeFilter('active', todo ? todo.id : '');
    const onCompletedClickHandler = () => props.changeFilter('completed', todo ? todo.id : '');

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    };

    const removeTodoList = () => props.removeTodoList(props.id);

    let taskForTodolist = tasksTodo;

    if (props.filter === 'completed') {
        taskForTodolist = tasksTodo.filter(t => t.isDone === true);
    }
    if (props.filter === 'active') {
        taskForTodolist = tasksTodo.filter(t => t.isDone === false);
    }

    return <div>
        <h3>
            <EditableSpan value={todo ? todo.title : ''} changeValue={changeTodolistTitle}/>
            <IconButton onClick={removeTodoList} aria-label="delete">
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={(title) => {
            dispatch(addTaskAC(title, props.id));
        }}/>
        <ul>
            {
                taskForTodolist.map(t => {
                    const onRemoveTask = () => {dispatch(removeTaskAC(t.id, props.id))}
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, props.id, newIsDoneValue))
                    };

                    const onChangeTaskTitle = (title: string) => {dispatch(changeTaskTitleAC(t.id, title, props.id))};

                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                            <EditableSpan value={t.title} changeValue={onChangeTaskTitle}/>
                            <IconButton onClick={onRemoveTask} aria-label="delete">
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
