export interface Course {
  id: string;
  name: string;
  creditValue: number; // For 20 hours (Presencial)
  discounts: {
    vestibular: number[];
    transferencia: number[];
    seJoga: number[];
    convenio: number;
    imperdivel?: {
      value: number;
      installments: number;
    };
  };
}

export interface EADCourse {
  id: string;
  name: string;
  monthlyValue: number;
  installments: number;
  imperdivelInstallments?: number;
  discounts: {
    vestibular: number[];  // [praça1, praça2, praça3]
    transferencia: number[];
    seJoga: number[];
    convenio: number[];
    imperdivel: number[];  // same for all praças since imperdivel fixed value doesn't change by praça
    eadPremia: number[];
  };
  notes?: string;
}

// ============ CX - Caxias ============
export const CX_COURSES: Course[] = [
  { id: 'administracao', name: 'Administração', creditValue: 1158.05185, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 802.98, installments: 60 } } },
  { id: 'agronomia', name: 'Agronomia', creditValue: 1705.21265, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1149.33, installments: 72 } } },
  { id: 'ads', name: 'Análise e Desenvolvimento de Sistemas', creditValue: 1684.12435, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1116.99, installments: 42 } } },
  { id: 'arquitetura', name: 'Arquitetura e Urbanismo', creditValue: 1950.89475, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1357.17, installments: 72 } } },
  { id: 'biomedicina', name: 'Biomedicina', creditValue: 1705.21265, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 50 } },
  { id: 'ciencias-contabeis', name: 'Ciências Contábeis', creditValue: 1158.05185, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 802.98, installments: 60 } } },
  { id: 'ciencias-computacao', name: 'Ciências da Computação', creditValue: 1950.89475, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1357.17, installments: 72 } } },
  { id: 'comercio-exterior', name: 'Comércio Exterior', creditValue: 1158.05185, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1007.25, installments: 30 } } },
  { id: 'design', name: 'Design', creditValue: 1768.3073, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1182.84, installments: 42 } } },
  { id: 'direito', name: 'Direito', creditValue: 1027.09555, discounts: { vestibular: [20, 40], transferencia: [30, 45], seJoga: [50, 60], convenio: 40 } },
  { id: 'educacao-fisica', name: 'Educação Física', creditValue: 1206.22125, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 60, imperdivel: { value: 911.62, installments: 60 } } },
  { id: 'enfermagem', name: 'Enfermagem', creditValue: 1621.40425, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 50, imperdivel: { value: 1146.71, installments: 72 } } },
  { id: 'engenharia-civil', name: 'Engenharia Civil', creditValue: 1950.89475, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1357.17, installments: 72 } } },
  { id: 'engenharia-computacao', name: 'Engenharia da Computação', creditValue: 1950.89475, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'engenharia-producao', name: 'Engenharia de Produção', creditValue: 1950.89475, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'engenharia-eletrica', name: 'Engenharia Elétrica', creditValue: 1950.89475, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'engenharia-mecanica', name: 'Engenharia Mecânica', creditValue: 1950.89475, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'engenharia-mecatronica', name: 'Engenharia Mecatrônica', creditValue: 1950.89475, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'estetica-cosmetica', name: 'Estética e Cosmética', creditValue: 1158.05185, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 60 } },
  { id: 'fisioterapia', name: 'Fisioterapia', creditValue: 1705.21265, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 50, imperdivel: { value: 1161.84, installments: 72 } } },
  { id: 'gastronomia', name: 'Gastronomia', creditValue: 2105.4704, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 50 } },
  { id: 'medicina-veterinaria', name: 'Medicina Veterinária', creditValue: 2333.57135, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 50 } },
  { id: 'nutricao', name: 'Nutrição', creditValue: 1812.5042, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1148.55, installments: 60 } } },
  { id: 'processos-gerenciais', name: 'Processos Gerenciais', creditValue: 1158.05185, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'psicologia', name: 'Psicologia', creditValue: 1675.3054, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 50 } },
].sort((a, b) => a.name.localeCompare(b.name));

