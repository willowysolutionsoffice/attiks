'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MapPin, X, Calendar, Sparkles } from 'lucide-react';
import { GalleryPost, defaultGalleryPosts } from '@/data/gallery';

export default function ProjectShowcaseGrid({ initialPosts = [] }: { initialPosts?: GalleryPost[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<GalleryPost | null>(null);

  const posts = initialPosts && initialPosts.length > 0 ? initialPosts : defaultGalleryPosts;
  const activePosts = posts.filter((p) => p.active !== false);

  const getAspectRatio = (ratio?: string) => {
    switch (ratio) {
      case 'portrait':
        return '4 / 5';
      case 'landscape':
        return '16 / 10.5';
      case 'square':
        return '1 / 1';
      default:
        return '1 / 1'; // clean baseline default
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        background: '#ffffff',
        padding: '10px clamp(20px, 5vw, 64px) 80px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        boxSizing: 'border-box',
      }}
      aria-label="Instagram Showcase Feed"
    >
      <div
        style={{
          width: '100%',
          margin: 0,
        }}
      >
        {/* Exact 3-Column Instagram Square Grid */}
        <div
          className="instagram-photo-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(3px, 1.2vw, 20px)',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {activePosts.map((post, idx) => {
            const isHovered = hoveredId === post.id;

            return (
              <motion.div
                key={`${post.id}-${idx}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(idx * 0.025, 0.25),
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, margin: '-20px' }}
                onClick={() => setSelectedPost(post)}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  overflow: 'hidden',
                  background: '#111111',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredId(post.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  sizes="(max-width: 768px) 33vw, 33vw"
                  style={{
                    objectFit: 'cover',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />

                {/* Instagram Gradient Overlay (Appears on Hover / Tap) */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
                    pointerEvents: 'none',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.25s ease',
                  }}
                />

                {/* Bottom-Left Typography: Caption on top, Location below */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 'clamp(6px, 1.3vw, 18px)',
                    zIndex: 5,
                    pointerEvents: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
                    transition: 'opacity 0.25s ease, transform 0.25s ease',
                  }}
                >
                  <h3
                    style={{
                      color: '#ffffff',
                      fontSize: 'clamp(10px, 1.15vw, 1.25rem)',
                      fontWeight: 500,
                      margin: 0,
                      letterSpacing: '-0.01em',
                      fontFamily: 'var(--font-primary)',
                      textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                      lineHeight: 1.2,
                      textTransform: 'none',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {post.caption}
                  </h3>

                  {post.location && (
                    <p
                      style={{
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: 'clamp(8px, 0.85vw, 12.5px)',
                        fontWeight: 400,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        margin: 0,
                        fontFamily: 'var(--font-primary)',
                        textShadow: '0 2px 6px rgba(0,0,0,0.7)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {post.location}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Instagram Post Detail Lightbox Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(16px, 3vw, 40px)',
              boxSizing: 'border-box',
            }}
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                background: '#0d0d0d',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                maxWidth: '920px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
              }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                aria-label="Close post modal"
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  zIndex: 20,
                  background: 'rgba(0, 0, 0, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
              >
                <X size={18} />
              </button>

              {/* Modal Image View */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  minHeight: '340px',
                  height: '100%',
                  background: '#050505',
                }}
              >
                <Image
                  src={selectedPost.image}
                  alt={selectedPost.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Modal Caption & Description View */}
              <div
                style={{
                  padding: 'clamp(24px, 4vw, 36px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#111111',
                  color: '#ffffff',
                  boxSizing: 'border-box',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Sparkles size={14} style={{ color: '#ffffff', opacity: 0.8 }} />
                    <span
                      style={{
                        fontSize: '0.78rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: 'rgba(255,255,255,0.7)',
                        fontWeight: 400,
                      }}
                    >
                      Studio Showcase
                    </span>
                  </div>

                  <h2
                    style={{
                      fontSize: 'clamp(1.3rem, 2vw, 1.8rem)',
                      fontWeight: 400,
                      color: '#ffffff',
                      margin: '0 0 10px 0',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.25,
                      fontFamily: 'var(--font-primary)',
                    }}
                  >
                    {selectedPost.caption}
                  </h2>

                  {selectedPost.location && (
                    <p
                      style={{
                        fontSize: '0.85rem',
                        color: 'rgba(255, 255, 255, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        margin: '0 0 20px 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      <MapPin size={14} />
                      {selectedPost.location}
                    </p>
                  )}

                  {selectedPost.description && (
                    <p
                      style={{
                        fontSize: 'clamp(15px, 1vw, 16.5px)',
                        color: 'rgba(255, 255, 255, 0.82)',
                        lineHeight: 1.65,
                        margin: 0,
                        fontWeight: 350,
                      }}
                    >
                      {selectedPost.description}
                    </p>
                  )}
                </div>

                <div
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingTop: '18px',
                    marginTop: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={13} />
                    {selectedPost.createdAt || 'Attiks Studio'}
                  </span>
                  <span>Attiks Architecture</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

