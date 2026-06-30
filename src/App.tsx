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
  Printer
} from 'lucide-react';
import { PRESENCIAL_COURSES_BY_CAMPUS, EAD_COURSES, Course, EADCourse } from './constants/courses';

type TabType = 'presencial' | 'ead';

const CAMPUS_LIST = [
  { id: 'CX', label: 'CX', fullName: 'Caxias' },
  { id: 'BG', label: 'BG', fullName: 'Bento Gonçalves' },
  { id: 'NH', label: 'NH', fullName: 'Novo Hamburgo' },
  { id: 'IBG', label: 'IBG', fullName: 'Ibegen' },
  { id: 'POA', label: 'POA', fullName: 'Porto Alegre ZN' },
] as const;

type CampusId = typeof CAMPUS_LIST[number]['id'];

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
  const [selectedPCampaign, setSelectedPCampaign] = useState<keyof Course['discounts']>('vestibular');
  const [selectedSemester, setSelectedSemester] = useState<'S1' | 'S2'>('S1');
  const [showBudgetModal, setShowBudgetModal] = useState(false);

  // EAD States
  const [selectedECourseId, setSelectedECourseId] = useState<string>(EAD_COURSES[0].id);
  const [selectedCampaign, setSelectedCampaign] = useState<keyof EADCourse['discounts']>('vestibular');
  const [eDiscount, setEDiscount] = useState<number>(EAD_COURSES[0].discounts.vestibular);

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

  const pCampaignLabels: Record<keyof Course['discounts'], string> = {
    vestibular: 'Vestibular com Bolsa',
    transferencia: 'Diplo / Transf / Reing',
    convenio: 'Convênio Empresa',
    imperdivel: 'Imperdível',
    seJoga: 'Se Joga'
  };

  const campaignOrder: (keyof Course['discounts'])[] = [
    'vestibular',
    'transferencia',
    'convenio',
    'imperdivel',
    'seJoga'
  ];

  const getDiscountRange = (course: Course, campaign: keyof Course['discounts']) => {
    const d = course.discounts[campaign];
    if (Array.isArray(d)) {
      if (d[0] === 0 && d[1] === 0) return null;
      return `${d[0]}% a ${d[1]}%`;
    }
    return `${d}%`;
  };

  const updatePresencialDiscount = (course: Course, campaign: keyof Course['discounts'], currentHours: number) => {
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
    }
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
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-3xl font-black transition-all ${
              activeTab === 'presencial' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-transparent text-gray-400 hover:bg-gray-200'
            }`}
          >
            <Users size={20} /> PRESENCIAL
          </button>
          <button 
            onClick={() => setActiveTab('ead')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-3xl font-black transition-all ${
              activeTab === 'ead' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-transparent text-gray-400 hover:bg-gray-200'
            }`}
          >
            <Monitor size={20} /> EAD / SEMI
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
                {activeTab === 'presencial' ? 'Orçamento Presencial' : 'Orçamento EAD'}
              </h1>
              <p className="text-indigo-100 text-base lg:text-lg mb-8 opacity-80">
                {activeTab === 'presencial' 
                  ? 'Planeje seu próximo semestre presencial com precisão.' 
                  : 'Simule sua mensalidade para cursos EAD e Semipresenciais.'}
              </p>
              
              <div className="space-y-6">
                {activeTab === 'presencial' ? (
                  <>
                    {/* Custom Campus Selector (Neumorphic slider styling from Botoes2.png) */}
                    <div className="space-y-3 mb-6">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                        <Users size={12} /> Campus
                      </label>
                      <div className="relative bg-[#181824] rounded-full p-2 shadow-inner border border-indigo-950/40 flex items-center justify-between select-none">
                        {/* Background connecting line */}
                        <div className="absolute left-[8%] right-[8%] h-[6px] bg-[#2a2a3b] rounded-full" />

                        {CAMPUS_LIST.map((campus) => {
                          const isSelected = campus.id === selectedCampus;
                          return (
                            <button
                              key={campus.id}
                              type="button"
                              onClick={() => handleCampusChange(campus.id)}
                              className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center font-black text-xs transition-all duration-300 cursor-pointer shadow-md focus:outline-none ${
                                isSelected 
                                  ? 'bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white ring-2 ring-violet-400/50 scale-110' 
                                  : 'bg-[#252535] text-slate-400 hover:text-white border border-[#3b3b52]'
                              }`}
                              title={campus.fullName}
                            >
                              {campus.label}
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

                    {/* Semester Selector (S1/S2) - Smaller version of campus selector */}
                    <div className="space-y-2 mb-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                        <Clock size={12} /> Período
                      </label>
                      <div className="relative bg-[#1e1e2e] rounded-full p-1.5 shadow-inner border border-indigo-950/40 inline-flex items-center select-none">
                        {['S1', 'S2'].map((sem) => {
                          const isSelected = sem === selectedSemester;
                          return (
                            <button
                              key={sem}
                              type="button"
                              onClick={() => setSelectedSemester(sem as 'S1' | 'S2')}
                              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-black text-[10px] transition-all duration-300 cursor-pointer shadow-sm focus:outline-none ${
                                isSelected 
                                  ? 'bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white ring-2 ring-violet-400/50 scale-110' 
                                  : 'bg-[#2a2a3e] text-slate-400 hover:text-white border border-[#3b3b52]'
                              }`}
                              title={sem === 'S1' ? '1º Semestre' : '2º Semestre'}
                            >
                              {sem}
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
                            const campaign = e.target.value as keyof Course['discounts'];
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
                        {selectedPCampaign !== 'imperdivel' && getDiscountRange(selectedPCourse, selectedPCampaign) && (
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
                          className={`w-full bg-indigo-700 border-2 border-indigo-400 rounded-2xl p-4 text-white focus:outline-none focus:ring-4 focus:ring-pink-400 text-sm font-bold transition-all ${
                            selectedPCampaign === 'imperdivel' ? 'opacity-50 cursor-not-allowed grayscale-50' : ''
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
                        ) : (
                          Array.from(new Set([1, 4, 5, 6, 7, 8, 9, 10, pInstallments])).sort((a, b) => a - b).map(n => (
                            <button
                              key={n}
                              onClick={() => setPInstallments(n)}
                              className={`rounded-xl py-2 font-bold text-xs transition-all border-2 ${
                                pInstallments === n 
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
                ) : (
                  <>
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
                          if (course) setEDiscount(course.discounts[selectedCampaign]);
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
                            setEDiscount(selectedECourse.discounts[campaign]);
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
                        <span className="text-2xl font-black text-white">{selectedECourse.discounts[selectedCampaign]}%</span>
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
                          className={`w-full bg-indigo-700 border-2 border-indigo-400 rounded-2xl p-4 text-white focus:outline-none focus:ring-4 focus:ring-pink-400 text-sm font-bold transition-all ${
                            selectedCampaign === 'imperdivel' ? 'opacity-50 cursor-not-allowed grayscale-50' : ''
                          }`}
                        />
                      </div>
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
                {activeTab === 'presencial' ? selectedPCourse.name : selectedECourse.name}
              </h2>
              {activeTab === 'presencial' && (
                <p className="text-indigo-600 font-black text-xs uppercase mt-2">
                  Campus: {CAMPUS_LIST.find(c => c.id === selectedCampus)?.fullName} ({selectedCampus})
                </p>
              )}
              {activeTab === 'ead' && selectedECourse.notes && (
                <p className="text-indigo-500 font-bold text-[10px] uppercase mt-2">{selectedECourse.notes}</p>
              )}
            </div>

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
                      {activeTab === 'presencial' ? selectedPCourse.name : selectedECourse.name}
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
                  </div>
                </div>

                {/* Payment Conditions */}
                <div>
                  <h3 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <CreditCard size={16} /> Condições de Pagamento
                  </h3>
                  <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
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
