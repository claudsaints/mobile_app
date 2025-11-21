

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: string;
}

export interface Aluno {
  usuarioId: number;
  matricula: string;
  usuario: Usuario;
}

export interface Disciplina {
  id: number;
  descricao: string;
}

export interface MatriculaAluno {
  id: number;
  nota: number | null;
  alunoId: number;
  disciplinaId: number;
  aluno: Aluno;
  disciplina: Disciplina;
}
