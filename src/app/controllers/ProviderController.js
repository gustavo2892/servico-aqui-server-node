import User from '../models/User';
import File from '../models/File';

import Cache from '../../lib/Cache';

class ProviderController {
  async index(req, res) {
    // const cached = await Cache.get('providers');

    // if (cached) {
    //   return res.json(cached);
    // }

    const providers = await User.findAll({
      where: { provider: true },
      attributes: [
        'id',
        'name',
        'email',
        'whatsapp',
        'avatar_id',
        'price',
        'description',
        'category',
      ],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    // await Cache.set('providers', providers);

    return res.json(providers);
  }

  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const {
      id,
      name,
      email,
      whatsapp,
      provider,
      category,
      price,
      description,
    } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      whatsapp,
      provider,
      category,
      price,
      description,
    });
  }
}

export default new ProviderController();
