import {useState} from 'react'
/**
 * Returns an array of three things: the state, a function to update the state, and a function that resets
 * the state to the initial value
 * @param {string} initState 
 */
export default function useInputState (initState = "") {
    const [state, setState] = useState(initState);
    const setInput = (e) => setState(e.target.value);
    const clear = () => setState(initState)
    return [state, setInput, clear]
}