import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const jwtSecret = 'your_jwt_secret';
class AuthController {
 
  public async createUser(req: Request, res: Response): Promise<any> {
    const { nome, email, senha, tipo } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 8);
    try {
      // Verifica se o email já está cadastrado
      const existingUser = await prisma.usuario.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Este email já está registrado.' });
      }
  
      const usuario = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha: hashedPassword,
          tipo,
        },
      });
      res.status(201).json(usuario);
    } catch (error) {
  
      res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
  }
  

  public async readUser(req: Request, res: Response) :Promise <any>{
    const { email, senha } = req.body;
    try {
      const usuario = await prisma.usuario.findUnique({ where: { email } });
      if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

      const match = await bcrypt.compare(senha, usuario.senha);
      if (!match) return res.status(401).json({ message: 'Senha incorreta' });

    
      res.json({ message: 'Login bem-sucedido', usuario});
    } catch (error) {
      res.status(500).json({ message: 'Erro ao fazer login', error });
    }
  }

  public async updatePassword(req: Request, res: Response) :Promise <any>{
    const { email, currentPassword, newPassword } = req.body;
    try {
      const user = await prisma.usuario.findUnique({ where: { email } });
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

      const isValid = await bcrypt.compare(currentPassword, user.senha);
      if (!isValid) return res.status(400).json({ message: 'Senha atual incorreta' });

      const hashedNewPassword = await bcrypt.hash(newPassword, 8);
      await prisma.usuario.update({
        where: { email },
        data: { senha: hashedNewPassword },
      });
      res.json({ message: 'Senha atualizada com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar senha', error });
    }
  }
}

export default new AuthController();