// ============ BG - Bento Gonçalves ============
export const BG_COURSES: Course[] = [
  { id: 'administracao', name: 'Administração', creditValue: 1290.68795, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 826.49, installments: 60 } } },
  { id: 'ads', name: 'Análise e Desenvolvimento de Sistemas', creditValue: 1436.03605, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 50, imperdivel: { value: 1070.11, installments: 42 } } },
  { id: 'arquitetura', name: 'Arquitetura e Urbanismo', creditValue: 1676.90575, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 50 } },
  { id: 'biomedicina', name: 'Biomedicina', creditValue: 1705.21265, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 50 } },
  { id: 'ciencias-contabeis', name: 'Ciências Contábeis', creditValue: 1158.1086, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 803.02, installments: 60 } } },
  { id: 'enfermagem', name: 'Enfermagem', creditValue: 1607.0582910837, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 50 } },
  { id: 'engenharia-civil', name: 'Engenharia Civil', creditValue: 1676.90575, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'engenharia-eletrica', name: 'Engenharia Elétrica', creditValue: 1676.90575, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'engenharia-mecanica', name: 'Engenharia Mecânica', creditValue: 1676.90575, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 60 } },
  { id: 'engenharia-producao', name: 'Engenharia de Produção', creditValue: 1676.90575, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'fisioterapia', name: 'Fisioterapia', creditValue: 1705.21265, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 50 } },
  { id: 'gestao-rh', name: 'Gestão de Recursos Humanos', creditValue: 1158.1086, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 769.01, installments: 36 } } },
  { id: 'odontologia', name: 'Odontologia', creditValue: 2499.50835, discounts: { vestibular: [20, 40], transferencia: [30, 45], seJoga: [50, 60], convenio: 40 } },
  { id: 'processos-gerenciais', name: 'Processos Gerenciais', creditValue: 1147.8716718, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'psicologia', name: 'Psicologia', creditValue: 1675.29405, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 50 } },
].sort((a, b) => a.name.localeCompare(b.name));

// ============ NH - Novo Hamburgo ============
export const NH_COURSES: Course[] = [
  { id: 'administracao', name: 'Administração', creditValue: 1416.55945, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 848.68, installments: 60 } } },
  { id: 'ads', name: 'Análise e Desenvolvimento de Sistemas', creditValue: 1395.38035, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1012.41, installments: 42 } } },
  { id: 'arquitetura', name: 'Arquitetura e Urbanismo', creditValue: 1950.89475, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1057.09, installments: 72 } } },
  { id: 'biomedicina', name: 'Biomedicina', creditValue: 1705.21265, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 50, imperdivel: { value: 899.33, installments: 60 } } },
  { id: 'direito', name: 'Direito', creditValue: 1436.2241723047, discounts: { vestibular: [10, 20], transferencia: [15, 25], seJoga: [25, 35], convenio: 60 } },
  { id: 'enfermagem', name: 'Enfermagem', creditValue: 1013.2145, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 40, imperdivel: { value: 785.44, installments: 72 } } },
  { id: 'engenharia-civil', name: 'Engenharia Civil', creditValue: 1676.90575, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1106.85, installments: 72 } } },
  { id: 'engenharia-mecanica', name: 'Engenharia Mecânica', creditValue: 1676.90575, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 799.05, installments: 72 } } },
  { id: 'gestao-rh', name: 'Gestão de Recursos Humanos', creditValue: 685.8805, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [0, 0], convenio: 60, imperdivel: { value: 409.70, installments: 36 } } },
  { id: 'marketing', name: 'Marketing', creditValue: 685.8805, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [0, 0], convenio: 60, imperdivel: { value: 409.70, installments: 36 } } },
  { id: 'processos-gerenciais', name: 'Processos Gerenciais', creditValue: 685.8805, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 409.70, installments: 36 } } },
  { id: 'psicologia', name: 'Psicologia', creditValue: 1675.3054, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
].sort((a, b) => a.name.localeCompare(b.name));

// ============ IBG - Ibegen ============
export const IBG_COURSES: Course[] = [
  { id: 'direito', name: 'Direito', creditValue: 1641.44835, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 900.26, installments: 72 } } },
  { id: 'psicologia', name: 'Psicologia', creditValue: 1755.0959, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 921.03, installments: 72 } } },
].sort((a, b) => a.name.localeCompare(b.name));

