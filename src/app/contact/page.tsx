'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';

export default function ContactPage() {
  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Main Content */}
      <section style={{ padding: '160px var(--section-padding) 120px', flex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5%' }}>
          
          {/* Left Column: Info */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <PageHeader 
              label="Contact"
              title={<>SPEAK WITH OUR<br />EXPERTS</>}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingLeft: '0.5%' }}>
              <div>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.6rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Phone</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 400 }}>+1 (201)8455396</p>
              </div>
              <div>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.6rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Email</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 400, textTransform: 'uppercase' }}>JACOB@ROYAL.COM</p>
              </div>
              <div>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.6rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Careers</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 400, textTransform: 'uppercase' }}>CAREERS@ROYAL.COM</p>
              </div>
              <div>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.6rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Address</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 400, lineHeight: '1.6', textTransform: 'uppercase' }}>
                  3831 EDGEWOOD AVENUE, FRESNO, CALIFORNIA, 93721
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', paddingTop: '4.5rem' }}
          >
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }} onSubmit={(e) => e.preventDefault()}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>First Name</label>
                  <input 
                    type="text" 
                    placeholder="Jane"
                    style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Watson"
                    style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Email</label>
                  <input 
                    type="email" 
                    placeholder="Jane@framer.com"
                    style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Phone</label>
                  <input 
                    type="tel" 
                    placeholder="+40749321787"
                    style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Message</label>
                <textarea 
                  placeholder="Write your message here.."
                  rows={5}
                  style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', color: '#fff', fontSize: '0.9rem', outline: 'none', resize: 'none' }}
                ></textarea>
              </div>

              <button 
                type="submit"
                style={{ 
                  background: '#fff', 
                  color: '#000', 
                  border: 'none', 
                  padding: '18px', 
                  fontSize: '0.85rem', 
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                Submit form
              </button>
            </form>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
