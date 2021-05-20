import User from '../models/User';
import File from '../models/File';

import Cache from '../../lib/Cache';

const { Op } = require('sequelize');

module.exports = {
  async searchProviders(request, response) {
    const { query } = request.query;

    const providers = await User.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.regexp]: query,
            },
          },
          {
            category: {
              [Op.regexp]: query,
            },
          },
          {
            city: {
              [Op.regexp]: query,
            },
          },
        ],
        provider: true,
      },
    });

    return response.json({ providers });
  },

  async searchNoProviders(request, response) {
    const { query } = request.query;

    const users = await User.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.regexp]: query,
            },
          },
          {
            category: {
              [Op.regexp]: query,
            },
          },
          {
            city: {
              [Op.regexp]: query,
            },
          },
        ],
        provider: false,
      },
    });

    return response.json(users);
  },
};
