import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

class ProfessorController {
  public async create(req: Request, res: Response): Promise<any> {
    const { nome, email, senha, tipo } = req.body; // dados do usuário
    try {
      const usuario = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha,
          tipo,
        },
      });
  
      const professor = await prisma.professor.create({
      data: {
        usuario: { create: usuario},
        disciplinas: {}
      }
        
      });
  
      res.json({ usuario, professor });
    } catch (error: any) {
      if (error.code === 'P2002') {
        return res.status(400).json({ message: 'Email já em uso' });
      }
      res.status(500).json({ message: 'Erro ao criar professor', error });
    }
  }
  

  public async delete(req: Request, res: Response): Promise<any> {
    const { usuarioId } = req.body;  // mudou de id para usuarioId
    try {
      const deleted = await prisma.professor.delete({ where: { usuarioId } });
      res.json({ message: 'Professor excluído com sucesso', professor: deleted });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir professor', error });
    }
  }
  
  public async update(req: Request, res: Response): Promise<any> {
    const { usuarioId, nome, email } = req.body;  // idem
    try {
      const updated = await prisma.professor.update({
        where: { usuarioId },
        data: { usuario: { update: { nome, email } } },
      });
      res.json(updated);
    } catch (error: any) {
      if (error.code === 'P2002') {
        return res.status(400).json({ message: 'CPF ou e-Mail já em uso' });
      }
      res.status(500).json({ message: 'Erro ao atualizar professor', error });
    }
  }
  
}

export default new ProfessorController();
