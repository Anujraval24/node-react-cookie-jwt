import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { generateJWTToken } from './jwtToken.js';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

const server = express();
const csrfProtection = csrf({ cookie: true });

server.use(json());
server.use(urlencoded({ extended: true }));
server.use(cors({ origin: true, credentials: true }));
server.use(cookieParser());
server.use(csrfProtection);

server.get('/csrfToken', (req, res) => {
	const token = req.csrfToken();
	// res.cookie('csrfToken', token, { httpOnly: true });
	res.json({ message: 'Node Server', data: { csrfToken: token } });
});

server.get('/', (req, res) => {
	const token = generateJWTToken(uuidv4());
	res.cookie('x-auth-token', token, { httpOnly: true });
	res.json({
		message: 'Node Server',
		data: { token },
	});
});

server.get('/api', (req, res) => {
	req.headers['x-csrf-token'] = req.csrfToken();
	res.json({
		message: 'Node Server',
		data: { token: req.cookies['x-auth-token'] },
	});
});

server.listen(2060, () => {
	console.log(`server listening on: 2060`);
});
