'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const API_URL = process.env.BACKEND_URL || 'http://localhost:5000';

async function getAuthHeader(): Promise<Record<string, string>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('attiks_admin_token')?.value;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

export async function getTestimonialsAction() {
  try {
    const res = await fetch(`${API_URL}/api/testimonials`, { cache: 'no-store' });
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export async function createTestimonialAction(data: {
  quote: string;
  author: string;
  designation: string;
  order?: number;
  active?: boolean;
}) {
  try {
    const authHeaders = await getAuthHeader();
    const res = await fetch(`${API_URL}/api/testimonials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    revalidatePath('/');
    revalidatePath('/admin/testimonials');
    return json;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateTestimonialAction(
  id: string,
  data: Partial<{
    quote: string;
    author: string;
    designation: string;
    order?: number;
    active?: boolean;
  }>
) {
  try {
    const authHeaders = await getAuthHeader();
    const res = await fetch(`${API_URL}/api/testimonials/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    revalidatePath('/');
    revalidatePath('/admin/testimonials');
    return json;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteTestimonialAction(id: string) {
  try {
    const authHeaders = await getAuthHeader();
    const res = await fetch(`${API_URL}/api/testimonials/${id}`, {
      method: 'DELETE',
      headers: {
        ...authHeaders,
      },
    });

    const json = await res.json();
    revalidatePath('/');
    revalidatePath('/admin/testimonials');
    return json;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
