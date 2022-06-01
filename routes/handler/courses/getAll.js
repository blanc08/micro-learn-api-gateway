const apiAdapter = require('../../apiAdapter');
const { GATEWAY_HOSTNAME, URL_SERVICE_COURSES } = process.env;

const api = apiAdapter(URL_SERVICE_COURSES);

module.exports = async (req, res) => {
  try {
    const courses = await api.get('/api/courses', {
      params: { ...req.query },
      status: 'published',
    });

    const coursesData = courses.data;
    const firstPage = coursesData.data.first_page_url.split('?').pop();
    const lastPage = coursesData.data.last_page_url.split('?').pop();

    if (coursesData.data.next_page_url) {
      const nextPage = coursesData.data.next_page_url.split('?').pop();
      coursesData.data.next_page_url = `${GATEWAY_HOSTNAME}/courses?${nextPage}`;
    }

    if (coursesData.data.prev_page_url) {
      const prevPage = coursesData.data.prev_page_url.split('?').pop();
      coursesData.data.prev_page_url = `${GATEWAY_HOSTNAME}/courses?${prevPage}`;
    }

    coursesData.data.path = `${GATEWAY_HOSTNAME}/courses`;

    coursesData.data.first_page_url = `${GATEWAY_HOSTNAME}/courses?${firstPage}`;
    coursesData.data.last_page_url = `${GATEWAY_HOSTNAME}/courses?${lastPage}`;

    return res.status(200).json(coursesData);
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
