import { useState, useEffect, createContext, useContext } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import About from './components/About'
import Agora from './components/Agora'
import Speaking from './components/Speaking'
import Blog from './components/Blog'
import Testimonials from './components/Testimonials'
import Agenda from './components/Agenda'
import Newsletter from './components/Newsletter'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PostPage from './pages/PostPage'
import AdminPage from './pages/AdminPage'
import AuthorityPage from './pages/AuthorityPage'
import ProductsPage from './pages/ProductsPage'
import { ContentProvider } from './context/ContentContext'

export const ThemeContext = createContext({ light: false, accent: '#7CFFB2' })
export function useTheme() { return useContext(ThemeContext) }

function useHashRoute() {
  const [hash, setHash] = useState(() => {
    if (window.location.pathname === '/admin') return '#/admin'
    return window.location.hash || '#/'
  })
  useEffect(() => {
    const handler = () => setHash(window.location.hash || '#/')
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])
  return hash
}

export default function App() {
  const [light, setLight] = useState(false)
  const hash = useHashRoute()

  const route = (() => {
    const h = hash.replace(/^#/, '')
    const m = h.match(/^\/post\/(.+)/)
    if (m) return { kind: 'post', slug: m[1] }
    if (h === '/admin') return { kind: 'admin' }
    if (h === '/autoridade') return { kind: 'autoridade' }
    if (h === '/produtos') return { kind: 'produtos' }
    return { kind: 'home' }
  })()

  // Apply theme attribute to html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', light ? 'light' : 'dark')
  }, [light])

  // Plain anchors (#sobre) must scroll even when arriving from a sub-page:
  // the hash changes to something that is not a route, so the home section
  // mounts first and only then can be scrolled into view.
  useEffect(() => {
    const h = hash.replace(/^#/, '')
    if (!h || h.startsWith('/')) return
    const el = document.getElementById(h)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  const accent = light ? '#1f7e4a' : '#7CFFB2'

  return (
    <ThemeContext.Provider value={{ light, accent, setLight }}>
      <ContentProvider>
        <style>{`:root { --rclr-accent: ${accent}; }`}</style>

        {route.kind === 'home' && (
          <div style={{ width: '100%', minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
            <Nav />
            <main>
              <Hero />
              <Manifesto />
              <About />
              <Agora />
              <Speaking />
              <Blog />
              <Testimonials />
              <Agenda />
              <Newsletter />
              <Contact />
            </main>
            <Footer />
          </div>
        )}

        {(route.kind === 'autoridade' || route.kind === 'produtos') && (
          <div style={{ width: '100%', minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
            <Nav />
            <main>
              {route.kind === 'autoridade' ? <AuthorityPage /> : <ProductsPage />}
            </main>
            <Footer />
          </div>
        )}

        {route.kind === 'post' && <PostPage slug={route.slug} />}
        {route.kind === 'admin' && <AdminPage />}
      </ContentProvider>
    </ThemeContext.Provider>
  )
}
