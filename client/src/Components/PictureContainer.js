import React from 'react'
import Image from "react-bootstrap/Image";
import useGetPicture from '../hooks/useGetPicture'
export default function PictureContainer() {
    const [picUrl] = useGetPicture("");

    return (
        <React.Fragment>
        <Image
            style={{
              maxHeight: "25rem",
            }}
            src={picUrl}
            fluid
            rounded
          />
        </React.Fragment>
    )
}
