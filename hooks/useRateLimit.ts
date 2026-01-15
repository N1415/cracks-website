'use client';

import { useState, useCallback } from 'react';

interface UseRateLimitOptions {
  limit: number;
  windowMs: number;
}

interface UseRateLimitReturn {
  checkRateLimit: () => boolean;
  remainingAttempts: number;
  resetTime: number | null;
}

export const useRateLimit = ({
  limit = 3,
  windowMs = 60000
}: UseRateLimitOptions): UseRateLimitReturn => {
  const [attempts, setAttempts] = useState<number[]>([]);

  const checkRateLimit = useCallback((): boolean => {
    const now = Date.now();
    const recentAttempts = attempts.filter(time => now - time < windowMs);

    if (recentAttempts.length >= limit) {
      return false; // Rate limit exceeded
    }

    setAttempts([...recentAttempts, now]);
    return true;
  }, [attempts, limit, windowMs]);

  const remainingAttempts = Math.max(0, limit - attempts.length);
  const oldestAttempt = attempts.length > 0 ? Math.min(...attempts) : null;
  const resetTime = oldestAttempt ? oldestAttempt + windowMs : null;

  return {
    checkRateLimit,
    remainingAttempts,
    resetTime
  };
};
