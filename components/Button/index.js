import React from 'react';
import {
    Text,
    View,
    VrButton
} from 'react-vr';

const DEFAULT_ANIMATION_BUTTON_RADIUS = 50;
const DEFAULT_ANIMATION_BUTTON_SIZE = 0.0005;

class Button extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animationWidth: DEFAULT_ANIMATION_BUTTON_SIZE,
            animationRadius: DEFAULT_ANIMATION_BUTTON_RADIUS
        }
        this.animatePointer = this.animatePointer.bind(this);
    }
    
    animatePointer(play) {
        var delta = this.state.animationWidth + 0.002;
        var radius = this.state.animationRadius + 10;
        if(delta >= 0.13){
            cancelAnimationFrame(this.frameHandle);
        } else {
            this.setState({animationWidth: delta, animationRadius: radius});
        }
        if(play) {
            this.frameHandle = requestAnimationFrame(this.animatePointer);
        } else {
            cancelAnimationFrame(this.frameHandle), this.setState({animationWidth: DEFAULT_ANIMATION_BUTTON_SIZE, animationRadius: DEFAULT_ANIMATION_BUTTON_RADIUS});
        }
    }

    Utilities = {
        handle: () => {
            if (this.Utilities.timerID !== null) {
                this.Utilities.clear();
            }
            this.animatePointer(true)
            this.Utilities.timerID = setTimeout(() => {
                this.props.handleTransition(this.props.data.transitionTo)
                this.Utilities.clear();
            }, 3000);
        },
        clear: () => {
            this.animatePointer(false)
            clearTimeout(this.Utilities.timerID);
            this.Utilities.timerID = null;
        },
        timerID: null,
    }

    render() {
        return (
            <View key={1}>
                <VrButton
                    style={{
                        layoutOrigin: [.5, .5, 0],
                        position: 'absolute',
                        alignItems: 'center',
                        padding: .03,
                        transform: [
                            { rotateY: this.props.data.rotateY },
                            { translate: [this.props.data.axisX, this.props.data.axisY, this.props.data.axisZ] }
                        ]
                    }}
                    onEnter={() => this.animatePointer(true)}
                    onExit={() => this.animatePointer(false)}
                    onClick={() => this.props.handleTransition(this.props.data.transitionTo) }
                    onEnter={() => { this.Utilities.handle() }}
                    onExit={() => { this.Utilities.clear() }}
                >
                    <Text style={{
                        backgroundColor: 'rgba(161, 161, 161, .8)'
                    }}>
                        {this.props.data.text}
                    </Text>

                    <VrButton
                        style={{ width: 0.15,
                            height:0.15,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderStyle: 'solid',
                            borderColor: '#FFFFFF80',
                            borderWidth: 0.01,
                            marginTop: 0.06,
                            transform: [{ translate: [0, 0, 2] }],
                        }}>
                        <VrButton
                            style={{ width: this.state.animationWidth,
                                    height: this.state.animationWidth,
                                    borderRadius: this.state.animationRadius,
                                    backgroundColor: '#FFFFFFD9',
                                    transform: [{ translate: [0, 0, 0] }],
                            }}>
                        </VrButton>
                    </VrButton>

                </VrButton>
            </View>
        )
    };
}

export default Button;