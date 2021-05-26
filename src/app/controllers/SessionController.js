import jwt from 'jsonwebtoken';

import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    
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
      return res.status(401).json({ error: 'Your account is banned' });
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
      status,
      cep,
      city,
      uf,
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
        status,
        cep,
        city,
        uf,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
