import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type PropsType = {
    value: string
    changeValue: (value: string) => void
}

export const EditableSpan = React.memo((props: PropsType) => {

    console.log('EditableSpan called')

    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState(props.value);

    const activatedEditMode = () => setEditMode(true);

    const deActivatedEditMode = () => {
        setEditMode(false);
            props.changeValue(title)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField
            value={title}
            onBlur={deActivatedEditMode}
            autoFocus={true}
            onChange={onChangeTitle}
        />
        : <span onDoubleClick={activatedEditMode} tabIndex={2}>{props.value}</span>
})