import React, {useState, ChangeEvent, KeyboardEvent} from 'react';

type PropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: PropsType) {

    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null)



    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            onAddTaskClick();
        }
    };

    const onAddTaskClick = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('Введи заголовок таски')
        }
    };

    // const isSelectedAll = props.tasks.filter(t => t.isDone).length === props.tasks.length
    //
    // const allSelectedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     props.selectedAll(e.currentTarget.checked, props.id)
    // }

    // function selectedAll(value: boolean, todoListID: string) {
    //     let todoList = tasks[todoListID];
    //     let newTask = todoList.map(t => ({...t, isDone: value}))
    //     setTasks({...tasks})
    // }

    return(
        <div>
            {/*<div>*/}
            {/*    <input type='checkbox' checked={isSelectedAll} onChange={allSelectedHandler}/><span>Выбрать все</span>*/}
            {/*</div>*/}
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}
            />
            <button onClick={onAddTaskClick}>Add</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}