// ============ POA - Porto Alegre ZN ============
export const POA_COURSES: Course[] = [
  { id: 'ads', name: 'Análise e Desenvolvimento de Sistemas', creditValue: 1436.03605, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 970.07, installments: 42 } } },
  { id: 'arquitetura', name: 'Arquitetura e Urbanismo', creditValue: 1676.90575, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1006.82, installments: 72 } } },
  { id: 'direito', name: 'Direito', creditValue: 1643.2757, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 900.66, installments: 72 } } },
  { id: 'engenharia-civil', name: 'Engenharia Civil', creditValue: 1676.90575, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1006.82, installments: 72 } } },
  { id: 'engenharia-computacao', name: 'Engenharia da Computação', creditValue: 1676.90575, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1006.82, installments: 72 } } },
  { id: 'engenharia-eletrica', name: 'Engenharia Elétrica', creditValue: 1676.90575, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1006.82, installments: 72 } } },
  { id: 'engenharia-mecanica', name: 'Engenharia Mecânica', creditValue: 1676.90575, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1006.82, installments: 72 } } },
  { id: 'engenharia-mecatronica', name: 'Engenharia Mecatrônica', creditValue: 1676.90575, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1006.82, installments: 72 } } },
  { id: 'engenharia-producao', name: 'Engenharia de Produção', creditValue: 1676.90575, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1006.82, installments: 72 } } },
  { id: 'psicologia', name: 'Psicologia', creditValue: 1675.3054, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 906.53, installments: 72 } } },
].sort((a, b) => a.name.localeCompare(b.name));

export const PRESENCIAL_COURSES_BY_CAMPUS: Record<string, Course[]> = {
  CX: CX_COURSES,
  BG: BG_COURSES,
  NH: NH_COURSES,
  IBG: IBG_COURSES,
  POA: POA_COURSES,
};

export const PRESENCIAL_COURSES = NH_COURSES;

