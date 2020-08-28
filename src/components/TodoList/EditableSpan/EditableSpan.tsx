import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    value: string
    changeValue: (value: string) => void
}

export function EditableSpan(props: PropsType) {

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
        ? <input
            value={title}
            onBlur={deActivatedEditMode}
            autoFocus={true}
            onChange={onChangeTitle}
        />
        : <span onDoubleClick={activatedEditMode} tabIndex={2}>{props.value}</span>
}