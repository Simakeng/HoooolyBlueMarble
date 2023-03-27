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
    if (xhr.responseText == "text")
        return xhr.responseText;
    else
        return xhr.response;
}

function debug(msg) {
    console.log(msg);
}

/**
 * @brief create a array buffer with flag STATIC_DRAW and fill with data
 * @param {WebGLRenderingContext} gl 
 * @returns {WebGLBuffer} array buffer interface
 * @param {Array} bufferData Array contains data
 * @param {Number} elementSize how many elements in one data
 * @note the data will be convert to Float32Array
 */
function hbm_gl_create_static_array_buffer(gl, bufferData, elementSize) {
    const arrayBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return {
        buffer: arrayBuffer,
        elementSize: elementSize
    };
}

function hbm_gl_create_static_texture2d(gl, img_url) {
    const texture = gl.createTexture();
    const image = new Image();
    image.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(
            gl.TEXTURE_2D,
            gl.TEXTURE_MIN_FILTER,
            gl.LINEAR_MIPMAP_NEAREST
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
    image.src = img_url;

    return texture;
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

/**
 * Get a default mesh template
 * @returns {Object} mesh template
 */
function hbm_get_static_mesh_template() {
    return {
        meshType: "indexed", // indexed or non-indexed
        vertexData: {
            position: null,
            texture: null,
            normal: null,
            tangent: null,
        },
        vertexCount: 0,
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

            // check if the mesh have corresponding input data
            const vertexData = mesh.vertexData[inputName];
            const textureData = mesh.textures[inputName];

            if (vertexData) {
                const inputBindingName = shader.inputs[inputName].binding;

                const attribLocation = gl.getAttribLocation(program, inputBindingName);
                const attribBuffer = vertexData.buffer;
                const elementSize = vertexData.elementSize;

                // how many bytes to get from one set of values to the next
                // 0 = use type and numComponents above
                const stride = 0;

                // how many bytes inside the buffer to start from
                const offset = 0;

                gl.bindBuffer(gl.ARRAY_BUFFER, attribBuffer);
                gl.vertexAttribPointer(attribLocation, elementSize, gl.FLOAT, false, stride, offset);
                gl.enableVertexAttribArray(attribLocation);
                gl.bindBuffer(gl.ARRAY_BUFFER, null);
            }
            else if (textureData) {
                const inputBindingName = shader.inputs[inputName].binding;
                const inputBindingIndex = shader.inputs[inputName].index;

                const webGLTextureIndex = hbm_gl_translate_texture_index(gl, inputBindingIndex);

                gl.activeTexture(webGLTextureIndex);
                gl.bindTexture(gl.TEXTURE_2D, textureData);

                const samplerLocation = gl.getUniformLocation(program, inputBindingName);
                gl.uniform1i(samplerLocation, inputBindingIndex)
            }
            else {
                debug("mesh not have input: " + inputName + " required by shader '"
                    + shader.name + "'");
                return;
            }



        });
    });

}

/**
 * Translate number index to WebGL texture index
 * @param {WebGL2RenderingContext} gl 
 * @param {Number} index 
 */
function hbm_gl_translate_texture_index(gl, index) {
    if (index == 0)
        return gl.TEXTURE0;
    else if (index == 1)
        return gl.TEXTURE1;
    else if (index == 2)
        return gl.TEXTURE2;
    else if (index == 3)
        return gl.TEXTURE3;
    else if (index == 4)
        return gl.TEXTURE4;
    else if (index == 5)
        return gl.TEXTURE5;
    else if (index == 6)
        return gl.TEXTURE6;
    else if (index == 7)
        return gl.TEXTURE7;
    else if (index == 8)
        return gl.TEXTURE8;
    else if (index == 9)
        return gl.TEXTURE9;
    else if (index == 10)
        return gl.TEXTURE10;
    else if (index == 11)
        return gl.TEXTURE11;
    else if (index == 12)
        return gl.TEXTURE12;
    else if (index == 13)
        return gl.TEXTURE13;
    else if (index == 14)
        return gl.TEXTURE14;
    else if (index == 15)
        return gl.TEXTURE15;
    else if (index == 16)
        return gl.TEXTURE16;
    else if (index == 17)
        return gl.TEXTURE17;
    else if (index == 18)
        return gl.TEXTURE18;
    else if (index == 19)
        return gl.TEXTURE19;
    else if (index == 20)
        return gl.TEXTURE20;
    else if (index == 21)
        return gl.TEXTURE21;
    else if (index == 22)
        return gl.TEXTURE22;
    else if (index == 23)
        return gl.TEXTURE23;
    else if (index == 24)
        return gl.TEXTURE24;
    else if (index == 25)
        return gl.TEXTURE25;
    else if (index == 26)
        return gl.TEXTURE26;
    else if (index == 27)
        return gl.TEXTURE27;
    else if (index == 28)
        return gl.TEXTURE28;
    else if (index == 29)
        return gl.TEXTURE29;
    else if (index == 30)
        return gl.TEXTURE30;
    else if (index == 31)
        return gl.TEXTURE31;
    else
        return null;
}