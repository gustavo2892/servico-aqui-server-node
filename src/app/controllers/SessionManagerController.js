import jwt from 'jsonwebtoken';

import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

class SessionManagerController {
  async store(req, res) {
    console.log('entrnado aqui')
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (user.status === 'Block') {
      console.log('es', user.status)
      return res.status(401).json({ error: 'Your account is banned' });
    }

    if (user.type !== 'admin') {
      return res.status(401).json({ error: 'Não autorizado' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const {
      id,
      name,
      whatsapp,
      avatar,
      provider,
      description,
      price,
      category,
    } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        whatsapp,
        provider,
        description,
        price,
        category,
        avatar,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionManagerController();
