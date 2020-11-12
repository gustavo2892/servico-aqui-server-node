import { isBefore, subHours } from 'date-fns';

import Appointment from '../models/Appointment';
import User from '../models/User';
import CancellationMail from '../jobs/CancellationMail';
import Cache from '../../lib/Cache';
import Queue from '../../lib/Queue';

class CancelAppointmentService {
  async run({ provider_id, user_id }) {
    const appointment = await Appointment.findByPk(provider_id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.user_id !== user_id) {
      throw new Error("User don't have permission to cancel this appointment");
    }

    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      throw new Error('User can only cancel appointments 2 hours in advance');
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    await Queue.add(CancellationMail.key, {
      appointment,
    });

    await Cache.invalidatePrefix(`user:${user_id}:appointments`);

    return appointment;
  }
}

export default new CancelAppointmentService();
