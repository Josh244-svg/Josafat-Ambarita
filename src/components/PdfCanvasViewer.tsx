import * as pdfjsLib from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { useEffect, useRef, useState } from 'react';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

interface PdfCanvasViewerProps {
  url: string;
}

export function PdfCanvasViewer({ url }: PdfCanvasViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function renderPdf() {
      setStatus('loading');
      const container = containerRef.current;
      if (container) {
        container.innerHTML = '';
      }

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const buffer = await res.arrayBuffer();
        if (cancelled) return;

        const loadingTask = pdfjsLib.getDocument({ data: buffer });
        const pdf = await loadingTask.promise;
        if (cancelled) {
          await loadingTask.destroy();
          return;
        }

        setPageCount(pdf.numPages);
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (cancelled) break;
          const page = await pdf.getPage(pageNum);
          const baseViewport = page.getViewport({ scale: 1 });
          const targetWidth = Math.min(820, Math.max(320, (container?.clientWidth || 760) - 16));
          const cssScale = targetWidth / baseViewport.width;
          const viewport = page.getViewport({ scale: cssScale * pixelRatio });

          const canvas = document.createElement('canvas');
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          canvas.style.width = `${Math.floor(viewport.width / pixelRatio)}px`;
          canvas.style.height = `${Math.floor(viewport.height / pixelRatio)}px`;
          canvas.className =
            'mx-auto rounded-xl border border-[#E2E8F0] bg-white shadow-sm block';

          const ctx = canvas.getContext('2d');
          if (ctx && !cancelled && container) {
            container.appendChild(canvas);
            await page.render({
              canvasContext: ctx,
              canvas,
              viewport,
            }).promise;
          }
        }

        if (!cancelled) {
          setStatus('ready');
        }
      } catch {
        if (!cancelled) {
          setStatus('error');
        }
      }
    }

    renderPdf();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      {status === 'loading' && (
        <div className="py-12 text-xs font-medium text-[#64748B]">
          Memuat dokumen PDF...
        </div>
      )}
      {status === 'error' && (
        <div className="py-12 text-center text-sm text-[#475569]">
          Pratinjau PDF tidak dapat dirender di browser ini. Silakan klik tombol Unduh di kanan atas.
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full space-y-4 pb-4"
        aria-label={pageCount ? `Dokumen PDF (${pageCount} halaman)` : 'Dokumen PDF'}
      />
    </div>
  );
}
