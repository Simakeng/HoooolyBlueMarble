/**
 * @file render-target.js
 * @author Simakeng (simakeng@outlook.com)
 * @brief canvas creation and attribute processing
 * @version 0.1
 * @date 2023-03-24
 *
 */

/**
 * @brief create a render target canvas
 * @return the canvas, null if failed
 */

const HBM_RT_CANVAS_ID = "render-target-canvas";

function register_window_resize_event() {

    let timeoutId = 0;
    let resizePending = false;

    window.addEventListener("resize", function () {

        if (resizePending) {
            this.clearTimeout(timeoutId);
        }
        resizePending = true;
        timeoutId = setTimeout(hbm_resize_target_canvas, 200);
    });
}

function hbm_resize_target_canvas() {
    const container = document.getElementById("container");
    const canvas = document.getElementById(HBM_RT_CANVAS_ID);
    const renderTargetHeight = container.clientHeight;
    const renderTargetWidth = container.clientWidth;
    canvas.width = renderTargetWidth;
    canvas.height = renderTargetHeight;
    gl = hbm_get_gl()
    if (gl)
        gl.viewport(0, 0, renderTargetWidth, renderTargetHeight);
    const camera = hbm_get_main_camera();
    camera.setResolution(renderTargetWidth, renderTargetHeight);

    debug("window resize to: " + renderTargetWidth +
        "x" + renderTargetHeight + "");
}

function create_render_target_canvas() {
    let container = document.getElementById("container");

    if (container == null) {
        console.error("container not found");
        return null;
    }

    let canvas = document.createElement("canvas");
    canvas.id = "render-target-canvas";
    //   canvas.style.width = "100%";
    //   canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.zIndex = "-1";

    container.innerHTML = "";
    container.appendChild(canvas);

    register_window_resize_event();

    hbm_resize_target_canvas();

    return canvas;
}
