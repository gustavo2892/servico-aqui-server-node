import Complaint from '../schemas/Complaint';
import User from '../models/User';
import File from '../models/File';

class ComplaintController {
  async index(req, res) {
    const { userID, denounced, description, status } = req.body;

    const report = await Complaint.create({
      userID,
      denounced,
      description,
      status,
    });

    return report ? res.json(report) : false;
  }

  async update(req, res) {
    const { userId } = req.body;

    const user = await User.findByPk(userId);

    //console.log('useree', user);

    user.status = 'Block';

    if (user) {
      console.log('user', user);
      const teste = await user.update(user, { where: { id: user.id } });

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

      return res.json(teste);
    }

    return res.json(user, 'esse');
  }

  async list(req, res) {
    const complaints = await Complaint.find();

    return res.json(complaints);
  }

  async delete(req, res) {
    const { complaintID } = req.body;

    const complaints = await Complaint.deleteOne({ _id: complaintID }).select({
      name: true,
    });

    return complaints
      ? res.json('Denuncia deletada com sucesso')
      : res.json({ status: 404, message: 'Denuncia Não Encontrada.' });
  }
}

export default new ComplaintController();
