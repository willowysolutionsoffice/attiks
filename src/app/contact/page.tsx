'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Main Content */}
      <section style={{ padding: '160px 10% 80px', flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          width: '100%', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '80px',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '500px' }}
          >
            <p style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', color: '#fff', marginBottom: '1.5rem', textTransform: 'capitalize' }}>
              Contact
            </p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, color: '#fff', marginBottom: '4rem', lineHeight: 1.1, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
              SPEAK WITH OUR<br />EXPERTS
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <div>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff', textTransform: 'uppercase' }}>Phone</h4>
                <p style={{ color: '#aaa', fontSize: '0.8rem', fontWeight: 500 }}>+1 (201)8455396</p>
              </div>
              <div>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff', textTransform: 'uppercase' }}>Email</h4>
                <p style={{ color: '#aaa', fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase' }}>JACOB@ROYAL.COM</p>
              </div>
              <div>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff', textTransform: 'uppercase' }}>Careers</h4>
                <p style={{ color: '#aaa', fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase' }}>CAREERS@ROYAL.COM</p>
              </div>
              <div>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff', textTransform: 'uppercase' }}>Address</h4>
                <p style={{ color: '#aaa', fontSize: '0.8rem', fontWeight: 500, lineHeight: '1.6', textTransform: 'uppercase', maxWidth: '300px' }}>
                  3831 EDGEWOOD AVENUE, FRESNO, CALIFORNIA, 93721
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => e.preventDefault()}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', textTransform: 'uppercase' }}>First Name</label>
                  <input 
                    type="text" 
                    placeholder="Jane"
                    style={{ background: '#1a1a1a', border: 'none', padding: '16px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', textTransform: 'uppercase' }}>Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Watson"
                    style={{ background: '#1a1a1a', border: 'none', padding: '16px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', textTransform: 'uppercase' }}>Email</label>
                  <input 
                    type="email" 
                    placeholder="Jane@framer.com"
                    style={{ background: '#1a1a1a', border: 'none', padding: '16px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', textTransform: 'uppercase' }}>Phone</label>
                  <input 
                    type="tel" 
                    placeholder="+40749321787"
                    style={{ background: '#1a1a1a', border: 'none', padding: '16px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', textTransform: 'uppercase' }}>Message</label>
                <textarea 
                  placeholder="Write your message here.."
                  rows={6}
                  style={{ background: '#1a1a1a', border: 'none', padding: '16px', color: '#fff', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                ></textarea>
              </div>

              <button 
                type="submit"
                style={{ 
                  background: '#fff', 
                  color: '#000', 
                  border: 'none', 
                  padding: '18px 24px', 
                  fontSize: '0.9rem', 
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#e0e0e0'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
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
