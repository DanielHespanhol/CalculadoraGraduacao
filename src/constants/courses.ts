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
  };
  notes?: string;
}

// ============ CX - Caxias ============
export const CX_COURSES: Course[] = [
  { id: 'administracao', name: 'Administração', creditValue: 1020.31, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 802.98, installments: 60 } } },
  { id: 'agronomia', name: 'Agronomia', creditValue: 1251.995, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1149.33, installments: 72 } } },
  { id: 'ads', name: 'Análise e Desenvolvimento de Sistemas', creditValue: 1589.80, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1116.99, installments: 42 } } },
  { id: 'arquitetura', name: 'Arquitetura e Urbanismo', creditValue: 1790.47, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1357.17, installments: 72 } } },
  { id: 'biomedicina', name: 'Biomedicina', creditValue: 1502.39, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 50 } },
  { id: 'ciencias-contabeis', name: 'Ciências Contábeis', creditValue: 1020.31, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 802.98, installments: 60 } } },
  { id: 'ciencias-computacao', name: 'Ciências da Computação', creditValue: 1790.47, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1357.17, installments: 72 } } },
  { id: 'comercio-exterior', name: 'Comércio Exterior', creditValue: 2040.625, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1007.25, installments: 30 } } },
  { id: 'design', name: 'Design', creditValue: 1669.265, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1182.84, installments: 42 } } },
  { id: 'direito', name: 'Direito', creditValue: 904.93, discounts: { vestibular: [20, 40], transferencia: [30, 45], seJoga: [50, 60], convenio: 40 } },
  { id: 'educacao-fisica', name: 'Educação Física', creditValue: 1062.75, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 60, imperdivel: { value: 911.62, installments: 60 } } },
  { id: 'enfermagem', name: 'Enfermagem', creditValue: 1488.075, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 50, imperdivel: { value: 1146.71, installments: 72 } } },
  { id: 'engenharia-civil', name: 'Engenharia Civil', creditValue: 1790.47, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1357.17, installments: 72 } } },
  { id: 'engenharia-computacao', name: 'Engenharia da Computação', creditValue: 1718.85, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'engenharia-producao', name: 'Engenharia de Produção', creditValue: 1718.85, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'engenharia-eletrica', name: 'Engenharia Elétrica', creditValue: 1718.85, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'engenharia-mecanica', name: 'Engenharia Mecânica', creditValue: 1718.85, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'engenharia-mecatronica', name: 'Engenharia Mecatrônica', creditValue: 1718.85, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'estetica-cosmetica', name: 'Estética e Cosmética', creditValue: 1020.31, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 60 } },
  { id: 'fisioterapia', name: 'Fisioterapia', creditValue: 1564.99, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 50, imperdivel: { value: 1161.84, installments: 72 } } },
  { id: 'gastronomia', name: 'Gastronomia', creditValue: 1855.04, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 50 } },
  { id: 'medicina-veterinaria', name: 'Medicina Veterinária', creditValue: 2056.01, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 50 } },
  { id: 'nutricao', name: 'Nutrição', creditValue: 1596.92, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1148.55, installments: 60 } } },
  { id: 'processos-gerenciais', name: 'Processos Gerenciais', creditValue: 1020.31, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'psicologia', name: 'Psicologia', creditValue: 1476.04, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 50 } },
].sort((a, b) => a.name.localeCompare(b.name));

