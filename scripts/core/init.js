/**
 * @file init.js
 * @author Simakeng (simakeng@outlook.com)
 * @brief do initialization
 * @version 0.1
 * @date 2023-03-24
 *
 */

function hbm_init() {
    let canvas = hbm_create_render_target_canvas();
    if (canvas == null) {
        alert("cant load canvas");
        return;
    }
    
    hbm_init_input_manager();

    hbm_init_main_camera();

    const cam = hbm_get_main_camera();
    cam.resgister_input_drag();

    hbm_init_render_loop(canvas);
}
