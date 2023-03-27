/**
 * @file utils.js
 * @author Simakeng (simakeng@outlook.com)
 * @brief utilities
 * @version 0.1
 * @date 2023-03-24
 *
 */

function hbm_load_file(url) {
    const xhr = new XMLHttpRequest();
    // the third parameter is disable async
    xhr.open("get", url, false);
    xhr.send();
    return xhr.responseText;
}

function debug(msg) {
    console.log(msg);
}

/**
 * @brief create a array buffer and fill with data
 * @param {WebGLRenderingContext} gl 
 * @returns {WebGLBuffer} array buffer interface
 * @param {Array} bufferData Array contains data
 * @note the data will be convert to Float32Array
 */
function hbm_gl_create_array_buffer(gl, bufferData) {
    const arrayBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData), gl.STATIC_DRAW);
    return arrayBuffer;
}

function hbm_create_program(gl, ...shaders) {
    const shaderPorgram = gl.createProgram();
    for (let shader of shaders) {
        gl.attachShader(shaderPorgram, shader.compiled);
    }

    gl.linkProgram(shaderPorgram);
    if (!gl.getProgramParameter(shaderPorgram, gl.LINK_STATUS)
        && !gl.isContextLost()) {
        debug("Failed to link program: " + gl.getProgramInfoLog(shaderPorgram));
    };
    return shaderPorgram;
}

function hbm_create_mesh() {
    return {
        meshType: "indexed", // indexed or non-indexed
        vertexData: {
            position: null,
            texture: null,
            normal: null,
            tangent: null,
            count: 0
        },
        indexData: null,

        textures: {
            diffuse: null,
            normal: null,
        }
    }
}

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {*} mesh 
 * @param {*} program 
 * @param {*} shaders 
 */
function hbm_mesh_bind_to_program(gl, mesh, program, shaders) {
    shaders.forEach(shader => {
        if (!shader.inputs)
            return;

        const shaderInputNames = Object.getOwnPropertyNames(shader.inputs)

        shaderInputNames.forEach(inputName => {
            if (!mesh.vertexData[inputName]) {
                debug("mesh not have input: " + inputName + " required by shader '"
                    + shader.name + "'");
                return;
            }
            debug("input: " + inputName + " was bind to shader '"
                + shader.name + "' at location: " + shader.inputs[inputName] + "");
            
            let attribLocation = gl.getAttribLocation(program, shader.inputs[inputName]);
            let attribBuffer = mesh.vertexData[inputName];
            const elementSize = 3;

            // how many bytes to get from one set of values to the next
            // 0 = use type and numComponents above
            const stride = 0;

            // how many bytes inside the buffer to start from
            const offset = 0;

            gl.bindBuffer(gl.ARRAY_BUFFER, attribBuffer);
            gl.vertexAttribPointer(attribLocation, elementSize,
                gl.FLOAT, false, stride, offset);
            gl.enableVertexAttribArray(attribLocation);
        });
    });

}