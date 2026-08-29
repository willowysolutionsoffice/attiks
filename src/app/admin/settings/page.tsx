'use client';

import { useEffect, useState } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { SiteSettings } from '@/lib/db';

export default function SettingsAdminPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    siteTitle: '',
    tagline: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    enableLeadsNotification: true,
    maintenanceMode: false,
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.success) setSettings(data.settings);
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3500);
      }
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 0' }}>
        <div className="admin-skeleton" style={{ height: 40, width: 240, marginBottom: 20 }} />
        <div className="admin-skeleton" style={{ height: 320, width: '100%' }} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Site Settings</h1>
          <p className="admin-page-subtitle">Configure website branding, contact information, and notifications</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="admin-table-wrap" style={{ padding: '0.875rem 1.25rem', marginBottom: '1.25rem', borderColor: 'var(--admin-success)', background: 'rgba(76,175,125,0.12)', color: 'var(--admin-success)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <CheckCircle size={16} />
          <span>Site settings successfully updated and saved to backend database!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-table-wrap" style={{ padding: '2rem' }}>
        <div className="admin-field" style={{ marginBottom: '1.25rem' }}>
          <label className="admin-label">Website Title Tag</label>
          <input
            type="text"
            className="admin-input"
            value={settings.siteTitle}
            onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
            required
          />
        </div>

        <div className="admin-field" style={{ marginBottom: '1.25rem' }}>
          <label className="admin-label">Brand Tagline</label>
          <input
            type="text"
            className="admin-input"
            value={settings.tagline}
            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
          <div className="admin-field">
            <label className="admin-label">Contact Email</label>
            <input
              type="email"
              className="admin-input"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
            />
          </div>

          <div className="admin-field">
            <label className="admin-label">Contact Phone</label>
            <input
              type="text"
              className="admin-input"
              value={settings.contactPhone}
              onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
            />
          </div>
        </div>

        <div className="admin-field" style={{ marginBottom: '1.5rem' }}>
          <label className="admin-label">Office Address</label>
          <textarea
            className="admin-textarea"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', padding: '1rem', background: 'var(--admin-surface-2)', borderRadius: 2 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.85rem' }}>
            <input
              type="checkbox"
              checked={settings.enableLeadsNotification}
              onChange={(e) => setSettings({ ...settings, enableLeadsNotification: e.target.checked })}
            />
            <span>Enable instant email notifications for new website enquiries</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.85rem' }}>
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
            />
            <span>Enable Maintenance Banner on Public Site</span>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={submitting}>
            <Save size={14} />
            {submitting ? 'Saving Settings...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
