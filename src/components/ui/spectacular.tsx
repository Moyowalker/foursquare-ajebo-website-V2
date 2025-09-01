'use client'

import React, { useState } from 'react'

// Foursquare Brand Colors
const colors = {
  red: '#b91c1c',
  blue: '#1e40af',
  purple: '#8b5cf6',
  orange: '#f59e0b'
}

interface SpectacularButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export const SpectacularButton: React.FC<SpectacularButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: `bg-gradient-to-r from-red-600 to-orange-500 text-white hover:from-red-700 hover:to-orange-600 focus:ring-red-500 shadow-lg hover:shadow-xl`,
    secondary: `bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl`,
    outline: `border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:ring-red-500`
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const disabledClasses = 'opacity-50 cursor-not-allowed transform-none hover:scale-100'
  
  const combinedClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? disabledClasses : ''} ${className}`

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {children}
    </button>
  )
}

interface SpectacularCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  onClick?: () => void
}

export const SpectacularCard: React.FC<SpectacularCardProps> = ({
  children,
  className = '',
  hover = true,
  glow = false,
  onClick
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
  }

  const baseClasses = 'relative bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300'
  const hoverClasses = hover ? 'hover:shadow-2xl hover:-translate-y-1' : ''
  const glowClasses = glow ? 'shadow-lg shadow-red-500/25' : 'shadow-md'
  const clickableClasses = onClick ? 'cursor-pointer' : ''

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${glowClasses} ${clickableClasses} ${className}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(185, 28, 28, 0.1) 0%, transparent 70%)`
        }}
      />
      {children}
    </div>
  )
}

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  intensity?: 'light' | 'medium' | 'heavy'
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  intensity = 'medium'
}) => {
  const intensities = {
    light: 'bg-white/10 backdrop-blur-sm border-white/20',
    medium: 'bg-white/20 backdrop-blur-md border-white/30',
    heavy: 'bg-white/30 backdrop-blur-lg border-white/40'
  }

  return (
    <div className={`rounded-2xl border ${intensities[intensity]} shadow-lg ${className}`}>
      {children}
    </div>
  )
}

interface PulsingOrbProps {
  color?: 'red' | 'blue' | 'purple' | 'orange'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  intensity?: 'low' | 'medium' | 'high'
  className?: string
}

export const PulsingOrb: React.FC<PulsingOrbProps> = ({
  color = 'red',
  size = 'md',
  intensity = 'medium',
  className = ''
}) => {
  const colorClasses = {
    red: colors.red,
    blue: colors.blue,
    purple: colors.purple,
    orange: colors.orange
  }

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const intensityClasses = {
    low: 'animate-pulse',
    medium: 'animate-pulse',
    high: 'animate-bounce'
  }

  return (
    <div
      className={`rounded-full ${sizeClasses[size]} ${intensityClasses[intensity]} ${className}`}
      style={{
        backgroundColor: colorClasses[color],
        boxShadow: `0 0 20px ${colorClasses[color]}40`
      }}
    />
  )
}

interface SpectacularBadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const SpectacularBadge: React.FC<SpectacularBadgeProps> = ({
  children,
  variant = 'info',
  size = 'md',
  className = ''
}) => {
  const variants = {
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200'
  }

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  return (
    <span className={`inline-flex items-center border rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  )
}

interface FloatingActionButtonProps {
  onClick: () => void
  icon: React.ReactNode
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  color?: 'red' | 'blue' | 'purple' | 'orange'
  className?: string
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  icon,
  position = 'bottom-right',
  color = 'red',
  className = ''
}) => {
  const positions = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6'
  }

  const colorClasses = {
    red: 'bg-red-600 hover:bg-red-700',
    blue: 'bg-blue-600 hover:bg-blue-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
    orange: 'bg-orange-500 hover:bg-orange-600'
  }

  return (
    <button
      onClick={onClick}
      className={`${positions[position]} w-14 h-14 ${colorClasses[color]} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 z-50 ${className}`}
    >
      {icon}
    </button>
  )
}

interface SpectacularLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'red' | 'blue' | 'purple' | 'orange'
  text?: string
  className?: string
}

export const SpectacularLoader: React.FC<SpectacularLoaderProps> = ({
  size = 'md',
  color = 'red',
  text,
  className = ''
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const colorClasses = {
    red: 'border-red-600',
    blue: 'border-blue-600',
    purple: 'border-purple-600',
    orange: 'border-orange-500'
  }

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div
        className={`${sizes[size]} border-4 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}
      />
      {text && (
        <p className="text-gray-600 text-sm font-medium">{text}</p>
      )}
    </div>
  )
}

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  gradient?: 'primary' | 'secondary' | 'rainbow'
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = '',
  gradient = 'primary'
}) => {
  const gradients = {
    primary: 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500',
    secondary: 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600',
    rainbow: 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500'
  }

  return (
    <span className={`${gradients[gradient]} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  )
}
