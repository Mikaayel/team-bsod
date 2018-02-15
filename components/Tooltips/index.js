import React from 'react';
import {
    AppRegistry,
    asset,
    Pano,
    Text,
    View,
    VrButton
} from 'react-vr';

import Helpers from '../../helpers';

class Tooltip extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            tooltip: false
        }
    }
    
    render() {
        return (
            <View>
                <VrButton
                    onEnter={() => { this.setState({tooltip: true}) }}
                    onExit={() => { this.setState({tooltip: false}) }}
                    style={{
                        position: 'absolute',
                        height: 0.15,
                        width: 0.15,
                        layoutOrigin: [.5, .5, 0],
                        borderRadius: 50,
                        alignItems: 'center',
                        borderWidth: 0.01,
                        borderStyle: 'solid',
                        borderColor: '#FFFFFF80',
                        justifyContent: 'center',
                        transform: [
                            { rotateY: this.props.x.rotateY },
                            { translate: [-0.25, 0, -3] }
                        ]
                }}>
                    <Text style={{color: 'white'}}>i</Text>
                </VrButton>
                {this.state.tooltip &&
                    <VrButton
                        style={{
                            backgroundColor: 'black',
                            layoutOrigin: [.5, .5, 0],
                            position: 'absolute',
                            padding: 0.1,
                            transform: [
                                { rotateY: this.props.x.rotateY },
                                { translate: [0.25, 0, -3] }
                            ]
                        }}
                    >
                        <Text>{this.props.x.text}</Text>
                    </VrButton>
                }
            </View>
        )
    }
}

module.exports = Tooltip;
