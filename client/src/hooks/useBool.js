import {useState} from 'react'

export default function useBool(init = false) {
    const [state, setState] = useState(init)
    const updateState = () => setState(!state)
    return [state, updateState]
}