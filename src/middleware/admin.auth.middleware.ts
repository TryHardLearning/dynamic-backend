import Jwt from "jsonwebtoken";

// const adminAuthMiddleware = (req: any, res: any, next: any) => {
//     try {
//         const token = req.headers.authorization?.split(' ').pop();

//         if (!token) {
//             return res.status(401).json({ success: false, message: 'No token provided' });
//         }

//         const secretKey = process.env.JWT_SECRET || 'default_secret_key';

//         Jwt.verify(token, secretKey, (err: any, decoded: any) => {
//             if (err) {
//                 return res.status(401).json({ success: false, message: 'Invalid token' });
//             }

//             if (decoded.role !== 'admin') {
//                 return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
//             }

//             req.user = decoded;
//             next();
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// }

const adminAuthMiddleware = (req: any, res: any, next: any) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not Authorized' });
        }
        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }

        const tokenDecode = Jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            next();
        }
        return res.status(401).json({ success: false, message: 'Not Authorized Login' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export { adminAuthMiddleware };