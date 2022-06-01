const apiAdapter = require('../../apiAdapter');
const { URL_SERVICE_USERS } = process.env;

const api = apiAdapter(URL_SERVICE_USERS);

module.exports = async (req, res) => {
  try {
    const id = req.user.data.id;
    const user = await api.put(`/users/${id}`, req.body);
    return res.status(200).json(user.data);
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
