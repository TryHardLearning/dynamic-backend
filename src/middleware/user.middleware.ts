import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Missing fields' });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email' });
    }
    if (!validator.isStrongPassword(password, { minSymbols: 1 })) {
        return res.status(400).json({ success: false, message: 'Weak password. It must have at least 8 characters, including uppercase, lowercase, number and symbol.' });
    }
    if (!validator.isLength(name, { min: 3 })) {
        return res.status(400).json({ success: false, message: 'Name must have at least 3 characters' });
    }

    next();
};

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Missing fields' });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email' });
    }
    if (password.length < 8) {
        return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    next();
};

export { validateRegistration, validateLogin };