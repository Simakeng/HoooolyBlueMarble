#version 300 es

// position buffer
in vec4 a_VertexPosition;
// texture coor
in vec2 a_TexturePosition;

// transform matric
uniform mat4 uMatrix;

// out: texture coord
out highp vec4 vVertexPosition;
// out: world position
out highp vec2 vTexturePosition;

void main() {
    vec4 worldPos = a_VertexPosition * uMatrix;
    vVertexPosition = worldPos;
    vTexturePosition = a_TexturePosition;
}
