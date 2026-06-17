import type { Metadata } from 'next';

// The Information Memorandum viewer is a standalone, distraction-free page —
// no site header or footer, just the document.
export const metadata: Metadata = {
  title: 'Information Memorandum | ABBASS Business Brokers',
  robots: { index: false, follow: false },
};

export default function ViewerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Block Ctrl+P / "Save as PDF" for recipients — the document is hidden in
          print so the page comes out blank. Brokers print from the admin panel. */}
      <style>{`@media print {
        .im-viewer-content { display: none !important; }
      }`}</style>
      <div className="im-viewer-content min-h-screen bg-white sm:bg-gray-100/70">{children}</div>
    </>
  );
}
