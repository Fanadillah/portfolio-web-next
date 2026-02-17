"use client";
import { getPortfolio } from "@/lib/posts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Portfolio } from "@/types/portfolio";
import Link from "next/link";

export default function PortfolioDetail() {
  const params = useParams();
  const [project, setProject] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  useEffect(() => {
    async function loadProject() {
      try {
        const data = await getPortfolio(params.id as string);
        setProject(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Project:", error);
        setLoading(false);
      }
    }
    loadProject();
  }, [params.id]);

  // Close lightbox on ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
    }
    if (lightboxOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-900 border-t-blue-400"></div>
            <div className="absolute inset-0 rounded-full blur-md bg-blue-500/20 animate-pulse"></div>
          </div>
          <p className="text-blue-300/70 text-sm tracking-widest uppercase animate-pulse">Memuat proyek…</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-blue-950 px-4">
        <div className="max-w-xl w-full text-center bg-white/5 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
          <h1 className="text-2xl font-semibold text-white mb-4">Projek Tidak Ditemukan</h1>
          <p className="text-slate-300 mb-6">Maaf, proyek yang kamu cari tidak tersedia atau telah dihapus.</p>
          <Link
            href="/"
            className="inline-block px-5 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        .portfolio-root { font-family: 'DM Sans', sans-serif; }
        .font-display   { font-family: 'Syne', sans-serif; }

        /* ── Background ── */
        .mesh-bg {
          background-color: #0a0f1e;
          background-image:
            radial-gradient(ellipse 80% 60% at 10% -10%, rgba(30,80,200,0.35) 0%, transparent 65%),
            radial-gradient(ellipse 60% 50% at 95% 20%,  rgba(56,130,246,0.20) 0%, transparent 60%),
            radial-gradient(ellipse 70% 80% at 50% 110%, rgba(14,50,140,0.45) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 80% 80%,  rgba(99,179,237,0.08) 0%, transparent 55%);
        }
        .mesh-bg::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; opacity: 0.6; z-index: 0;
        }

        /* ── Orbs ── */
        .orb { position: fixed; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0; animation: float 12s ease-in-out infinite alternate; }
        .orb-1 { width:500px; height:500px; background:radial-gradient(circle,rgba(37,99,235,0.18) 0%,transparent 70%); top:-120px; left:-180px; }
        .orb-2 { width:380px; height:380px; background:radial-gradient(circle,rgba(96,165,250,0.12) 0%,transparent 70%); bottom:-100px; right:-100px; animation-delay:-5s; animation-duration:15s; }
        @keyframes float { from{transform:translate(0,0) scale(1)} to{transform:translate(30px,20px) scale(1.06)} }

        /* ── Image card glow ── */
        .img-glow-wrap { position: relative; }
        .img-glow-wrap::after {
          content:''; position:absolute; inset:-2px; border-radius:20px;
          background:linear-gradient(135deg,rgba(96,165,250,0.35) 0%,rgba(30,64,175,0.15) 50%,rgba(99,179,237,0.25) 100%);
          z-index:-1; filter:blur(12px); opacity:0; transition:opacity 0.4s ease;
        }
        .img-glow-wrap:hover::after { opacity:1; }

        /* ── Click-to-zoom overlay on thumbnail ── */
        .img-click-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(10,18,40,0) 30%, rgba(10,18,40,0.80) 100%);
          opacity: 0; transition: opacity 0.28s ease;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0.55rem;
          cursor: zoom-in;
        }
        .img-click-overlay:hover { opacity: 1; }
        .zoom-icon {
          width: 50px; height: 50px; border-radius: 50%;
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          border: 1.5px solid rgba(255,255,255,0.22);
          display: flex; align-items: center; justify-content: center;
          transform: scale(0.8); transition: transform 0.22s ease;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
        }
        .img-click-overlay:hover .zoom-icon { transform: scale(1); }

        /* ── Lightbox ── */
        .lightbox-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(4,8,20,0.93);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
          animation: lb-fade-in 0.25s ease both;
        }
        @keyframes lb-fade-in  { from{opacity:0} to{opacity:1} }

        .lightbox-img-wrap {
          position: relative;
          animation: lb-pop-in 0.3s cubic-bezier(.34,1.56,.64,1) both;
        }
        @keyframes lb-pop-in {
          from { opacity:0; transform: scale(0.86) translateY(16px); }
          to   { opacity:1; transform: scale(1) translateY(0); }
        }

        .lightbox-img-wrap img {
          display: block;
          max-width: min(90vw, 1100px);
          max-height: 82vh;
          width: auto; height: auto;
          border-radius: 14px;
          box-shadow:
            0 0 0 1px rgba(96,165,250,0.2),
            0 30px 90px rgba(0,0,0,0.75),
            0 0 100px rgba(37,99,235,0.12);
        }

        /* Close button */
        .lb-close {
          position: absolute; top: -15px; right: -15px;
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg,#1e40af 0%,#2563eb 100%);
          border: 1.5px solid rgba(96,165,250,0.4);
          color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.45), 0 0 14px rgba(59,130,246,0.3);
          transition: transform 0.18s ease, background 0.18s ease;
          z-index: 1;
        }
        .lb-close:hover {
          transform: scale(1.14) rotate(90deg);
          background: linear-gradient(135deg,#3b82f6 0%,#60a5fa 100%);
        }

        /* Caption + hint */
        .lb-caption {
          text-align: center; margin-top: 0.9rem;
          font-size: 0.8rem; color: rgba(148,163,184,0.65);
          letter-spacing: 0.04em;
          animation: lb-pop-in 0.4s 0.08s both;
        }
        .lb-esc-hint {
          position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
          font-size: 0.72rem; color: rgba(148,163,184,0.40);
          letter-spacing: 0.06em;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 0.3rem 0.85rem; border-radius: 999px; pointer-events: none;
          animation: lb-pop-in 0.4s 0.15s both;
        }

        /* ── Glass card ── */
        .glass-card {
          background: linear-gradient(135deg,rgba(255,255,255,0.055) 0%,rgba(255,255,255,0.025) 100%);
          border: 1px solid rgba(148,190,255,0.10);
          backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
        }
        .glow-divider {
          height: 1px;
          background: linear-gradient(90deg,transparent,rgba(96,165,250,0.5) 40%,rgba(96,165,250,0.5) 60%,transparent);
          margin: 1.5rem 0;
        }

        /* ── Tech badge ── */
        .tech-badge {
          background: linear-gradient(135deg,rgba(37,99,235,0.30) 0%,rgba(29,78,216,0.18) 100%);
          border: 1px solid rgba(96,165,250,0.20);
          color: #bfdbfe; font-size: 0.72rem; letter-spacing: 0.05em;
          padding: 0.25rem 0.75rem; border-radius: 999px;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          cursor: default; display: inline-block;
        }
        .tech-badge:hover {
          background: linear-gradient(135deg,rgba(59,130,246,0.45) 0%,rgba(37,99,235,0.30) 100%);
          border-color: rgba(147,197,253,0.40); transform: translateY(-1px);
        }

        /* ── CTA button ── */
        .btn-primary {
          background: linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%);
          box-shadow: 0 0 0 0 rgba(59,130,246,0.5);
          transition: box-shadow 0.25s ease,transform 0.15s ease,background 0.2s ease;
          border-radius: 10px; padding: 0.6rem 1.4rem;
          font-weight: 600; font-size: 0.875rem; color: #fff;
          letter-spacing: 0.01em; display: inline-flex; align-items: center; gap: 0.5rem;
          text-decoration: none;
        }
        .btn-primary:hover {
          box-shadow: 0 0 24px 4px rgba(59,130,246,0.35); transform: translateY(-1px);
          background: linear-gradient(135deg,#3b82f6 0%,#2563eb 100%);
        }
        .btn-primary:active { transform: translateY(0); }

        /* ── Back link ── */
        .back-link {
          display: inline-flex; align-items: center; gap: 0.35rem;
          font-size: 0.82rem; color: #93c5fd; font-weight: 500;
          letter-spacing: 0.01em; transition: color 0.2s,gap 0.2s; text-decoration: none;
        }
        .back-link:hover { color: #fff; gap: 0.55rem; }

        .id-chip {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px; padding: 0.35rem 0.75rem;
          font-size: 0.78rem; color: #64748b;
          font-family: 'DM Mono','Courier New',monospace; letter-spacing: 0.04em;
        }
        .id-chip span { color: #94a3b8; }

        .note-box {
          background: rgba(59,130,246,0.05);
          border-left: 3px solid rgba(59,130,246,0.35);
          border-radius: 0 10px 10px 0; padding: 0.85rem 1.1rem;
        }

        /* ── Animations ── */
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .fade-up   { animation: fadeUp 0.55s cubic-bezier(.25,.8,.25,1) both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.15s; }
        .fade-up-3 { animation-delay: 0.25s; }

        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.85)} }
        .status-dot {
          width:7px; height:7px; border-radius:50%; background:#4ade80;
          animation: pulse-dot 2s ease-in-out infinite; display:inline-block;
          box-shadow: 0 0 6px 1px rgba(74,222,128,0.45);
        }
      `}</style>

      {/* ════════════ LIGHTBOX ════════════ */}
      {lightboxOpen && project.image && (
        <div
          className="lightbox-backdrop"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Preview gambar: ${project.title}`}
        >
          <div
            className="lightbox-img-wrap"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lb-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Tutup lightbox"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <img src={project.image} alt={project.title} />
            <p className="lb-caption">{project.title}</p>
          </div>

          <span className="lb-esc-hint">Tekan ESC atau klik di luar untuk menutup</span>
        </div>
      )}

      {/* ════════════ MAIN PAGE ════════════ */}
      <div className="portfolio-root mesh-bg min-h-screen py-14 px-4 relative overflow-x-hidden">
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="relative z-10 max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <div className="fade-up fade-up-1 flex items-center gap-2 text-xs text-slate-500 mb-8 tracking-wide">
            <Link href="/" className="hover:text-blue-400 transition-colors">Beranda</Link>
            <span className="text-slate-700">/</span>
            <span>Portfolio</span>
            <span className="text-slate-700">/</span>
            <span className="text-blue-400 truncate max-w-[200px]">{project.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            {/* ── Left: Image ── */}
            <div className="lg:col-span-2 fade-up fade-up-1">
              <div className="img-glow-wrap">
                <div className="glass-card rounded-[20px] overflow-hidden shadow-2xl">
                  {project.image ? (
                    <div className="relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto object-cover block"
                        style={{ minHeight: '220px', maxHeight: '480px' }}
                      />

                      {/* Bottom fade blend */}
                      <div style={{
                        position:'absolute', bottom:0, left:0, right:0, height:'90px',
                        background:'linear-gradient(to top,rgba(10,18,40,0.75) 0%,transparent 100%)',
                        pointerEvents:'none',
                      }} />

                      {/* Click to zoom overlay */}
                      <div
                        className="img-click-overlay"
                        onClick={() => setLightboxOpen(true)}
                        title="Klik untuk memperbesar"
                      >
                        <div className="zoom-icon">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            <line x1="11" y1="8" x2="11" y2="14"/>
                            <line x1="8" y1="11" x2="14" y2="11"/>
                          </svg>
                        </div>
                        <span style={{
                          fontSize:'0.72rem', color:'rgba(191,219,254,0.9)',
                          background:'rgba(30,58,138,0.6)', backdropFilter:'blur(8px)',
                          padding:'0.25rem 0.75rem', borderRadius:'999px',
                          border:'1px solid rgba(96,165,250,0.28)',
                        }}>
                          Klik untuk memperbesar
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      height:'280px', display:'flex', flexDirection:'column',
                      alignItems:'center', justifyContent:'center',
                      background:'linear-gradient(135deg,rgba(30,58,138,0.25) 0%,rgba(15,23,42,0.4) 100%)'
                    }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(148,163,184,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                      <span style={{ color:'rgba(148,163,184,0.5)', fontSize:'0.8rem', marginTop:'0.75rem' }}>Tidak ada gambar</span>
                    </div>
                  )}

                  {/* Back link */}
                  <div style={{ padding:'1rem 1.25rem', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
                    <Link href="/" className="back-link">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 5l-7 7 7 7"/>
                      </svg>
                      Kembali ke Beranda
                    </Link>
                  </div>
                </div>

                {/* Bottom accent bar */}
                <div style={{
                  height:'4px', borderRadius:'0 0 12px 12px',
                  background:'linear-gradient(90deg,#1d4ed8,#3b82f6,#60a5fa)',
                  marginTop:'-4px', marginLeft:'8px', marginRight:'8px', opacity:0.7,
                }} />
              </div>
            </div>

            {/* ── Right: Content ── */}
            <div className="lg:col-span-3 fade-up fade-up-2">
              <div className="glass-card rounded-[20px] p-8 shadow-2xl">

                {/* Status */}
                <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.25rem' }}>
                  <span className="status-dot" />
                  <span style={{ fontSize:'0.75rem', color:'#6ee7b7', letterSpacing:'0.05em', fontWeight:500 }}>Proyek Aktif</span>
                </div>

                {/* Title */}
                <header style={{ marginBottom:'1rem' }}>
                  <h1
                    className="font-display"
                    style={{ fontSize:'clamp(1.6rem,4vw,2.2rem)', fontWeight:800, color:'#fff', lineHeight:1.15, letterSpacing:'-0.02em' }}
                  >
                    {project.title}
                  </h1>
                </header>

                <div className="glow-divider" />

                {/* Tech stack */}
                {project.technologies && project.technologies.length > 0 && (
                  <div style={{ marginBottom:'1.5rem' }}>
                    <p style={{ fontSize:'0.72rem', color:'#475569', letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:600, marginBottom:'0.6rem' }}>Tech Stack</p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'0.45rem' }}>
                      {project.technologies.map((tech: string) => (
                        <span key={tech} className="tech-badge">{tech.trim()}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div style={{ marginBottom:'2rem' }}>
                  <p style={{ fontSize:'0.72rem', color:'#475569', letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:600, marginBottom:'0.6rem' }}>Deskripsi</p>
                  <p style={{ color:'#cbd5e1', fontSize:'0.95rem', lineHeight:1.75 }}>{project.description}</p>
                </div>

                {/* CTA + ID */}
                <div style={{
                  display:'flex', flexWrap:'wrap',
                  alignItems:'center', justifyContent:'space-between', gap:'0.75rem',
                  paddingTop:'1.25rem', borderTop:'1px solid rgba(255,255,255,0.06)',
                }}>
                  <a href={project.link ?? "#"} target="_blank" rel="noreferrer" className="btn-primary">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    Lihat Website
                  </a>

                </div>
              </div>

              {/* Note */}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}