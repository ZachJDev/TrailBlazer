import {useState} from 'react';

export default function useGetPicture() {
    const [picUrl] = useState('https://source.unsplash.com/random/?hike');
    return [picUrl];
}