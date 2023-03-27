#version 300 es

precision highp float;

// out: texture coord
// in lowp vec4 vVertexPosition;
in vec4 v_color;
// out: world position
// in highp vec2 vTexturePosition;

// uniform sampler2D uSampler;

out vec4 outColor;

void main(void) {
    // colorOut = texture(uSampler, vTexturePosition);
    outColor.rgb = vec3(0.0, 1.0, 1.0);
    // colorOut.rgb = vVertexPosition.xyz;
    outColor.a = 1.0;
}