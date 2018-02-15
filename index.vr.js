import React from 'react';
import {
    AppRegistry,
    asset,
    Pano,
    Text,
    View,
    VrButton
} from 'react-vr';

import Panorama from './components/Panorama';
import Tooltip from './components/Tooltips';

const DEFAULT_ANIMATION_BUTTON_RADIUS = 50;
const DEFAULT_ANIMATION_BUTTON_SIZE = 0.0005;

export default class team_bsod extends React.Component {
    // setting this as static because otherwise react-vr will complain.
    // makes it available as props
    static defaultProps = {
        dataSource: 'dataSource.json'
    };

    constructor() {
        super();
        this.state = {
            cities: null,
            currentCity: 0,
            animationWidth: DEFAULT_ANIMATION_BUTTON_SIZE,
            animationRadius: DEFAULT_ANIMATION_BUTTON_RADIUS
        }
        this.animatePointer = this.animatePointer.bind(this);
    }

    componentDidMount() {
        fetch(asset(this.props.dataSource).uri)
			.then(response => response.json())
			.then(responseData => this.setState({
				cities: responseData.cities
            }));
    }

    renderPano() {
        let { currentCity } = this.state;
        let data = this.state.cities[currentCity].pano;
        return <Panorama data={data} />
    }

    renderTooltips() {
		let { currentCity } = this.state;
		let data = this.state.cities[currentCity].tooltips;
		return data.map((x, key) => {
            return <Tooltip key={key} x={x}/>
		});
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

    render() {
        return (
            <View>
                {this.state.cities && this.renderPano()}
                {this.state.cities && this.renderTooltips()}

                <Text
                    style={{
                        transform: [{ translate: [-0.1, 0, -3] }],
                    }}
                    onEnter={() => this.animatePointer(true)}
                    onExit={() => this.animatePointer(false)}>
                    hover on make
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
                        transform: [{ translate: [0, 0, -1] }],
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
            </View>
        );
    }
};

AppRegistry.registerComponent('team_bsod', () => team_bsod);
