'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { getAllMedia, getMediaBySlug, MediaArticle } from '@/lib/media';

const API_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function getPostsAction(): Promise<MediaArticle[]> {
  return await getAllMedia();
}

export async function getPostAction(idOrSlug: string): Promise<MediaArticle | null> {
  const post = await getMediaBySlug(idOrSlug);
  return post || null;
}

export async function createPostAction(data: any) {
  try {
    const res = await fetch(`${API_URL}/api/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    revalidatePath('/media');
    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    revalidateTag('media');
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
    revalidatePath('/media');
    revalidatePath(`/media/${id}`);
    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    revalidateTag('media');
    return await res.json();
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deletePostAction(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${id}`, { method: 'DELETE' });
    revalidatePath('/media');
    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    revalidateTag('media');
    return await res.json();
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
