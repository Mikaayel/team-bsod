// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import { VRInstance } from 'react-vr-web';
import { get3DPoint } from '../helpers/cameraHelper.js';

function init(bundle, parent, options) {
    const vr = new VRInstance(bundle, 'team_bsod', parent, {
        // Add custom options here
        ...options,
    });
    vr.render = function () {
        // Any custom behavior you want to perform on each frame goes here
    };
    // Begin the animation loop
    vr.start();
    window.playerCamera = vr.player._camera;
    window.vr = vr;
    window.ondblclick = onRendererDoubleClick;
    return vr;
}

window.ReactVR = { init };

function onRendererDoubleClick() {
    var x = 2 * (event.x / window.innerWidth) - 1;
    var y = 1 - 2 * (event.y / window.innerHeight);
    var coordinates = get3DPoint(window.playerCamera, x, y);

    // sending events in client.js
    vr.rootView.context.callFunction('RCTDeviceEventEmitter', 'emit', ['newCoordinates', {coordinates}]);
}