'use client';

import Image from 'next/image';

interface SeraGPTLogoProps {
  size?: 'sm' | 'md' | 'lg';
  priority?: boolean;
  className?: string;
  variant?: 'default' | 'white';
}

const LOGO_SIZES = {
  sm: { width: 96, height: 24, className: 'h-6 w-auto' },
  md: { width: 120, height: 32, className: 'h-8 w-auto' },
  lg: { width: 160, height: 40, className: 'h-10 w-auto' }
};

const LOGO_URLS = {
  default: 'https://cdn.builder.io/api/v1/image/assets/2c7ec7c93776440b923d3518963fc941/96da5382e9584c3fb2d32eca60944359',
  white: 'https://cdn.builder.io/api/v1/image/assets/2c7ec7c93776440b923d3518963fc941/9942a1118e1c4e27a983ab8684700f60'
};

const BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

export default function SeraGPTLogo({ size = 'md', priority = false, className, variant = 'default' }: SeraGPTLogoProps) {
  const sizeConfig = LOGO_SIZES[size];
  const finalClassName = className || sizeConfig.className;

  return (
    <Image
      src={LOGO_URLS[variant]}
      alt="SeraGPT Logo"
      width={sizeConfig.width}
      height={sizeConfig.height}
      className={finalClassName}
      priority={priority}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      sizes="(max-width: 768px) 96px, (max-width: 1200px) 120px, 160px"
    />
  );
}
