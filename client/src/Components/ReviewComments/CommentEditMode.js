import React from 'react'
import FlexWrapper from '../Wrappers/FlexWrap';
import Button from 'react-bootstrap/Button';

export default function CommentEditMode({text, handleText, resetText}) {
    return (
        <React.Fragment>
            <textarea className={"edit-area"} value={text} onChange={handleText}/>
            <FlexWrapper className={"edit-buttons"}>
                <Button className={"button submit"}>Submit</Button>
                <Button className={"button cancel"} variant={'warning'} onClick={resetText}>Cancel</Button>
            </FlexWrapper>
        </React.Fragment>
    )
}