import jwt from 'jsonwebtoken';

const { sign, verify } = jwt;

const secret = 'test';

export const generateJWTToken = (id) => {
	const token = sign({ sub: id }, secret, { expiresIn: '72h' });
	return token;
};

export const verifyJWTToken = (token) => {
	const verifyToken = verify(token, secret);
	return verifyToken;
};
