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
    vestibular: number;
    transferencia: number;
    seJoga: number;
    convenio: number;
    imperdivel: number;
  };
  notes?: string;
}

export const NH_COURSES: Course[] = [
  { id: 'administracao', name: 'Administração', creditValue: 1248.07, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 599, installments: 60 } } },
  { id: 'ads', name: 'Análise e Desenvolvimento de Sistemas', creditValue: 1229.41, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 749, installments: 42 } } },
  { id: 'arquitetura', name: 'Arquitetura e Urbanismo', creditValue: 1718.85, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 699, installments: 72 } } },
  { id: 'biomedicina', name: 'Biomedicina', creditValue: 1502.39, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [0, 0], convenio: 50, imperdivel: { value: 599, installments: 72 } } },
  { id: 'direito', name: 'Direito', creditValue: 1276.70, discounts: { vestibular: [20, 30], transferencia: [25, 35], seJoga: [0, 0], convenio: 60 } },
  { id: 'enfermagem', name: 'Enfermagem', creditValue: 892.70, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [0, 0], convenio: 40, imperdivel: { value: 599, installments: 72 } } },
  { id: 'engenharias', name: 'Engenharias', creditValue: 1477.45, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 799, installments: 72 } } },
  { id: 'gestao-rh', name: 'Gestão de Recursos Humanos', creditValue: 604.30, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 309, installments: 36 } } },
  { id: 'marketing', name: 'Marketing', creditValue: 604.30, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 309, installments: 36 } } },
  { id: 'processos-gerenciais', name: 'Processos Gerenciais', creditValue: 604.30, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 309, installments: 36 } } },
  { id: 'psicologia', name: 'Psicologia', creditValue: 1476.04, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60 } },
].sort((a, b) => a.name.localeCompare(b.name));

export const CX_COURSES: Course[] = [
  { id: 'administracao', name: 'Administração', creditValue: 1020.31, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 599, installments: 60 } } },
  { id: 'agronomia', name: 'Agronomia', creditValue: 1502.39, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60 } },
  { id: 'ads', name: 'Análise e Desenvolvimento de Sistemas', creditValue: 1483.81, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 749, installments: 42 } } },
  { id: 'arquitetura', name: 'Arquitetura e Urbanismo', creditValue: 1718.85, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 699, installments: 72 } } },
  { id: 'biomedicina', name: 'Biomedicina', creditValue: 1502.39, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [0, 0], convenio: 50, imperdivel: { value: 599, installments: 72 } } },
  { id: 'ciencias-contabeis', name: 'Ciências Contábeis', creditValue: 1020.31, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60 } },
  { id: 'ciencias-computacao', name: 'Ciências da Computação', creditValue: 1718.85, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 799, installments: 72 } } },
  { id: 'comercio-exterior', name: 'Comércio Exterior', creditValue: 1020.31, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60 } },
  { id: 'design', name: 'Design', creditValue: 1557.98, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60 } },
  { id: 'direito', name: 'Direito', creditValue: 904.93, discounts: { vestibular: [20, 30], transferencia: [25, 35], seJoga: [0, 0], convenio: 60 } },
  { id: 'educacao-fisica', name: 'Educação Física', creditValue: 1062.75, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [0, 0], convenio: 40 } },
  { id: 'enfermagem', name: 'Enfermagem', creditValue: 1428.55, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [0, 0], convenio: 40, imperdivel: { value: 599, installments: 72 } } },
  { id: 'engenharia-civil', name: 'Engenharia Civil', creditValue: 1718.85, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 799, installments: 72 } } },
  { id: 'engenharia-computacao', name: 'Engenharia da Computação', creditValue: 1718.85, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 799, installments: 72 } } },
  { id: 'engenharia-producao', name: 'Engenharia de Produção', creditValue: 1718.85, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 799, installments: 72 } } },
  { id: 'engenharia-eletrica', name: 'Engenharia Elétrica', creditValue: 1718.85, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 799, installments: 72 } } },
  { id: 'engenharia-mecanica', name: 'Engenharia Mecânica', creditValue: 1718.85, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 799, installments: 72 } } },
  { id: 'engenharia-mecatronica', name: 'Engenharia Mecatrônica', creditValue: 1718.85, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 799, installments: 72 } } },
  { id: 'estetica-cosmetica', name: 'Estética e Cosmética', creditValue: 1020.31, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [0, 0], convenio: 50 } },
  { id: 'fisioterapia', name: 'Fisioterapia', creditValue: 1502.39, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [0, 0], convenio: 50, imperdivel: { value: 599, installments: 72 } } },
  { id: 'gastronomia', name: 'Gastronomia', creditValue: 1855.04, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60 } },
  { id: 'medicina-veterinaria', name: 'Medicina Veterinária', creditValue: 2056.01, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [0, 0], convenio: 50 } },
  { id: 'nutricao', name: 'Nutrição', creditValue: 1596.92, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [0, 0], convenio: 50 } },
  { id: 'processos-gerenciais', name: 'Processos Gerenciais', creditValue: 1020.31, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 309, installments: 36 } } },
  { id: 'psicologia', name: 'Psicologia', creditValue: 1476.04, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60 } },
].sort((a, b) => a.name.localeCompare(b.name));

