const apiAdapter = require('../../apiAdapter');
const { URL_SERVICE_PAYMENT } = process.env;

const api = apiAdapter(URL_SERVICE_PAYMENT);

module.exports = async (req, res) => {
  try {
    const user_id = req.user.data.id;
    const orders = await api.get('/api/orders', {
      params: { user_id },
    });
    return res.json(orders.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({
        message: 'Service Payment unavailable',
      });
    }

    const { status, message, data } = error.response;

    return res.status(status).json(message ?? data);
  }
};
