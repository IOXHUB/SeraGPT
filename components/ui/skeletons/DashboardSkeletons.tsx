'use client';

import { motion } from 'framer-motion';
import { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar } from './SkeletonLoader';

export function DashboardOverviewSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Skeleton height="2rem" width="16rem" className="mb-2" />
          <Skeleton height="1rem" width="12rem" />
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Skeleton height="2.5rem" width="8rem" rounded="lg" />
          <Skeleton height="2.5rem" width="6rem" rounded="lg" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton height="3rem" width="3rem" rounded="lg" />
              <Skeleton height="1rem" width="4rem" />
            </div>
            <Skeleton height="2rem" width="60%" className="mb-1" />
            <Skeleton height="0.75rem" width="80%" />
            <div className="flex items-center mt-3">
              <Skeleton height="0.75rem" width="3rem" />
              <Skeleton height="0.75rem" width="6rem" className="ml-2" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <Skeleton height="1.5rem" width="40%" className="mb-4" />
          <Skeleton height="16rem" rounded="lg" />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <Skeleton height="1.5rem" width="45%" className="mb-4" />
          <Skeleton height="16rem" rounded="lg" />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <Skeleton height="1.5rem" width="40%" className="mb-4" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <SkeletonAvatar size="md" />
                <div className="flex-1">
                  <Skeleton height="1rem" width="70%" className="mb-1" />
                  <Skeleton height="0.75rem" width="50%" />
                </div>
                <Skeleton height="0.75rem" width="4rem" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <Skeleton height="1.5rem" width="50%" className="mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Skeleton height="1rem" width="1rem" rounded="full" />
                  <Skeleton height="0.75rem" width="6rem" />
                </div>
                <Skeleton height="0.75rem" width="3rem" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectListSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Skeleton height="2rem" width="12rem" />
        <Skeleton height="2.5rem" width="8rem" rounded="lg" />
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Skeleton height="2.5rem" width="10rem" rounded="lg" />
        <Skeleton height="2.5rem" width="8rem" rounded="lg" />
        <Skeleton height="2.5rem" width="6rem" rounded="lg" />
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <Skeleton height="1.25rem" width="80%" className="mb-2" />
                <Skeleton height="0.75rem" width="60%" />
              </div>
              <Skeleton height="1.5rem" width="4rem" rounded="full" />
            </div>
            
            <SkeletonText lines={2} className="mb-4" />
            
            <div className="flex items-center justify-between mb-4">
              <Skeleton height="0.75rem" width="5rem" />
              <Skeleton height="0.75rem" width="4rem" />
            </div>
            
            <div className="flex items-center space-x-3">
              <SkeletonAvatar size="sm" />
              <Skeleton height="0.75rem" width="6rem" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function ReportListSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Skeleton height="2rem" width="10rem" />
        <div className="flex space-x-3">
          <Skeleton height="2.5rem" width="6rem" rounded="lg" />
          <Skeleton height="2.5rem" width="8rem" rounded="lg" />
        </div>
      </div>

      {/* Report Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <Skeleton height="1rem" width="6rem" />
            </div>
            <div className="col-span-2">
              <Skeleton height="1rem" width="4rem" />
            </div>
            <div className="col-span-2">
              <Skeleton height="1rem" width="3rem" />
            </div>
            <div className="col-span-2">
              <Skeleton height="1rem" width="5rem" />
            </div>
            <div className="col-span-2">
              <Skeleton height="1rem" width="4rem" />
            </div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-200">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="px-6 py-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4">
                  <Skeleton height="1rem" width="90%" className="mb-1" />
                  <Skeleton height="0.75rem" width="70%" />
                </div>
                <div className="col-span-2">
                  <Skeleton height="1.5rem" width="4rem" rounded="full" />
                </div>
                <div className="col-span-2">
                  <Skeleton height="0.75rem" width="5rem" />
                </div>
                <div className="col-span-2">
                  <div className="flex items-center space-x-2">
                    <SkeletonAvatar size="sm" />
                    <Skeleton height="0.75rem" width="4rem" />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex space-x-2">
                    <Skeleton height="2rem" width="2rem" rounded="md" />
                    <Skeleton height="2rem" width="2rem" rounded="md" />
                    <Skeleton height="2rem" width="2rem" rounded="md" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function SettingsSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="mb-8">
        <Skeleton height="2rem" width="8rem" className="mb-2" />
        <Skeleton height="1rem" width="20rem" />
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <Skeleton height="1.25rem" width="6rem" className="mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-3 p-2">
                  <Skeleton height="1rem" width="1rem" />
                  <Skeleton height="1rem" width="8rem" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <Skeleton height="1.5rem" width="10rem" className="mb-6" />
            
            <div className="space-y-6">
              {/* Profile Section */}
              <div>
                <Skeleton height="1rem" width="6rem" className="mb-4" />
                <div className="flex items-center space-x-4 mb-4">
                  <SkeletonAvatar size="lg" />
                  <div className="flex-1">
                    <Skeleton height="2.5rem" width="8rem" rounded="md" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i}>
                      <Skeleton height="1rem" width="6rem" className="mb-2" />
                      <Skeleton height="2.5rem" width="100%" rounded="md" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferences Section */}
              <div>
                <Skeleton height="1rem" width="8rem" className="mb-4" />
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Skeleton height="1rem" width="10rem" className="mb-1" />
                        <Skeleton height="0.75rem" width="15rem" />
                      </div>
                      <Skeleton height="1.5rem" width="3rem" rounded="full" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4 pt-4">
                <Skeleton height="2.5rem" width="6rem" rounded="lg" />
                <Skeleton height="2.5rem" width="4rem" rounded="lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function TokensSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <Skeleton height="2rem" width="12rem" className="mx-auto mb-2" />
        <Skeleton height="1rem" width="18rem" className="mx-auto" />
      </div>

      {/* Token Balance */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-8 text-center">
        <Skeleton height="1rem" width="8rem" className="mx-auto mb-4 bg-white/20" />
        <Skeleton height="3rem" width="10rem" className="mx-auto mb-2 bg-white/20" />
        <Skeleton height="1rem" width="12rem" className="mx-auto bg-white/20" />
      </div>

      {/* Token Packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <Skeleton height="3rem" width="3rem" rounded="full" className="mx-auto mb-4" />
            <Skeleton height="1.5rem" width="8rem" className="mx-auto mb-2" />
            <Skeleton height="2rem" width="6rem" className="mx-auto mb-4" />
            <SkeletonText lines={2} className="mb-4" />
            <Skeleton height="2.5rem" width="100%" rounded="lg" />
          </div>
        ))}
      </div>

      {/* Usage History */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <Skeleton height="1.5rem" width="8rem" className="mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Skeleton height="2rem" width="2rem" rounded="full" />
                <div>
                  <Skeleton height="1rem" width="10rem" className="mb-1" />
                  <Skeleton height="0.75rem" width="6rem" />
                </div>
              </div>
              <div className="text-right">
                <Skeleton height="1rem" width="3rem" className="mb-1" />
                <Skeleton height="0.75rem" width="4rem" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
