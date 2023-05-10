const mongoose = require('mongoose');
const validator = require('validator');

const objectId = mongoose.Schema.Types.ObjectId;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL карточки',
    },
    required: true,
  },
  owner: {
    type: objectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [objectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
