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

    componentWillMount() {

        const animateableData = this.props.data.map(item => ({
            animationWidth: DEFAULT_ANIMATION_BUTTON_SIZE,
            animationRadius: DEFAULT_ANIMATION_BUTTON_RADIUS
        }));

        this.setState(prevState => ({
            animateableData
        }));

    }

    animatePointer(play, index) {

        const { animateableData } = this.state;
        const currentAnimateableData = animateableData[index];

        if (!currentAnimateableData) {
            return;
        }

        var delta = currentAnimateableData.animationWidth + 0.002;
        var radius = currentAnimateableData.animationRadius + 10;

        if(delta >= 0.13){
            cancelAnimationFrame(this.frameHandle);
        } else {
            this.setState(() => ({
                animateableData: [
                    ...animateableData.slice(0, index),
                    animateableData[index] = {
                        animationWidth: delta,
                        animationRadius: radius
                    },
                    ...animateableData.slice(index + 1)
                ]
            }));
        }
        if(play) {
            this.frameHandle = requestAnimationFrame(this.animatePointer);
        } else {
            cancelAnimationFrame(this.frameHandle)
            this.setState(() => ({
                animateableData: [
                    ...animateableData.slice(0, index),
                    animateableData[index] = {
                        animationWidth: DEFAULT_ANIMATION_BUTTON_SIZE,
                        animationRadius: DEFAULT_ANIMATION_BUTTON_RADIUS
                    },
                    ...animateableData.slice(index + 1)
                ]
            }));
        }
    }

    Utilities = {
        handle: (key) => {
            if (this.Utilities.timerID !== null) {
                this.Utilities.clear(key);
            }
            this.animatePointer(true, key)
            this.Utilities.timerID = setTimeout(() => {
                this.props.handleTransition(this.props.data[key].name)
                this.Utilities.clear(key);
            }, 3000);
        },
        clear: (key) => {
            this.animatePointer(false, key)
            clearTimeout(this.Utilities.timerID);
            this.Utilities.timerID = null;
        },
        timerID: null
    }

    render() {
        console.log('render: ', this.state);

        return (
                    <VrButton
                            onEnter={() => { this.Utilities.handle(this.props.data.name) }}
                            onExit={() => { this.Utilities.clear() }}
                    >
                        <Text>{this.props.data.displayName}</Text>
                        {this.state.showButton &&
                            <VrButton
                                style={{
                                    width: 0.15,
                                    height:0.15,
                                    borderRadius: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderStyle: 'solid',
                                    borderColor: '#FFFFFF80',
                                    borderWidth: 0.01,
                                    marginTop: 0.06,
                                    transform: [{ translate: [0, 0, 0] }],
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

