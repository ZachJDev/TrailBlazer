import {useState, useEffect} from 'react'

export default function useGetPicture () {
    const [picUrl, setPicUrl] = useState("https://source.unsplash.com/random/?hike")

    return [picUrl]
}