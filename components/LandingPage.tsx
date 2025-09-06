import { Button } from '@/components/ui/button'
import { GridBeams } from '@/components/magicui/grid-beams'
import FloatingHeader from '@/components/FloatingHeader'
import Image from 'next/image'
import Link from 'next/link'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <GridBeams
        gridSize={60}
        gridColor="rgba(255, 255, 255, 0.03)"
        rayCount={20}
        rayOpacity={0.4}
        raySpeed={1.2}
        rayLength="50vh"
        gridFadeStart={20}
        gridFadeEnd={80}
        backgroundColor="#000000"
        className="absolute inset-0 w-full h-full"
      >
        {/* Header */}
        <FloatingHeader>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-white/70 hover:text-white transition-colors text-sm font-medium">Features</Link>
            <Link href="#pricing" className="text-white/70 hover:text-white transition-colors text-sm font-medium">Pricing</Link>
            <Link href="#about" className="text-white/70 hover:text-white transition-colors text-sm font-medium">About</Link>
          </nav>
        </FloatingHeader>

        {/* Hero Section */}
        <section className="px-6 pt-40 pb-32 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/80 text-sm font-medium">Real-time collaboration platform</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
                Collaborate
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Seamlessly
                </span>
              </h1>
              
              <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
                The future of document collaboration. Real-time editing, intelligent suggestions, 
                and seamless team coordination in one powerful platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/sign-up">
                  <Button 
                    variant="default" 
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 text-lg px-8 py-4 h-auto font-semibold"
                  >
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4 h-auto font-semibold"
                  >
                    Watch Demo
                  </Button>
                </Link>
              </div>
              
              <div className="mt-16 flex items-center justify-center gap-8 text-white/40 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-32 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Powerful Features
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Everything you need to collaborate effectively and create amazing documents together.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Real-time Collaboration</h3>
                  <p className="text-white/60 leading-relaxed">
                    Work together in real-time with live cursors, instant updates, and seamless synchronization across all devices.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Smart Version Control</h3>
                  <p className="text-white/60 leading-relaxed">
                    Never lose your work with intelligent version history, automatic backups, and one-click restore functionality.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Integrated Communication</h3>
                  <p className="text-white/60 leading-relaxed">
                    Built-in chat, comments, and notifications keep your team connected without leaving the document.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to transform your workflow?
              </h2>
              <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
                Join thousands of teams already using LiveDocs to collaborate more effectively.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/sign-up">
                  <Button 
                    variant="default" 
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 text-lg px-8 py-4 h-auto font-semibold"
                  >
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4 h-auto font-semibold"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <span className="text-white text-lg font-bold">LiveDocs</span>
              </div>
              
              <div className="flex gap-8 text-white/60 text-sm">
                <Link href="#privacy" className="hover:text-white transition-colors">Privacy</Link>
                <Link href="#terms" className="hover:text-white transition-colors">Terms</Link>
                <Link href="#security" className="hover:text-white transition-colors">Security</Link>
              </div>
            </div>
          </div>
        </footer>
      </GridBeams>
    </div>
  )
}

export default LandingPage
