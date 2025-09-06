import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ReactNode } from 'react'

interface FloatingHeaderProps {
  children?: ReactNode
  className?: string
  showAuth?: boolean
}

const FloatingHeader = ({ children, className, showAuth = true }: FloatingHeaderProps) => {
  return (
    <header className={cn("fixed top-6 left-1/2 transform -translate-x-1/2 w-[calc(100%-3rem)] max-w-7xl z-50 transition-all duration-300 hover:bg-white/10", className)}>
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl hover:shadow-white/10 hover:border-white/20 transition-all duration-300">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-white text-2xl font-bold">LiveDocs</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {children}
            
            {showAuth && (
              <>
                <Link href="/sign-in" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                  Sign In
                </Link>
                <Link href="/sign-up">
                  <Button variant="default" className="bg-white text-black hover:bg-white/90 font-medium">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default FloatingHeader
