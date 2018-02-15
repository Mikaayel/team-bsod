import React from 'react';
import {
    AppRegistry,
    asset,
    Pano,
    Text,
    View,
} from 'react-vr';

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
		return (
			<Pano source={asset(`${data}`)} />
		)
    }

    render() {
        return (
            <View>
                {this.state.cities && this.renderPano()}
                {/* <Pano source={asset('chess-world.jpg')} /> */}
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
