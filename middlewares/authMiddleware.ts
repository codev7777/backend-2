// import { Request, Response, NextFunction } from "express";
// import JWT from "jsonwebtoken";

// export const authenticate = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Bearer Token
//   if (!token) return res.status(401).json({ message: "Unauthorized." });

//   try {
//     const decoded = JWT.verify(token, process.env.SECRET_KEY) as { id: number; role: string };
//     req.user = decoded;
//     next();
//   } catch {
//     return res.status(403).json({ message: "Forbidden." });
//   }
// };

// export const authorize = (roles: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Access denied." });
//     }
//     next();
//   };
// };