export const EAD_COURSES: EADCourse[] = [
  { id: 'ead-adm', name: 'Administração', monthlyValue: 843.31, installments: 48, imperdivelInstallments: 60, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [64.44, 64.44, 64.44], eadPremia: [82.8, 82.8, 82.8] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-ads', name: 'Análise e Desenvolvimento de Sistemas', monthlyValue: 843.31, installments: 30, imperdivelInstallments: 36, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [63.35, 63.35, 63.35], eadPremia: [82.8, 82.8, 82.8] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-ciencias-aero', name: 'Ciências Aeronáuticas - Live', monthlyValue: 1879.56, installments: 42, imperdivelInstallments: 50, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [58.61, 58.61, 58.61], eadPremia: [80, 80, 80] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-ciencias-contab', name: 'Ciências Contábeis', monthlyValue: 843.31, installments: 48, imperdivelInstallments: 60, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [64.56, 64.56, 64.56], eadPremia: [82.8, 82.8, 82.8] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-gestao-ti', name: 'Gestão da Tecnologia da Informação', monthlyValue: 843.31, installments: 30, imperdivelInstallments: 36, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [63.35, 63.35, 63.35], eadPremia: [82.8, 82.8, 82.8] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-gestao-qualidade', name: 'Gestão da Qualidade', monthlyValue: 843.31, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [64.44, 64.44, 64.44], eadPremia: [82.8, 82.8, 82.8] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-gestao-financeira', name: 'Gestão Financeira', monthlyValue: 843.31, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [67.25, 67.25, 67.25], eadPremia: [82.8, 82.8, 82.8] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-gestao-comercial', name: 'Gestão Comercial', monthlyValue: 843.31, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [67.25, 67.25, 67.25], eadPremia: [82.8, 82.8, 82.8] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-producao-ind', name: 'Gestão da Produção Industrial', monthlyValue: 843.31, installments: 36, imperdivelInstallments: 40, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [60.40, 60.40, 60.40], eadPremia: [82.8, 82.8, 82.8] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-rh', name: 'Gestão de Recursos Humanos', monthlyValue: 843.31, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [67.25, 67.25, 67.25], eadPremia: [82.8, 82.8, 82.8] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-logistica', name: 'Logística', monthlyValue: 843.31, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [67.25, 67.25, 67.25], eadPremia: [82.8, 82.8, 82.8] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-marketing', name: 'Marketing', monthlyValue: 843.31, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [67.25, 67.25, 67.25], eadPremia: [82.8, 82.8, 82.8] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-processos-gerenciais', name: 'Processos Gerenciais', monthlyValue: 843.31, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [67.25, 67.25, 67.25], eadPremia: [82.8, 82.8, 82.8] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-redes', name: 'Rede de Computadores', monthlyValue: 926.16, installments: 30, imperdivelInstallments: 36, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [65.74, 65.74, 65.74], eadPremia: [84.34, 84.34, 84.34] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-seguranca-info', name: 'Segurança da Informação', monthlyValue: 843.31, installments: 30, imperdivelInstallments: 36, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [63.35, 63.35, 63.35], eadPremia: [82.8, 82.8, 82.8] }, notes: 'Com reajuste anual na campanha Imperdível' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface TecnicoPoloOption {
  parcelas: number;
  valorParcela: number;
  valorTotal: number;
}

export interface TecnicoCourse {
  id: string;
  name: string;
  modalidade: 'EAD' | 'Presencial';
  cargaHoraria: number;
  polos: {
    polo: string;
    options: TecnicoPoloOption[];
  }[];
  observacoes?: string;
}

export const TECNICO_COURSES = [
  {
    id: 'tec-adm',
    name: 'Administração',
    modalidade: 'EAD',
    cargaHoraria: 800,
    polos: [
      {
        polo: 'Bento Gonçalves',
        options: [
          { parcelas: 1, valorParcela: 2597.92, valorTotal: 2597.92 },
          { parcelas: 6, valorParcela: 458.06, valorTotal: 2748.36 },
          { parcelas: 12, valorParcela: 241.76, valorTotal: 2901.06 },
          { parcelas: 18, valorParcela: 173.19, valorTotal: 3117.44 },
        ]
      },
      {
        polo: 'Caxias do Sul',
        options: [
          { parcelas: 1, valorParcela: 2597.92, valorTotal: 2597.92 },
          { parcelas: 6, valorParcela: 458.06, valorTotal: 2748.36 },
          { parcelas: 12, valorParcela: 241.76, valorTotal: 2901.06 },
          { parcelas: 18, valorParcela: 173.19, valorTotal: 3117.44 },
        ]
      },
      {
        polo: 'Novo Hamburgo',
        options: [
          { parcelas: 1, valorParcela: 2597.92, valorTotal: 2597.92 },
          { parcelas: 6, valorParcela: 458.06, valorTotal: 2748.36 },
          { parcelas: 12, valorParcela: 241.76, valorTotal: 2901.06 },
          { parcelas: 18, valorParcela: 173.19, valorTotal: 3117.44 },
        ]
      }
    ]
  },
  {
    id: 'tec-logistica',
    name: 'Logística',
    modalidade: 'EAD',
    cargaHoraria: 800,
    observacoes: 'Liberado apenas para Caxias do Sul',
    polos: [
      {
        polo: 'Caxias do Sul',
        options: [
          { parcelas: 1, valorParcela: 2597.92, valorTotal: 2597.92 },
          { parcelas: 6, valorParcela: 458.06, valorTotal: 2748.36 },
          { parcelas: 12, valorParcela: 241.76, valorTotal: 2901.06 },
          { parcelas: 18, valorParcela: 173.19, valorTotal: 3117.44 },
        ]
      }
    ]
  },
  {
    id: 'tec-informatica',
    name: 'Informática',
    modalidade: 'EAD',
    cargaHoraria: 1200,
    polos: [
      {
        polo: 'Bento Gonçalves',
        options: [
          { parcelas: 1, valorParcela: 3507.21, valorTotal: 3507.21 },
          { parcelas: 6, valorParcela: 619.56, valorTotal: 3717.36 },
          { parcelas: 12, valorParcela: 328.39, valorTotal: 3940.62 },
          { parcelas: 18, valorParcela: 234.25, valorTotal: 4216.54 },
        ]
      },
      {
        polo: 'Caxias do Sul',
        options: [
          { parcelas: 1, valorParcela: 3507.21, valorTotal: 3507.21 },
          { parcelas: 6, valorParcela: 619.56, valorTotal: 3717.36 },
          { parcelas: 12, valorParcela: 328.39, valorTotal: 3940.62 },
          { parcelas: 18, valorParcela: 234.25, valorTotal: 4216.54 },
        ]
      },
      {
        polo: 'Novo Hamburgo',
        options: [
          { parcelas: 1, valorParcela: 3507.21, valorTotal: 3507.21 },
          { parcelas: 6, valorParcela: 619.56, valorTotal: 3717.36 },
          { parcelas: 12, valorParcela: 328.39, valorTotal: 3940.62 },
          { parcelas: 18, valorParcela: 234.25, valorTotal: 4216.54 },
        ]
      }
    ]
  },
  {
    id: 'tec-agropecuaria',
    name: 'Agropecuária',
    modalidade: 'Presencial',
    cargaHoraria: 1600,
    polos: [
      {
        polo: 'Caxias do Sul',
        options: [
          { parcelas: 1, valorParcela: 11646.73, valorTotal: 11646.73 },
          { parcelas: 6, valorParcela: 2264.64, valorTotal: 13587.85 },
          { parcelas: 12, valorParcela: 1294.08, valorTotal: 15528.97 },
          { parcelas: 18, valorParcela: 916.66, valorTotal: 16499.91 },
          { parcelas: 24, valorParcela: 727.07, valorTotal: 17449.71 },
          { parcelas: 30, valorParcela: 647.04, valorTotal: 19411.22 },
        ]
      }
    ]
  },
  {
    id: 'tec-enfermagem',
    name: 'Enfermagem',
    modalidade: 'Presencial',
    cargaHoraria: 1600,
    polos: [
      {
        polo: 'Novo Hamburgo',
        options: [
          { parcelas: 1, valorParcela: 9272.99, valorTotal: 9272.99 },
          { parcelas: 6, valorParcela: 1769.03, valorTotal: 10614.19 },
          { parcelas: 12, valorParcela: 1030.33, valorTotal: 12363.98 },
          { parcelas: 18, valorParcela: 729.82, valorTotal: 13136.73 },
          { parcelas: 24, valorParcela: 594.92, valorTotal: 14278.11 },
          { parcelas: 30, valorParcela: 515.17, valorTotal: 15454.98 },
          { parcelas: 42, valorParcela: 367.98, valorTotal: 15454.98 },
        ]
      },
      {
        polo: 'Bento Gonçalves',
        options: [
          { parcelas: 1, valorParcela: 9272.99, valorTotal: 9272.99 },
          { parcelas: 6, valorParcela: 1769.03, valorTotal: 10614.19 },
          { parcelas: 12, valorParcela: 1030.33, valorTotal: 12363.98 },
          { parcelas: 18, valorParcela: 729.82, valorTotal: 13136.73 },
          { parcelas: 24, valorParcela: 594.92, valorTotal: 14278.11 },
          { parcelas: 30, valorParcela: 515.17, valorTotal: 15454.98 },
          { parcelas: 42, valorParcela: 367.98, valorTotal: 15454.98 },
        ]
      },
      {
        polo: 'Caxias do Sul',
        options: [
          { parcelas: 1, valorParcela: 9272.99, valorTotal: 9272.99 },
          { parcelas: 6, valorParcela: 1769.03, valorTotal: 10614.19 },
          { parcelas: 12, valorParcela: 1030.33, valorTotal: 12363.98 },
          { parcelas: 18, valorParcela: 729.82, valorTotal: 13136.73 },
          { parcelas: 24, valorParcela: 594.92, valorTotal: 14278.11 },
          { parcelas: 30, valorParcela: 515.17, valorTotal: 15454.98 },
          { parcelas: 42, valorParcela: 367.98, valorTotal: 15454.98 },
        ]
      }
    ]
  },
  {
    id: 'tec-presencial',
    name: 'Técnico Presencial',
    modalidade: 'Presencial',
    cargaHoraria: 1200,
    observacoes: 'Liberado apenas para Caxias do Sul',
    polos: [
      {
        polo: 'Caxias do Sul',
        options: [
          { parcelas: 1, valorParcela: 8426.70, valorTotal: 8426.70 },
          { parcelas: 6, valorParcela: 1638.50, valorTotal: 9830.99 },
          { parcelas: 12, valorParcela: 936.28, valorTotal: 11235.39 },
          { parcelas: 18, valorParcela: 663.21, valorTotal: 11937.77 },
          { parcelas: 24, valorParcela: 585.18, valorTotal: 14044.37 },
        ]
      }
    ]
  },
].sort((a, b) => a.name.localeCompare(b.name)) as TecnicoCourse[];
