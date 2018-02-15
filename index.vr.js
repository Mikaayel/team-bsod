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
            currentCity: 0
        }
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

    render() {
        return (
            <View>
                {this.state.cities && this.renderPano()}
                {this.state.cities && this.renderTooltips()}
            </View>
        );
    }
};

AppRegistry.registerComponent('team_bsod', () => team_bsod);
