import React from 'react'
import FlexWrapper from '../Wrappers/FlexWrap';
import Button from 'react-bootstrap/Button';

export default function CommentEditMode({text = '',
                                            handleText,
                                            cancelOnClick,
                                            className,
                                            submitOnClick}) {
    const handleSubmit = () => {
        submitOnClick(text)
    }
    return (
        <div className={className}>
            <textarea className={"edit-area"} value={text} onChange={handleText}/>
            <FlexWrapper className={"edit-buttons"}>
                <Button onClick={handleSubmit} className={"button submit"}>Submit</Button>
                <Button className={"button cancel"} variant={'warning'} onClick={cancelOnClick}>Cancel</Button>
            </FlexWrapper>
        </div>
    )
}