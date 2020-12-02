import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      whatsapp: Yup.string().nullable(),
      category: Yup.string().nullable(),
      price: Yup.string().nullable(),
      description: Yup.string(),
      password: Yup.string()
        .required()
        .min(6),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation failed', messages: err.inner });
  }
};
