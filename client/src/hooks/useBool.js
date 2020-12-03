import {useState} from 'react'
/**
 * A hook that returns a bool and a function to 
 * 'flip' the value of the bool.
 * @param {bool} init 
 */
export default function useBool(init = false) {
    const [state, setState] = useState(init)
    const updateState = () => setState(!state)
    return [state, updateState]
}