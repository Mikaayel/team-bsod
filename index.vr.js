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
import Navigation from './components/Navigation';

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
            currentCity: null
        }
        this.renderPano = this.renderPano.bind(this);
    }

    componentWillMount() {
        // listen to messages from worker 
        const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
        RCTDeviceEventEmitter.addListener(
        'newCoordinates',
        (e) => { console.log(e) },
        );
    }

    componentDidMount() {
        fetch(asset(this.props.dataSource).uri)
            .then(response => response.json())
            .then(responseData => this.setState({
                cities: responseData.cities,
                currentCity: responseData.cities.find(i => i.name === 'waitingRoom')
            }));
    }

    
    

    // onMainWindowMessage(e){
    //     if(e.data.type) {
    //         console.log(e);

    //     }
    //     // switch (e.data.type) {
    //     //   case 'newCoordinates':
    //     //     console.log(e.data.coordinates);
    //     // //     var scene_navigation = this.state.current_scene.navigations[0];
    //     // //     this.state.current_scene.navigations[0]['translate'] = [e.data.coordinates.x,e.data.coordinates.y,e.data.coordinates.z]
    //     // //     this.forceUpdate();
    //     //   break;
    //     //   default:
    //     //   return;
    //     // }
    // }

    renderTooltips() {
        let data = this.state.currentCity.tooltips;
        return data.map((x, key) => {
            return <Tooltip key={key} x={x} />
        });
    }

    renderPano(city) {
        const newCity = this.state.cities.find(i => i.name === city);
        this.setState({ currentCity: newCity })

    }

    render() {
        console.log(this);
        if (!this.state.currentCity) {
            return <Text>Wait bitches</Text>
        }

        return (
            <View>
                {this.state.cities && this.renderTooltips()}

                <Pano source={asset(`${this.state.currentCity.pano}`)} />

                <Navigation data={this.state.cities} />

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
