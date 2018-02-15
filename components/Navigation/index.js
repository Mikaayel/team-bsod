import React from 'react';
import {
    Text,
    View,
    VrButton
} from 'react-vr';

const wrapperStyle = {
    width: '100%',
    padding: .10,
    backgroundColor: 'rgba(161, 161, 161, .8)',
    borderRadius: .05,
    borderStyle: 'solid',
    borderWidth: 0.01,
    transform: [
        { rotateY: 45 },
        { translate: [0, 0, -3] }
    ]
};

const wrapperFlex = {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
}

const listItemStyle = {
    flex: 1,
    alignSelf: 'flex-end'
}

const DEFAULT_ANIMATION_BUTTON_RADIUS = 50;
const DEFAULT_ANIMATION_BUTTON_SIZE = 0.0005;

class Navigation extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            animateableData: []
        }
        this.animatePointer = this.animatePointer.bind(this);
    }

    componentWillMount() {

        const animateableData = this.props.data.map(item => ({
            animationWidth: DEFAULT_ANIMATION_BUTTON_SIZE,
            animationRadius: DEFAULT_ANIMATION_BUTTON_RADIUS
        }));

        this.setState(() => ({
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

        currentAnimateableData.animationWidth + 0.002;
        currentAnimateableData.animationRadius + 10;

        if(delta >= 0.13){
            cancelAnimationFrame(this.frameHandle);
        } else {
            this.setState(() => ({
                animateableData: [
                    ...animateableData.slice(0, index),
                    ...animateableData.slice(index + currentAnimateableData)
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
                    ...animateableData.slice(index + {
                        animationWidth: DEFAULT_ANIMATION_BUTTON_SIZE,
                        animationRadius: DEFAULT_ANIMATION_BUTTON_RADIUS
                    })
                ]
            }));
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
        timerID: null
    }

    render() {
        return (
            <View style={wrapperStyle}>
                {this.props.data.map((i, key) => 
                    <View style={wrapperFlex} key={`navigation-${key}`}>
                        {console.log(this.state.animateableData[key])}
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
                                flex: 1,
                                transform: [{ translate: [0, 0, 0] }],
                            }}
                        >
                            <VrButton
                                style={{
                                        width: this.state.animateableData[key].animationWidth ? this.state.animateableData[key].animationWidth : 0,
                                        height: this.state.animateableData[key].animationWidth ? this.state.animateableData[key].animationWidth : 0,
                                        borderRadius: this.state.animateableData[key].animationRadius ? this.state.animateableData[key].animationRadius : 0,
                                        backgroundColor: '#FFFFFFD9',
                                        transform: [{ translate: [0, 0, 0] }],
                                }}
                            >
                            </VrButton>
                        </VrButton>

                        <VrButton
                            style={{
                                width: '100%',
                                alignItems: 'center',
                                //transform: [
                                    // { rotateY: this.props.data.rotateY },
                                    // { translate: [this.props.data.axisX, this.props.data.axisY, this.props.data.axisZ] }
                                // ]
                            }}
                            onEnter={() => this.animatePointer(true, key)}
                            onExit={() => this.animatePointer(false, key)}
                            // onClick={() => this.props.handleTransition(this.props.data.transitionTo) }
                            // onEnter={() => { this.Utilities.handle() }}
                            // onExit={() => { this.Utilities.clear() }}
                        >
                            <Text style={listItemStyle}>{i.displayName}</Text>
                        </VrButton>
                    </View>
                )}
            </View>
        )
    }
}

export default Navigation;

