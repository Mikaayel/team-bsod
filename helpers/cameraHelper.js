import * as THREE from 'three';

export function get3DPoint(camera, x, y) {
    var mousePosition = new THREE.Vector3(x, y, 0.5);
    mousePosition.unproject(camera);
    var dir = mousePosition.sub(camera.position).normalize();
    return dir;
}
