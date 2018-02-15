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
			currentCity: null
        }
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

				<Pano source={asset(`${this.state.currentCity.pano}`)} />

				{this.state.currentCity.buttons.map((i, key) =>
					<Button
						key={key}
						data={i}
						handleTransition={this.renderPano}
					/>
				)}
            </View>
        );
    }
};

AppRegistry.registerComponent('team_bsod', () => team_bsod);
