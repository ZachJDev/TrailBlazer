import React, {useEffect, useState} from 'react';
import useGetPayload from '../../hooks/useGetPayload';
import Description from '../InfoContainers/Description';
import InfoContainer from '../InfoContainers/InfoContainer';
import ButtonActionRow from '../InfoContainers/ButtonActionRow';
import MainInfo from '../InfoContainers/MainInfo';
import Map from '../Map/Map';

import ParkTrails from '../InfoContainers/ParkTrails';

import './Park.css';
import useBool from '../../hooks/useBool';

export default function Park({match, history}) {
    const alertComingSoon = () => alert('Functionality Coming Soon!');
    const [parkInfo, setParkInfo] = useState({});
    const [getParkInfo] = useGetPayload(`/park/${match.params.parkId}`);
    const [showMap, flipShowMap] = useBool(false);
    // ParkInfo has the following, which are deconstructed in the InfoContainer Component:
    // {name, description, address, city, state}

    const AdminEdit = () => {
        history.push(`/park/${match.params.parkId}/edit`);
    };

    useEffect(() => {
        getParkInfo().then(info => {
            setParkInfo(info);
        })
            .catch((e) => {
                console.log(e);
            });
    }, []);
    console.log(parkInfo);
    return (
        <div className="park-info">
            {
                parkInfo.status === 200 ? (

                    <InfoContainer>
                        <MainInfo className={`park-info-row`} {...parkInfo}>
                            <ButtonActionRow
                                handleReview={alertComingSoon}
                                handleMap={flipShowMap}
                                handleEdit={AdminEdit}
                            />
                            <Map lat={parkInfo.location?.coordinates[0] || 0}
                                 lng={parkInfo.location?.coordinates[1] || 0} show={showMap}/>
                        </MainInfo>
                        <Description description={parkInfo.description} name={parkInfo.name}/>
                        <ParkTrails {...match.params.parkId} {...parkInfo} />

                    </InfoContainer>

                ) : (
                    <h1>
                        Loading...
                    </h1>
                )
            }

        </div>
    );
}
