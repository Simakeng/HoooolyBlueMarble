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
    window.addEventListener("resize", function () {
        let container = document.getElementById("container");
        let canvas = document.getElementById(HBM_RT_CANVAS_ID);

        // get the pixel width and height of the container
        let renderTargetHeight = container.clientHeight;
        let renderTargetWidth = container.clientWidth;

        canvas.width = renderTargetWidth;
        canvas.height = renderTargetHeight;
        // debug("window resize to: " + renderTargetWidth +
        //     "x" + renderTargetHeight + "");
    });
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

    // get the pixel width and height of the container
    let renderTargetHeight = container.clientHeight;
    let renderTargetWidth = container.clientWidth;

    canvas.width = renderTargetWidth;
    canvas.height = renderTargetHeight;

    register_window_resize_event();

    return canvas;
}
