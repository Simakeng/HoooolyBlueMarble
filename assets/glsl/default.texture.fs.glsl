#version 300 es

// out: texture coord
in highp vec4 vVertexPosition;
// out: world position
in highp vec2 vTexturePosition;

uniform sampler2D uSampler;

precision mediump float;

out vec4 colorOut;

void main(void) {
    // colorOut = texture(uSampler, vTexturePosition);
    colorOut.rgb = vec3(1.0, 1.0, 1.0);
    colorOut.a = 1.0;
}