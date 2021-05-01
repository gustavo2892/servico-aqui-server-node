import Complaint from '../schemas/Complaint';
import User from '../models/User';
import File from '../models/File';

class ComplaintController {
  async index(req, res) {
    const { userID, denounced, description } = req.body;

    const report = await Complaint.create({
      userID,
      denounced,
      description,
    });

    return report ? res.json(report) : false;
  }

  async store(req, res) {
    const { userId } = req.body;

    const user = await User.findByPk(userId);

    console.log('useree', user);

    user.status = "Active";

    if (user) {
      console.log('user', user)
      await user.update(user);

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
      } = await User.findByPk(userId, {
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
        whatsapp,
        avatar,
        price,
        description,
        category,
        provider,
        status,
      });
    }

    return res.json(user);
  }
}

export default new ComplaintController();
