// app/page.tsx
import Hero from './components/Hero';
import About from './components/about';
import PortfolioIndex from './components/portfolio';
import Contact from './components/contact';
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar/>
      <Hero />
      <About />
      <PortfolioIndex />
      <Contact />
    </main>
  );
}