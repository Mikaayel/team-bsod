import React from 'react';
import {
    Text,
    View,
    VrButton
} from 'react-vr';

const wrapperStyle = {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: .05,
    backgroundColor: 'rgba(161, 161, 161, .8)',
    borderRadius: .05,
    borderStyle: 'solid',
    borderWidth: 0.01,
    transform: [
        { rotateY: 45 },
        { translate: [0, 0, -3] }
    ]
};

const listItemStyle = {
    flex: 1
}

const Navigation = (props) => (
    <View style={wrapperStyle}>
        {props.data.map((i, key) =>
            <Text style={listItemStyle}>{i.displayName}</Text>
        )}
    </View>
);

export default Navigation;

