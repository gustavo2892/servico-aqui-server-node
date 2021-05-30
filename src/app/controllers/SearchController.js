import User from '../models/User';
import Announcement from '../schemas/Announcement';
import File from '../models/File';

import Cache from '../../lib/Cache';
import { escapeRegExp } from 'lodash';

const { Op } = require('sequelize');

module.exports = {
  async searchProviders(request, response) {
    const { query } = request.query;

    const providers = await User.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iRegexp]: query,
            },
          },
          {
            category: {
              [Op.iRegexp]: query,
            },
          },
          {
            city: {
              [Op.iRegexp]: query,
            },
          },
          {
            uf: {
              [Op.iRegexp]: query,
            },
          },
        ],
        provider: true,
      },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return response.json({ providers });
  },

  async searchProvidersName(request, response) {
    const { query } = request.query;

    const providers = await User.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iRegexp]: query,
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
              [Op.iRegexp]: query,
            },
          },
          {
            category: {
              [Op.iRegexp]: query,
            },
          },
          {
            city: {
              [Op.iRegexp]: query,
            },
          },
        ],
        provider: false,
      },
    });

    return response.json(users);
  },

  async searchAnnouncement(request, response) {
    const { query } = request.query;
    console.log('teste', query);

    if (!query || query.length < 2) {
      const list = [];
      return response.json(list);
    }

    const regex = new RegExp(escapeRegExp(query), 'gim');

    const list = await Announcement.find({
      $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }],
    });

    return response.json(list);
  },
};
