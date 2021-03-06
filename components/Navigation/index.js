import React from 'react';
import {
    Text,
    View,
    VrButton
} from 'react-vr';
import Button from '../Button'

const DEFAULT_ANIMATION_BUTTON_RADIUS = 50;
const DEFAULT_ANIMATION_BUTTON_SIZE = 0.0005;

class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animationWidth: DEFAULT_ANIMATION_BUTTON_SIZE,
            animationRadius: DEFAULT_ANIMATION_BUTTON_RADIUS,
            showButton: false
        }
        this.animatePointer = this.animatePointer.bind(this);
    }

    animatePointer(play) {
        var delta = this.state.animationWidth + 0.002;
        var radius = this.state.animationRadius + 0;
        if(delta >= 0.08){
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
        handle: (transitionTo) => {
            if (this.Utilities.timerID !== null) {
                this.Utilities.clear(key);
            }
            this.setState({showButton: true});
            this.animatePointer(true)
            this.Utilities.timerID = setTimeout(() => {
                this.props.handleTransition(transitionTo)
                this.Utilities.clear();
            }, 3000);
        },
        clear: () => {
            this.setState({showButton: false});
            this.animatePointer(false)
            clearTimeout(this.Utilities.timerID);
            this.Utilities.timerID = null;
        },
        timerID: null
    }

    render() {
        return (
            <VrButton style={{paddingRight: 0.08}}
                    onEnter={() => { this.Utilities.handle(this.props.data.name) }}
                    onExit={() => { this.Utilities.clear() }}
            >
                <Text>{this.props.data.displayName}</Text>
                {this.state.showButton &&
                    <VrButton
                        style={{
                            position: 'absolute',
                            right: -0.08,
                            top: -0.03,
                            width: 0.09,
                            height:0.09,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderStyle: 'solid',
                            borderColor: '#FFFFFF80',
                            borderWidth: 0.01,
                            marginTop: 0.06,
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
                }
            </VrButton>
        )
    }
}

export default Navigation;

