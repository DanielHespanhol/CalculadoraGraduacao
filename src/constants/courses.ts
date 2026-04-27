export interface Course {
  id: string;
  name: string;
  creditValue: number; // For 20 hours
  type: 'Graduação' | 'Tecnólogo' | 'EAD';
}

export const COURSES: Course[] = [
  { id: 'psicologia', name: 'Psicologia', creditValue: 1476.04, type: 'Graduação' },
  { id: 'engenharia', name: 'Engenharia', creditValue: 1477.45, type: 'Graduação' },
  { id: 'processos-gerenciais', name: 'Processos Gerenciais Novos', creditValue: 604.30, type: 'Graduação' },
  { id: 'arquitetura', name: 'Arquitetura e Urbanismo', creditValue: 1718.85, type: 'Graduação' },
  { id: 'biomedicina', name: 'Biomedicina', creditValue: 1502.39, type: 'Graduação' },
  { id: 'direito', name: 'Direito', creditValue: 1276.70, type: 'Graduação' },
  { id: 'administracao', name: 'Administração', creditValue: 1248.07, type: 'Graduação' },
  { id: 'enfermagem', name: 'Enfermagem', creditValue: 892.70, type: 'Graduação' },
  { id: 'ads', name: 'ADS', creditValue: 1229.41, type: 'Tecnólogo' },
  { id: 'ead', name: 'EAD', creditValue: 353.46, type: 'EAD' },
  { id: 'ead-eng-prod', name: 'EAD Eng. Produção', creditValue: 466.94, type: 'EAD' },
  { id: 'ead-semi', name: 'EAD Semi Presencial', creditValue: 389.81, type: 'EAD' },
];
