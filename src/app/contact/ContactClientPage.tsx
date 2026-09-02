'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';

export default function ContactClientPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#111111', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* Main Content */}
        <section style={{ padding: '160px var(--section-padding) 120px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
            
            <div style={{ marginBottom: '80px' }}>
              <PageHeader 
                label="Contact Us"
                title={<>Let&apos;s shape your<br />vision together</>}
              />
              <p style={{ fontSize: 'clamp(18px, 1.3vw, 21px)', color: '#333333', maxWidth: '580px', marginTop: '2rem', lineHeight: '1.75', fontWeight: 350 }}>
                Whether you are looking to commission an architectural landmark or design a private sanctuary, our practice provides personalized, expert guidance at every stage.
              </p>
            </div>

            <div className="grid-responsive-2" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'stretch' }}>
              {/* Map Section */}
              <div className="contact-map-container" style={{ minHeight: '440px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e5e5e5' }}>
                <iframe 
                  title="Attiks Architecture Studio Locations"
                  src="https://www.google.com/maps/d/embed?mid=1AGNpIWX6rbzzsTDXTef1uOw5ItpvBRRW&ehbc=2E312F" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: '440px' }} 
                  allowFullScreen 
                  loading="lazy"
                />
              </div>

              {/* Form Section */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} onSubmit={(e) => e.preventDefault()}>
                  <div className="form-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <label htmlFor="first-name" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>First Name</label>
                      <input id="first-name" type="text" placeholder="First Name" autoComplete="given-name" style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1.5px solid #cccccc', padding: '14px 0', color: '#111111', fontSize: 'clamp(18px, 1.1vw, 20px)', outline: 'none' }} />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Last Name</label>
                      <input id="last-name" type="text" placeholder="Last Name" autoComplete="family-name" style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1.5px solid #cccccc', padding: '14px 0', color: '#111111', fontSize: 'clamp(18px, 1.1vw, 20px)', outline: 'none' }} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Email Address</label>
                    <input id="contact-email" type="email" placeholder="Email Address" autoComplete="email" style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1.5px solid #cccccc', padding: '14px 0', color: '#111111', fontSize: 'clamp(18px, 1.1vw, 20px)', outline: 'none' }} />
                  </div>
                  <div>
                    <label htmlFor="phone-number" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Phone Number</label>
                    <input id="phone-number" type="tel" placeholder="Phone Number" autoComplete="tel" style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1.5px solid #cccccc', padding: '14px 0', color: '#111111', fontSize: 'clamp(18px, 1.1vw, 20px)', outline: 'none' }} />
                  </div>
                  <div>
                    <label htmlFor="project-desc" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Tell us about your project</label>
                    <textarea id="project-desc" placeholder="Tell us about your project or inquiry" rows={4} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1.5px solid #cccccc', padding: '14px 0', color: '#111111', fontSize: 'clamp(18px, 1.1vw, 20px)', outline: 'none', resize: 'vertical' }} />
                  </div>
                  
                  <button type="submit" className="btn-premium" style={{ width: '100%', marginTop: '0.5rem', height: '56px', background: '#000000', color: '#ffffff', borderColor: '#000000', borderRadius: '4px', fontSize: 'clamp(18px, 1.15vw, 20px)', fontWeight: 400, textTransform: 'none' }}>
                    Send message
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Addresses Section */}
            <div className="grid-responsive-3" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '60px', 
              marginTop: '120px', 
              borderTop: '1px solid #e5e5e5', 
              paddingTop: '80px',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3 style={{ fontSize: 'clamp(18px, 1.2vw, 21px)', fontWeight: 400, marginBottom: '1.5rem', color: '#000000', textTransform: 'none', letterSpacing: '-0.01em' }}>Calicut</h3>
                <address style={{ color: '#555555', fontSize: 'clamp(18px, 1.1vw, 19.5px)', fontWeight: 400, lineHeight: '1.8', fontStyle: 'normal' }}>
                  #1/523, Krishna Building<br />
                  NH 66, Azhinhilam PO<br />
                  Calicut - 673632<br />
                  <span style={{ color: '#000000', fontWeight: 400, display: 'block', marginTop: '10px' }}>+91 0483 2941308</span>
                </address>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3 style={{ fontSize: 'clamp(18px, 1.2vw, 21px)', fontWeight: 400, marginBottom: '1.5rem', color: '#000000', textTransform: 'none', letterSpacing: '-0.01em' }}>Bangalore</h3>
                <address style={{ color: '#555555', fontSize: 'clamp(18px, 1.1vw, 19.5px)', fontWeight: 400, lineHeight: '1.8', fontStyle: 'normal' }}>
                  No.1DC-121, 1st D Cross<br />
                  2nd Main, Kasturinagar<br />
                  Bangalore &ndash; 560 043<br />
                  <span style={{ color: '#000000', fontWeight: 400, display: 'block', marginTop: '10px' }}>+91 8589 011307</span>
                </address>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3 style={{ fontSize: 'clamp(18px, 1.2vw, 21px)', fontWeight: 400, marginBottom: '1.5rem', color: '#000000', textTransform: 'none', letterSpacing: '-0.01em' }}>Dubai</h3>
                <address style={{ color: '#555555', fontSize: 'clamp(18px, 1.1vw, 19.5px)', fontWeight: 400, lineHeight: '1.8', fontStyle: 'normal' }}>
                  Aspect Tower 906<br />
                  Business Bay, Dubai<br />
                  UAE<br />
                  <span style={{ color: '#000000', fontWeight: 400, display: 'block', marginTop: '10px' }}>hello@attiks.ae</span>
                </address>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