// ============ BG - Bento Gonçalves ============
export const BG_COURSES: Course[] = [
  { id: 'administracao', name: 'Administração', creditValue: 1137.17, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 826.49, installments: 60 } } },
  { id: 'ads', name: 'Análise e Desenvolvimento de Sistemas', creditValue: 1355.605, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 50, imperdivel: { value: 1070.11, installments: 42 } } },
  { id: 'arquitetura', name: 'Arquitetura e Urbanismo', creditValue: 1477.45, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 50 } },
  { id: 'biomedicina', name: 'Biomedicina', creditValue: 1502.39, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 50 } },
  { id: 'ciencias-contabeis', name: 'Ciências Contábeis', creditValue: 1020.36, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 803.02, installments: 60 } } },
  { id: 'enfermagem', name: 'Enfermagem', creditValue: 1415.91, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 50 } },
  { id: 'engenharia-civil', name: 'Engenharia Civil', creditValue: 1477.45, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'engenharia-eletrica', name: 'Engenharia Elétrica', creditValue: 1477.45, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'engenharia-mecanica', name: 'Engenharia Mecânica', creditValue: 1477.45, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 60 } },
  { id: 'engenharia-producao', name: 'Engenharia de Produção', creditValue: 1477.45, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'fisioterapia', name: 'Fisioterapia', creditValue: 1502.39, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 50 } },
  { id: 'gestao-rh', name: 'Gestão de Recursos Humanos', creditValue: 850.30, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 769.01, installments: 36 } } },
  { id: 'odontologia', name: 'Odontologia', creditValue: 2202.21, discounts: { vestibular: [20, 40], transferencia: [30, 45], seJoga: [50, 60], convenio: 40 } },
  { id: 'processos-gerenciais', name: 'Processos Gerenciais', creditValue: 1011.34, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
  { id: 'psicologia', name: 'Psicologia', creditValue: 1476.03, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 50 } },
].sort((a, b) => a.name.localeCompare(b.name));

// ============ NH - Novo Hamburgo ============
export const NH_COURSES: Course[] = [
  { id: 'administracao', name: 'Administração', creditValue: 1248.07, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 848.68, installments: 60 } } },
  { id: 'ads', name: 'Análise e Desenvolvimento de Sistemas', creditValue: 1317.225, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1012.41, installments: 42 } } },
  { id: 'arquitetura', name: 'Arquitetura e Urbanismo', creditValue: 1790.47, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1057.09, installments: 72 } } },
  { id: 'biomedicina', name: 'Biomedicina', creditValue: 1502.39, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 50, imperdivel: { value: 899.33, installments: 60 } } },
  { id: 'direito', name: 'Direito', creditValue: 1276.70, discounts: { vestibular: [10, 20], transferencia: [15, 25], seJoga: [25, 35], convenio: 60 } },
  { id: 'enfermagem', name: 'Enfermagem', creditValue: 892.70, discounts: { vestibular: [30, 45], transferencia: [35, 50], seJoga: [50, 60], convenio: 40, imperdivel: { value: 785.44, installments: 72 } } },
  { id: 'engenharia-civil', name: 'Engenharia Civil', creditValue: 1539.015, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1106.85, installments: 72 } } },
  { id: 'engenharia-mecanica', name: 'Engenharia Mecânica', creditValue: 1539.015, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 799.05, installments: 72 } } },
  { id: 'gestao-rh', name: 'Gestão de Recursos Humanos', creditValue: 604.90, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [0, 0], convenio: 60, imperdivel: { value: 409.70, installments: 36 } } },
  { id: 'marketing', name: 'Marketing', creditValue: 604.90, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [0, 0], convenio: 60, imperdivel: { value: 409.70, installments: 36 } } },
  { id: 'processos-gerenciais', name: 'Processos Gerenciais', creditValue: 604.90, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 409.70, installments: 36 } } },
  { id: 'psicologia', name: 'Psicologia', creditValue: 1476.04, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60 } },
].sort((a, b) => a.name.localeCompare(b.name));

// ============ IBG - Ibegen ============
export const IBG_COURSES: Course[] = [
  { id: 'direito', name: 'Direito', creditValue: 1506.47, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 900.26, installments: 72 } } },
  { id: 'psicologia', name: 'Psicologia', creditValue: 1610.77, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 921.03, installments: 72 } } },
].sort((a, b) => a.name.localeCompare(b.name));

