'use client';

import { motion } from 'framer-motion';
import { Skeleton } from './skeletons/SkeletonLoader';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'blue' | 'green' | 'purple' | 'gray';
  className?: string;
}

export function LoadingSpinner({ size = 'md', color = 'blue', className = '' }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colors = {
    blue: 'border-blue-600',
    green: 'border-green-600',
    purple: 'border-purple-600',
    gray: 'border-gray-600'
  };

  return (
    <motion.div
      className={`${sizes[size]} ${colors[color]} border-2 border-t-transparent rounded-full ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );
}

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'purple' | 'gray';
  className?: string;
}

export function LoadingDots({ size = 'md', color = 'blue', className = '' }: LoadingDotsProps) {
  const sizes = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const colors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    gray: 'bg-gray-600'
  };

  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`${sizes[size]} ${colors[color]} rounded-full`}
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}

interface LoadingPulseProps {
  className?: string;
  children?: React.ReactNode;
}

export function LoadingPulse({ className = '', children }: LoadingPulseProps) {
  return (
    <motion.div
      className={className}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

interface ProgressiveLoadingProps {
  steps: Array<{
    label: string;
    duration: number;
    icon?: string;
  }>;
  currentStep: number;
  className?: string;
}

export function ProgressiveLoading({ steps, currentStep, className = '' }: ProgressiveLoadingProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isPending = index > currentStep;

        return (
          <motion.div
            key={index}
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              isCompleted 
                ? 'bg-green-500 border-green-500 text-white' 
                : isActive 
                  ? 'border-blue-500 text-blue-500' 
                  : 'border-gray-300 text-gray-400'
            }`}>
              {isCompleted ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-sm font-bold"
                >
                  ✓
                </motion.span>
              ) : isActive ? (
                <LoadingSpinner size="sm" />
              ) : (
                <span className="text-sm">{step.icon || index + 1}</span>
              )}
            </div>
            <div className="flex-1">
              <p className={`font-medium ${
                isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
              }`}>
                {step.label}
              </p>
              {isActive && (
                <motion.div
                  className="w-full bg-gray-200 rounded-full h-1 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="bg-blue-600 h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: step.duration }}
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

interface AnalysisLoadingProps {
  type: 'roi' | 'climate' | 'equipment' | 'market' | 'layout';
  progress?: number;
  currentStep?: string;
  className?: string;
}

export function AnalysisLoading({ type, progress = 0, currentStep, className = '' }: AnalysisLoadingProps) {
  const analysisConfig = {
    roi: {
      title: 'ROI Analizi Hesaplanıyor',
      icon: '💰',
      steps: [
        'Finansal veriler işleniyor',
        'Yatırım maliyetleri hesaplanıyor',
        'Getiri projeksiyonları oluşturuluyor',
        'Risk analizi yapılıyor',
        'Rapor hazırlanıyor'
      ]
    },
    climate: {
      title: 'İklim Analizi Yapılıyor',
      icon: '🌤️',
      steps: [
        'Meteoroloji verileri alınıyor',
        'Bölgesel iklim analizi',
        'Sezon döngüleri hesaplanıyor',
        'Risk faktörleri değerlendiriliyor',
        'Öneriler hazırlanıyor'
      ]
    },
    equipment: {
      title: 'Ekipman Analizi Hazırlanıyor',
      icon: '🔧',
      steps: [
        'Ekipman veritabanı taranıyor',
        'Maliyet analizi yapılıyor',
        'Tedarikçi bilgileri güncelleniyor',
        'Uyumluluk kontrolleri',
        'Öneriler derleniyor'
      ]
    },
    market: {
      title: 'Pazar Analizi İşleniyor',
      icon: '📈',
      steps: [
        'Piyasa verileri toplanıyor',
        'Fiyat trendleri analiz ediliyor',
        'Rekabet analizi yapılıyor',
        'Talep projeksiyonları',
        'Strateji önerileri hazırlanıyor'
      ]
    },
    layout: {
      title: 'Layout Planı Oluşturuluyor',
      icon: '📐',
      steps: [
        'Mekân ölçümleri işleniyor',
        '3D model oluşturuluyor',
        'Optimizasyon hesaplamaları',
        'Teknik çizimler hazırlanıyor',
        'Plan raporlanıyor'
      ]
    }
  };

  const config = analysisConfig[type];
  const currentStepIndex = Math.min(Math.floor(progress / 20), config.steps.length - 1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white rounded-xl border border-gray-200 p-8 text-center max-w-md mx-auto ${className}`}
    >
      {/* Loading Icon */}
      <motion.div
        className="text-6xl mb-4"
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {config.icon}
      </motion.div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {config.title}
      </h3>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Current Step */}
      <p className="text-gray-600 text-sm mb-4">
        {currentStep || config.steps[currentStepIndex]}
      </p>

      {/* Steps List */}
      <div className="space-y-2 text-left">
        {config.steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm">
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              index < currentStepIndex 
                ? 'bg-green-500 border-green-500' 
                : index === currentStepIndex 
                  ? 'border-blue-500' 
                  : 'border-gray-300'
            }`}>
              {index < currentStepIndex ? (
                <span className="text-white text-xs">✓</span>
              ) : index === currentStepIndex ? (
                <LoadingDots size="sm" />
              ) : (
                <span className="text-gray-400 text-xs">{index + 1}</span>
              )}
            </div>
            <span className={
              index <= currentStepIndex ? 'text-gray-900' : 'text-gray-400'
            }>
              {step}
            </span>
          </div>
        ))}
      </div>

      {/* Processing Time */}
      <div className="mt-6 text-xs text-gray-500">
        <LoadingDots size="sm" className="mx-auto mb-2" />
        <p>Analiz tamamlanması 2-5 dakika sürebilir</p>
      </div>
    </motion.div>
  );
}

export function ErrorState({ 
  title = 'Bir hata oluştu',
  message = 'İşlem sırasında beklenmeyen bir hata oluştu.',
  onRetry,
  className = ''
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md mx-auto ${className}`}
    >
      <div className="text-4xl mb-4">❌</div>
      <h3 className="text-lg font-semibold text-red-900 mb-2">{title}</h3>
      <p className="text-red-700 text-sm mb-4">{message}</p>
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Tekrar Dene
        </motion.button>
      )}
    </motion.div>
  );
}
