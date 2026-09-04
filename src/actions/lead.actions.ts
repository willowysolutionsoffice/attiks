'use server';

import { revalidatePath } from 'next/cache';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function submitLeadAction(leadData: {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  projectId?: string;
  projectTitle?: string;
}) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData),
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      return { success: false, error: json.error || 'Failed to submit inquiry' };
    }

    revalidatePath('/admin/leads');
    return { success: true, data: json.data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getLeadsAction(params?: { status?: string }) {
  try {
    const query = params?.status ? `?status=${encodeURIComponent(params.status)}` : '';
    const res = await fetch(`${BACKEND_URL}/api/leads${query}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return { success: false, data: [] };
    }

    const json = await res.json();
    const items = Array.isArray(json.data) ? json.data : json.data?.items || [];
    return { success: true, data: items };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
}

export async function updateLeadStatusAction(
  id: string,
  payload: { status?: string; notes?: string }
) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      return { success: false, error: json.error || 'Failed to update lead' };
    }

    revalidatePath('/admin/leads');
    return { success: true, data: json.data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteLeadAction(id: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/leads/${id}`, {
      method: 'DELETE',
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      return { success: false, error: json.error || 'Failed to delete lead' };
    }

    revalidatePath('/admin/leads');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
