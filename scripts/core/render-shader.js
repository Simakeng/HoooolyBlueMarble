/**
 * @file render-shader.js
 * @author Simakeng (simakeng@outlook.com)
 * @brief shader utilities
 * @version 0.1
 * @date 2023-03-24
 *
 */

const HBM_DEFAULT_VERTEX_SHADER = "/assets/glsl/default.vs.glsl";
const HBM_DEFAULT_FRAGMENT_SHADER = "/assets/glsl/default.texture.fs.glsl";

const HBM_SKYBOX_VS = 1;
const HBM_SKYBOX_FS = 2;

const HBM_SHADERS = {};

HBM_SHADERS[HBM_SKYBOX_VS] = {
    name: "skybox_vertex_shader",
    path: HBM_DEFAULT_VERTEX_SHADER,
    type: "VS",
    inputs: {
        position: "a_VertexPosition",
        // texture: "a_TexturePosition"
    }
};

HBM_SHADERS[HBM_SKYBOX_FS] = {
    name: "skybox_fragment_shader",
    path: HBM_DEFAULT_FRAGMENT_SHADER,
    type: "FS",
}

function hbm_get_shader(shader_name) {
    let shaderPack = HBM_SHADERS[shader_name];
    if (!shaderPack) {
        debug("shader not found: " + shader_path);
        return null;
    }

    let shader = hbm_compile_shader(shaderPack);

    return shader;
}

var hbmCompiledShaders = {}

function hbm_compile_shader(shader) {
    const gl = hbm_get_gl();
    let shaderType = 0;
    let shaderPath = shader.path;

    if (shader.type == "FS")
        shaderType = gl.FRAGMENT_SHADER;
    else if (shader.type == "VS")
        shaderType = gl.VERTEX_SHADER
    else
        debug("unknown shader type: " + shader.type + " (" + shaderPath + ")");

    if (hbmCompiledShaders[shaderPath]) {
        return hbmCompiledShaders[shaderPath];
    }
    
    const shaderSource = hbm_load_file(shaderPath);
    let compiledShader = gl.createShader(shaderType);

    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);

    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        debug("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(compiledShader);
        return null;
    }

    hbmCompiledShaders[shaderPath] = {
        compiled: compiledShader,
        inputs: shader.inputs,
        name: shader.name
    };

    return hbmCompiledShaders[shaderPath];
}