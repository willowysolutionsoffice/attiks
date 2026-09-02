'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  projectTitle: string;
  projectId: string;
}

export default function LeadCaptureModal({
  isOpen,
  onClose,
  onSubmitSuccess,
  projectTitle,
  projectId,
}: LeadCaptureModalProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError('Please provide your name and email.');
      return;
    }
    setError('');
    setSubmitting(true);
    // Simulate lightweight client submission - ready to connect to any backend API in the future
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      onSubmitSuccess();
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: '', email: '', phone: '', message: '' });
      }, 500);
    }, 1000);
  };

  const handleSkip = () => {
    onSubmitSuccess();
    setForm({ name: '', email: '', phone: '', message: '' });
    setSubmitted(false);
    setError('');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.25s ease, background 0.25s ease',
    boxSizing: 'border-box' as const,
  };

  const inputFocusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(196, 112, 63, 0.6)';
    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
  };

  const inputBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)';
    e.target.style.background = 'rgba(255, 255, 255, 0.06)';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            padding: '20px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '480px',
              background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.97), rgba(10, 10, 10, 0.98))',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '40px 36px 32px',
              boxShadow: '0 32px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.04) inset',
              boxSizing: 'border-box',
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '16px',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
              }}
            >
              ✕
            </button>

            {!submitted ? (
              <>
                {/* Header */}
                <div style={{ marginBottom: '8px' }}>
                  <span
                    style={{
                      fontSize: 'clamp(16px, 1vw, 18px)',
                      textTransform: 'none',
                      letterSpacing: '0.02em',
                      color: '#ffffff',
                      opacity: 0.8,
                      fontWeight: 400,
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    Interested in this project?
                  </span>
                  <h2
                    style={{
                      fontSize: '1.55rem',
                      fontWeight: 400,
                      color: '#ffffff',
                      margin: '0 0 4px 0',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {projectTitle}
                  </h2>
                  <p
                    style={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontSize: '0.88rem',
                      margin: '0 0 28px 0',
                      lineHeight: 1.5,
                    }}
                  >
                    Share your details and we&apos;ll get in touch to discuss your vision.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Full Name *"
                      required
                      style={inputStyle}
                      onFocus={inputFocusHandler}
                      onBlur={inputBlurHandler}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      style={inputStyle}
                      onFocus={inputFocusHandler}
                      onBlur={inputBlurHandler}
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    required
                    style={inputStyle}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                  />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project vision (optional)"
                    rows={3}
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                      minHeight: '80px',
                    }}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                  />

                  {error && (
                    <p style={{ color: '#f87171', fontSize: '0.82rem', margin: '0' }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '100%',
                      padding: '15px 20px',
                      background: submitting ? 'rgba(196, 112, 63, 0.5)' : '#C4703F',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      fontWeight: 400,
                      letterSpacing: '0.03em',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      transition: 'background 0.25s ease, transform 0.2s ease',
                      fontFamily: 'inherit',
                      marginTop: '4px',
                    }}
                    onMouseEnter={(e) => {
                      if (!submitting) {
                        e.currentTarget.style.background = '#d4804f';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!submitting) {
                        e.currentTarget.style.background = '#C4703F';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    {submitting ? 'Sending...' : 'Submit & View Project'}
                  </button>

                  <button
                    type="button"
                    onClick={handleSkip}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255, 255, 255, 0.4)',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      padding: '8px 0 0',
                      fontFamily: 'inherit',
                      letterSpacing: '0.02em',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)';
                    }}
                  >
                    Skip, just view the project →
                  </button>
                </form>
              </>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ textAlign: 'center', padding: '20px 0' }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(196, 112, 63, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: '24px',
                  }}
                >
                  ✓
                </div>
                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 400,
                    color: '#ffffff',
                    margin: '0 0 8px 0',
                  }}
                >
                  Thank you!
                </h3>
                <p
                  style={{
                    color: 'rgba(255, 255, 255, 0.55)',
                    fontSize: '0.88rem',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  We&apos;ll be in touch shortly. Redirecting to {projectTitle}...
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
