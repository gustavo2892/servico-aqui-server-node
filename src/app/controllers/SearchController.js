import User from '../models/User';
import File from '../models/File';

import Cache from '../../lib/Cache';

const { Op } = require('sequelize');

module.exports = {
  async index(request, response) {
    const { query } = request.query;

    const providers = await User.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: query,
            },
          },
          {
            category: {
              [Op.like]: query,
            },
          },
        ],
        provider: true,
      },
    });

    return response.json({ providers });
  },
};
