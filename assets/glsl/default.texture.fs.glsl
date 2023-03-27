#version 300 es

precision highp float;

// in: texture coord
in vec2 v_TexturePosition;

// texture
uniform sampler2D uSamplerDiffuse;

out vec4 outColor;

void main(void) {
    outColor = texture(uSamplerDiffuse, v_TexturePosition);
}