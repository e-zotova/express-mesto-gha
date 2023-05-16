const jwt = require('jsonwebtoken');

const JWT_SECRET = 'someveryveryverysecretkey';

const getJwtToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });

module.exports = { getJwtToken };
