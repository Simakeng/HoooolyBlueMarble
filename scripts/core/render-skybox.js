/**
 * @file render-skybox.js
 * @author Simakeng (simakeng@outlook.com)
 * @brief render skybox
 * @version 0.1
 * @date 2023-03-24
 *
 */

class HBMSkyBox {
    constructor() {
        const gl = hbm_get_gl();
        this.vs = hbm_get_shader(HBM_SKYBOX_VS);
        this.fs = hbm_get_shader(HBM_SKYBOX_FS);

        this.program = hbm_create_program(gl, this.vs, this.fs);

        this.mesh = hbm_create_skybox_mesh();
    }

    render() {
        const gl = hbm_get_gl();

        hbm_mesh_bind_to_program(gl, this.mesh, this.program, [this.vs, this.fs])
        gl.useProgram(this.program);

        const offset = 0;
        const vertexCount = this.mesh.vertexData.count;
        gl.drawArrays(gl.TRIANGLES, offset, vertexCount);
    }
}



function hbm_create_skybox_mesh() {
    const gl = hbm_get_gl();
    const mesh = hbm_get_static_mesh_template();

    mesh.meshType = "non-indexed";
    const z = 1;
    //   x     y     z
    let vertexPositions = [
        -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, -1.0, 1.0,
        -1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,

        -1.0, 1.0, 1.0,
        -1.0, -1.0, 1.0,
        -1.0, 1.0, -1.0,
        -1.0, 1.0, -1.0,
        -1.0, -1.0, 1.0,
        -1.0, -1.0, -1.0,

        -1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,

        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,
        1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,
        -1.0, 1.0, 1.0,
        -1.0, 1.0, -1.0,

        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, -1.0,

        1.0, -1.0, 1.0,
        1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0,
        -1.0, -1.0, 1.0,
        1.0, -1.0, -1.0,
        -1.0, -1.0, -1.0,

    ]

    const wp = 1.0 / 3;
    const hp = 0.5;
    const eps = 1e-5;
    let texturePositions = [
        2 * wp, 1 * hp,
        3 * wp, 1 * hp,
        2 * wp, 2 * hp,
        2 * wp, 2 * hp,
        3 * wp, 1 * hp,
        3 * wp, 2 * hp,

        2 * wp, 1 * hp,
        2 * wp, 2 * hp,
        1 * wp, 1 * hp,
        1 * wp, 1 * hp,
        2 * wp, 2 * hp,
        1 * wp, 2 * hp,

        1 * wp, 1 * hp,
        1 * wp, 2 * hp,
        0 * wp, 1 * hp,
        0 * wp, 1 * hp,
        1 * wp, 2 * hp,
        0 * wp, 2 * hp,

        2 * wp, 0 * hp,
        3 * wp, 0 * hp,
        2 * wp, 1 * hp,
        2 * wp, 1 * hp,
        3 * wp, 0 * hp,
        3 * wp, 1 * hp,

        1 * wp, 0 * hp,
        2 * wp, 0 * hp,
        1 * wp, 1 * hp,
        1 * wp, 1 * hp,
        2 * wp, 0 * hp,
        2 * wp, 1 * hp,

        1 * wp, 0 * hp,
        1 * wp, 1 * hp,
        0 * wp, 0 * hp,
        0 * wp, 0 * hp,
        1 * wp, 1 * hp,
        0 * wp, 1 * hp,
    ];
    mesh.vertexData.position =
        hbm_gl_create_static_array_buffer(gl, vertexPositions, 3);
    mesh.vertexData.texture =
        hbm_gl_create_static_array_buffer(gl, texturePositions, 2);
    mesh.textures.diffuse =
        hbm_gl_create_static_texture2d(gl, "/assets/textures/skybox.png")
    mesh.vertexData.count = 36;
    return mesh;
}