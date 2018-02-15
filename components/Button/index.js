import React from 'react';
import {
    Text,
    View,
    VrButton
} from 'react-vr';

const Button = (props) => {

    const Utilities = {
        handle: function() {
            if (this.timerID !== null) {
                this.clear();
            }
            this.timerID = setTimeout(() => {
                props.handleTransition(props.data.transitionTo)
                // this.changeRoom(roomID)
                this.clear();
            }, 5000);
        },
        clear: function() {
            clearTimeout(this.timerID);
            this.timerID = null;
        },
        timerID: null
    }

    return (
        <View>
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
                onEnter={() => {Utilities.handle()}}
                onExit={() => {Utilities.clear()}}
            >
                <Text>{props.data.text}</Text>
            </VrButton>
        </View>
    )
};

module.exports = Button;