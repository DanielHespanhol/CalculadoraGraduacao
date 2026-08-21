import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calculator,
  GraduationCap,
  Clock,
  Percent,
  CreditCard,
  Download,
  TrendingUp,
  Monitor,
  Users,
  X,
  Printer,
  Layers,
  BookOpen
} from 'lucide-react';
import { PRESENCIAL_COURSES_BY_CAMPUS, EAD_COURSES, Course, EADCourse, TECNICO_COURSES, TecnicoCourse } from './constants/courses';

type TabType = 'presencial' | 'ead' | 'tecnicos';

const CAMPUS_LIST = [
  { id: 'CX', label: 'CX', fullName: 'Caxias' },
  { id: 'BG', label: 'BG', fullName: 'Bento Gonçalves' },
  { id: 'NH', label: 'NH', fullName: 'Novo Hamburgo' },
  { id: 'IBG', label: 'IBG', fullName: 'Ibegen' },
  { id: 'POA', label: 'POA', fullName: 'Porto Alegre ZN' },
] as const;

type CampusId = typeof CAMPUS_LIST[number]['id'];

const TECNICO_POLO_LIST = [
  { id: 'BG', label: 'BG', fullName: 'Bento Gonçalves' },
  { id: 'CX', label: 'CX', fullName: 'Caxias do Sul' },
  { id: 'NH', label: 'NH', fullName: 'Novo Hamburgo' },
] as const;

type TecnicoPoloId = typeof TECNICO_POLO_LIST[number]['id'];

