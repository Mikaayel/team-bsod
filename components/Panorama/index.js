import React from 'react';
import {
    asset,
    Pano,
} from 'react-vr';

const Panorama = ({ data }) => {
    return <Pano source={asset(`${data}`)} />;
}

export default Panorama;