const lmath = {
    perspectiveLH(xScale, yScale, zNear, zFar) {
        return new Float32Array([
            xScale, 0, 0, 0,
            0, yScale, 0, 0,
            0, 0, zFar / (zFar - zNear), -zNear * zFar / (zFar - zNear),
            0, 0, 1, 0
        ])
    },
    dot(vecA, vecB) {
        let sum = 0;
        for (let i = 0; i < vecA.length; i++) {
            sum += vecA[i] * vecB[i];
        }
        return sum;
    },
    cameraViewMatrixLH(pos, look, up) {
        const matMove = new Float32Array([
            1, 0, 0, -pos[0],
            0, 1, 0, -pos[1],
            0, 0, 1, -pos[2],
            0, 0, 0, 1
        ])
        const right = glMatrix.vec3.create();
        glMatrix.vec3.normalize(look, look);
        glMatrix.vec3.normalize(up, up);
        glMatrix.vec3.cross(right, up, look);
        right[1] = 0.0; // not allow camera to rotate around x axis
        glMatrix.vec3.normalize(right, right);

        const matView = new Float32Array([
            right[0], right[1], right[2], 0,
            up[0], up[1], up[2], 0,
            look[0], look[1], look[2], 0,
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
                vecB4[i] = 0;
        }
        const vecC = new Float32Array(4);
        for (let i = 0; i < 4; i++) {
            let sum = 0;
            for (let k = 0; k < 4; k++) {
                sum += matA[i * 4 + k] * vecB4[k];
            }
            vecC[i] = sum;
        }
        const resultVec = new Float32Array(vecB.length);
        for (let i = 0; i < vecB.length; i++) {
            resultVec[i] = vecC[i];
        }
        return resultVec;
    },

    mat4fromRotation(rad, axis) {
        const c = Math.cos(rad);
        const s = Math.sin(rad);
        const t = 1 - c;
        const x = axis[0];
        const y = axis[1];
        const z = axis[2];

        const mat = new Float32Array([
            t * x * x + c, t * x * y - s * z, t * x * z + s * y, 0,
            t * x * y + s * z, t * y * y + c, t * y * z - s * x, 0,
            t * x * z - s * y, t * y * z + s * x, t * z * z + c, 0,
            0, 0, 0, 1
        ]);

        return mat;
    }
}