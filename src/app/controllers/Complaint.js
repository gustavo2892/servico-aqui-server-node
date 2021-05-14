import Complaint from '../schemas/Complaint';
import User from '../models/User';
import File from '../models/File';

class ComplaintController {
  async index(req, res) {
    const { userId, userName, providerId, description, status } = req.body;

    const report = await Complaint.create({
      userId,
      userName,
      providerId,
      description,
      status,
    });

    return report ? res.json(report) : false;
  }

  async update(req, res) {
    const { userId } = req.body;

    const user = await User.findByPk(userId);

    user.status = 'Block';

    if (user) {
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

    return res.json(user);
  }

  async list(req, res) {
    const complaints = await Complaint.find();

    return res.json(complaints);
  }

  async delete(req, res) {
    const { complaintId } = req.body;

    const complaints = await Complaint.deleteOne({ _id: complaintId }).select({
      name: true,
    });

    return complaints
      ? res.json('Denuncia deletada com sucesso')
      : res.json({ status: 404, message: 'Denuncia Não Encontrada.' });
  }
}

export default new ComplaintController();
