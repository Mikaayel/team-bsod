import React from 'react';
import {
    AppRegistry,
    asset,
    Pano,
    Text,
    View,
    VrButton
} from 'react-vr';

const Tooltip = ({ x }) => {
    return  (
        <View>
            <VrButton
                style={{
                    backgroundColor: '#777879',
                    layoutOrigin: [.5, .5, 0],
                    position: 'absolute',
                    transform: [
                        { rotateY: x.rotateY },
                        { translate: [0, 0, -3] }
                    ]
                }}
                onEnter={() => { console.log('enter') }}
                onExit={() => { console.log('exit') }}
            >
                <Text>{x.text}</Text>
            </VrButton>
        </View>
    )
}

export default Tooltip;