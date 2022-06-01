const apiAdapter = require('../../apiAdapter');
const jwt = require('jsonwebtoken');
const {
  URL_SERVICE_USERS,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(URL_SERVICE_USERS);

module.exports = async (req, res) => {
  try {
    const result = await api.post('/users/login', req.body);
    const { data } = result.data;

    // Create access token
    const token = jwt.sign({ data }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    });

    // refresh token
    const refreshToken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
    });

    await api.post('/refresh_tokens', {
      user_id: data.id,
      refresh_token: refreshToken,
    });

    return res.status(200).json({
      status: 'success',
      data: {
        token,
        refresh_token: refreshToken,
      },
    });
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({
        message: 'Service unavailable',
      });
    }

    console.log(error);

    const { status, message, data } = error.response;

    return res.status(status).json(message ?? data);
  }
};
