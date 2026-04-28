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
  ChevronRight,
  TrendingUp,
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
    const pricePerHour = selectedCourse.creditValue / 20;
    const totalSemester = pricePerHour * hours;
    const grossInstallment = totalSemester / installments;
    const discountAmountTotal = totalSemester * (discount / 100);
    const totalWithDiscount = totalSemester - discountAmountTotal;
    const installmentWithDiscount = totalWithDiscount / installments;
    const discountPerInstallment = grossInstallment - installmentWithDiscount;

    return {
      pricePerHour,
      totalSemester,
      grossInstallment,
      discountPerInstallment,
      installmentWithDiscount,
      discountAmountTotal,
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
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4 font-sans selection:bg-pink-200">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-6xl min-h-[700px] rounded-[40px] shadow-2xl flex flex-col md:flex-row overflow-hidden border-8 border-white"
      >
        
        {/* Left Side: Inputs (Indigo) */}
        <div className="w-full md:w-5/12 bg-indigo-600 p-8 lg:p-12 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="bg-indigo-400 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
              <Calculator className="text-white" size={32} />
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-4">Calculadora de Matrícula</h1>
            <p className="text-indigo-100 text-base lg:text-lg mb-8 opacity-80">Planeje seu próximo semestre com precisão e transparência.</p>
            
            <div className="space-y-6">
              {/* Course Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                  <GraduationCap size={12} /> Escolha sua Graduação
                </label>
                <select 
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full bg-indigo-700 border-2 border-indigo-400 rounded-2xl p-4 text-white focus:outline-none focus:ring-4 focus:ring-pink-400 appearance-none cursor-pointer text-sm"
                >
                  {COURSES.map(course => (
                    <option key={course.id} value={course.id} className="bg-indigo-800">
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Hours and Discount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                    <Clock size={12} /> Carga Horária (h)
                  </label>
                  <input 
                    type="number" 
                    value={hours}
                    step="10"
                    min="10"
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full bg-indigo-700 border-2 border-indigo-400 rounded-2xl p-4 text-white focus:outline-none focus:ring-4 focus:ring-pink-400 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                    <Percent size={12} /> Desconto (%)
                  </label>
                  <input 
                    type="number" 
                    value={discount}
                    min="0"
                    max="100"
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-full bg-indigo-700 border-2 border-indigo-400 rounded-2xl p-4 text-white focus:outline-none focus:ring-4 focus:ring-pink-400 text-sm"
                  />
                </div>
              </div>

              {/* Installments Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 flex items-center gap-2">
                  <CreditCard size={12} /> Parcelamento
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <button
                      key={n}
                      onClick={() => setInstallments(n)}
                      className={`rounded-xl py-2 font-bold text-xs transition-all border-2 ${
                        installments === n 
                        ? 'bg-pink-500 text-white border-pink-400 shadow-md' 
                        : 'bg-indigo-700 text-indigo-200 border-indigo-400 hover:border-white'
                      }`}
                    >
                      {n}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Simulator button removed */}
        </div>

        {/* Right Side: Results (White) */}
        <div className="w-full md:w-7/12 p-8 lg:p-16 flex flex-col justify-center">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
            <div>
              <p className="text-gray-400 font-bold uppercase tracking-tight text-xs mb-1">Resumo da Simulação</p>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">{selectedCourse.name}</h2>
            </div>
            {/* Semester tag removed */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
              <p className="text-gray-500 font-medium text-sm mb-1 uppercase tracking-wide">Parcelas</p>
              <p className="text-2xl lg:text-3xl font-black text-gray-900">{installments < 10 ? `0${installments}` : installments} meses</p>
            </div>
            <div className="p-6 bg-pink-50 rounded-3xl border border-pink-100">
              <p className="text-pink-600 font-medium text-sm mb-1 uppercase tracking-wide">Desconto Total</p>
              <p className="text-2xl lg:text-3xl font-black text-pink-600">{formatCurrency(results.discountAmountTotal)}</p>
            </div>
          </div>

          <div className="space-y-4 border-t-2 border-dashed border-gray-200 pt-8">
            <div className="flex justify-between items-center group">
              <span className="text-gray-500 font-medium text-lg">Valor Bruto da Parcela</span>
              <span className="text-gray-900 font-bold text-xl">{formatCurrency(results.grossInstallment)}</span>
            </div>
            <div className="flex justify-between items-center group">
              <span className="text-gray-500 font-medium text-lg">Abatimento Mensal</span>
              <span className="text-pink-500 font-bold text-xl text-right">-{formatCurrency(results.discountPerInstallment)}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between sm:items-end pt-6 gap-6">
              <div>
                <span className="text-indigo-600 font-black text-sm uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp size={14} /> Valor Líquido por Mês
                </span>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={results.installmentWithDiscount}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl lg:text-6xl font-black text-indigo-600 tracking-tighter"
                  >
                    {formatCurrency(results.installmentWithDiscount)}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="sm:text-right bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">Investimento Semestral</p>
                <p className="text-indigo-900 font-black text-xl">{formatCurrency(results.totalWithDiscount)}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 border-2 border-gray-200 text-gray-400 font-bold py-4 rounded-2xl hover:bg-gray-50 hover:text-gray-600 transition-all flex items-center justify-center gap-2">
              <Download size={20} />
              Exportar PDF
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
