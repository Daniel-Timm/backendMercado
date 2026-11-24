import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function autenticar(req: Request , res : Response, next: NextFunction)
{
    const authHeader = req.headers.authorization;

    if(!authHeader)
    {
        return res.status(401).json({ erro: 'Token de autenticação não fornecido'})
    }

    const [, token] = authHeader.split(' ')

    if (!token)
    {
        return res.status(401).json({erro : 'Token mal formatado'});
    }

    try
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: string;
            papel: string;
        };

        req.usuario = {
            id :   decoded.id,
            papel: decoded.papel,
        };

        return next();



    }
    catch (error)
    {
        return res.status(401).json({erro : 'Token invalido ou expirado'});

    }
}
export function autorizarAdmin(req: Request, res: Response, next: NextFunction)
{
    if(req.usuario?.papel !== 'ADMIN')
    {
        return res.status(403).json({erro: 'Acesso negado. Apenas administradores podem realizar esta ação.'})
    }
    return next();
}