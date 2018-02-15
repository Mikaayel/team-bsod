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
			return (
				<View key={key}>
					<VrButton 
						style={{
							backgroundColor: '#777879',
							layoutOrigin: [.5, .5, 0],
							position: 'absolute',
							transform: [
								{ rotateY: x.rotateY },
								{ translate: [0, 0, -3] }
							]	
						}}
						onEnter={() => { console.log('enter') }}
						onExit={() => { console.log('exit') }}
					>
						<Text>{x.text}</Text>
					</VrButton>
				</View>
			)
		});
	}

    render() {
        return (
            <View>
                {this.state.cities && this.renderPano()}
                {this.state.cities && this.renderTooltips()}
                <Text
                    style={{
                        backgroundColor: '#777879',
                        fontSize: 0.8,
                        fontWeight: '400',
                        layoutOrigin: [0.5, 0.5],
                        paddingLeft: 0.2,
                        paddingRight: 0.2,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        transform: [{ translate: [0, 0, -3] }],
                    }}>
                    Mika Loves D J Trump
        </Text>
            </View>
        );
    }
};

AppRegistry.registerComponent('team_bsod', () => team_bsod);
