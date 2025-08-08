'use client';

import { motion } from 'framer-motion';
import { Skeleton, SkeletonText, SkeletonCard } from './SkeletonLoader';

export function BlogListSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <Skeleton height="3rem" width="20rem" className="mx-auto mb-4" />
        <Skeleton height="1.25rem" width="32rem" className="mx-auto" />
      </div>

      {/* Featured Post */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex gap-8 items-start p-8">
          <div className="w-80 flex-shrink-0">
            <Skeleton height="12rem" rounded="lg" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton height="1rem" width="6rem" />
              <Skeleton height="1rem" width="8rem" />
            </div>
            <Skeleton height="2rem" width="90%" />
            <SkeletonText lines={3} />
            <div className="flex items-center space-x-4">
              <Skeleton height="2rem" width="6rem" rounded="md" />
              <Skeleton height="2rem" width="5rem" rounded="md" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 justify-center">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton 
            key={i} 
            height="2rem" 
            width={`${Math.random() * 4 + 6}rem`} 
            rounded="full" 
          />
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden group"
          >
            <Skeleton height="12rem" rounded="none" />
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Skeleton height="1rem" width="4rem" />
                <Skeleton height="1rem" width="6rem" />
              </div>
              <Skeleton height="1.5rem" width="90%" className="mb-3" />
              <SkeletonText lines={2} className="mb-4" />
              <div className="flex items-center justify-between">
                <Skeleton height="1rem" width="5rem" />
                <Skeleton height="1rem" width="3rem" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Skeleton height="3rem" width="8rem" rounded="lg" className="mx-auto" />
      </div>
    </motion.div>
  );
}

export function BlogPostSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Skeleton height="1rem" width="5rem" />
          <Skeleton height="1rem" width="7rem" />
        </div>
        <Skeleton height="3rem" width="90%" className="mx-auto mb-4" />
        <Skeleton height="1.25rem" width="70%" className="mx-auto mb-6" />
        
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <Skeleton height="2.5rem" width="2.5rem" rounded="full" />
            <div>
              <Skeleton height="1rem" width="6rem" className="mb-1" />
              <Skeleton height="0.75rem" width="4rem" />
            </div>
          </div>
          <Skeleton height="1rem" width="8rem" />
        </div>
      </div>

      {/* Featured Image */}
      <Skeleton height="20rem" rounded="xl" />

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {/* Intro paragraph */}
        <SkeletonText lines={4} className="mb-8" />

        {/* Section 1 */}
        <Skeleton height="2rem" width="60%" className="mb-4" />
        <SkeletonText lines={6} className="mb-6" />
        
        {/* Quote */}
        <div className="border-l-4 border-blue-500 pl-6 py-4 my-8 bg-blue-50 rounded-r-lg">
          <SkeletonText lines={2} />
        </div>

        {/* Section 2 */}
        <Skeleton height="2rem" width="70%" className="mb-4" />
        <SkeletonText lines={5} className="mb-6" />

        {/* Image */}
        <Skeleton height="16rem" rounded="lg" className="my-8" />

        {/* Section 3 */}
        <Skeleton height="2rem" width="50%" className="mb-4" />
        <SkeletonText lines={7} className="mb-6" />

        {/* List */}
        <div className="space-y-2 my-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton height="1rem" width="1rem" rounded="full" />
              <Skeleton height="1rem" width="85%" />
            </div>
          ))}
        </div>

        {/* Final paragraph */}
        <SkeletonText lines={3} />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-8 border-t border-gray-200">
        <span className="text-sm text-gray-600 mr-2">Etiketler:</span>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton 
            key={i} 
            height="1.5rem" 
            width={`${Math.random() * 3 + 4}rem`} 
            rounded="full" 
          />
        ))}
      </div>

      {/* Share buttons */}
      <div className="flex items-center justify-between pt-8 border-t border-gray-200">
        <div className="flex space-x-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} height="2.5rem" width="2.5rem" rounded="lg" />
          ))}
        </div>
        <Skeleton height="2rem" width="6rem" rounded="md" />
      </div>
    </motion.div>
  );
}

export function BlogCategoriesSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <Skeleton height="2.5rem" width="16rem" className="mx-auto mb-4" />
        <Skeleton height="1.25rem" width="28rem" className="mx-auto" />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow"
          >
            <Skeleton height="4rem" width="4rem" rounded="lg" className="mx-auto mb-4" />
            <Skeleton height="1.5rem" width="80%" className="mx-auto mb-2" />
            <SkeletonText lines={2} className="mb-4" />
            <div className="flex items-center justify-center space-x-4">
              <Skeleton height="0.75rem" width="4rem" />
              <Skeleton height="0.75rem" width="3rem" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
