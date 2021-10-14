const jwt = require("jsonwebtoken");
const sessionModel = require("../models/session.model");
const accessToken = `-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQCDT049RMX4sqXwwYpSvnIi1ztDTVvYRlQsOgWMahQfMxhPDFgn
lki9jIGtDAtAGeLoRGPkR3E0gbreC0KV60jn5i24dC8KpoDVbLhKIPL5sDeRRWaS
H/dmSmsnckOlfr+APxTY0aQGoawI0FLbrwO2meBVCeFxSxU6atcKpBF44QIDAQAB
AoGBAIDVVdF9YbRCK9gNPJc0ri2K+WVuSDfpwPpnrzv2dGmsKySb2v50UEhRzIWp
tHwfKedz+oJmqia3Rk5Hw/vuDuevS03rOKYeN7sqIXkkL5bHKSE7nuSiWn9XqjXb
N6d1gyo9Fn6TC5V8DKX0ZXSEZMlgArKYIK8ey9vJHSJ3migBAkEA5oHsjO3F17wl
p54POljzZSs9GlqG4e6cxdybo4o8wGpH/H0exmB3Gx1QyoNTWTqOxWYofRhqlvue
rNmkatKhoQJBAJHU6xIWVVamXBWFjV/QCuyj+l0PMCfdtgNMbEtEuir5tg0vV8/U
rxpCIIXmDAlK1KRc/SZKSgyCIWXNCVReD0ECQQCsIBSt39e+kwZjNgoU/dsyjqkg
Br119KIoteWap11aKYL7rcrPQ7VtD+UGdC5HEQ0PpotRbmwZtmb0l8jI4+RBAkAs
zmaLYCFIRkT0t9wAHEO/AYLjJM9+8DgEO27qkWtB2Qd+dZVdXdOPFdI4Ub5Q/JTp
C0kcgqbNwQ3R4XWEXoIBAkEAjL5VGsDUmUjOt/dtqH2cKHF/qzqgZfYJp7ZYleVS
67O+vrv08mHQd9VwPU1zMowS1VtSBa0lgHqHii9ZPEUJ+Q==
-----END RSA PRIVATE KEY-----`;

const refreshToken = `-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQCDT049RMX4sqXwwYpSvnIi1ztDTVvYRlQsOgWMahQfMxhPDFgn
lki9jIGtDAtAGeLoRGPkR3E0gbreC0KV60jn5i24dC8KpoDVbLhKIPL5sDeRRWaS
H/dmSmsnckOlfr+APxTY0aQGoawI0FLbrwO2meBVCeFxSxU6atcKpBF44QIDAQAB
AoGBAIDVVdF9YbRCK9gNPJc0ri2K+WVuSDfpwPpnrzv2dGmsKySb2v50UEhRzIWp
tHwfKedz+oJmqia3Rk5Hw/vuDuevS03rOKYeN7sqIXkkL5bHKSE7nuSiWn9XqjXb
N6d1gyo9Fn6TC5V8DKX0ZXSEZMlgArKYIK8ey9vJHSJ3migBAkEA5oHsjO3F17wl
p54POljzZSs9GlqG4e6cxdybo4o8wGpH/H0exmB3Gx1QyoNTWTqOxWYofRhqlvue
rNmkatKhoQJBAJHU6xIWVVamXBWFjV/QCuyj+l0PMCfdtgNMbEtEuir5tg0vV8/U
rxpCIIXmDAlK1KRc/SZKSgyCIWXNCVReD0ECQQCsIBSt39e+kwZjNgoU/dsyjqkg
Br119KIoteWap11aKYL7rcrPQ7VtD+UGdC5HEQ0PpotRbmwZtmb0l8jI4+RBAkAs
zmaLYCFIRkT0t9wAHEO/AYLjJM9+8DgEO27qkWtB2Qd+dZVdXdOPFdI4Ub5Q/JTp
C0kcgqbNwQ3R4XWEXoIBAkEAjL5VGsDUmUjOt/dtqH2cKHF/qzqgZfYJp7ZYleVS
C0kcgqbNwQ3R4XWEXoIBAkEAjL5VGsDUmUjOt/dtqH2cKHF/qzqgZfYJp7ZYleVS
67O+vrv08mHQd9VwPU1zMowS1VtSBa0lgHqHii9ZsadfsfdsafsdfsdfPEUJ+Q==
-----END RSA PRIVATE KEY-----`;

