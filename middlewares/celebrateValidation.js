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

    }),
  },
);

const validateCreateCard = celebrate(
  {
    body: Joi.object().keys({

    }),
  },
);

const validateDeleteCardById = celebrate(
  {
    body: Joi.object().keys({

    }),
  },
);

const validateLikeCard = celebrate(
  {
    body: Joi.object().keys({

    }),
  },
);

const validateDislikeCard = celebrate(
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
  validateLikeCard,
  validateDislikeCard,
};
