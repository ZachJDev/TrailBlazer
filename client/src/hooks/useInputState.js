import {useState} from 'react'

export default function useInputState (initState = "") {
    const [state, setState] = useState(initState);
    const setInput = (e) => setState(e.target.value);
    return [state, setInput]
}