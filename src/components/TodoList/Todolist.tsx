import React, {useCallback} from 'react';
import {AddItemForm} from './AddItemForm/AddItemForm';
import {EditableSpan} from './EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {TaskType, TodoListType} from '../../AppWithRedux';
import {addTaskAC} from '../../state/tasks-reducer';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from '../../state/todolists-reducer';
import {Task} from './Task';


type PropsType = {
    id: string
    filter: string
}

export const Todolist = React.memo((props: PropsType) => {

    const dispatch = useDispatch();
    let todo = useSelector<AppRootStateType, TodoListType | undefined>(
        state => state.todolists.find(todo => {
            return todo && todo.id === props.id;
        }));
    let tasksTodo = useSelector<AppRootStateType, Array<TaskType>>(state => todo ? state.tasks[todo.id] : []);

    const onAllClickHandler = useCallback(() =>
        dispatch(changeTodolistFilterAC('all', todo ? todo.id : '')), [dispatch, todo]);
    const onActiveClickHandler = useCallback(() =>
        dispatch(changeTodolistFilterAC('active', todo ? todo.id : '')), [dispatch, todo]);
    const onCompletedClickHandler = useCallback(() =>
        dispatch(changeTodolistFilterAC('completed', todo ? todo.id : '')), [dispatch, todo]);

    const changeTodolistTitle = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC(props.id, newTitle));
    }, [dispatch, props.id]);


    const removeTodoList = useCallback(() => {
        dispatch(removeTodolistAC(props.id));
    }, [dispatch, props.id]);

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
        <AddItemForm addItem={useCallback((title) => {
            dispatch(addTaskAC(title, props.id));
        }, [dispatch, props.id])}/>
        <ul>
            {
                taskForTodolist.map(t => <Task
                    task={t}
                    todolistId={props.id}
                    key={t.id}/>)
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
});

