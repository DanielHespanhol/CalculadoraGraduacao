/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  GraduationCap, 
  Clock, 
  Percent, 
  CreditCard, 
  Download, 
  Info,
  TrendingDown,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { COURSES, Course } from './constants/courses';

export default function App() {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(COURSES[0].id);
  const [hours, setHours] = useState<number>(360);
  const [discount, setDiscount] = useState<number>(0);
  const [installments, setInstallments] = useState<number>(6);

  const selectedCourse = useMemo(() => 
    COURSES.find(c => c.id === selectedCourseId) || COURSES[0],
    [selectedCourseId]
  );

  const results = useMemo(() => {
    // Cálculo: O crédito equivale a 20h
    // Valor por hora = Crédito / 20
    const pricePerHour = selectedCourse.creditValue / 20;
    const totalSemester = pricePerHour * hours;
    const grossInstallment = totalSemester / installments;
    const discountAmount = grossInstallment * (discount / 100);
    const finalInstallment = grossInstallment - discountAmount;
    const totalDiscountAmount = totalSemester * (discount / 100);
    const totalWithDiscount = totalSemester - totalDiscountAmount;

    return {
      pricePerHour,
      totalSemester,
      grossInstallment,
      discountAmount,
      finalInstallment,
      totalDiscountAmount,
      totalWithDiscount,
    };
  }, [selectedCourse, hours, discount, installments]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#141414] font-sans selection:bg-black selection:text-white p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Header Section */}
        <header className="lg:col-span-12 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-black text-white rounded-lg">
              <Calculator size={24} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Simulador de Semestre</h1>
          </div>
          <p className="text-[#8E9299] max-w-2xl">
            Calcule o investimento da sua graduação de forma rápida e precisa. Ajuste as horas, 
            descontos e parcelamento para ver o impacto no seu orçamento.
          </p>
        </header>

        {/* Input Controls */}
        <section className="lg:col-span-5 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#E4E3E0] rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-xs uppercase tracking-widest font-semibold text-[#8E9299] mb-6 flex items-center gap-2">
              <Info size={14} /> Configurações de Matrícula
            </h2>
            
            <div className="space-y-6">
              {/* Course Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <GraduationCap size={16} className="text-[#8E9299]" /> Graduação
                </label>
                <select 
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full bg-[#F8F8F8] border border-[#E4E3E0] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black/5 transition-all cursor-pointer"
                >
                  {COURSES.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.name} ({course.type})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-[#8E9299] font-mono uppercase">
                  Valor do Crédito (20h): {formatCurrency(selectedCourse.creditValue)}
                </p>
              </div>

              {/* Hours Input */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Clock size={16} className="text-[#8E9299]" /> Carga Horária (Semestre)
                  </label>
                  <span className="text-lg font-mono font-bold">{hours}h</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="600" 
                  step="10"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#E4E3E0] rounded-lg appearance-none cursor-pointer accent-black"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#8E9299]">
                  <span>20h</span>
                  <span>300h</span>
                  <span>600h</span>
                </div>
              </div>

              {/* Discount Input */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Percent size={16} className="text-[#8E9299]" /> Desconto Aplicado
                  </label>
                  <span className="text-lg font-mono font-bold text-green-600">{discount}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step="5"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#E4E3E0] rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {/* Installments Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <CreditCard size={16} className="text-[#8E9299]" /> Número de Parcelas
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <button
                      key={n}
                      onClick={() => setInstallments(n)}
                      className={`py-2 rounded-lg font-mono text-sm transition-all border ${
                        installments === n 
                        ? 'bg-black text-white border-black shadow-md' 
                        : 'bg-white text-[#141414] border-[#E4E3E0] hover:border-black'
                      }`}
                    >
                      {n}x
                    </button>
                  ))}
                  <div className="col-span-2 relative">
                    <input 
                      type="number"
                      min="1"
                      max="24"
                      placeholder="Outro..."
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val > 0) setInstallments(val);
                      }}
                      className="w-full h-full text-center bg-[#F8F8F8] border border-[#E4E3E0] rounded-lg outline-none text-sm font-mono placeholder:text-[#8E9299]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="bg-black text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xs uppercase tracking-widest font-semibold opacity-60 mb-1">Total do Semestre</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight">{formatCurrency(results.totalWithDiscount)}</span>
                {discount > 0 && (
                  <span className="text-sm line-through opacity-40">{formatCurrency(results.totalSemester)}</span>
                )}
              </div>
              <p className="text-[10px] mt-4 font-mono opacity-50 uppercase flex items-center gap-1">
                <TrendingDown size={10} /> Economia total: {formatCurrency(results.totalDiscountAmount)}
              </p>
            </div>
            {/* Visual Decoration */}
            <div className="absolute right-[-20px] top-[-20px] opacity-10">
              <Calculator size={120} />
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="lg:col-span-7">
          <div className="bg-white border border-[#E4E3E0] rounded-2xl overflow-hidden shadow-sm flex flex-col h-full">
            <div className="p-6 border-bottom border-[#E4E3E0] bg-[#F8F8F8]">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xs uppercase tracking-widest font-semibold text-[#8E9299] mb-1">Resumo do Investimento</h2>
                  <p className="text-sm font-medium">Parcelamento em {installments}x de {formatCurrency(results.finalInstallment)}</p>
                </div>
                <button className="p-2 border border-[#E4E3E0] rounded-lg hover:bg-white transition-colors">
                  <Download size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 space-y-8">
              {/* Main Metrics */}
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-[#8E9299] font-mono">Valor da Parcela (Bruto)</span>
                  <p className="text-xl font-bold font-mono">{formatCurrency(results.grossInstallment)}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-[#8E9299] font-mono">Desconto por Parcela</span>
                  <p className="text-xl font-bold font-mono text-green-600">-{formatCurrency(results.discountAmount)}</p>
                </div>
              </div>

              <div className="h-px bg-[#E4E3E0]" />

              {/* Data Rows */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm py-2 group cursor-default">
                  <span className="text-[#8E9299] flex items-center gap-2">
                    <TrendingUp size={14} /> Curso Selecionado
                  </span>
                  <span className="font-semibold flex items-center gap-2">
                    {selectedCourse.name} <ChevronRight size={14} className="text-[#8E9299]" />
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm py-2 group cursor-default">
                  <span className="text-[#8E9299] flex items-center gap-2">
                    <Clock size={14} /> Horas no Semestre
                  </span>
                  <span className="font-mono font-medium">{hours} horas</span>
                </div>
                <div className="flex justify-between items-center text-sm py-2 group cursor-default">
                  <span className="text-[#8E9299] flex items-center gap-2">
                    <Percent size={14} /> Percentual de Desconto
                  </span>
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">-{discount}%</span>
                </div>
                <div className="flex justify-between items-center text-sm py-2 group cursor-default">
                  <span className="text-[#8E9299] flex items-center gap-2">
                    <CreditCard size={14} /> Parcelas
                  </span>
                  <span className="font-mono font-medium">{installments}x mensais</span>
                </div>
              </div>

              {/* Timeline/Progress visual */}
              <div className="pt-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] uppercase text-[#8E9299] font-mono">Parcela com Desconto</span>
                  <span className="text-2xl font-bold text-black">{formatCurrency(results.finalInstallment)}</span>
                </div>
                <div className="w-full h-8 bg-[#F8F8F8] border border-[#E4E3E0] rounded-lg overflow-hidden relative flex">
                  {/* Gross Bar */}
                  <div className="h-full bg-black/5 flex-1 relative flex items-center px-3">
                    <span className="text-[8px] uppercase font-bold text-black/30">Valor Bruto</span>
                  </div>
                  {/* Discount Portion */}
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${discount}%` }}
                    className="h-full bg-green-500/20 border-l border-green-500/30 flex items-center justify-end px-3"
                  >
                    <span className="text-[8px] uppercase font-bold text-green-600 whitespace-nowrap">Desconto {discount}%</span>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#141414] text-white/40 text-[10px] font-mono flex items-center gap-2 italic">
              <Info size={12} /> *Valores meramente ilustrativos baseados na tabela de cursos {new Date().getFullYear()}.
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