const POLO_NAME_MAP: Record<string, string> = { 'BG': 'Bento Gonçalves', 'CX': 'Caxias do Sul', 'NH': 'Novo Hamburgo' };

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('presencial');
  const [selectedCampus, setSelectedCampus] = useState<CampusId>('NH');

  const currentPresencialCourses = useMemo(() => {
    return PRESENCIAL_COURSES_BY_CAMPUS[selectedCampus] || PRESENCIAL_COURSES_BY_CAMPUS['NH'];
  }, [selectedCampus]);

  // Presencial States
  const [selectedPCourseId, setSelectedPCourseId] = useState<string>(currentPresencialCourses[0]?.id || '');
  const [hours, setHours] = useState<number>(360);
  const [pDiscount, setPDiscount] = useState<number>(0);
  const [pInstallments, setPInstallments] = useState<number>(6);
  const [selectedPCampaign, setSelectedPCampaign] = useState<keyof Course['discounts'] | 'finalDeCiclo'>('vestibular');
  const [finalDeCicloMode, setFinalDeCicloMode] = useState<'vestibular' | 'transferencia'>('vestibular');
  const [selectedSemester, setSelectedSemester] = useState<'S1' | 'S2'>('S1');
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  // Técnicos States
  const [selectedTCourseId, setSelectedTCourseId] = useState<string>(TECNICO_COURSES[0].id);
  const [selectedTPolo, setSelectedTPolo] = useState<TecnicoPoloId>('BG');
  const [selectedTInstallments, setSelectedTInstallments] = useState<number>(12);
  const [tDiscount, setTDiscount] = useState<number>(0);

  const selectedTCourse = useMemo(() =>
    TECNICO_COURSES.find(c => c.id === selectedTCourseId) || TECNICO_COURSES[0],
    [selectedTCourseId]
  );

  // Get available polo options for the selected course
  const availableTPolos = useMemo(() => {
    return selectedTCourse.polos.map(p => p.polo);
  }, [selectedTCourse]);

  // Get installment options for selected course + polo
  const currentTInstallmentOptions = useMemo(() => {
    const poloData = selectedTCourse.polos.find(p => p.polo === POLO_NAME_MAP[selectedTPolo]);
    return poloData?.options || [];
  }, [selectedTCourse, selectedTPolo]);

  // Make sure selected installment is valid for current options
  const validTInstallments = useMemo(() => {
    const available = currentTInstallmentOptions.map(o => o.parcelas);
    if (available.length > 0 && !available.includes(selectedTInstallments)) {
      return available[0];
    }
    return selectedTInstallments;
  }, [currentTInstallmentOptions, selectedTInstallments]);

  const tecnicosResults = useMemo(() => {
    const option = currentTInstallmentOptions.find(o => o.parcelas === validTInstallments);
    const baseInstallment = option?.valorParcela || 0;
    const baseTotal = option?.valorTotal || 0;
    const discountAmount = baseTotal * (tDiscount / 100);
    const totalWithDiscount = baseTotal - discountAmount;
    const installmentWithDiscount = totalWithDiscount / validTInstallments;
    return {
      installmentValue: baseInstallment,
      totalValue: baseTotal,
      installments: validTInstallments,
      tDiscountPercent: tDiscount,
      discountAmount,
      totalWithDiscount,
      installmentWithDiscount
    };
  }, [currentTInstallmentOptions, validTInstallments, tDiscount]);

  // EAD States
  const [selectedECourseId, setSelectedECourseId] = useState<string>(EAD_COURSES[0].id);
  const [selectedPraca, setSelectedPraca] = useState<1 | 2 | 3>(1);
  const [selectedCampaign, setSelectedCampaign] = useState<keyof EADCourse['discounts']>('vestibular');
  const [eDiscount, setEDiscount] = useState<number>(EAD_COURSES[0].discounts.vestibular[0]);

  const selectedPCourse = useMemo(() =>
    currentPresencialCourses.find(c => c.id === selectedPCourseId) || currentPresencialCourses[0],
    [currentPresencialCourses, selectedPCourseId]
  );

  const handleCampusChange = (campusId: CampusId) => {
    setSelectedCampus(campusId);
    const courses = PRESENCIAL_COURSES_BY_CAMPUS[campusId] || [];
    if (courses.length > 0) {
      const firstCourse = courses[0];
      setSelectedPCourseId(firstCourse.id);
      updatePresencialDiscount(firstCourse, selectedPCampaign, hours);
    }
  };

  const selectedECourse = useMemo(() =>
    EAD_COURSES.find(c => c.id === selectedECourseId) || EAD_COURSES[0],
    [selectedECourseId]
  );

  const presencialResults = useMemo(() => {
    const pricePerHour = selectedPCourse.creditValue / 20;
    const totalSemester = pricePerHour * hours;

    let grossInstallment: number;
    let installmentWithDiscount: number;
    let totalWithDiscount: number;
    let discountAmountTotal: number;
    let discountPerInstallment: number;

    if (selectedPCampaign === 'imperdivel' && selectedPCourse.discounts.imperdivel) {
      // For "Imperdível", the installment is fixed at the campaign value.
      // We compare it against a standard 6-installment semester for clarity.
      installmentWithDiscount = selectedPCourse.discounts.imperdivel.value;
      grossInstallment = totalSemester / 6;
      discountPerInstallment = grossInstallment - installmentWithDiscount;
      totalWithDiscount = installmentWithDiscount * 6;
      discountAmountTotal = totalSemester - totalWithDiscount;
    } else {
      grossInstallment = totalSemester / pInstallments;
      discountAmountTotal = totalSemester * (pDiscount / 100);
      totalWithDiscount = totalSemester - discountAmountTotal;
      installmentWithDiscount = totalWithDiscount / pInstallments;
      discountPerInstallment = grossInstallment - installmentWithDiscount;
    }

    return {
      grossInstallment,
      discountPerInstallment,
      installmentWithDiscount,
      discountAmountTotal,
      totalWithDiscount,
    };
  }, [selectedPCourse, hours, pDiscount, pInstallments, selectedPCampaign]);

  const eadResults = useMemo(() => {
    const grossMonthly = selectedECourse.monthlyValue;
    const discountAmountTotal = grossMonthly * (eDiscount / 100);
    const monthlyWithDiscount = grossMonthly - discountAmountTotal;

    // Check if campaign has special installments
    const installmentsCount = (selectedCampaign === 'imperdivel' && selectedECourse.imperdivelInstallments)
      ? selectedECourse.imperdivelInstallments
      : selectedECourse.installments;

    const totalSemestral = monthlyWithDiscount * 6;

    return {
      grossMonthly,
      discountAmountTotal,
      monthlyWithDiscount,
      totalSemestral,
      installmentsCount
    };
  }, [selectedECourse, eDiscount, selectedCampaign]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const pCampaignLabels: Record<keyof Course['discounts'] | 'finalDeCiclo', string> = {
    finalDeCiclo: 'Final de Ciclo'
    vestibular: 'Vestibular com Bolsa',
    transferencia: 'Diplo / Transf / Reing',
    convenio: 'Convênio Empresa',
    imperdivel: 'Imperdível',
    seJoga: 'Se Joga'
  };

  const campaignOrder: (keyof Course['discounts'] | 'finalDeCiclo')[] = [
    'finalDeCiclo',
    'vestibular',
    'transferencia',
    'convenio',
    'imperdivel',
    'seJoga'
  ];

  const getCourseCluster = (course: Course): 1 | 2 | 3 | 4 => {
    const v = course.discounts.vestibular;
    if (v[0] === 10 && v[1] === 20) return 1;
    if (v[0] === 20 && v[1] === 40) return 2;
    if (v[0] === 30 && v[1] === 45) return 3;
    return 4; // default to 4
  };

  const getFinalDeCicloDiscount = (course: Course, semester: 'S1' | 'S2', mode: 'vestibular' | 'transferencia', currentHours: number): number => {
    const cluster = getCourseCluster(course);
    if (semester === 'S2') {
      // S2 (2026/2)
      if (currentHours <= 45) {
        return cluster === 1 ? 5 : cluster === 2 ? 15 : cluster === 3 ? 20 : 25;
      } else if (currentHours <= 75) {
        return cluster === 1 ? 10 : cluster === 2 ? 20 : cluster === 3 ? 25 : 30;
      } else {
        return cluster === 1 ? 15 : cluster === 2 ? 25 : cluster === 3 ? 30 : 35;
      }
    } else {
      // S1 (2027/1)
      if (mode === 'vestibular') {
        if (currentHours <= 210) {
          return cluster === 1 ? 35 : cluster === 2 ? 45 : cluster === 3 ? 55 : 60;
        } else if (currentHours <= 270) {
          return cluster === 1 ? 40 : cluster === 2 ? 55 : cluster === 3 ? 60 : 65;
        } else {
          return cluster === 1 ? 45 : cluster === 2 ? 55 : cluster === 3 ? 60 : 65;
        }
      } else {
        // transferencia
        if (currentHours <= 210) {
          return cluster === 1 ? 40 : cluster === 2 ? 55 : cluster === 3 ? 60 : 65;
        } else if (currentHours <= 270) {
          return cluster === 1 ? 45 : cluster === 2 ? 60 : cluster === 3 ? 65 : 70;
        } else {
          return cluster === 1 ? 50 : cluster === 2 ? 60 : cluster === 3 ? 65 : 70;
        }
      }
    }
  };

  const getDiscountRange = (course: Course, campaign: keyof Course['discounts'] | 'finalDeCiclo') => {
    if (campaign === 'finalDeCiclo') {
      const cluster = getCourseCluster(course);
      if (selectedSemester === 'S2') {
        const min = cluster === 1 ? 5 : cluster === 2 ? 15 : cluster === 3 ? 20 : 25;
        const max = cluster === 1 ? 15 : cluster === 2 ? 25 : cluster === 3 ? 30 : 35;
        return `${min}% a ${max}%`;
      } else {
        if (finalDeCicloMode === 'vestibular') {
          const min = cluster === 1 ? 35 : cluster === 2 ? 45 : cluster === 3 ? 55 : 60;
          const max = cluster === 1 ? 45 : cluster === 2 ? 55 : cluster === 3 ? 60 : 65;
          return `${min}% a ${max}%`;
        } else {
          const min = cluster === 1 ? 40 : cluster === 2 ? 55 : cluster === 3 ? 60 : 65;
          const max = cluster === 1 ? 50 : cluster === 2 ? 60 : cluster === 3 ? 65 : 70;
          return `${min}% a ${max}%`;
        }
      }
    }
    const activeCampaign = campaign === 'finalDeCiclo' ? finalDeCicloMode : campaign;
    const d = course.discounts[activeCampaign];
    if (Array.isArray(d)) {
      if (d[0] === 0 && d[1] === 0) return null;
      return `${d[0]}% a ${d[1]}%`;
    }
    return `${d}%`;
  };

  const updatePresencialDiscount = (course: Course, campaign: keyof Course['discounts'] | 'finalDeCiclo', currentHours: number) => {
    if (campaign === 'convenio') {
      setPDiscount(course.discounts.convenio);
    } else if (campaign === 'imperdivel' && course.discounts.imperdivel) {
      const pricePerHour = course.creditValue / 20;
      const totalSemester = pricePerHour * currentHours;
      const grossMonthly = totalSemester / 6; // Base monthly for calculation
      const impValue = course.discounts.imperdivel.value;
      const calculatedDiscount = ((grossMonthly - impValue) / grossMonthly) * 100;
      setPDiscount(Number(calculatedDiscount.toFixed(2)));
      setPInstallments(course.discounts.imperdivel.installments);
    } else if (campaign === 'finalDeCiclo') {
      if (![7, 8, 9, 10].includes(pInstallments)) {
        setPInstallments(7);
      }
      const calculatedDiscount = getFinalDeCicloDiscount(course, selectedSemester, finalDeCicloMode, currentHours);
      setPDiscount(calculatedDiscount);
    } else {
      if (pInstallments > 10) {
        setPInstallments(6);
      }
      const range = course.discounts[campaign as keyof Course['discounts']];
      if (Array.isArray(range)) {
        setPDiscount(range[0]);
      }
    }
  };

  const handleFinalDeCicloModeChange = (mode: 'vestibular' | 'transferencia') => {
    setFinalDeCicloMode(mode);
    const calculatedDiscount = getFinalDeCicloDiscount(selectedPCourse, selectedSemester, mode, hours);
    setPDiscount(calculatedDiscount);
  };

  const copyBudgetAsText = () => {
    const line = '────────────────────────────';
    const isPresencial = activeTab === 'presencial';
    const isEad = activeTab === 'ead';
    const isTecnicos = activeTab === 'tecnicos';

    let text = '';
    text += `*ORÇAMENTO - SIMULAÇÃO COMERCIAL*\n`;
    text += `${line}\n\n`;

    if (isTecnicos) {
      text += `*Curso Técnico:* ${selectedTCourse.name}\n`;
      text += `*Modalidade:* ${selectedTCourse.modalidade}\n`;
      text += `*Polo:* ${TECNICO_POLO_LIST.find(p => p.id === selectedTPolo)?.fullName || selectedTPolo}\n`;
      text += `*Carga Horária:* ${selectedTCourse.cargaHoraria}h\n`;
    } else {
      text += `*Curso:* ${isPresencial ? selectedPCourse.name : selectedECourse.name}\n`;

      if (isPresencial) {
        const campus = CAMPUS_LIST.find(c => c.id === selectedCampus);
        text += `*Campus:* ${campus?.fullName || selectedCampus} (${selectedCampus})\n`;
        text += `*Período:* ${selectedSemester}\n`;
        text += `*Carga Horária:* ${hours}h\n`;
      } else {
        text += `*Praça:* ${selectedPraca}\n`;
      }
    }

    text += `\n${line}\n`;
    text += `*RESUMO FINANCEIRO*\n`;
    text += `${line}\n\n`;

    if (isTecnicos) {
      text += `Opção de Parcelamento: ${tecnicosResults.installments}x\n`;
      text += `Valor da Parcela (Bruto): ${formatCurrency(tecnicosResults.installmentValue)}\n`;
      if (tecnicosResults.tDiscountPercent > 0) {
        text += `Desconto: ${tecnicosResults.tDiscountPercent}%\n`;
        text += `Abatimento Total: -${formatCurrency(tecnicosResults.discountAmount)}\n`;
        text += `*Valor com Desconto: ${formatCurrency(tecnicosResults.totalWithDiscount)}*\n`;
        text += `Parcela com Desconto: ${formatCurrency(tecnicosResults.installmentWithDiscount)}\n`;
      } else {
        text += `*Valor Total: ${formatCurrency(tecnicosResults.totalValue)}*\n`;
      }
    } else if (isPresencial) {
      text += `Valor Bruto Mensal: ${formatCurrency(presencialResults.grossInstallment)}\n`;
      text += `Total Bruto Semestral: ${formatCurrency(presencialResults.grossInstallment * pInstallments)}\n`;
      text += `Desconto: ${pDiscount}%\n`;
      if (selectedPCampaign === 'finalDeCiclo') {
        text += `Campanha: Final de Ciclo (${finalDeCicloMode === 'vestibular' ? 'Vestibular Online' : 'Diplo / Transf / Reing'})\n`;
      } else {
        text += `Campanha: ${pCampaignLabels[selectedPCampaign]}\n`;
      }
    } else {
      text += `Valor Bruto Mensal: ${formatCurrency(eadResults.grossMonthly)}\n`;
      text += `Total Bruto Semestral: ${formatCurrency(eadResults.grossMonthly * 6)}\n`;
      text += `Desconto: ${eDiscount}%\n`;
      text += `Abatimento Mensal: -${formatCurrency(eadResults.discountAmountTotal)}\n`;
      text += `Campanha: ${campaignLabels[selectedCampaign]}\n`;
    }

    text += `\n${line}\n`;
    text += `*CONDIÇÕES DE PAGAMENTO*\n`;
    text += `${line}\n\n`;

    if (isTecnicos) {
      text += `Total de Parcelas: ${tecnicosResults.installments < 10 ? `0${tecnicosResults.installments}` : tecnicosResults.installments}x\n`;
      text += `*Valor da Parcela: ${formatCurrency(tecnicosResults.installmentValue)}*\n`;
      text += `Forma de Pagamento: Boleto\n`;
    } else {
      const totalParcelas = isPresencial ? pInstallments : eadResults.installmentsCount;
      text += `Total de Parcelas: ${totalParcelas < 10 ? `0${totalParcelas}` : totalParcelas} meses\n`;
      text += `*Valor com Desconto: ${isPresencial ? formatCurrency(presencialResults.installmentWithDiscount) : formatCurrency(eadResults.monthlyWithDiscount)}*\n`;
      text += `Forma de Pagamento: Boleto\n`;
    }

    text += `\n${line}\n`;
    text += `Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\n`;
    text += `FTEC Faculdades\n`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2500);
    }).catch(() => {
      alert('Não foi possível copiar o texto. Verifique as permissões da área de transferência.');
    });
  };

  const campaignLabels: Record<keyof EADCourse['discounts'], string> = {
    vestibular: 'Vestibular com Bolsa',
    transferencia: 'Diplo / Transf / Reing',
    convenio: 'Convênio Empresa',
    imperdivel: 'Imperdível',
    seJoga: 'Se Joga'
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4 font-sans selection:bg-pink-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-6xl min-h-[700px] rounded-[40px] shadow-2xl flex flex-col overflow-hidden border-8 border-white"
      >
        {/* Tab Switcher */}
        <div className="flex bg-gray-100 p-2 gap-2">
          <button
            onClick={() => setActiveTab('presencial')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-3xl font-black transition-all ${activeTab === 'presencial' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-transparent text-gray-400 hover:bg-gray-200'
              }`}
          >
            <Users size={20} /> PRESENCIAL
          </button>
          <button
            onClick={() => setActiveTab('ead')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-3xl font-black transition-all ${activeTab === 'ead' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-transparent text-gray-400 hover:bg-gray-200'
              }`}
          >
            <Monitor size={20} /> EAD / SEMI
          </button>
          <button
            onClick={() => setActiveTab('tecnicos')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-3xl font-black transition-all ${activeTab === 'tecnicos' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-transparent text-gray-400 hover:bg-gray-200'
              }`}
          >
            <BookOpen size={20} /> TÉCNICOS
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-1">
          {/* Left Side: Inputs */}
          <div className="w-full md:w-5/12 bg-indigo-600 p-8 lg:p-12 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="mb-8 overflow-hidden flex items-center justify-start">
                <img
                  src="https://www.ftec.com.br/assets/templates/ftec/img/logo_ftec_white.png"
                  alt="FTEC Logo"
                  className="h-10 lg:h-12 w-auto object-contain brightness-0 invert opacity-90"
                  onError={(e) => {
                    // Fallback to a styled text if image fails
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-3xl font-black text-white tracking-tighter">ftec</span><span class="text-xs font-light text-white opacity-60 ml-2 mt-2">faculdades</span>';
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-2">
                {activeTab === 'presencial' ? 'Orçamento Presencial' : activeTab === 'ead' ? 'Orçamento EAD' : 'Orçamento Técnicos'}
              </h1>
              <p className="text-indigo-100 text-base lg:text-lg mb-8 opacity-80">
                {activeTab === 'presencial'
                  ? 'Planeje seu próximo semestre presencial com precisão.'
                  : activeTab === 'ead'
                    ? 'Simule sua mensalidade para cursos EAD e Semipresenciais.'
                    : 'Simule o investimento para cursos técnicos.'}
              </p>

              <div className="space-y-6">
                {activeTab === 'presencial' ? (
                  <>
                    {/* Custom Campus Selector (Neumorphic slider styling from Botoes2.png) */}
                    <div className="space-y-3 mb-6">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                        <Users size={12} /> Campus
                      </label>
                      <div className="flex items-center gap-2 select-none w-full">
                        {CAMPUS_LIST.map((campus) => {
                          const isSelected = campus.id === selectedCampus;
                          return (
                            <button
                              key={campus.id}
                              type="button"
                              onClick={() => handleCampusChange(campus.id)}
                              className="flex-1 h-11 rounded-full flex items-center justify-center gap-1.5 font-black text-xs transition-all duration-300 cursor-pointer shadow-md focus:outline-none bg-[#4F39F6] text-white hover:brightness-110"
                              title={campus.fullName}
                            >
                              <div className="w-3.5 h-3.5 flex-shrink-0 rounded-full border-2 border-white flex items-center justify-center">
                                <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isSelected ? 'bg-[#A432FE]' : 'bg-transparent'}`} />
                              </div>
                              <span>{campus.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                        <GraduationCap size={12} /> Escolha sua Graduação
                      </label>
                      <select
                        value={selectedPCourseId}
                        onChange={(e) => {
                          const newId = e.target.value;
                          setSelectedPCourseId(newId);
                          const course = currentPresencialCourses.find(c => c.id === newId);
                          if (course) updatePresencialDiscount(course, selectedPCampaign, hours);
                        }}
                        className="w-full bg-indigo-700 border-2 border-indigo-400 rounded-2xl p-4 text-white focus:outline-none focus:ring-4 focus:ring-pink-400 appearance-none cursor-pointer text-sm"
                      >
                        {currentPresencialCourses.map(course => (
                          <option key={course.id} value={course.id} className="bg-indigo-800">
                            {course.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Semester Selector (S1/S2) */}
                    <div className="space-y-2 mb-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                        <Clock size={12} /> Período
                      </label>
                      <div className="flex items-center gap-2 select-none">
                        {['S1', 'S2'].map((sem) => {
                          const isSelected = sem === selectedSemester;
                          return (
                            <button
                              key={sem}
                              type="button"
                              onClick={() => {
                                const nextSem = sem as 'S1' | 'S2';
                                setSelectedSemester(nextSem);
                                if (selectedPCampaign === 'finalDeCiclo') {
                                  const calculatedDiscount = getFinalDeCicloDiscount(selectedPCourse, nextSem, finalDeCicloMode, hours);
                                  setPDiscount(calculatedDiscount);
                                }
                              }}
                              className="h-8 px-4 rounded-full flex items-center justify-center gap-1.5 font-black text-[10px] transition-all duration-300 cursor-pointer shadow-sm focus:outline-none bg-[#4F39F6] text-white hover:brightness-110"
                              title={sem === 'S1' ? '1º Semestre' : '2º Semestre'}
                            >
                              <div className="w-2.5 h-2.5 flex-shrink-0 rounded-full border-[1.5px] border-white flex items-center justify-center">
                                <div className={`w-1 h-1 rounded-full transition-colors ${isSelected ? 'bg-[#A432FE]' : 'bg-transparent'}`} />
                              </div>
                              <span>{sem}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                          <Percent size={12} /> Campanha de Desconto
                        </label>
                        <select
                          value={selectedPCampaign}
                          onChange={(e) => {
                            const campaign = e.target.value as keyof Course['discounts'] | 'finalDeCiclo';
                            setSelectedPCampaign(campaign);
                            updatePresencialDiscount(selectedPCourse, campaign, hours);
                          }}
                          className="w-full bg-indigo-700 border-2 border-indigo-400 rounded-2xl p-4 text-white focus:outline-none focus:ring-4 focus:ring-pink-400 appearance-none cursor-pointer text-sm"
                        >
                          {campaignOrder.map((key) => (
                            <option key={key} value={key} className="bg-indigo-800">
                              {pCampaignLabels[key]}
                            </option>
                          ))}
                        </select>
                        {selectedPCampaign === 'finalDeCiclo' && (
                          <div className="space-y-2 mt-3 p-3 bg-indigo-800/40 border border-indigo-400/30 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 block mb-1">
                              Origem do Desconto
                            </label>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => handleFinalDeCicloModeChange('vestibular')}
                                className={`flex-1 h-9 rounded-full flex items-center justify-center gap-1.5 font-bold text-[10px] transition-all duration-300 cursor-pointer shadow-sm focus:outline-none border ${finalDeCicloMode === 'vestibular'
                                  ? 'bg-pink-500 text-white border-pink-400'
                                  : 'bg-indigo-700 text-indigo-200 border-indigo-400 hover:border-white'
                                  }`}
                              >
                                <span>Vestibular Online</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleFinalDeCicloModeChange('transferencia')}
                                className={`flex-1 h-9 rounded-full flex items-center justify-center gap-1.5 font-bold text-[10px] transition-all duration-300 cursor-pointer shadow-sm focus:outline-none border ${finalDeCicloMode === 'transferencia'
                                  ? 'bg-pink-500 text-white border-pink-400'
                                  : 'bg-indigo-700 text-indigo-200 border-indigo-400 hover:border-white'
                                  }`}
                              >
                                <span>Transf/Reing/Diplo</span>
                              </button>
                            </div>
                            {getDiscountRange(selectedPCourse, 'finalDeCiclo') && (
                              <p className="text-[10px] font-bold text-indigo-100 mt-2 text-center">
                                Faixa de Desconto: <span className="text-white font-extrabold">{getDiscountRange(selectedPCourse, 'finalDeCiclo')}</span>
                              </p>
                            )}
                          </div>
                        )}
                        {selectedPCampaign !== 'imperdivel' && selectedPCampaign !== 'finalDeCiclo' && getDiscountRange(selectedPCourse, selectedPCampaign) && (
                          <p className="text-[10px] font-bold text-indigo-200 mt-1 ml-1 opacity-70">
                            Min/Max: {getDiscountRange(selectedPCourse, selectedPCampaign)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                          <Clock size={12} /> Carga Horária
                        </label>
                        <input
                          type="number"
                          value={hours}
                          step="10"
                          min="10"
                          onChange={(e) => {
                            const newHours = Number(e.target.value);
                            setHours(newHours);
                            updatePresencialDiscount(selectedPCourse, selectedPCampaign, newHours);
                          }}
                          className="w-full bg-indigo-700 border-2 border-indigo-400 rounded-2xl p-4 text-white focus:outline-none focus:ring-4 focus:ring-pink-400 text-sm font-bold"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                          <Percent size={12} /> Desconto (%)
                        </label>
                        <input
                          type="number"
                          value={pDiscount}
                          min="0"
                          max="100"
                          step="5"
                          disabled={selectedPCampaign === 'imperdivel'}
                          onChange={(e) => setPDiscount(Number(e.target.value))}
                          className={`w-full bg-indigo-700 border-2 border-indigo-400 rounded-2xl p-4 text-white focus:outline-none focus:ring-4 focus:ring-pink-400 text-sm font-bold transition-all ${selectedPCampaign === 'imperdivel' ? 'opacity-50 cursor-not-allowed grayscale-50' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                        <CreditCard size={12} /> Parcelamento
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {selectedPCampaign === 'imperdivel' ? (
                          <div className="col-span-4 bg-pink-500 text-white rounded-2xl py-3 px-5 flex items-center justify-between shadow-lg border-2 border-pink-400">
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Campanha</p>
                              <p className="font-black text-sm">PLANO FIXO</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Duração</p>
                              <p className="font-black text-sm">{selectedPCourse.discounts.imperdivel?.installments}x</p>
                            </div>
                          </div>
                        ) : selectedPCampaign === 'finalDeCiclo' ? (
                          [7, 8, 9, 10].map(n => (
                            <button
                              key={n}
                              onClick={() => setPInstallments(n)}
                              className={`rounded-xl py-2 font-bold text-xs transition-all border-2 ${pInstallments === n
                                ? 'bg-pink-500 text-white border-pink-400 shadow-md'
                                : 'bg-indigo-700 text-indigo-200 border-indigo-400 hover:border-white'
                                }`}
                            >
                              {n}x
                            </button>
                          ))
                        ) : (
                          Array.from(new Set([1, 4, 5, 6, 7, 8, 9, 10, pInstallments])).sort((a, b) => a - b).map(n => (
                            <button
                              key={n}
                              onClick={() => setPInstallments(n)}
                              className={`rounded-xl py-2 font-bold text-xs transition-all border-2 ${pInstallments === n
                                ? 'bg-pink-500 text-white border-pink-400 shadow-md'
                                : 'bg-indigo-700 text-indigo-200 border-indigo-400 hover:border-white'
                                }`}
                            >
                              {n}x
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  </>
                ) : activeTab === 'ead' ? (
                  <>
                    {/* Praça Selector - same style as Campus buttons */}
                    <div className="space-y-3 mb-6">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                        <Layers size={12} /> Praça
                      </label>
                      <div className="flex items-center gap-2 select-none w-full">
                        {[1, 2, 3].map((praca) => {
                          const isSelected = praca === selectedPraca;
                          return (
                            <button
                              key={praca}
                              type="button"
                              onClick={() => {
                                setSelectedPraca(praca as 1 | 2 | 3);
                                setEDiscount(selectedECourse.discounts[selectedCampaign][praca - 1]);
                              }}
                              className="flex-1 h-11 rounded-full flex items-center justify-center gap-1.5 font-black text-xs transition-all duration-300 cursor-pointer shadow-md focus:outline-none bg-[#4F39F6] text-white hover:brightness-110"
                              title={`Praça ${praca}`}
                            >
                              <div className="w-3.5 h-3.5 flex-shrink-0 rounded-full border-2 border-white flex items-center justify-center">
                                <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isSelected ? 'bg-[#A432FE]' : 'bg-transparent'}`} />
                              </div>
                              <span>Praça {praca}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                        <GraduationCap size={12} /> Escolha sua Graduação EAD
                      </label>
                      <select
                        value={selectedECourseId}
                        onChange={(e) => {
                          const newId = e.target.value;
                          setSelectedECourseId(newId);
                          const course = EAD_COURSES.find(c => c.id === newId);
                          if (course) setEDiscount(course.discounts[selectedCampaign][selectedPraca - 1]);
                        }}
                        className="w-full bg-indigo-700 border-2 border-indigo-400 rounded-2xl p-4 text-white focus:outline-none focus:ring-4 focus:ring-pink-400 appearance-none cursor-pointer text-sm"
                      >
                        {EAD_COURSES.map(course => (
                          <option key={course.id} value={course.id} className="bg-indigo-800">
                            {course.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                          <Percent size={12} /> Campanha de Desconto
                        </label>
                        <select
                          value={selectedCampaign}
                          onChange={(e) => {
                            const campaign = e.target.value as keyof EADCourse['discounts'];
                            setSelectedCampaign(campaign);
                            setEDiscount(selectedECourse.discounts[campaign][selectedPraca - 1]);
                          }}
                          className="w-full bg-indigo-700 border-2 border-indigo-400 rounded-2xl p-4 text-white focus:outline-none focus:ring-4 focus:ring-pink-400 appearance-none cursor-pointer text-sm"
                        >
                          {campaignOrder.map((key) => (
                            <option key={key} value={key} className="bg-indigo-800">
                              {campaignLabels[key as keyof EADCourse['discounts']]}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="bg-indigo-400/30 border border-indigo-400 rounded-2xl p-4 flex justify-between items-center">
                        <span className="text-[10px] font-black text-indigo-100 uppercase tracking-widest">Percentual de Tabela</span>
                        <span className="text-2xl font-black text-white">{selectedECourse.discounts[selectedCampaign][selectedPraca - 1]}%</span>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                          <Calculator size={12} /> Desconto (%) Manual
                        </label>
                        <input
                          type="number"
                          value={eDiscount}
                          min="0"
                          max="100"
                          disabled={selectedCampaign === 'imperdivel'}
                          onChange={(e) => setEDiscount(Number(e.target.value))}
                          className={`w-full bg-indigo-700 border-2 border-indigo-400 rounded-2xl p-4 text-white focus:outline-none focus:ring-4 focus:ring-pink-400 text-sm font-bold transition-all ${selectedCampaign === 'imperdivel' ? 'opacity-50 cursor-not-allowed grayscale-50' : ''
                            }`}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Polo Selector */}
                    <div className="space-y-3 mb-6">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                        <Users size={12} /> Polo
                      </label>
                      <div className="flex items-center gap-2 select-none w-full">
                        {TECNICO_POLO_LIST.map((polo) => {
                          const isSelected = polo.id === selectedTPolo;
                          const hasPolo = selectedTCourse.polos.some(p => p.polo === POLO_NAME_MAP[polo.id]);
                          return (
                            <button
                              key={polo.id}
                              type="button"
                              onClick={() => {
                                setSelectedTPolo(polo.id as TecnicoPoloId);
                                const poloData = selectedTCourse.polos.find(p => p.polo === POLO_NAME_MAP[polo.id]);
                                if (poloData && poloData.options.length > 0) {
                                  setSelectedTInstallments(poloData.options[0].parcelas);
                                }
                              }}
                              className={`flex-1 h-8 rounded-full flex items-center justify-center gap-1.5 font-black text-[10px] transition-all duration-300 cursor-pointer shadow-sm focus:outline-none ${isSelected
                                ? 'bg-[#4F39F6] text-white'
                                : hasPolo
                                  ? 'bg-[#2a2a3e] text-slate-300 hover:text-white border border-[#3b3b52]'
                                  : 'bg-[#4F39F6] opacity-30 cursor-not-allowed border border-[#3b3b52]'
                                }`}
                              title={polo.fullName}
                            >
                              <div className="w-2.5 h-2.5 flex-shrink-0 rounded-full border-[1.5px] border-white flex items-center justify-center">
                                <div className={`w-1 h-1 rounded-full transition-colors ${isSelected ? 'bg-[#A432FE]' : 'bg-transparent'}`} />
                              </div>
                              <span>{polo.label}</span>
                            </button>
                          );
                        })}
                      </div>
                      {!availableTPolos.some(p => p === POLO_NAME_MAP[selectedTPolo]) && (
                        <p className="text-[9px] text-indigo-200 opacity-60 mt-1 ml-1">
                          {selectedTCourse.observacoes || 'Selecione outro polo'}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                        <GraduationCap size={12} /> Escolha o Curso Técnico
                      </label>
                      <select
                        value={selectedTCourseId}
                        onChange={(e) => {
                          const newId = e.target.value;
                          setSelectedTCourseId(newId);
                          const course = TECNICO_COURSES.find(c => c.id === newId);
                          if (course) {
                            // Keep current polo if available, otherwise use first
                            const hasCurrentPolo = course.polos.some(p => p.polo === POLO_NAME_MAP[selectedTPolo]);
                            if (!hasCurrentPolo && course.polos.length > 0) {
                              const firstPoloName = course.polos[0].polo;
                              const poloEntry = Object.entries(POLO_NAME_MAP).find(([, v]) => v === firstPoloName);
                              if (poloEntry) {
                                setSelectedTPolo(poloEntry[0] as TecnicoPoloId);
                                if (course.polos[0].options.length > 0) {
                                  setSelectedTInstallments(course.polos[0].options[0].parcelas);
                                }
                              }
                            }
                          }
                        }}
                        className="w-full bg-indigo-700 border-2 border-indigo-400 rounded-2xl p-4 text-white focus:outline-none focus:ring-4 focus:ring-pink-400 appearance-none cursor-pointer text-sm"
                      >
                        {TECNICO_COURSES.map(course => (
                          <option key={course.id} value={course.id} className="bg-indigo-800">
                            {course.name} - {course.modalidade}
                          </option>
                        ))}
                      </select>
                      {selectedTCourse.observacoes && (
                        <p className="text-[10px] font-bold text-amber-300 mt-1 ml-1">
                          {selectedTCourse.observacoes}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                        <Percent size={12} /> Desconto (%) Manual
                      </label>
                      <input
                        type="number"
                        value={tDiscount}
                        min="0"
                        max="100"
                        step="1"
                        onChange={(e) => setTDiscount(Number(e.target.value))}
                        className="w-full bg-indigo-700 border-2 border-indigo-400 rounded-2xl p-4 text-white focus:outline-none focus:ring-4 focus:ring-pink-400 text-sm font-bold"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                        <CreditCard size={12} /> Parcelamento
                      </label>
                      {currentTInstallmentOptions.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                          {currentTInstallmentOptions.map(opt => (
                            <button
                              key={opt.parcelas}
                              onClick={() => setSelectedTInstallments(opt.parcelas)}
                              className={`rounded-xl py-2.5 font-bold text-xs transition-all border-2 ${selectedTInstallments === opt.parcelas
                                ? 'bg-pink-500 text-white border-pink-400 shadow-md'
                                : 'bg-indigo-700 text-indigo-200 border-indigo-400 hover:border-white'
                                }`}
                            >
                              {opt.parcelas}x
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[10px] text-indigo-200 opacity-60">
                          Nenhuma opção de parcelamento disponível para este polo.
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Results */}
          <div className="w-full md:w-7/12 p-8 lg:p-16 flex flex-col justify-center bg-white">
            <div className="mb-12">
              <p className="text-gray-400 font-bold uppercase tracking-tight text-xs mb-1">Resumo da Simulação</p>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
                {activeTab === 'presencial' ? selectedPCourse.name : activeTab === 'ead' ? selectedECourse.name : selectedTCourse.name}
              </h2>
              {activeTab === 'presencial' && (
                <p className="text-indigo-600 font-black text-xs uppercase mt-2">
                  Campus: {CAMPUS_LIST.find(c => c.id === selectedCampus)?.fullName} ({selectedCampus})
                </p>
              )}
              {activeTab === 'ead' && selectedECourse.notes && (
                <p className="text-indigo-500 font-bold text-[10px] uppercase mt-2">{selectedECourse.notes}</p>
              )}
              {activeTab === 'tecnicos' && (
                <p className="text-indigo-600 font-black text-xs uppercase mt-2">
                  {selectedTCourse.modalidade} | Polo: {(() => {
                    const poloInfo = TECNICO_POLO_LIST.find(p => p.id === selectedTPolo);
                    return poloInfo?.fullName || selectedTPolo;
                  })()} | {selectedTCourse.cargaHoraria}h
                </p>
              )}
            </div>

            {activeTab === 'tecnicos' ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <p className="text-gray-500 font-medium text-sm mb-1 uppercase tracking-wide">Parcelas</p>
                    <p className="text-2xl lg:text-3xl font-black text-gray-900">
                      {tecnicosResults.installments < 10 ? `0${tecnicosResults.installments}` : tecnicosResults.installments}x
                    </p>
                  </div>
                  <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                    <p className="text-indigo-600 font-medium text-sm mb-1 uppercase tracking-wide">Valor Total</p>
                    <p className="text-2xl lg:text-3xl font-black text-indigo-600">
                      {formatCurrency(tecnicosResults.totalValue)}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 border-t-2 border-dashed border-gray-200 pt-8">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium text-lg">Valor da Parcela (Bruto)</span>
                    <span className="text-gray-900 font-bold text-xl">
                      {formatCurrency(tecnicosResults.installmentValue)}
                    </span>
                  </div>
                  {tecnicosResults.tDiscountPercent > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 font-medium text-lg">Desconto ({tecnicosResults.tDiscountPercent}%)</span>
                      <span className="text-emerald-600 font-bold text-xl">
                        -{formatCurrency(tecnicosResults.discountAmount)}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row justify-between sm:items-end pt-6 gap-6">
                    <div>
                      <span className="text-indigo-600 font-black text-sm uppercase tracking-widest flex items-center gap-2">
                        <TrendingUp size={14} /> {tecnicosResults.tDiscountPercent > 0 ? 'Valor com Desconto' : 'Investimento Total'}
                      </span>
                      <motion.div
                        key={tecnicosResults.tDiscountPercent > 0 ? tecnicosResults.totalWithDiscount : tecnicosResults.totalValue}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl lg:text-6xl font-black text-indigo-600 tracking-tighter"
                      >
                        {tecnicosResults.tDiscountPercent > 0 ? formatCurrency(tecnicosResults.totalWithDiscount) : formatCurrency(tecnicosResults.totalValue)}
                      </motion.div>
                      {tecnicosResults.tDiscountPercent > 0 && (
                        <p className="text-gray-400 text-xs mt-1">
                          {tecnicosResults.installments}x de {formatCurrency(tecnicosResults.installmentWithDiscount)}
                        </p>
                      )}
                    </div>
                    <div className="sm:text-right bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                      <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">Carga Horária</p>
                      <p className="text-indigo-900 font-black text-xl">{selectedTCourse.cargaHoraria}h</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <p className="text-gray-500 font-medium text-sm mb-1 uppercase tracking-wide">Total de Parcelas</p>
                    <p className="text-2xl lg:text-3xl font-black text-gray-900">
                      {activeTab === 'presencial'
                        ? (pInstallments < 10 ? `0${pInstallments}` : pInstallments)
                        : (eadResults.installmentsCount < 10 ? `0${eadResults.installmentsCount}` : eadResults.installmentsCount)
                      } meses
                    </p>
                  </div>
                  <div className="p-6 bg-pink-50 rounded-3xl border border-pink-100">
                    <p className="text-pink-600 font-medium text-sm mb-1 uppercase tracking-wide">Desconto Total</p>
                    <p className="text-2xl lg:text-3xl font-black text-pink-600">
                      {activeTab === 'presencial' ? formatCurrency(presencialResults.discountAmountTotal) : formatCurrency(eadResults.discountAmountTotal)}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 border-t-2 border-dashed border-gray-200 pt-8">
                  <div className="flex justify-between items-center group">
                    <span className="text-gray-500 font-medium text-lg">Valor Bruto Mensal</span>
                    <span className="text-gray-900 font-bold text-xl">
                      {activeTab === 'presencial' ? formatCurrency(presencialResults.grossInstallment) : formatCurrency(eadResults.grossMonthly)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-gray-500 font-medium text-lg">Abatimento Mensal</span>
                    <span className="text-pink-500 font-bold text-xl text-right">
                      -{activeTab === 'presencial' ? formatCurrency(presencialResults.discountPerInstallment) : formatCurrency(eadResults.discountAmountTotal)}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between sm:items-end pt-6 gap-6">
                    <div>
                      <span className="text-indigo-600 font-black text-sm uppercase tracking-widest flex items-center gap-2">
                        <TrendingUp size={14} /> Valor com Desconto
                      </span>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab === 'presencial' ? presencialResults.installmentWithDiscount : eadResults.monthlyWithDiscount}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-5xl lg:text-6xl font-black text-indigo-600 tracking-tighter"
                        >
                          {activeTab === 'presencial' ? formatCurrency(presencialResults.installmentWithDiscount) : formatCurrency(eadResults.monthlyWithDiscount)}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <div className="sm:text-right bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                      <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">Total Semestral</p>
                      <p className="text-indigo-900 font-black text-xl">
                        {activeTab === 'presencial' ? formatCurrency(presencialResults.totalWithDiscount) : formatCurrency(eadResults.totalSemestral)}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowBudgetModal(true)}
                className="flex-1 bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
              >
                <Download size={20} />
                Criar Orçamento
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Budget Modal */}
      <AnimatePresence>
        {showBudgetModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowBudgetModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 lg:p-8 border-b border-gray-100">
                <div>
                  <h2 className="text-lg lg:text-xl font-black text-gray-900">
                    ORÇAMENTO - SIMULAÇÃO COMERCIAL
                  </h2>
                </div>
                <button
                  onClick={() => setShowBudgetModal(false)}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 hover:text-gray-600 transition-all text-gray-400 flex-shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8 space-y-6">
                {/* Course Info */}
                <div className="bg-indigo-50 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-gray-500 font-bold text-xs uppercase tracking-wide flex-shrink-0">Curso</span>
                    <span className="text-gray-900 font-bold text-right">
                      {activeTab === 'presencial' ? selectedPCourse.name : activeTab === 'ead' ? selectedECourse.name : selectedTCourse.name}
                    </span>
                  </div>
                  {activeTab === 'presencial' && (
                    <>
                      <div className="flex justify-between items-center gap-4">
                        <span className="text-gray-500 font-bold text-xs uppercase tracking-wide flex-shrink-0">Campus</span>
                        <span className="text-gray-900 font-bold text-right">
                          {CAMPUS_LIST.find(c => c.id === selectedCampus)?.fullName || selectedCampus} ({selectedCampus})
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-4">
                        <span className="text-gray-500 font-bold text-xs uppercase tracking-wide flex-shrink-0">Período</span>
                        <span className="text-gray-900 font-bold text-right">{selectedSemester}</span>
                      </div>
                    </>
                  )}
                  {activeTab === 'ead' && (
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-gray-500 font-bold text-xs uppercase tracking-wide flex-shrink-0">Praça</span>
                      <span className="text-gray-900 font-bold text-right">{selectedPraca}</span>
                    </div>
                  )}
                  {activeTab === 'tecnicos' && (
                    <>
                      <div className="flex justify-between items-center gap-4">
                        <span className="text-gray-500 font-bold text-xs uppercase tracking-wide flex-shrink-0">Modalidade</span>
                        <span className="text-gray-900 font-bold text-right">{selectedTCourse.modalidade}</span>
                      </div>
                      <div className="flex justify-between items-center gap-4">
                        <span className="text-gray-500 font-bold text-xs uppercase tracking-wide flex-shrink-0">Polo</span>
                        <span className="text-gray-900 font-bold text-right">
                          {TECNICO_POLO_LIST.find(p => p.id === selectedTPolo)?.fullName || selectedTPolo}
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-4">
                        <span className="text-gray-500 font-bold text-xs uppercase tracking-wide flex-shrink-0">Carga Horária</span>
                        <span className="text-gray-900 font-bold text-right">{selectedTCourse.cargaHoraria}h</span>
                      </div>
                      {selectedTCourse.observacoes && (
                        <div className="flex justify-between items-center gap-4">
                          <span className="text-gray-500 font-bold text-xs uppercase tracking-wide flex-shrink-0">Observações</span>
                          <span className="text-amber-600 font-bold text-right text-xs">{selectedTCourse.observacoes}</span>
                        </div>
                      )}
                    </>
                  )}
                  {activeTab === 'presencial' && (
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-gray-500 font-bold text-xs uppercase tracking-wide flex-shrink-0">Carga Horária Contratada</span>
                      <span className="text-gray-900 font-bold text-right">{hours}h</span>
                    </div>
                  )}
                </div>

                {/* Financial Summary */}
                <div>
                  <h3 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <TrendingUp size={16} /> Resumo Financeiro
                  </h3>
                  <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
                    {activeTab === 'tecnicos' ? (
                      <>
                        <div className="flex justify-between py-3 px-4">
                          <span className="text-gray-500 font-medium">Valor da Parcela (Bruto)</span>
                          <span className="font-bold text-gray-900">{formatCurrency(tecnicosResults.installmentValue)}</span>
                        </div>
                        <div className="flex justify-between py-3 px-4">
                          <span className="text-gray-500 font-medium">Quantidade de Parcelas</span>
                          <span className="font-bold text-gray-900">{tecnicosResults.installments}x</span>
                        </div>
                        <div className="flex justify-between py-3 px-4">
                          <span className="text-gray-500 font-medium">Valor Total Bruto</span>
                          <span className="font-bold text-gray-900">{formatCurrency(tecnicosResults.totalValue)}</span>
                        </div>
                        {tecnicosResults.tDiscountPercent > 0 && (
                          <div className="flex justify-between py-3 px-4">
                            <span className="text-gray-500 font-medium">Desconto ({tecnicosResults.tDiscountPercent}%)</span>
                            <span className="font-bold text-emerald-600">-{formatCurrency(tecnicosResults.discountAmount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between py-3 px-4 bg-emerald-50 rounded-xl -mx-1 px-5">
                          <span className="text-emerald-700 font-bold">Valor Total com Desconto</span>
                          <span className="font-bold text-emerald-700">{formatCurrency(tecnicosResults.totalWithDiscount)}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between py-3 px-4">
                          <span className="text-gray-500 font-medium">Valor Bruto Mensal</span>
                          <span className="font-bold text-gray-900">
                            {activeTab === 'presencial' ? formatCurrency(presencialResults.grossInstallment) : formatCurrency(eadResults.grossMonthly)}
                          </span>
                        </div>
                        <div className="flex justify-between py-3 px-4">
                          <span className="text-gray-500 font-medium">Valor Total Bruto Semestral</span>
                          <span className="font-bold text-gray-900">
                            {activeTab === 'presencial'
                              ? formatCurrency(presencialResults.grossInstallment * pInstallments)
                              : formatCurrency(eadResults.grossMonthly * 6)}
                          </span>
                        </div>
                        <div className="flex justify-between py-3 px-4">
                          <span className="text-gray-500 font-medium">Desconto Mensal</span>
                          <span className="font-bold text-emerald-600">
                            {activeTab === 'presencial' ? pDiscount : eDiscount}%
                          </span>
                        </div>
                        <div className="flex justify-between py-3 px-4">
                          <span className="text-gray-500 font-medium">Abatimento Mensal</span>
                          <span className="font-bold text-pink-600">
                            -{activeTab === 'presencial' ? formatCurrency(presencialResults.discountPerInstallment) : formatCurrency(eadResults.discountAmountTotal)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Payment Conditions */}
                <div>
                  <h3 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <CreditCard size={16} /> Condições de Pagamento
                  </h3>
                  <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
                    {activeTab === 'tecnicos' ? (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 font-medium">Opção de Parcelamento</span>
                          <span className="font-bold text-gray-900">{tecnicosResults.installments}x</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                          <div>
                            <span className="text-gray-500 font-medium block">Valor da Parcela (Bruto)</span>
                            <span className="text-indigo-600 text-[10px] font-bold uppercase tracking-wider">
                              {selectedTCourse.modalidade} | {selectedTCourse.cargaHoraria}h
                            </span>
                          </div>
                          <span className="font-bold text-gray-900">{formatCurrency(tecnicosResults.installmentValue)}</span>
                        </div>
                        {tecnicosResults.tDiscountPercent > 0 && (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500 font-medium">Desconto ({tecnicosResults.tDiscountPercent}%)</span>
                              <span className="font-bold text-emerald-600">-{formatCurrency(tecnicosResults.discountAmount)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                              <div>
                                <span className="text-gray-500 font-medium block">Valor da Parcela com Desconto</span>
                                <span className="text-indigo-600 text-[10px] font-bold uppercase tracking-wider">
                                  Economia de {formatCurrency(tecnicosResults.discountAmount)}
                                </span>
                              </div>
                              <span className="text-2xl lg:text-3xl font-black text-indigo-600">
                                {formatCurrency(tecnicosResults.installmentWithDiscount)}
                              </span>
                            </div>
                          </>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 font-medium">Forma de Pagamento</span>
                          <span className="font-bold text-gray-900 flex items-center gap-2">
                            <CreditCard size={16} className="text-indigo-400" />
                            Boleto
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 font-medium">Total de Parcelas</span>
                          <span className="font-bold text-gray-900">
                            {(() => {
                              const total = activeTab === 'presencial' ? pInstallments : eadResults.installmentsCount;
                              return `${total < 10 ? `0${total}` : total} meses`;
                            })()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                          <div>
                            <span className="text-gray-500 font-medium block">Valor com Desconto (Mensal)</span>
                            <span className="text-indigo-600 text-[10px] font-bold uppercase tracking-wider">
                              {activeTab === 'presencial'
                                ? `Campanha: ${pCampaignLabels[selectedPCampaign]}`
                                : `Campanha: ${campaignLabels[selectedCampaign]}`}
                            </span>
                          </div>
                          <span className="text-2xl lg:text-3xl font-black text-indigo-600">
                            {activeTab === 'presencial' ? formatCurrency(presencialResults.installmentWithDiscount) : formatCurrency(eadResults.monthlyWithDiscount)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 font-medium">Forma de Pagamento</span>
                          <span className="font-bold text-gray-900 flex items-center gap-2">
                            <CreditCard size={16} className="text-indigo-400" />
                            Boleto
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row gap-3 p-6 lg:p-8 border-t border-gray-100 bg-gray-50/50">
                <button
                  onClick={() => window.print()}
                  className="flex-1 bg-indigo-600 text-white font-bold py-4 px-6 rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
                >
                  <Printer size={20} />
                  Imprimir / Exportar PDF
                </button>
                <button
                  onClick={copyBudgetAsText}
                  className="flex-1 bg-emerald-600 text-white font-bold py-4 px-6 rounded-2xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  {copiedToClipboard ? 'Copiado! ✓' : 'Copiar TXT (WhatsApp)'}
                </button>
                <button
                  onClick={() => setShowBudgetModal(false)}
                  className="flex-1 sm:flex-none border-2 border-gray-200 text-gray-500 font-bold py-4 px-8 rounded-2xl hover:bg-white hover:text-gray-700 hover:border-gray-300 transition-all"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
