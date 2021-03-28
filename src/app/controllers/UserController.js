import User from '../models/User';
import File from '../models/File';

// import Cache from '../../lib/Cache';

class UserController {
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
    });
  }
}

export default new UserController();
