const lmath = {
    perspectiveLH(xScale, yScale, zNear, zFar) {
        return new Float32Array([
            xScale, 0, 0, 0,
            0, yScale, 0, 0,
            0, 0, zFar / (zFar - zNear), -zNear * zFar / (zFar - zNear),
            0, 0, 1, 0
        ])
    },

    cameraViewMatrix(pos, look, up) {
        const matMove = new Float32Array([
            1, 0, 0, -pos[0],
            0, 1, 0, -pos[1],
            0, 0, 1, -pos[2],
            0, 0, 0, 1
        ])
        const right = glMatrix.vec3.create();
        glMatrix.vec3.normalize(look, look);
        glMatrix.vec3.normalize(up, up);
        glMatrix.vec3.cross(right, look, up);
        glMatrix.vec3.normalize(right, right);

        const matView = new Float32Array([
            right[0], up[0], look[0], 0,
            right[1], up[1], look[1], 0,
            right[2], up[2], look[2], 0,
            0, 0, 0, 1
        ]);

        return lmath.mat4mul(matMove, matView);

    },

    mat4mul(matA, matB) {
        const matC = new Float32Array(16);
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let sum = 0;
                for (let k = 0; k < 4; k++) {
                    sum += matA[i * 4 + k] * matB[k * 4 + j];
                }
                matC[i * 4 + j] = sum;
            }
        }
        return matC;
    },

    mat4apply(matA, vecB) {
        const vecB4 = new Float32Array(4);
        for (let i = 0; i < vecB4.length; i++) {
            if (i < vecB.length)
                vecB4[i] = vecB[i];
            else
                vecB4[i] = 1;
        }
        const vecC = new Float32Array(4);
        for (let i = 0; i < 4; i++) {
            let sum = 0;
            for (let k = 0; k < 4; k++) {
                sum += matA[i * 4 + k] * vecB4[k];
            }
            vecC[i] = sum;
        }
        return vecC;
    }
}