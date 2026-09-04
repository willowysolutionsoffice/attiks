import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ProjectShowcaseGrid from '@/components/ProjectShowcaseGrid';
import { getGalleryPostsAction } from '@/actions/gallery.actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Media & Showcase | Attiks Architecture',
  description: 'Visual media showcases, architectural highlights, and project documentation by Attiks Architecture.',
};

export default async function MediaPage() {
  const galleryPosts = await getGalleryPostsAction();

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#111111', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <section
          style={{
            padding: 'clamp(120px, 11vw, 160px) clamp(20px, 5vw, 64px) 80px',
            boxSizing: 'border-box',
            width: '100%',
          }}
          aria-label="Media and Showcase"
        >
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
            <PageHeader 
              label="Media &amp; Showcase"
              title={<>Visual media &amp;{' '}<br />architectural highlights</>}
            />

            {/* All Uploaded Media Showcase (Grid with in-place modal preview) */}
            <div style={{ marginTop: 'clamp(28px, 3.5vw, 44px)' }}>
              <ProjectShowcaseGrid initialPosts={galleryPosts} disableOuterPadding />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
