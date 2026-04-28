export interface Course {
  id: string;
  name: string;
  creditValue: number; // For 20 hours
}

export const COURSES: Course[] = [
  { id: 'administracao', name: 'Administração', creditValue: 1248.07 },
  { id: 'ads', name: 'Análise e Desenvolvimento de Sistemas', creditValue: 1229.41 },
  { id: 'arquitetura', name: 'Arquitetura e Urbanismo', creditValue: 1718.85 },
  { id: 'biomedicina', name: 'Biomedicina', creditValue: 1502.39 },
  { id: 'direito', name: 'Direito', creditValue: 1276.70 },
  { id: 'enfermagem', name: 'Enfermagem', creditValue: 892.70 },
  { id: 'engenharias', name: 'Engenharias', creditValue: 1477.45 },
  { id: 'gestao-rh', name: 'Gestão de Recursos Humanos', creditValue: 604.30 },
  { id: 'marketing', name: 'Marketing', creditValue: 604.30 },
  { id: 'processos-gerenciais', name: 'Processos Gerenciais', creditValue: 604.30 },
  { id: 'psicologia', name: 'Psicologia', creditValue: 1476.04 },
].sort((a, b) => a.name.localeCompare(b.name));
