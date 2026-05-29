import { createClient } from '@/lib/supabase/server';

const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp'] as const;

export interface UploadResult {
  url: string;
  path: string;
}

function validateImageExtension(fileName: string): boolean {
  const fileExt = fileName.split('.').pop()?.toLowerCase();
  if (!fileExt) return false;
  return (ALLOWED_IMAGE_EXTENSIONS as readonly string[]).includes(fileExt);
}

function generateUniqueFileName(originalFileName: string): string {
  const fileExt = originalFileName.split('.').pop();
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomString}.${fileExt}`;
}

export async function uploadImage(file: File, bucket: string = 'portfolioList', folder: string = 'images'): Promise<UploadResult | null> {
  try {
    if (!file || !validateImageExtension(file.name)) return null;

    const fileName = generateUniqueFileName(file.name);
    const filePath = `${folder}/${fileName}`;
    const buffer = new Uint8Array(await file.arrayBuffer());

    const supabase = await createClient();
    const { error } = await supabase.storage.from(bucket).upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

    if (error) return null;

    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return { url: publicUrl, path: filePath };
  } catch {
    return null;
  }
}

export async function deleteFile(filePath: string, bucket: string = 'portfolioList'): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.storage.from(bucket).remove([filePath]);
    return !error;
  } catch {
    return false;
  }
}

export async function deleteFiles(filePaths: string[], bucket: string = 'portfolioList'): Promise<boolean> {
  try {
    if (!filePaths || filePaths.length === 0) return true;
    const supabase = await createClient();
    const { error } = await supabase.storage.from(bucket).remove(filePaths);
    return !error;
  } catch {
    return false;
  }
}

export function extractFilePathFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const bucketIndex = pathParts.indexOf('public');
    if (bucketIndex !== -1 && bucketIndex + 2 < pathParts.length) {
      return pathParts.slice(bucketIndex + 2).join('/');
    }
    return null;
  } catch {
    return null;
  }
}
