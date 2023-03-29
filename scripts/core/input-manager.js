function hbm_init_input_manager() {
    document.addEventListener("keyup", hbm_input_event_handler);
    document.addEventListener("keydown", hbm_input_event_handler);
    
    document.addEventListener("mousedown", hbm_input_event_handler);
    document.addEventListener("mouseup", hbm_input_event_handler);
    document.addEventListener("mousemove", hbm_input_event_handler);
    document.addEventListener("mousedown", hbm_input_event_handler);
    document.addEventListener("mouseup", hbm_input_event_handler);

    document.addEventListener("wheel", hbm_input_event_handler);
    document.addEventListener("contextmenu", hbm_input_event_handler);

    // for touch screen devices
    document.addEventListener("touchstart", hbm_input_event_handler);
    document.addEventListener("touchend", hbm_input_event_handler);
    document.addEventListener("touchmove", hbm_input_event_handler);
    document.addEventListener("touchcancel", hbm_input_event_handler);
}


const HBM_EVENT_HANDLER = [];


function hbm_input_event_handler(event) {
    // console.log(event);
    switch (event.type) {

        case "mousemove":
            const x = event.clientX;
            const y = event.clientY;

            if (!hbm_is_abs_point_in_rect({ x: x, y: y }))
                return;
            break;

        default:
            break;
    }

    for (let i = 0; i < HBM_EVENT_HANDLER.length; i++) {
        const handler = HBM_EVENT_HANDLER[i];
        try {
            handler(event);
        } catch (error) {
            console.log(error);
        }
    }
}

function hbm_register_input_event_handler(handler) {
    HBM_EVENT_HANDLER.push(handler);
}

function hbm_unregister_event_handler(handler) {
    const index = HBM_EVENT_HANDLER.indexOf(handler);
    if (index >= 0) {
        HBM_EVENT_HANDLER.splice(index, 1);
    }
}

function hbm_input_get_pos(event) {
    switch (event.type) {
        case "mouseup":
        case "mousedown":
        case "mousemove":
            const x = event.clientX;
            const y = event.clientY;
            return { x: x, y: y };
        default:
            break;
    }
}