const { celebrate, Joi } = require('celebrate');

const validateCreateUser = celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      link: Joi.string().regex(/abc\d{3}/),
    }),
  },
);

const validateLoginUser = celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  },
);

const validateGetUserById = celebrate(
  {
    body: Joi.object().keys({

    }),
  },
);

const validateUpdateUserInfo = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  },
);

const validateCreateCard = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(/abc\d{3}/),
    }),
  },
);

const validateDeleteCardById = celebrate(
  {
    body: Joi.object().keys({

    }),
  },
);

module.exports = {
  validateCreateUser,
  validateLoginUser,
  validateGetUserById,
  validateUpdateUserInfo,
  validateCreateCard,
  validateDeleteCardById,
};
