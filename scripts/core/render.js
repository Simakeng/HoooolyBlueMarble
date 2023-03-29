/**
 * @file init.js
 * @author Simakeng (simakeng@outlook.com)
 * @brief WebGL environment creation
 * @version 0.1
 * @date 2023-03-24
 *
 */

let renderTargetCanvas;
let glEnv;

function hbm_get_gl() {
    return glEnv;
}

function hbm_gl_clear_render_target() {
    let gl = glEnv;
    gl.clearColor(0.0, 1.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function hbm_init_render_loop(canvas) {
    renderTargetCanvas = canvas;
    glEnv = canvas.getContext("webgl2");

    if (!glEnv) {
        debug("Unable to initialize WebGL. Your browser, operating system, or hardware may not support WebGL.");
        return;
    }
    let skybox = new HBMSkyBox();

    function render_dummy() {
        hbm_gl_clear_render_target();
        skybox.render();
        requestAnimationFrame(render_dummy);
    }

    setTimeout(() => {
        render_dummy();
    }, 100); 
}

function hbm_create_gl_env(canvas) {
    let gl = canvas.getContext("webgl2");
    if (gl == null) {
        console.error("webgl2 not supported");
        return null;
    }
    return gl;
}