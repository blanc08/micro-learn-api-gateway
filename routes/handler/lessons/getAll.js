const apiAdapter = require('../../apiAdapter');
const { GATEWAY_HOSTNAME, URL_SERVICE_COURSES } = process.env;

const api = apiAdapter(URL_SERVICE_COURSES);

module.exports = async (req, res) => {
  try {
    const lessons = await api.get('/api/lessons', {
      params: { ...req.query },
    });

    return res.status(200).json(lessons.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({
        message: 'Service unavailable',
      });
    }

    const { status, message, data } = error.response;

    return res.status(status).json(message ?? data);
  }
};
