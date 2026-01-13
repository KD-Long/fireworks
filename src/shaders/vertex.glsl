varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {

    // Position
    vec3 newPosition = position + vec3(0.0, 0.0, 0.0);
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);

    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = 20.0;

}

// void main() {
//   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//   gl_Position = projectionMatrix * viewMatrix * modelPosition;

//   gl_PointSize = 4.0; // REQUIRED for visibility
// }