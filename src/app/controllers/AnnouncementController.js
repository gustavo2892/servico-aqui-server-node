import Announcement from '../schemas/Announcement';
import User from '../models/User';

class AnnouncementController {
  async index(req, res) {
    const checkIsNotProvider = await User.findOne({
      where: { id: req.userId, provider: false },
    });

    if (!checkIsNotProvider) {
      return res
        .status(401)
        .json({ error: 'Only not providers can create announcement' });
    }

    const announcements = await Announcement.findOne({
      user: req.userId,
    });

    return res.json(announcements);
  }
  async store(req, res) {
    const { title, whatsapp, description } = req.body;

    const checkIsNotProvider = await User.findOne({
      where: { id: req.userId, provider: false },
    });

    if (!checkIsNotProvider) {
      return res
        .status(401)
        .json({ error: 'Only not providers can create announcement' });
    }

    const announcementsExistis = await Announcement.findOne({
      user: req.userId,
    });

    if (announcementsExistis) {
      return res
        .status(401)
        .json({ error: 'The user already has an announcement' });
    }

    const announcement = await Announcement.create({
      user: req.userId,
      title,
      whatsapp,
      description,
    });

    return res.json(announcement);
  }
  async delete(req, res) {
    const checkIsNotProvider = await User.findOne({
      where: { id: req.userId, provider: false },
    });

    if (!checkIsNotProvider) {
      return res
        .status(401)
        .json({ error: 'Only not providers can create announcement' });
    }

    const announcementsExistis = await Announcement.findOne({
      user: req.userId,
    });

    if (!announcementsExistis) {
      return res.status(401).json({ error: 'The user has no announcement' });
    }

    await Announcement.deleteOne({
      user: req.userId,
    });

    return res.json({ message: 'The announcement was successfully deleted' });
  }
  async indexAll(req, res) {
    const announcements = await Announcement.find();

    return res.json(announcements);
  }
}

export default new AnnouncementController();
