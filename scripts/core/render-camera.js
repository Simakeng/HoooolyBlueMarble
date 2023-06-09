/**
 * @file render-camera.js
 * @author Simakeng (simakeng@outlook.com)
 * @brief camera control
 * @version 0.1
 * @date 2023-03-27
 *
 */

/**
 * Physical based camera model.
 */
class HBMCamera {
    #pos = glMatrix.vec3.fromValues(0, 0, 0);
    #up = glMatrix.vec3.fromValues(0, 1, 0);
    #look = glMatrix.vec3.fromValues(0, 0, 1);

    // sensor size is used to calculate DOF.
    #sensorWidth = 0.036;  // 36mm
    #sensorHeight = 0.024; // 24mm

    //TODO: implement dof with apture size and focal length.
    #aptureSize = 0.035; // 35mm

    #focalLength = 0.005;

    #cropFactor = this.#sensorWidth / this.#sensorHeight;

    //TODO: dynamicly update znear and zfar
    #znear = 0.1;
    #zfar = 1000.0;
    constructor() {
    }

    setSensorSize(w, h) {
        this.#sensorWidth = w;
        this.#sensorHeight = h;
    }

    /**
     * Set the camera resolution and update aspect ratio.
     * this function will not change the sensor size.
     * the aspect ratio is uesd to guide the corp of sensor area.
     * @param {Number} w 
     * @param {Number} h 
     */
    setResolution(w, h) {
        this.#cropFactor = w / h;
    }

    getViewProjectionMatrix() {
        const sensorRawW = this.#sensorWidth;
        const sensorRawH = this.#sensorHeight;

        const sensorVirtualW = sensorRawH * this.#cropFactor;
        const sensorVirtualH = sensorRawW / this.#cropFactor;

        const sensorW = Math.min(sensorVirtualW, sensorRawW);
        const sensorH = Math.min(sensorVirtualH, sensorRawH);

        const aspect = sensorW / sensorH;

        const scaleY = sensorH / 2 / this.#focalLength;
        const scaleX = sensorW / 2 / this.#focalLength;

        const projectionMatrix = lmath.perspectiveLH(scaleY, scaleX, this.#znear, this.#zfar);

        const viewMatrix = lmath.cameraViewMatrixLH(this.#pos, this.#look, this.#up);

        const viewProjectionMatrix = lmath.mat4mul(projectionMatrix, viewMatrix);
        return viewProjectionMatrix;
    }

    resgister_input_drag() {
        let dragStarted = false;
        let lastPos = {
            x: 0,
            y: 0
        }

        const camera = this;

        function camera_drag_callback(event) {
            switch (event.type) {
                case "mousedown":
                case "mousemove":
                case "mouseup":
                    break;
                default:
                    return;
            }

            const abs_pos = hbm_input_get_pos(event);
            const pos = hbm_canvas_translate_abs_to_rel_pos(abs_pos);

            switch (event.type) {
                case "mousedown":
                    lastPos = pos;
                    dragStarted = true;
                    break;
                case "mousemove":
                    if (!dragStarted) return;

                    const deltaXpx = -(pos.x - lastPos.x);
                    const deltaYpx = -(pos.y - lastPos.y);
                    const canvasSize = hbm_canvas_get_size();
                    const squareSizeScale = Math.min(canvasSize.width, canvasSize.height);
                    const deltaX = deltaXpx / squareSizeScale
                    const deltaY = deltaYpx / squareSizeScale;

                    const up = glMatrix.vec3.create();
                    const look = glMatrix.vec3.create();
                    const right = glMatrix.vec3.create();

                    glMatrix.vec3.normalize(up, camera.#up);
                    glMatrix.vec3.normalize(look, camera.#look);
                    glMatrix.vec3.cross(right, up, look);

                    const vertical = glMatrix.vec3.fromValues(0, 1, 0);

                    const matRotateX = lmath.mat4fromRotation(deltaX, vertical);
                    const matRotateY = lmath.mat4fromRotation(deltaY, right);

                    const matRot = lmath.mat4mul(matRotateY, matRotateX);

                    camera.#up = lmath.mat4apply(matRot, up);
                    camera.#look = lmath.mat4apply(matRot, look);

                    lastPos = pos;
                    
                    break;
                case "mouseup":
                    dragStarted = false;
                    break;
                default:
                    return;
            }
        }

        hbm_register_input_event_handler(camera_drag_callback);
    }
}

// const projectionMatrix = new Float32Array(
//     [
//         1, 0, 0, 0,
//         0, 1, 0, 0,
//         0, 0, 1, 0,
//         0, 0, 1, 0
//     ]);
// glMatrix.mat4.transpose(projectionMatrix,projectionMatrix);


let HBM_MAIN_CAMERA = null;

function hbm_get_main_camera() {
    if (!HBM_MAIN_CAMERA)
        hbm_init_main_camera();
    return HBM_MAIN_CAMERA;
}

function hbm_init_main_camera() {
    if (!HBM_MAIN_CAMERA)
        HBM_MAIN_CAMERA = new HBMCamera();
}