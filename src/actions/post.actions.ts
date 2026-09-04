'use server';

import { revalidatePath } from 'next/cache';

const API_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function getPostsAction() {
  try {
    const res = await fetch(`${API_URL}/api/blogs`, { cache: 'no-store' });
    const json = await res.json();
    return json.data?.items || json.data || [];
  } catch {
    return [];
  }
}

export async function getPostAction(idOrSlug: string) {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${idOrSlug}`, { cache: 'no-store' });
    const json = await res.json();
    return json.data || null;
  } catch {
    return null;
  }
}

export async function createPostAction(data: any) {
  try {
    const res = await fetch(`${API_URL}/api/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    return await res.json();
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updatePostAction(id: string, data: any) {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    return await res.json();
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deletePostAction(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${id}`, { method: 'DELETE' });
    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    return await res.json();
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
