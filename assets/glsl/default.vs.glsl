#version 300 es

// position buffer
in vec3 a_VertexPosition;
// texture coor
// in vec2 a_TexturePosition;

// transform matric
// uniform mat4 uMatrix;

// out: texture coord
out vec4 v_color;
// out: world position
// out highp vec2 vTexturePosition;

void main() {
    //vec4 worldPos = a_VertexPosition * uMatrix;
    vec4 worldPos;
    worldPos.xyz = a_VertexPosition;
    worldPos.w = 1.0;
    gl_Position = worldPos;
    v_color = worldPos * 0.5 + 0.5;
    // vTexturePosition = a_TexturePosition;
}