const emailToken = `-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQCDT049RMX4sqXwwYpSvnIi1ztDTVvYRlQsOgWMahQfMxhPDFgn
lki9jIGtDAtAGeLoRGPkR3E0gbreC0KV60jn5i24dC8KpoDVbLhKIPL5sDeRRWaS
H/dmSmsnckOlfr+APxTY0aQGoawI0FLbrwO2meBVCeFxSxU6atcKpBF44QIDAQAB
AoGBAIDVVdF9YbRCK9gNPJc0ri2K+WVuSDfpwPpnrzv2dGmsKySb2v50UEhRzIWp
tHwfKedz+oJmqia3Rk5Hw/vuDuevS03rOKYeN7sqIXkkL5bHKSE7nuSiWn9XqjXb
N6d1gyo9Fn6TC5V8DKX0ZXSEZMlgArKYIK8ey9vJHSJ3migBAkEA5oHsjO3F17wl
p54POljzZSs9GlqG4e6cxdybo4o8wGpH/H0exmB3Gx1QyoNTWTqOxWYofRhqlvue
rNmkatKhoQJBAJHU6xIWVVamXBWFjV/QCuyj+l0PMCfdtgNMbEtEuir5tg0vV8/U
rxpCIIXmDAlK1KRc/SZKSgyCIWXNCVReD0ECQQCsIBSt39e+kwZjNgoU/dsyjqkg
Br119KIoteWap11aKYL7rcrPQ7VtD+UGdC5HEQ0PpotRbmwZtmb0l8jI4+RBAkAs
zmaLYCFIRkT0t9wAHEO/AYLjJM9+8DgEO27qkWtB2Qd+dZVdXdOPFdI4Ub5Q/JTp
C0kcgqbNwQ3R4XWEXoIBAkEAjL5VGsDUmUjOt/dtqH2cKHF/qzqgZfYJp7ZYleVS
C0kcgqbNwQ3R4XWEXoIBAkEAjL5VGsDUmUjOt/dtqH2cKHF/qzqgZfYJp7ZYleVS
67O+vrv08mHQd9VwPU1zMowS1VtSBa0lgHqHii9ZsadfsfdsafsdfsdfPEUJ+Q==
-----END RSA PRIVATE KEY-----`;

//sign access token
const signJwt = (payload) => {
  return jwt.sign(payload, accessToken, {
    algorithm: "RS256",
    expiresIn: "20m",
  });
};

//sign email token
const signEmailToken = (payload) => {
  return jwt.sign(payload, emailToken, {
    algorithm: "RS256",
    expiresIn: "4h",
  });
};

//verify jwt
const verifyJwt = (token) => {
  try {
    const decoded = jwt.verify(token, accessToken, { algorithms: ["RS256"] });
    return { payload: decoded, expired: false };
  } catch (err) {
    return { payload: null, expired: err.message };
  }
};

//sign refresh token
const signRefreshToken = (payload) => {
  return jwt.sign(payload, refreshToken, {
    algorithm: "RS256",
    expiresIn: "1y",
  });
};

//verify Email Token
const verifyEmailToken = (token) => {
  try {
    const decoded = jwt.verify(token, emailToken, { algorithms: ["RS256"] });
    return { payload: decoded, expired: false };
  } catch (err) {
    return { payload: null, expired: err.message };
  }
};

//verify refresh token
const verifyRefreshToken = async (refToken) => {
  try {
    const decoded = jwt.verify(refToken, refreshToken, {
      algorithms: ["RS256"],
    });
    const session = await sessionModel.verifySession(decoded.payload);
    if (session.session_token === refToken) {
      const accessToken = await signJwt({ payload: session.user_id });
      const refToken = await signRefreshToken({ payload: session.user_id });
      const createSession = await sessionModel.createSession(
        session.user_id,
        refToken
      );
      return {
        payload: {
          accessToken,
          refreshToken: refToken,
          userId: session.user_id,
        },
        error: null,
      };
    } else {
      return { payload: null, error: "Invalid refresh token" };
    }
  } catch (err) {
    return { payload: null, expired: err.message };
  }
};
module.exports = {
  signJwt,
  verifyJwt,
  signRefreshToken,
  verifyRefreshToken,
  signEmailToken,
  verifyEmailToken,
};