export const BG_COURSES: Course[] = [
  { id: 'ads', name: 'Análise e Desenvolvimento de Sistemas', creditValue: 1265.23, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 749, installments: 42 } } },
  { id: 'administracao', name: 'Administração', creditValue: 1137.17, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 599, installments: 60 } } },
  { id: 'arquitetura', name: 'Arquitetura e Urbanismo', creditValue: 1477.45, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 699, installments: 72 } } },
  { id: 'biomedicina', name: 'Biomedicina', creditValue: 1502.39, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [0, 0], convenio: 50, imperdivel: { value: 599, installments: 72 } } },
  { id: 'ciencias-contabeis', name: 'Ciências Contábeis', creditValue: 1020.36, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60 } },
  { id: 'enfermagem', name: 'Enfermagem', creditValue: 1415.91, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [0, 0], convenio: 40, imperdivel: { value: 599, installments: 72 } } },
  { id: 'engenharia-civil', name: 'Engenharia Civil', creditValue: 1477.45, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 799, installments: 72 } } },
  { id: 'engenharia-producao', name: 'Engenharia de Produção', creditValue: 1477.45, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 799, installments: 72 } } },
  { id: 'engenharia-eletrica', name: 'Engenharia Elétrica', creditValue: 1477.45, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 799, installments: 72 } } },
  { id: 'engenharia-mecanica', name: 'Engenharia Mecânica', creditValue: 1477.45, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 799, installments: 72 } } },
  { id: 'fisioterapia', name: 'Fisioterapia', creditValue: 1502.39, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [0, 0], convenio: 50, imperdivel: { value: 599, installments: 72 } } },
  { id: 'odontologia', name: 'Odontologia', creditValue: 2202.21, discounts: { vestibular: [40, 55], transferencia: [45, 60], seJoga: [0, 0], convenio: 50 } },
  { id: 'processos-gerenciais', name: 'Processos Gerenciais', creditValue: 1011.34, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 309, installments: 36 } } },
  { id: 'psicologia', name: 'Psicologia', creditValue: 1476.03, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60 } },
  { id: 'gestao-rh', name: 'Gestão de Recursos Humanos', creditValue: 1020.36, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 309, installments: 36 } } },
].sort((a, b) => a.name.localeCompare(b.name));

export const IBG_COURSES: Course[] = [
  { id: 'direito', name: 'Direito', creditValue: 1446.21, discounts: { vestibular: [20, 30], transferencia: [25, 35], seJoga: [0, 0], convenio: 60 } },
  { id: 'psicologia', name: 'Psicologia', creditValue: 1546.34, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60 } },
].sort((a, b) => a.name.localeCompare(b.name));

