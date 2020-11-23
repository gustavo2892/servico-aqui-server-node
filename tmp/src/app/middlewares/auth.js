import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    // Promisify para utilizar await ao inves do callback normal do verify
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // O decoded terá as informações do usuário que foram inseridas no sign do SessionController
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
