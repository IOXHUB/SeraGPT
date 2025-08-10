'use client';

import { motion } from 'framer-motion';
import { Skeleton, SkeletonText, SkeletonCard, SkeletonChart } from './SkeletonLoader';

export function ROIAnalysisSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <Skeleton height="2rem" width="60%" className="mx-auto mb-2" />
        <Skeleton height="1rem" width="40%" className="mx-auto" />
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
            <Skeleton height="1rem" width="50%" className="mb-2" />
            <Skeleton height="2.5rem" width="70%" className="mb-1" />
            <Skeleton height="0.75rem" width="60%" />
          </div>
        ))}
      </div>

      {/* Investment Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <Skeleton height="1.5rem" width="40%" className="mb-4" />
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="text-center p-4 bg-gray-50 rounded-lg">
              <Skeleton height="3rem" width="3rem" rounded="full" className="mx-auto mb-2" />
              <Skeleton height="1.5rem" width="80%" className="mx-auto mb-1" />
              <Skeleton height="0.75rem" width="60%" className="mx-auto mb-1" />
              <Skeleton height="0.75rem" width="40%" className="mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Revenue & Costs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <Skeleton height="1.5rem" width="50%" className="mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton height="1rem" width="60%" />
                <Skeleton height="1rem" width="25%" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <Skeleton height="1.5rem" width="50%" className="mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton height="1rem" width="50%" />
                <Skeleton height="1rem" width="30%" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <Skeleton height="1.5rem" width="40%" className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 rounded-lg border-l-4 border-gray-200 bg-gray-50">
              <Skeleton height="1rem" width="30%" className="mb-2" />
              <SkeletonText lines={2} />
              <div className="flex items-center justify-between mt-3">
                <Skeleton height="0.75rem" width="20%" />
                <Skeleton height="0.75rem" width="15%" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <Skeleton height="1.5rem" width="35%" className="mb-4" />
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Skeleton height="1rem" width="40%" className="mb-3" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton height="0.75rem" width="0.75rem" rounded="full" />
                  <Skeleton height="0.75rem" width="80%" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <Skeleton height="1rem" width="40%" className="mb-3" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton height="0.75rem" width="0.75rem" rounded="full" />
                  <Skeleton height="0.75rem" width="85%" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ClimateAnalysisSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <Skeleton height="2rem" width="65%" className="mx-auto mb-2" />
        <Skeleton height="1rem" width="45%" className="mx-auto" />
      </div>

      {/* Climate Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Sıcaklık', 'Nem', 'Yağış'].map((_, i) => (
          <div key={i} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton height="1.5rem" width="50%" />
              <Skeleton height="2rem" width="2rem" rounded="full" />
            </div>
            <Skeleton height="2rem" width="60%" className="mb-2" />
            <Skeleton height="1rem" width="80%" />
          </div>
        ))}
      </div>

      {/* Monthly Calendar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <Skeleton height="1.5rem" width="40%" className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="p-4 rounded-lg border border-gray-100">
              <Skeleton height="1rem" width="50%" className="mb-2" />
              <div className="space-y-1">
                <Skeleton height="0.75rem" width="80%" />
                <Skeleton height="0.75rem" width="70%" />
                <Skeleton height="0.75rem" width="90%" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <Skeleton height="1.5rem" width="35%" className="mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 rounded-lg bg-gray-50 border-l-4 border-gray-300">
              <div className="flex items-center justify-between mb-2">
                <Skeleton height="1rem" width="40%" />
                <Skeleton height="1.5rem" width="4rem" rounded="full" />
              </div>
              <SkeletonText lines={2} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function EquipmentAnalysisSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <Skeleton height="2rem" width="55%" className="mx-auto mb-2" />
        <Skeleton height="1rem" width="40%" className="mx-auto" />
      </div>

      {/* Equipment Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Skeleton height="3rem" width="3rem" rounded="lg" className="mr-4" />
              <div className="flex-1">
                <Skeleton height="1rem" width="70%" className="mb-1" />
                <Skeleton height="0.75rem" width="50%" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton height="0.75rem" width="100%" />
              <Skeleton height="0.75rem" width="85%" />
              <Skeleton height="0.75rem" width="90%" />
            </div>
            <div className="flex justify-between items-center mt-4">
              <Skeleton height="1rem" width="40%" />
              <Skeleton height="1.5rem" width="5rem" rounded="md" />
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Equipment List */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <Skeleton height="1.5rem" width="45%" className="mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center flex-1">
                <Skeleton height="2.5rem" width="2.5rem" rounded="lg" className="mr-4" />
                <div className="flex-1">
                  <Skeleton height="1rem" width="60%" className="mb-1" />
                  <Skeleton height="0.75rem" width="80%" />
                </div>
              </div>
              <div className="text-right">
                <Skeleton height="1rem" width="4rem" className="mb-1" />
                <Skeleton height="0.75rem" width="3rem" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Breakdown */}
      <SkeletonChart className="bg-white rounded-xl border border-gray-200" />
    </motion.div>
  );
}

