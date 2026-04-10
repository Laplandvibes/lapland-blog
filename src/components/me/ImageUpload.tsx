// src/components/me/ImageUpload.tsx
//
// Reusable image picker used by MyEditor for the hero slot and (via the
// clipboard-paste handler wired up in MyEditor) for inline post images.
// Three entry points:
//   1. Click / tap → file picker
//   2. Desktop: drag-and-drop
//   3. Mobile: `capture="environment"` forces the rear camera on phones
//
// The component owns its own upload state so MyEditor just passes a
// `onUploaded(url)` callback and a `userId`. Paste-to-insert in the markdown
// textarea is handled directly in MyEditor — that flow doesn't render this
// component at all.

import { useRef, useState, type DragEvent, type ChangeEvent } from 'react';
import { UploadCloud, Image as ImageIcon, Loader2, X } from 'lucide-react';
import { uploadTripImage } from '../../lib/uploadImage';

interface ImageUploadProps {
  userId: string | null | undefined;
  currentUrl?: string;
  onUploaded: (url: string) => void;
  onClear?: () => void;
  /** Optional extra className wrapping the whole dropzone. */
  className?: string;
  /** Render a more compact version for the sidebar. */
  compact?: boolean;
}

export default function ImageUpload({
  userId,
  currentUrl,
  onUploaded,
  onClear,
  className,
  compact,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  async function handleFile(file: File | Blob) {
    if (!userId) {
      setError('Sign in first so we know whose folder to save to.');
      return;
    }
    setError(null);
    setUploading(true);
    const result = await uploadTripImage(file, userId);
    setUploading(false);
    if (result.error !== null) {
      setError(result.error);
      return;
    }
    onUploaded(result.url);
  }

  function onPicked(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) void handleFile(file);
    // Reset so picking the same file again still fires `change`.
    e.target.value = '';
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) void handleFile(file);
  }

  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(true);
  }
  function onDragLeave() {
    setDragging(false);
  }

  const hasImage = Boolean(currentUrl);

  return (
    <div className={className}>
      {hasImage && currentUrl && (
        <div className="relative rounded-lg overflow-hidden border border-purple/20 mb-3 group">
          <img
            src={currentUrl}
            alt="Hero preview"
            className={compact ? 'w-full h-32 object-cover' : 'w-full h-48 object-cover'}
          />
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-night/80 text-slate-200 hover:bg-night hover:text-pink opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove image"
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer transition-colors
          ${compact ? 'px-4 py-6' : 'px-6 py-10'}
          ${dragging
            ? 'border-pink bg-pink/10 text-pink'
            : 'border-purple/40 bg-night/40 text-slate-300 hover:border-pink/60 hover:text-snow'}
        `}
      >
        {uploading ? (
          <>
            <Loader2 size={compact ? 20 : 28} className="animate-spin text-pink" />
            <p className="text-xs text-slate-300">Uploading…</p>
          </>
        ) : (
          <>
            {hasImage ? (
              <ImageIcon size={compact ? 18 : 24} />
            ) : (
              <UploadCloud size={compact ? 22 : 30} />
            )}
            <p className={`font-semibold ${compact ? 'text-[11px]' : 'text-xs'}`}>
              {hasImage ? 'Replace image' : 'Tap to upload · or drop a file'}
            </p>
            <p className="text-[10px] text-slate-500 text-center leading-snug">
              JPEG · PNG · WebP · up to 10&nbsp;MB
            </p>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          capture="environment"
          onChange={onPicked}
          className="sr-only"
        />
      </div>

      {error && (
        <p className="mt-2 text-[11px] text-red-400">{error}</p>
      )}
    </div>
  );
}
