import React, {useReducer} from 'react';
// import './App.css';
// import {Todolist} from './components/TodoList/Todolist';
// import {v1} from 'uuid';
// import {AddItemForm} from './components/TodoList/AddItemForm/AddItemForm';
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
// import {Menu} from '@material-ui/icons';
// import {
//     addTodolistAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC, removeTodolistAC,
//     todolistsReducer
// } from './state/todolists-reducer';
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
//
// export type FilterValueType = 'all' | 'completed' | 'active';
//
// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
// export type  TodoListType = {
//     id: string
//     title: string
//     filter: FilterValueType
// }
//
// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }
//
// function AppWithReducers() {
//
//     let todoListID1 = v1();
//     let todoListID2 = v1();
//
//     let [todoLists, dispatchToTodolists] = useReducer(todolistsReducer, [
//         {id: todoListID1, title: 'What to learn', filter: 'all'},
//         {id: todoListID2, title: 'What to buy', filter: 'all'},
//     ]);
//
//     let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
//         [todoListID1]: [
//             {id: v1(), title: 'HTML&CSS', isDone: true},
//             {id: v1(), title: 'JS', isDone: true},
//         ],
//         [todoListID2]: [
//             {id: v1(), title: 'Dog', isDone: true},
//             {id: v1(), title: 'Cat', isDone: true},
//         ],
//     });
//
//
//     function removeTask(id: string, todolistID: string) {
//         dispatchToTasks(removeTaskAC(id, todolistID))
//     }
//
//     function addTask(title: string, todoListID: string) {
//         dispatchToTasks(addTaskAC(title, todoListID))
//     }
//
//     function changeTaskStatus(taskId: string, todoListID: string, isDone: boolean) {
//         dispatchToTasks(changeTaskStatusAC(taskId, todoListID, isDone))
//     }
//
//     function changeTaskTitle(taskId: string, todoListID: string, title: string) {
//         dispatchToTasks(changeTaskTitleAC(taskId, todoListID, title))
//     }
//
//
//     function changeFilter(filter: FilterValueType, todoListID: string) {
//         dispatchToTodolists(changeTodolistFilterAC(filter, todoListID))
//     }
//
//     function changeTodolistTitle(todolistId: string, title: string) {
//         dispatchToTodolists(changeTodolistTitleAC(todolistId, title))
//     }
//
//     function removeTodoList(todoListID: string) {
//         dispatchToTodolists(removeTodolistAC(todoListID))
//     }
//
//     function addTodoList(title: string) {
//         const action = addTodolistAC(title);
//         dispatchToTodolists(action);
//         dispatchToTasks(action);
//     };
//
//     return (
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6">
//                         News
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container>
//                 <Grid container style={{padding: '10px'}}>
//                     <AddItemForm addItem={addTodoList}/>
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {
//                         todoLists.map(tl => {
//
//                             let taskForTodolist = tasks[tl.id];
//
//                             if (tl.filter === 'completed') {
//                                 taskForTodolist = tasks[tl.id].filter(t => t.isDone === true);
//                             }
//                             if (tl.filter === 'active') {
//                                 taskForTodolist = tasks[tl.id].filter(t => t.isDone === false);
//                             }
//
//                             return (<Grid item>
//                                     <Paper style={{padding: '10px'}}>
//                                         <Todolist
//                                             key={tl.id}
//                                             id={tl.id}
//                                             title={tl.title}
//                                             tasks={taskForTodolist}
//                                             removeTask={removeTask}
//                                             changeFilter={changeFilter}
//                                             addTask={addTask}
//                                             changeTaskStatus={changeTaskStatus}
//                                             filter={tl.filter}
//                                             removeTodoList={removeTodoList}
//                                             changeTaskTitle={changeTaskTitle}
//                                             changeTodolistTitle={changeTodolistTitle}
//                                         />
//                                     </Paper>
//                                 </Grid>
//                             );
//                         })
//                     }
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default AppWithReducers;
