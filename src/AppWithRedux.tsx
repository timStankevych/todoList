import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './components/TodoList/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/TodoList/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterValueType = 'all' | 'completed' | 'active';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type  TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists);
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    let dispatch = useDispatch()

    function removeTask(id: string, todolistID: string) {
        dispatch(removeTaskAC(id, todolistID));
    }

    function addTask(title: string, todoListID: string) {
        dispatch(addTaskAC(title, todoListID));
    }

    function changeTaskStatus(taskId: string, todoListID: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(taskId, todoListID, isDone));
    }

    function changeTaskTitle(taskId: string, todoListID: string, title: string) {
        dispatch(changeTaskTitleAC(taskId, todoListID, title));
    }


    function changeFilter(filter: FilterValueType, todoListID: string) {
        dispatch(changeTodolistFilterAC(filter, todoListID));
    }

    function changeTodolistTitle(todolistId: string, title: string) {
        dispatch(changeTodolistTitleAC(todolistId, title));
    }

    function removeTodoList(todoListID: string) {
        dispatch(removeTodolistAC(todoListID));
    }

    function addTodoList(title: string) {
        dispatch(addTodolistAC(title));
    };

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {

                            let taskForTodolist = tasks[tl.id];

                            if (tl.filter === 'completed') {
                                taskForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                            }
                            if (tl.filter === 'active') {
                                taskForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                            }

                            return (<Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={tl.filter}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
