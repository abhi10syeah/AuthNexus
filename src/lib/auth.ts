import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

export function getUserIdFromToken(req: NextRequest): string | null {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
      return null;
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return decoded.userId;

  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}
