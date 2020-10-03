import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {ControlPoint} from '@material-ui/icons';


type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo( (props: PropsType) => {

    console.log('AddItemForm called');

    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            onAddTaskClick();
        }
    }

    const onAddTaskClick = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('Введи заголовок таски');
        }
    }
    return (
        <div>
            <TextField
                variant={'outlined'}
                label={'your task'}
                error={!!error}
                helperText={error}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}
            />
            <IconButton onClick={onAddTaskClick} color={'primary'}>
                <ControlPoint/>
            </IconButton>
        </div>
    );
})