export const POA_COURSES: Course[] = [
  { id: 'ads', name: 'Análise e Desenvolvimento de Sistemas', creditValue: 1265.23, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 749, installments: 42 } } },
  { id: 'arquitetura', name: 'Arquitetura e Urbanismo', creditValue: 1477.45, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 699, installments: 72 } } },
  { id: 'direito', name: 'Direito', creditValue: 1447.82, discounts: { vestibular: [20, 30], transferencia: [25, 35], seJoga: [0, 0], convenio: 60 } },
  { id: 'engenharia-civil', name: 'Engenharia Civil', creditValue: 1477.45, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 799, installments: 72 } } },
  { id: 'engenharia-computacao', name: 'Engenharia da Computação', creditValue: 1477.45, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 799, installments: 72 } } },
  { id: 'engenharia-producao', name: 'Engenharia de Produção', creditValue: 1477.45, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 799, installments: 72 } } },
  { id: 'engenharia-eletrica', name: 'Engenharia Elétrica', creditValue: 1477.45, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 799, installments: 72 } } },
  { id: 'engenharia-mecanica', name: 'Engenharia Mecânica', creditValue: 1477.45, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 799, installments: 72 } } },
  { id: 'engenharia-mecatronica', name: 'Engenharia Mecatrônica', creditValue: 1477.45, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60, imperdivel: { value: 799, installments: 72 } } },
  { id: 'psicologia', name: 'Psicologia', creditValue: 1476.04, discounts: { vestibular: [50, 65], transferencia: [55, 70], seJoga: [0, 0], convenio: 60 } },
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
  { id: 'ead-adm', name: 'Administração', monthlyValue: 743.00, installments: 48, imperdivelInstallments: 60, discounts: { vestibular: 65, transferencia: 70, seJoga: 80, convenio: 65, imperdivel: 74.56 }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'semi-adm', name: 'Administração - SEMIPRESENCIAL', monthlyValue: 606.77, installments: 48, discounts: { vestibular: 10, transferencia: 10, seJoga: 10, convenio: 18, imperdivel: 0 } },
  { id: 'ead-ads', name: 'Análise e Desenvolvimento de Sistemas', monthlyValue: 743.00, installments: 30, imperdivelInstallments: 36, discounts: { vestibular: 65, transferencia: 70, seJoga: 80, convenio: 65, imperdivel: 73.35 }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-ciencias-aero', name: 'Ciências Aeronáuticas - Live', monthlyValue: 1656.00, installments: 42, imperdivelInstallments: 50, discounts: { vestibular: 60, transferencia: 65, seJoga: 80, convenio: 60, imperdivel: 68.61 }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-ciencias-contab', name: 'Ciências Contábeis', monthlyValue: 743.00, installments: 48, imperdivelInstallments: 60, discounts: { vestibular: 65, transferencia: 70, seJoga: 80, convenio: 65, imperdivel: 74.56 }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'semi-ciencias-contab', name: 'Ciências Contábeis - SEMIPRESENCIAL', monthlyValue: 606.77, installments: 48, discounts: { vestibular: 10, transferencia: 10, seJoga: 10, convenio: 18, imperdivel: 0 } },
  { id: 'semi-eng-civil', name: 'Engenharia Civil - SEMIPRESENCIAL', monthlyValue: 698.00, installments: 60, discounts: { vestibular: 10, transferencia: 10, seJoga: 10, convenio: 18, imperdivel: 0 } },
  { id: 'semi-eng-comp', name: 'Engenharia da Computação - SEMIPRESENCIAL', monthlyValue: 698.00, installments: 60, discounts: { vestibular: 10, transferencia: 10, seJoga: 10, convenio: 18, imperdivel: 0 } },
  { id: 'semi-eng-eletrica', name: 'Engenharia Elétrica - SEMIPRESENCIAL', monthlyValue: 698.00, installments: 60, discounts: { vestibular: 10, transferencia: 10, seJoga: 10, convenio: 18, imperdivel: 0 } },
  { id: 'semi-eng-mecanica', name: 'Engenharia Mecânica - SEMIPRESENCIAL', monthlyValue: 698.00, installments: 60, discounts: { vestibular: 10, transferencia: 10, seJoga: 10, convenio: 18, imperdivel: 0 } },
  { id: 'semi-eng-producao', name: 'Engenharia da Produção - SEMIPRESENCIAL', monthlyValue: 698.00, installments: 60, discounts: { vestibular: 10, transferencia: 10, seJoga: 10, convenio: 18, imperdivel: 0 } },
  { id: 'ead-gestao-ti', name: 'Gestão da Tecnologia da Informação', monthlyValue: 743.00, installments: 30, imperdivelInstallments: 36, discounts: { vestibular: 65, transferencia: 70, seJoga: 80, convenio: 65, imperdivel: 73.35 }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-gestao-qualidade', name: 'Gestão da Qualidade', monthlyValue: 743.00, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: 65, transferencia: 70, seJoga: 80, convenio: 65, imperdivel: 74.43 }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-gestao-financeira', name: 'Gestão Financeira', monthlyValue: 743.00, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: 65, transferencia: 70, seJoga: 80, convenio: 65, imperdivel: 77.25 }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-pedagogia-semi', name: 'Pedagogia SEMIPRESENCIAL', monthlyValue: 499.00, installments: 48, discounts: { vestibular: 10, transferencia: 10, seJoga: 10, convenio: 18, imperdivel: 0 } },
  { id: 'ead-gestao-comercial', name: 'Gestão Comercial', monthlyValue: 743.00, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: 65, transferencia: 70, seJoga: 80, convenio: 65, imperdivel: 77.25 }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-producao-ind', name: 'Gestão da Produção Industrial', monthlyValue: 743.00, installments: 36, imperdivelInstallments: 40, discounts: { vestibular: 65, transferencia: 70, seJoga: 80, convenio: 65, imperdivel: 70.40 }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-rh', name: 'Gestão de Recursos Humanos', monthlyValue: 743.00, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: 65, transferencia: 70, seJoga: 80, convenio: 65, imperdivel: 77.25 }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-logistica', name: 'Logística', monthlyValue: 743.00, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: 65, transferencia: 70, seJoga: 80, convenio: 65, imperdivel: 77.25 }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-marketing', name: 'Marketing', monthlyValue: 743.00, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: 65, transferencia: 70, seJoga: 80, convenio: 65, imperdivel: 77.25 }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-processos-gerenciais', name: 'Processos Gerenciais', monthlyValue: 743.00, installments: 24, imperdivelInstallments: 30, discounts: { vestibular: 65, transferencia: 70, seJoga: 80, convenio: 65, imperdivel: 77.25 }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-redes', name: 'Rede de Computadores', monthlyValue: 816.00, installments: 30, imperdivelInstallments: 36, discounts: { vestibular: 65, transferencia: 70, seJoga: 80, convenio: 65, imperdivel: 75.74 }, notes: 'Com reajuste anual na campanha Imperdível' },
  { id: 'ead-seguranca-info', name: 'Segurança da Informação', monthlyValue: 743.00, installments: 30, imperdivelInstallments: 36, discounts: { vestibular: 65, transferencia: 70, seJoga: 80, convenio: 65, imperdivel: 73.35 }, notes: 'Com reajuste anual na campanha Imperdível' },
].sort((a, b) => a.name.localeCompare(b.name));
