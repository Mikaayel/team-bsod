import React from 'react';
import {
    AppRegistry,
    asset,
    Pano,
    Text,
    View,
    VrButton
} from 'react-vr';
import Button from './components/Button'
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
			currentCity: null,
            animationWidth: DEFAULT_ANIMATION_BUTTON_SIZE,
            animationRadius: DEFAULT_ANIMATION_BUTTON_RADIUS
        }
        this.animatePointer = this.animatePointer.bind(this);
		this.renderPano = this.renderPano.bind(this);
	}

    componentDidMount() {
        fetch(asset(this.props.dataSource).uri)
			.then(response => response.json())
			.then(responseData => this.setState({
				cities: responseData.cities,
				currentCity: responseData.cities.find(i => i.name === 'waitingRoom')
            }));
    }

    renderTooltips() {
		let data = this.state.currentCity.tooltips;
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

    renderPano(city) {
		const newCity = this.state.cities.find(i => i.name === city);
		this.setState({ currentCity: newCity})

	}

    render() {

		if (!this.state.currentCity) {
			return <Text>Wait bitches</Text>
		}

        return (
            <View>
                {this.state.cities && this.renderTooltips()}

                <Text
                    style={{
                        transform: [{ translate: [-0.1, 0, -3] }],
                    }}
                    onEnter={() => this.animatePointer(true)}
                    onExit={() => this.animatePointer(false)}>
                    hover on make
                </Text>

				<Pano source={asset(`${this.state.currentCity.pano}`)} />

				{this.state.currentCity.buttons.map((i, key) =>
					<Button
						key={key}
						data={i}
						handleTransition={this.renderPano}
					/>
				)}

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
