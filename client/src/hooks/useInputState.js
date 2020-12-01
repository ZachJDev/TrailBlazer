import {useState} from 'react'

export default function useInputState (initState = "") {
    const [state, setState] = useState(initState);
    const setInput = (e) => setState(e.target.value);
    const clear = () => setState(initState)
    return [state, setInput, clear]
}