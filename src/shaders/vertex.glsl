uniform float uSize;
uniform float uSizeMulti;
uniform vec2 uResolution;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {

    // Position
    vec3 newPosition = position + vec3(0.0, 0.0, 0.0);
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);

    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    // note we are only multipling by the height - vertical (most games have foo based on height not width)
    gl_PointSize = uSize * uResolution.y;
    // this fixes there perspective such that points change in size as you zoom in and out
    gl_PointSize *= 1.0 / -viewPosition.z;
}
// void main() {
//   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//   gl_Position = projectionMatrix * viewMatrix * modelPosition;

//   gl_PointSize = 4.0; // REQUIRED for visibility
// }