export function MarketAnalysisSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <Skeleton height="2rem" width="50%" className="mx-auto mb-2" />
        <Skeleton height="1rem" width="35%" className="mx-auto" />
      </div>

      {/* Price Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {['Mevcut Fiyat', 'Trend', 'Hedef Fiyat', 'Kar Marjı'].map((_, i) => (
          <div key={i} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 text-center">
            <Skeleton height="1rem" width="60%" className="mx-auto mb-2" />
            <Skeleton height="2rem" width="70%" className="mx-auto mb-1" />
            <Skeleton height="0.75rem" width="50%" className="mx-auto" />
          </div>
        ))}
      </div>

      {/* Price Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <Skeleton height="1.5rem" width="40%" className="mb-4" />
        <Skeleton height="16rem" rounded="lg" />
      </div>

      {/* Market Segments */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <Skeleton height="1.5rem" width="50%" className="mb-4" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center">
                <Skeleton height="1rem" width="1rem" rounded="full" className="mr-3" />
                <Skeleton height="1rem" width="50%" />
              </div>
              <Skeleton height="1rem" width="25%" />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <Skeleton height="1.5rem" width="45%" className="mb-4" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <Skeleton height="1rem" width="60%" />
              <Skeleton height="1rem" width="30%" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function LayoutAnalysisSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <Skeleton height="2rem" width="60%" className="mx-auto mb-2" />
        <Skeleton height="1rem" width="45%" className="mx-auto" />
      </div>

      {/* Layout Summary */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
        <Skeleton height="1.5rem" width="40%" className="mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton height="2rem" width="60%" className="mx-auto mb-1" />
              <Skeleton height="0.75rem" width="80%" className="mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* 3D Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <Skeleton height="1.5rem" width="45%" className="mb-4" />
        <Skeleton height="20rem" rounded="lg" className="bg-gradient-to-br from-gray-100 to-gray-200" />
        <div className="flex justify-center mt-4 space-x-4">
          <Skeleton height="2rem" width="6rem" rounded="md" />
          <Skeleton height="2rem" width="6rem" rounded="md" />
          <Skeleton height="2rem" width="6rem" rounded="md" />
        </div>
      </div>

      {/* Technical Drawings */}
      <div className="grid md:grid-cols-2 gap-6">
        {['Site Planı', 'Kat Planı'].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
            <Skeleton height="1.5rem" width="50%" className="mb-4" />
            <Skeleton height="12rem" rounded="lg" />
            <div className="flex justify-between items-center mt-4">
              <Skeleton height="0.75rem" width="30%" />
              <Skeleton height="1.5rem" width="4rem" rounded="md" />
            </div>
          </div>
        ))}
      </div>

      {/* Construction Phases */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <Skeleton height="1.5rem" width="40%" className="mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Skeleton height="2rem" width="2rem" rounded="full" className="mr-4" />
              <div className="flex-1">
                <Skeleton height="1rem" width="70%" className="mb-1" />
                <Skeleton height="0.75rem" width="90%" />
              </div>
              <Skeleton height="1rem" width="4rem" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
