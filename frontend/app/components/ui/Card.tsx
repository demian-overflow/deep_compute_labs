"use client"

import { PropsWithChildren } from "react"

type CardProps = PropsWithChildren<{
  className?: string
}>

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-md p-2 shadow-sm ${className}`}>
      {children}
    </div>
  )
}
