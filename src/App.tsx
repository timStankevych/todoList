import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/TodoList/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/TodoList/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

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

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ]);

    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: 'Dog', isDone: true},
            {id: v1(), title: 'Cat', isDone: true},
            {id: v1(), title: 'Cow', isDone: false},
            {id: v1(), title: 'Horse', isDone: false}
        ],
    });

    const addTodoList = (title: string) => {
        let newTodoListID = v1();
        let newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: 'all',
        };
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({
            [newTodoListID]: [], ...tasks
        });
    };

    function removeTask(id: string, todolistID: string) {
        let todoList = tasks[todolistID];
        tasks[todolistID] = todoList.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function changeFilter(value: FilterValueType, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    function addTask(title: string, todoListID: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let todoList = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoList];
        setTasks({...tasks});
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let todoList = tasks[todoListID];
        let task = todoList.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function changeTaskTitle(id: string, title: string, todoListID: string) {
        let todoList = tasks[todoListID];
        let task = todoList.find(t => t.id === id);
        if (task) {
            task.title = title;
            setTasks({...tasks});
        }
    }

    function changeTodolistTitle(newTitle: string, id: string) {
        const todoList = todoLists.find(tl => tl.id === id);
        if (todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists]);
        }
    }

    function removeTodoList(todoListID: string) {
        let newTodoLists = todoLists.filter(tl => tl.id !== todoListID);
        setTodoLists(newTodoLists);
        delete tasks[todoListID];
        setTasks({...tasks});
    }

    // @ts-ignore
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
                                            title={tl.title}
                                            tasks={taskForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
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

export default App;
