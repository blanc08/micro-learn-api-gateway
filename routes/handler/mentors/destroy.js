const apiAdapter = require('../../apiAdapter');
const { URL_SERVICE_COURSES } = process.env;

const api = apiAdapter(URL_SERVICE_COURSES);

module.exports = async (req, res) => {
  try {
    const media = await api.delete(`/api/mentors/${req.params.id}`);
    return res.status(200).json(media.data);
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
