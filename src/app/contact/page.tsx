'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';

export default function ContactPage() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* Main Content */}
        <section style={{ padding: '160px var(--section-padding) 120px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
            
            <div style={{ marginBottom: '80px' }}>
              <PageHeader 
                label="Contact"
                title={<>LET&apos;S SHAPE YOUR<br />VISION TOGETHER</>}
              />
              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', maxWidth: '540px', marginTop: '2rem', lineHeight: '1.7', fontWeight: 300 }}>
                Whether you are looking to commission an architectural landmark or design a private sanctuary, our practice provides personalized, expert guidance at every stage.
              </p>
            </div>

            <div className="grid-responsive-2" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'stretch' }}>
              {/* Map Section */}
              <div className="contact-map-container" style={{ minHeight: '400px', borderRadius: '4px', overflow: 'hidden' }}>
                <iframe 
                  title="Attiks Architecture Studio Locations"
                  src="https://www.google.com/maps/d/embed?mid=1AGNpIWX6rbzzsTDXTef1uOw5ItpvBRRW&ehbc=2E312F" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8)', minHeight: '400px' }} 
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
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <label htmlFor="first-name" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>First Name</label>
                      <input id="first-name" type="text" placeholder="First Name" autoComplete="given-name" style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '12px 0', color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Last Name</label>
                      <input id="last-name" type="text" placeholder="Last Name" autoComplete="family-name" style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '12px 0', color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Email Address</label>
                    <input id="contact-email" type="email" placeholder="Email Address" autoComplete="email" style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '12px 0', color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label htmlFor="phone-number" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Phone Number</label>
                    <input id="phone-number" type="tel" placeholder="Phone Number" autoComplete="tel" style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '12px 0', color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label htmlFor="project-desc" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Tell us about your project</label>
                    <textarea id="project-desc" placeholder="Tell us about your project or inquiry" rows={4} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '12px 0', color: '#fff', fontSize: '0.95rem', outline: 'none', resize: 'vertical' }} />
                  </div>
                  
                  <button type="submit" className="btn-premium" style={{ width: '100%', marginTop: '0.5rem', height: '52px', background: '#fff', color: '#000', borderColor: '#fff' }}>
                    Send Message
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
              borderTop: '1px solid rgba(255,255,255,0.1)', 
              paddingTop: '80px',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Calicut</h3>
                <address style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 300, lineHeight: '1.8', fontStyle: 'normal' }}>
                  #1/523, Krishna Building<br />
                  NH 66, Azhinhilam PO<br />
                  Calicut - 673632<br />
                  <span style={{ color: '#fff', fontWeight: 500, display: 'block', marginTop: '10px' }}>+91 0483 2941308</span>
                </address>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Bangalore</h3>
                <address style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 300, lineHeight: '1.8', fontStyle: 'normal' }}>
                  No.1DC-121, 1st D Cross<br />
                  2nd Main, Kasturinagar<br />
                  Bangalore &ndash; 560 043<br />
                  <span style={{ color: '#fff', fontWeight: 500, display: 'block', marginTop: '10px' }}>+91 8589 011307</span>
                </address>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Dubai</h3>
                <address style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 300, lineHeight: '1.8', fontStyle: 'normal' }}>
                  Aspect Tower 906<br />
                  Business Bay, Dubai<br />
                  UAE<br />
                  <span style={{ color: '#fff', fontWeight: 500, display: 'block', marginTop: '10px' }}>hello@attiks.ae</span>
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
