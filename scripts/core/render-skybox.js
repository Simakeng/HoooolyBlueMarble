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
        let gl = hbm_get_gl();
        this.vs = hbm_get_shader(HBM_SKYBOX_VS);
        this.fs = hbm_get_shader(HBM_SKYBOX_FS);

        this.program = hbm_create_program(gl, this.vs, this.fs);

        this.mesh = hbm_create_skybox_mesh();
    }

    render() {
        let gl = hbm_get_gl();

        gl.useProgram(this.program);
        hbm_mesh_bind_to_program(gl, this.mesh, this.program, [this.vs, this.fs])

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
}



function hbm_create_skybox_mesh() {
    gl = hbm_get_gl();
    mesh = hbm_create_mesh();

    mesh.meshType = "non-indexed";

    //   x     y     z
    let vertices = [
        -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, -1.0, 1.0,
        -1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,
    ]

    mesh.vertexData.position =
        hbm_gl_create_array_buffer(gl, vertices);

    return mesh;
}