// ============ POA - Porto Alegre ZN ============
export const POA_COURSES: Course[] = [
  { id: 'ads', name: 'Análise e Desenvolvimento de Sistemas', creditValue: 1355.605, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 970.07, installments: 42 } } },
  { id: 'arquitetura', name: 'Arquitetura e Urbanismo', creditValue: 1539.015, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1006.82, installments: 72 } } },
  { id: 'direito', name: 'Direito', creditValue: 1508.145, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 900.66, installments: 72 } } },
  { id: 'engenharia-civil', name: 'Engenharia Civil', creditValue: 1539.015, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1006.82, installments: 72 } } },
  { id: 'engenharia-computacao', name: 'Engenharia da Computação', creditValue: 1539.015, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1006.82, installments: 72 } } },
  { id: 'engenharia-eletrica', name: 'Engenharia Elétrica', creditValue: 1539.015, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1006.82, installments: 72 } } },
  { id: 'engenharia-mecanica', name: 'Engenharia Mecânica', creditValue: 1539.015, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1006.82, installments: 72 } } },
  { id: 'engenharia-mecatronica', name: 'Engenharia Mecatrônica', creditValue: 1539.015, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1006.82, installments: 72 } } },
  { id: 'engenharia-producao', name: 'Engenharia de Produção', creditValue: 1539.015, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 1006.82, installments: 72 } } },
  { id: 'psicologia', name: 'Psicologia', creditValue: 1537.54, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [50, 60], convenio: 60, imperdivel: { value: 906.53, installments: 72 } } },
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
  { id: 'ead-adm', name: 'Administração', monthlyValue: 743.00, installments: 48, imperdivelInstallments: 60, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [64.44, 64.44, 64.44] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'semi-adm', name: 'Administração - SEMIPRESENCIAL', monthlyValue: 606.77, installments: 48, discounts: { vestibular: [10, 10, 10], transferencia: [10, 10, 10], seJoga: [10, 10, 10], convenio: [18, 18, 18], imperdivel: [0, 0, 0] } },
  { id: 'ead-ads', name: 'Análise e Desenvolvimento de Sistemas', monthlyValue: 743.00, installments: 30, imperdivelInstallments: 36, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [63.35, 63.35, 63.35] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-ciencias-aero', name: 'Ciências Aeronáuticas - Live', monthlyValue: 1656.00, installments: 42, imperdivelInstallments: 50, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [58.61, 58.61, 58.61] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-ciencias-contab', name: 'Ciências Contábeis', monthlyValue: 743.00, installments: 48, imperdivelInstallments: 60, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [64.56, 64.56, 64.56] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'semi-ciencias-contab', name: 'Ciências Contábeis - SEMIPRESENCIAL', monthlyValue: 606.77, installments: 48, discounts: { vestibular: [10, 10, 10], transferencia: [10, 10, 10], seJoga: [10, 10, 10], convenio: [18, 18, 18], imperdivel: [0, 0, 0] } },
  { id: 'semi-eng-civil', name: 'Engenharia Civil - SEMIPRESENCIAL', monthlyValue: 698.00, installments: 60, discounts: { vestibular: [10, 10, 10], transferencia: [10, 10, 10], seJoga: [10, 10, 10], convenio: [18, 18, 18], imperdivel: [0, 0, 0] } },
  { id: 'semi-eng-comp', name: 'Engenharia da Computação - SEMIPRESENCIAL', monthlyValue: 698.00, installments: 60, discounts: { vestibular: [10, 10, 10], transferencia: [10, 10, 10], seJoga: [10, 10, 10], convenio: [18, 18, 18], imperdivel: [0, 0, 0] } },
  { id: 'semi-eng-eletrica', name: 'Engenharia Elétrica - SEMIPRESENCIAL', monthlyValue: 698.00, installments: 60, discounts: { vestibular: [10, 10, 10], transferencia: [10, 10, 10], seJoga: [10, 10, 10], convenio: [18, 18, 18], imperdivel: [0, 0, 0] } },
  { id: 'semi-eng-mecanica', name: 'Engenharia Mecânica - SEMIPRESENCIAL', monthlyValue: 698.00, installments: 60, discounts: { vestibular: [10, 10, 10], transferencia: [10, 10, 10], seJoga: [10, 10, 10], convenio: [18, 18, 18], imperdivel: [0, 0, 0] } },
  { id: 'semi-eng-producao', name: 'Engenharia da Produção - SEMIPRESENCIAL', monthlyValue: 698.00, installments: 60, discounts: { vestibular: [10, 10, 10], transferencia: [10, 10, 10], seJoga: [10, 10, 10], convenio: [18, 18, 18], imperdivel: [0, 0, 0] } },
  { id: 'ead-gestao-ti', name: 'Gestão da Tecnologia da Informação', monthlyValue: 743.00, installments: 30, imperdivelInstallments: 36, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [63.35, 63.35, 63.35] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-gestao-qualidade', name: 'Gestão da Qualidade', monthlyValue: 743.00, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [64.44, 64.44, 64.44] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-gestao-financeira', name: 'Gestão Financeira', monthlyValue: 743.00, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [67.25, 67.25, 67.25] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-pedagogia-semi', name: 'Pedagogia SEMIPRESENCIAL', monthlyValue: 499.00, installments: 48, discounts: { vestibular: [10, 10, 10], transferencia: [10, 10, 10], seJoga: [10, 10, 10], convenio: [18, 18, 18], imperdivel: [0, 0, 0] } },
  { id: 'ead-gestao-comercial', name: 'Gestão Comercial', monthlyValue: 743.00, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [67.25, 67.25, 67.25] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-producao-ind', name: 'Gestão da Produção Industrial', monthlyValue: 743.00, installments: 36, imperdivelInstallments: 40, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [60.40, 60.40, 60.40] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-rh', name: 'Gestão de Recursos Humanos', monthlyValue: 743.00, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [67.25, 67.25, 67.25] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-logistica', name: 'Logística', monthlyValue: 743.00, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [67.25, 67.25, 67.25] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-marketing', name: 'Marketing', monthlyValue: 743.00, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [67.25, 67.25, 67.25] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-processos-gerenciais', name: 'Processos Gerenciais', monthlyValue: 743.00, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [67.25, 67.25, 67.25] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-redes', name: 'Rede de Computadores', monthlyValue: 816.00, installments: 30, imperdivelInstallments: 36, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [65.74, 65.74, 65.74] }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-seguranca-info', name: 'Segurança da Informação', monthlyValue: 743.00, installments: 30, imperdivelInstallments: 36, discounts: { vestibular: [50, 50, 50], transferencia: [50, 50, 50], seJoga: [80, 80, 80], convenio: [65, 65, 65], imperdivel: [63.35, 63.35, 63.35] }, notes: 'Com reajuste anual na campanha Imperdível' },
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
          { parcelas: 1, valorParcela: 2288.92, valorTotal: 2288.92 },
          { parcelas: 6, valorParcela: 403.58, valorTotal: 2421.47 },
          { parcelas: 12, valorParcela: 213.00, valorTotal: 2556.00 },
          { parcelas: 18, valorParcela: 152.59, valorTotal: 2746.65 },
        ]
      },
      {
        polo: 'Caxias do Sul',
        options: [
          { parcelas: 1, valorParcela: 2288.92, valorTotal: 2288.92 },
          { parcelas: 6, valorParcela: 403.58, valorTotal: 2421.47 },
          { parcelas: 12, valorParcela: 213.00, valorTotal: 2556.00 },
          { parcelas: 18, valorParcela: 152.59, valorTotal: 2746.65 },
        ]
      },
      {
        polo: 'Novo Hamburgo',
        options: [
          { parcelas: 1, valorParcela: 2288.92, valorTotal: 2288.92 },
          { parcelas: 6, valorParcela: 403.58, valorTotal: 2421.47 },
          { parcelas: 12, valorParcela: 213.00, valorTotal: 2556.00 },
          { parcelas: 18, valorParcela: 152.59, valorTotal: 2746.65 },
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
          { parcelas: 1, valorParcela: 2288.92, valorTotal: 2288.92 },
          { parcelas: 6, valorParcela: 403.58, valorTotal: 2421.47 },
          { parcelas: 12, valorParcela: 213.00, valorTotal: 2556.00 },
          { parcelas: 18, valorParcela: 152.59, valorTotal: 2746.65 },
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
          { parcelas: 1, valorParcela: 3090.06, valorTotal: 3090.06 },
          { parcelas: 6, valorParcela: 545.87, valorTotal: 3275.21 },
          { parcelas: 12, valorParcela: 289.33, valorTotal: 3471.92 },
          { parcelas: 18, valorParcela: 206.39, valorTotal: 3715.02 },
        ]
      },
      {
        polo: 'Caxias do Sul',
        options: [
          { parcelas: 1, valorParcela: 3090.06, valorTotal: 3090.06 },
          { parcelas: 6, valorParcela: 545.87, valorTotal: 3275.21 },
          { parcelas: 12, valorParcela: 289.33, valorTotal: 3471.92 },
          { parcelas: 18, valorParcela: 206.39, valorTotal: 3715.02 },
        ]
      },
      {
        polo: 'Novo Hamburgo',
        options: [
          { parcelas: 1, valorParcela: 3090.06, valorTotal: 3090.06 },
          { parcelas: 6, valorParcela: 545.87, valorTotal: 3275.21 },
          { parcelas: 12, valorParcela: 289.33, valorTotal: 3471.92 },
          { parcelas: 18, valorParcela: 206.39, valorTotal: 3715.02 },
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
          { parcelas: 1, valorParcela: 10261.44, valorTotal: 10261.44 },
          { parcelas: 6, valorParcela: 1995.28, valorTotal: 11971.68 },
          { parcelas: 12, valorParcela: 1140.16, valorTotal: 13681.92 },
          { parcelas: 18, valorParcela: 807.63, valorTotal: 14537.37 },
          { parcelas: 24, valorParcela: 655.59, valorTotal: 15734.20 },
          { parcelas: 30, valorParcela: 570.08, valorTotal: 17102.40 },
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
          { parcelas: 1, valorParcela: 8170.04, valorTotal: 8170.04 },
          { parcelas: 6, valorParcela: 1588.62, valorTotal: 9531.71 },
          { parcelas: 12, valorParcela: 907.78, valorTotal: 10893.38 },
          { parcelas: 18, valorParcela: 643.01, valorTotal: 11574.22 },
          { parcelas: 24, valorParcela: 524.16, valorTotal: 12579.84 },
          { parcelas: 30, valorParcela: 453.89, valorTotal: 13616.73 },
        ]
      },
      {
        polo: 'Bento Gonçalves',
        options: [
          { parcelas: 1, valorParcela: 8170.04, valorTotal: 8170.04 },
          { parcelas: 6, valorParcela: 1588.62, valorTotal: 9531.71 },
          { parcelas: 12, valorParcela: 907.78, valorTotal: 10893.38 },
          { parcelas: 18, valorParcela: 643.01, valorTotal: 11574.22 },
          { parcelas: 24, valorParcela: 524.16, valorTotal: 12579.84 },
          { parcelas: 30, valorParcela: 453.89, valorTotal: 13616.73 },
        ]
      },
      {
        polo: 'Caxias do Sul',
        options: [
          { parcelas: 1, valorParcela: 8170.04, valorTotal: 8170.04 },
          { parcelas: 6, valorParcela: 1588.62, valorTotal: 9531.71 },
          { parcelas: 12, valorParcela: 907.78, valorTotal: 10893.38 },
          { parcelas: 18, valorParcela: 643.01, valorTotal: 11574.22 },
          { parcelas: 24, valorParcela: 524.16, valorTotal: 12579.84 },
          { parcelas: 30, valorParcela: 453.89, valorTotal: 13616.73 },
        ]
      }
    ]
  },
].sort((a, b) => a.name.localeCompare(b.name)) as TecnicoCourse[];
