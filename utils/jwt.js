const jwt = require('jsonwebtoken');

const JWT_SECRET = 'someveryveryverysecretkey';

const getJwtToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
const verifyJwtToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = { getJwtToken, verifyJwtToken };
