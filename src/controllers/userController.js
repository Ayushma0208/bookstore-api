import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { readJSON, writeJSON } from '../utils/fileHandler.js';

const usersFile = path.resolve('src/models/users.json');
const JWT_SECRET = process.env.JWT_SECRET;

const readUsers = async () => {
  try {
    return await readJSON(usersFile);
  } catch (err) {
    return [];
  }
};

const writeUsers = async (users) => {
  await writeJSON(usersFile, users);
};

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' });

    const users = await readUsers();

    const existingUser = users.find((user) => user.email === email);
    if (existingUser)
      return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: uuid(),
      email,
      password: hashedPassword,
    };

    users.push(newUser);
    await writeUsers(users);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' });

    const users = await readUsers();
    const user = users.find((u) => u.email === email);

    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: { token },
    });
  } catch (err) {
    next(err);
  }
};
