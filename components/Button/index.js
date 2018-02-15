import React from 'react';
import {
    Text,
    View,
    VrButton
} from 'react-vr';

const Button = (props) => {
    return (
        <View key={1}>
            <VrButton
                style={{
                    backgroundColor: 'rgba(161, 161, 161, .8)',
                    layoutOrigin: [.5, .5, 0],
                    position: 'absolute',
                    padding: .03,
                    transform: [
                        { rotateY: props.data.rotateY },
                        { translate: [props.data.axisX, props.data.axisY, props.data.axisZ] }
                    ]
                }}
                onClick={() => props.handleTransition(props.data.transitionTo) }
                // onEnter={() => { this.setTimer.handle() }}
                // onExit={() => { this.setTimer.clear() }}
            >
                <Text>{props.data.text}</Text>
            </VrButton>
        </View>
    )
};

export default Button;