'use client';

import { useEffect, useRef } from 'react';
import { trackAccessEvent } from '@/lib/track';

export function AccessTracker({ resource }: { resource: string }) {
  // Fire once per mount despite Strict Mode's dev double-invoke.
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackAccessEvent('page_view', { resource });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
