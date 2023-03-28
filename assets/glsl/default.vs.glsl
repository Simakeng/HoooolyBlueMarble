#version 300 es

// position buffer
in vec3 a_VertexPosition;
// texture coor
in vec2 a_TexturePosition;

// transform matric
uniform mat4 uMatrix;

// out: texture coord
out vec2 v_TexturePosition;

void main() {
    vec4 uniformedPos = vec4(a_VertexPosition, 1.0);
    // vec4 worldPos = uniformedPos * uMatrix;
    vec4 worldPos = uMatrix * uniformedPos;
    // vec4 worldPos = uniformedPos;
    gl_Position = worldPos;
    v_TexturePosition = a_TexturePosition;
}
