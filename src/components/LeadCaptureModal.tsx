'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, User, Mail, Phone, MessageSquare } from 'lucide-react';

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

    try {
      const payload: any = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        message: form.message.trim() || undefined,
      };

      if (projectId) payload.projectId = projectId;
      if (projectTitle) payload.projectTitle = projectTitle;

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || errJson.message || 'Submission failed');
      }

      setSubmitted(true);
      setTimeout(() => {
        onSubmitSuccess();
        setTimeout(() => {
          setSubmitted(false);
          setForm({ name: '', email: '', phone: '', message: '' });
        }, 400);
      }, 800);
    } catch (err: any) {
      console.error('Lead submission error:', err);
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => {
    onSubmitSuccess();
    setForm({ name: '', email: '', phone: '', message: '' });
    setSubmitted(false);
    setError('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '16px',
            boxSizing: 'border-box',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '430px',
              background: '#ffffff',
              border: '1px solid #e5e5e5',
              borderRadius: '12px',
              padding: 'clamp(22px, 5vw, 32px)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.2)',
              boxSizing: 'border-box',
              color: '#000000',
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: '#f4f4f5',
                border: '1px solid #e5e5e5',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#555555',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#000000';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f4f4f5';
                e.currentTarget.style.color = '#555555';
                e.currentTarget.style.borderColor = '#e5e5e5';
              }}
            >
              <X size={14} />
            </button>

            {!submitted ? (
              <>
                {/* Header */}
                <div style={{ marginBottom: '18px' }}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#777777',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    Project Inquiry
                  </span>
                  <h2
                    className="font-display"
                    style={{
                      fontSize: 'clamp(1.35rem, 3.5vw, 1.65rem)',
                      fontWeight: 400,
                      fontFamily: 'var(--font-canela), Georgia, serif',
                      color: '#000000',
                      margin: '0 0 4px 0',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2,
                    }}
                  >
                    {projectTitle}
                  </h2>
                  <p
                    style={{
                      color: '#666666',
                      fontSize: '0.82rem',
                      margin: 0,
                      lineHeight: 1.4,
                      fontWeight: 400,
                    }}
                  >
                    Enter your details to view full architectural specifications.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }} className="lead-grid-cols">
                    <div style={{ position: 'relative' }}>
                      <label htmlFor="lead-name" className="sr-only">Your Name (required)</label>
                      <User size={13} style={{ position: 'absolute', left: 11, top: 12, color: '#999999', pointerEvents: 'none' }} />
                      <input
                        id="lead-name"
                        type="text"
                        name="name"
                        aria-label="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Name *"
                        required
                        style={{
                          width: '100%',
                          padding: '10px 10px 10px 30px',
                          background: '#fcfcfc',
                          border: '1px solid #e0e0e0',
                          borderRadius: '6px',
                          color: '#000000',
                          fontSize: '0.86rem',
                          fontFamily: 'inherit',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#000000')}
                        onBlur={(e) => (e.target.style.borderColor = '#e0e0e0')}
                      />
                    </div>

                    <div style={{ position: 'relative' }}>
                      <label htmlFor="lead-phone" className="sr-only">Phone Number</label>
                      <Phone size={13} style={{ position: 'absolute', left: 11, top: 12, color: '#999999', pointerEvents: 'none' }} />
                      <input
                        id="lead-phone"
                        type="tel"
                        name="phone"
                        aria-label="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        style={{
                          width: '100%',
                          padding: '10px 10px 10px 30px',
                          background: '#fcfcfc',
                          border: '1px solid #e0e0e0',
                          borderRadius: '6px',
                          color: '#000000',
                          fontSize: '0.86rem',
                          fontFamily: 'inherit',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#000000')}
                        onBlur={(e) => (e.target.style.borderColor = '#e0e0e0')}
                      />
                    </div>
                  </div>

                  <div style={{ position: 'relative' }}>
                    <label htmlFor="lead-email" className="sr-only">Email Address (required)</label>
                    <Mail size={13} style={{ position: 'absolute', left: 11, top: 12, color: '#999999', pointerEvents: 'none' }} />
                    <input
                      id="lead-email"
                      type="email"
                      name="email"
                      aria-label="Email Address"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email Address *"
                      required
                      style={{
                        width: '100%',
                        padding: '10px 10px 10px 30px',
                        background: '#fcfcfc',
                        border: '1px solid #e0e0e0',
                        borderRadius: '6px',
                        color: '#000000',
                        fontSize: '0.86rem',
                        fontFamily: 'inherit',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#000000')}
                      onBlur={(e) => (e.target.style.borderColor = '#e0e0e0')}
                    />
                  </div>

                  <div style={{ position: 'relative' }}>
                    <label htmlFor="lead-message" className="sr-only">Message (optional)</label>
                    <MessageSquare size={13} style={{ position: 'absolute', left: 11, top: 12, color: '#999999', pointerEvents: 'none' }} />
                    <textarea
                      id="lead-message"
                      name="message"
                      aria-label="Message (optional)"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Message (optional)"
                      rows={2}
                      style={{
                        width: '100%',
                        padding: '10px 10px 10px 30px',
                        background: '#fcfcfc',
                        border: '1px solid #e0e0e0',
                        borderRadius: '6px',
                        color: '#000000',
                        fontSize: '0.86rem',
                        fontFamily: 'inherit',
                        outline: 'none',
                        boxSizing: 'border-box',
                        resize: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#000000')}
                      onBlur={(e) => (e.target.style.borderColor = '#e0e0e0')}
                    />
                  </div>

                  {error && (
                    <div
                      style={{
                        color: '#dc2626',
                        fontSize: '0.78rem',
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        padding: '6px 10px',
                        borderRadius: '4px',
                      }}
                    >
                      {error}
                    </div>
                  )}

                  {/* Actions: Submit & Skip */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        width: '100%',
                        padding: '11px 18px',
                        background: '#000000',
                        color: '#ffffff',
                        border: '1px solid #000000',
                        borderRadius: '6px',
                        fontSize: '0.88rem',
                        fontWeight: 500,
                        letterSpacing: '0.02em',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                        opacity: submitting ? 0.7 : 1,
                      }}
                      onMouseEnter={(e) => {
                        if (!submitting) e.currentTarget.style.background = '#222222';
                      }}
                      onMouseLeave={(e) => {
                        if (!submitting) e.currentTarget.style.background = '#000000';
                      }}
                    >
                      <span>{submitting ? 'Submitting...' : 'Submit'}</span>
                      <ArrowRight size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={handleSkip}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#777777',
                        fontSize: '0.8rem',
                        fontWeight: 400,
                        cursor: 'pointer',
                        padding: '4px 0',
                        letterSpacing: '0.02em',
                        transition: 'color 0.2s ease',
                        textAlign: 'center',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#000000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#777777';
                      }}
                    >
                      Skip
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ textAlign: 'center', padding: '16px 0' }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                    color: '#ffffff',
                  }}
                >
                  <Check size={20} />
                </div>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 500,
                    color: '#000000',
                    margin: '0 0 4px 0',
                  }}
                >
                  Inquiry Received
                </h3>
                <p
                  style={{
                    color: '#666666',
                    fontSize: '0.82rem',
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  Opening {projectTitle}...
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
