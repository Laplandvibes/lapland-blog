// src/lib/uploadImage.ts
//
// Upload a single image to the `trip-images` Supabase Storage bucket and
// return its public URL. Files land under `{auth.uid()}/…` so the RLS
// policies in the `create_trip_images_bucket` migration scope writes to
// the owning user's folder.
//
// Accepts File or Blob (clipboard paste gives Blob). Returns either a
// public URL or an error string — callers decide how to surface it.

import { supabase } from './supabase';

const BUCKET = 'trip-images';
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB — matches bucket config
const ALLOWED = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
]);

export type UploadResult =
  | { url: string; path: string; error: null }
  | { url: null; path: null; error: string };

function extFromType(type: string): string {
  if (type === 'image/jpeg') return 'jpg';
  if (type === 'image/png') return 'png';
  if (type === 'image/webp') return 'webp';
  if (type === 'image/gif') return 'gif';
  if (type === 'image/avif') return 'avif';
  return 'bin';
}

function randomId(): string {
  // 10 hex chars — short enough for filenames, long enough to dodge clashes
  // during a single editing session. Not cryptographic.
  const bytes = new Uint8Array(5);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function uploadTripImage(
  file: File | Blob,
  userId: string
): Promise<UploadResult> {
  if (!userId) {
    return { url: null, path: null, error: 'Not signed in — cannot upload.' };
  }
  const type = file.type || 'application/octet-stream';
  if (!ALLOWED.has(type)) {
    return {
      url: null,
      path: null,
      error: `Unsupported image type: ${type || 'unknown'}. Use JPEG, PNG, WebP, GIF or AVIF.`,
    };
  }
  if (file.size > MAX_BYTES) {
    return {
      url: null,
      path: null,
      error: `Image is ${(file.size / 1024 / 1024).toFixed(1)} MB — max is 10 MB.`,
    };
  }

  const ext = extFromType(type);
  const path = `${userId}/${Date.now()}-${randomId()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: '31536000',
      contentType: type,
      upsert: false,
    });

  if (uploadError) {
    return { url: null, path: null, error: uploadError.message };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  if (!data?.publicUrl) {
    return { url: null, path: null, error: 'Upload succeeded but no public URL.' };
  }
  return { url: data.publicUrl, path, error: null };
}
