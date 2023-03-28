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

        return matMove;

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
    }
}