import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: false,
    },
    status: {
      type: String,
      required: true,
      default: 'Analisar',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Complaints', ComplaintSchema);
