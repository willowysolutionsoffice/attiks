'use server';

import { revalidatePath } from 'next/cache';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { GalleryPost, defaultGalleryPosts } from '@/data/gallery';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const DATA_FILE = path.join(DATA_DIR, 'gallery-posts.json');

async function readPostsInternal(): Promise<GalleryPost[]> {
  try {
    const content = await readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Return default posts if JSON file not yet created
  }
  return defaultGalleryPosts;
}

async function writePostsInternal(posts: GalleryPost[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8');
}

export async function getGalleryPostsAction(): Promise<GalleryPost[]> {
  try {
    const posts = await readPostsInternal();
    return posts.filter((p) => p.active !== false);
  } catch {
    return defaultGalleryPosts;
  }
}

export async function getAllGalleryPostsAdminAction(): Promise<GalleryPost[]> {
  try {
    return await readPostsInternal();
  } catch {
    return defaultGalleryPosts;
  }
}

export async function createGalleryPostAction(data: Partial<GalleryPost>) {
  try {
    if (!data.image) {
      return { success: false, error: 'Image is required' };
    }

    const posts = await readPostsInternal();
    const newPost: GalleryPost = {
      id: `post-${Date.now()}`,
      image: data.image,
      caption: data.caption || 'Architectural Highlight',
      description: data.description || '',
      location: data.location || '',
      aspectRatio: data.aspectRatio || 'auto',
      createdAt: new Date().toISOString().split('T')[0],
      active: data.active !== undefined ? data.active : true,
      order: posts.length + 1,
    };

    const updated = [newPost, ...posts];
    await writePostsInternal(updated);

    revalidatePath('/');
    revalidatePath('/admin/gallery');
    return { success: true, data: newPost };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createBatchGalleryPostsAction(items: Array<{ image: string; caption?: string; location?: string; description?: string }>) {
  try {
    if (!items || items.length === 0) {
      return { success: false, error: 'No items provided' };
    }

    const posts = await readPostsInternal();
    const newPosts: GalleryPost[] = items.map((item, idx) => ({
      id: `post-${Date.now()}-${idx}`,
      image: item.image,
      caption: item.caption || 'Architectural Highlight',
      description: item.description || '',
      location: item.location || '',
      aspectRatio: 'square',
      createdAt: new Date().toISOString().split('T')[0],
      active: true,
      order: posts.length + idx + 1,
    }));

    const updated = [...newPosts, ...posts];
    await writePostsInternal(updated);

    revalidatePath('/');
    revalidatePath('/admin/gallery');
    return { success: true, count: newPosts.length, data: newPosts };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateGalleryPostAction(id: string, data: Partial<GalleryPost>) {
  try {
    const posts = await readPostsInternal();
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) {
      return { success: false, error: 'Post not found' };
    }

    posts[index] = { ...posts[index], ...data, id };
    await writePostsInternal(posts);

    revalidatePath('/');
    revalidatePath('/admin/gallery');
    return { success: true, data: posts[index] };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteGalleryPostAction(id: string) {
  try {
    const posts = await readPostsInternal();
    const filtered = posts.filter((p) => p.id !== id);

    await writePostsInternal(filtered);

    revalidatePath('/');
    revalidatePath('/admin/gallery');
    return { success: true, message: 'Post deleted successfully' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
