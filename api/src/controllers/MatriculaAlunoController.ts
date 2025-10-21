import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

class MatriculaAlunoController {
  public async create(req: Request, res: Response) {
    const { alunoId, disciplinaId } = req.body;
    try {
      const matricula = await prisma.matriculaAluno.create({
        data: {
          alunoId,
          disciplinaId,
        },
      });
      res.json(matricula);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao matricular aluno', error });
    }
  }

  public async list(_: Request, res: Response) {
    try {
      const matriculas = await prisma.matriculaAluno.findMany({
        include: {
          aluno: true,
          disciplina: true,
        },
      });
      res.json(matriculas);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar matrículas', error });
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.body;
    try {
      const deleted = await prisma.matriculaAluno.delete({ where: { id } });
      res.json({ message: 'Matrícula excluída', matricula: deleted });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir matrícula', error });
    }
  }

  public async update(req: Request, res: Response) {
    const { id, alunoId, disciplinaId } = req.body;
    try {
      const updated = await prisma.matriculaAluno.update({
        where: { id },
        data: { alunoId, disciplinaId },
      });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar matrícula', error });
    }
  }
}

export default new MatriculaAlunoController();
