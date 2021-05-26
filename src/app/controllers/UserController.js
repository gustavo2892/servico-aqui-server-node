import User from '../models/User';
import File from '../models/File';

// import Cache from '../../lib/Cache';

class UserController {
  async index(req, res) {
    // const cached = await Cache.get('providers');

    // if (cached) {
    //   return res.json(cached);
    // }

    const users = await User.findAll({
      where: { provider: false },
      attributes: [
        'id',
        'name',
        'email',
        'whatsapp',
        'avatar_id',
        'price',
        'description',
        'category',
        'city',
        'status',
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

    return res.json(users);
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
      cep,
      street,
      //address_number,
      complement,
      district,
      city,
      uf,
      status,
      type,
    } = await User.create(req.body);

    // if (provider) {
    //   await Cache.invalidate('providers');
    // }

    return res.json({
      id,
      name,
      email,
      whatsapp,
      provider,
      // category,
      // price,
      // description
      cep,
      street,
      //address_number,
      complement,
      district,
      city,
      uf,
      status,
      type,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);

    const {
      id,
      name,
      whatsapp,
      avatar,
      price,
      description,
      category,
      provider,
      status,
      city,
      uf,
      cep,
    } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      whatsapp,
      avatar,
      price,
      description,
      category,
      provider,
      status,
      city,
      uf,
      cep,
    });
  }

  async getUser(req, res) {
    const user = await User.findOne({ where: { id: req.params.id } });

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado.' });
    }

    const {
      id,
      name,
      whatsapp,
      email,
      avatar,
      price,
      description,
      category,
      provider,
      status,
    } = await User.findByPk(req.params.id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      whatsapp,
      avatar,
      price,
      description,
      category,
      provider,
      status,
    });
  }

  async updateStatus(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    await user.update(req.body);

    const {
      id,
      name,
      whatsapp,
      avatar,
      price,
      description,
      category,
      provider,
      status,
    } = await User.findByPk(req.body.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      whatsapp,
      avatar,
      price,
      description,
      category,
      provider,
      status,
    });
  }
}

export default new UserController();
