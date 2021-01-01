import {useState, useEffect} from 'react'

export default function useGetPicture () {
    const [picUrl, setPicUrl] = useState("")
    useEffect(() => {
        setPicUrl("https://source.unsplash.com/random/?hike")
    }, [])

    return [picUrl]
}