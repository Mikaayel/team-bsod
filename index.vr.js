import React from 'react';
import {
    AppRegistry,
    asset,
    Pano,
    Text,
    View,
    VrButton,
    AsyncStorage
} from 'react-vr';

import Button from './components/Button'
import Panorama from './components/Panorama';
import Tooltip from './components/Tooltips';
import Navigation from './components/Navigation';

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

export default class team_bsod extends React.Component {
    // setting this as static because otherwise react-vr will complain.
    // makes it available as props
    static defaultProps = {
        dataSource: 'dataSource.json'
    };

    constructor(props) {
        super(props);
        this.state = {
            cities: null,
            currentCity: null,
            localDataCities: []
        }
        this.renderPano = this.renderPano.bind(this);
    }

    componentWillMount() {
        // listen to messages from worker
        const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
        RCTDeviceEventEmitter.addListener(
            'newCoordinates',
            (e) => {
                this.setState({
                    localDataCities: [
                        ...this.state.localDataCities,
                        {
                            axisX: e.coordinates.x,
                            axisY: e.coordinates.y,
                            axisZ: -5,
                            name: this.state.currentCity.name,
                            rotateY: 0,
                            text: "this is some custom text"
                        }
                    ]
                }, () => {
                    AsyncStorage.setItem('@MySuperStore:cities', {
                        cities: [...this.state.localDataCities]
                    });
                })
            }
        );
    }

    componentDidMount() {
        fetch(asset(this.props.dataSource).uri)
            .then(response => response.json())
            .then(responseData => this.setState({
                cities: responseData.cities,
                currentCity: responseData.cities.find(i => i.name === 'waitingRoom')
            }))
            .then(() => {
                const value = AsyncStorage.getItem('@MySuperStore:cities');
                return value;
            })
            .then((responseData) => {
                this.setState({
                    localDataCities: responseData.cities
                });
            })
            .catch(() => {
                AsyncStorage.setItem('@MySuperStore:cities', {
                    cities: []
                });
            })
            ;
    }

    renderTooltips() {
        let data = this.state.currentCity.tooltips;
        return data.map((x, key) => {
            return <Tooltip key={key} x={x} />
        });
    }

    renderCustomTooltips() {
        let localData = this.state.localDataCities;
        return localData.filter(w => w.name === this.state.currentCity.name).map((x, key) => {
            return <View key={key} style={{
                    position: 'absolute',
                        transform: [
                            { translate: [x.axisX, x.axisY, x.axisZ] }
                        ]
            }}>
                        <Text>{x.text}</Text>
                </View>
        })
    }

    renderPano(city) {
        const newCity = this.state.cities.find(i => i.name === city);
        this.setState({ currentCity: newCity })
    }

    render() {
        if (!this.state.currentCity) {
            return <Text>Wait bitches</Text>
        }

        return (
            <View>
                {this.state.cities && this.renderTooltips()}
                {this.state.localDataCities && this.renderCustomTooltips()}

                <Pano source={asset(`${this.state.currentCity.pano}`)} />

				{this.state.currentCity.name !== 'waitingRoom' &&
					<View style={wrapperStyle}>
						{this.state.cities
							.filter(i => i.name !== this.state.currentCity.name)
							.map((i, key) =>
								<Navigation
									key={key}
									data={i}
									handleTransition={this.renderPano}
								/>
							)
						}
					</View>
				}

				{this.state.currentCity.name === 'waitingRoom' &&
					this.state.currentCity.buttons.map((i, key) =>
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
