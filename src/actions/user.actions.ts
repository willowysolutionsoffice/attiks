'use server';

import { revalidatePath } from 'next/cache';

const API_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function getUsersAction() {
  try {
    const res = await fetch(`${API_URL}/api/users`, { cache: 'no-store' });
    const json = await res.json();
    return json.data?.items || json.data || [];
  } catch {
    return [];
  }
}

export async function getUserAction(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/users/${id}`, { cache: 'no-store' });
    const json = await res.json();
    return json.data || null;
  } catch {
    return null;
  }
}

export async function createUserAction(data: any) {
  try {
    const res = await fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    revalidatePath('/admin/users');
    return await res.json();
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateUserAction(id: string, data: any) {
  try {
    const res = await fetch(`${API_URL}/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    revalidatePath('/admin/users');
    return await res.json();
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteUserAction(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/users/${id}`, { method: 'DELETE' });
    revalidatePath('/admin/users');
    return await res.json();
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
