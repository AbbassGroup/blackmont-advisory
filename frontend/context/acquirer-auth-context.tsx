'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { apiClient } from '@/lib/api';

// Separate from the admin/vendor tokens so any of them can stay signed in.
const TOKEN_KEY = 'acquirerToken';

type AcquirerProfile = {
  _id: string;
  email: string;
  username?: string;
  deal: string;
};

type AcquirerAuthContextType = {
  token: string | null;
  acquirer: AcquirerProfile | null;
  loading: boolean;
  error: string | null;
  login: (credentials: { identifier: string; password: string }) => Promise<void>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
};

const AcquirerAuthCtx = createContext<AcquirerAuthContextType | undefined>(undefined);

export function AcquirerAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  });
  const [acquirer, setAcquirer] = useState<AcquirerProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Attach the acquirer Bearer token to every apiClient request.
  useEffect(() => {
    const interceptor = apiClient.interceptors.request.use((config) => {
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return () => apiClient.interceptors.request.eject(interceptor);
  }, [token]);

  // Re-validate the stored token on mount so a refresh keeps the session.
  useEffect(() => {
    if (!token) return;
    let active = true;
    apiClient
      .get('/api/acquisition/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        if (active) setAcquirer(data.acquirer);
      })
      .catch(() => {
        if (active) {
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
          setAcquirer(null);
        }
      });
    return () => {
      active = false;
    };
  }, [token]);

  const login = useCallback(
    async ({ identifier, password }: { identifier: string; password: string }) => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await apiClient.post('/api/acquisition/login', {
          identifier,
          password,
        });
        if (!data?.token) throw new Error('No token received');
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setAcquirer(data.acquirer);
      } catch (e: any) {
        const msg = e?.response?.data?.message || e?.message || 'Login failed';
        setError(msg);
        throw new Error(msg);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setAcquirer(null);
  }, []);

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      if (!token) throw new Error('Not authenticated');
      await apiClient.post(
        '/api/acquisition/change-password',
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    },
    [token],
  );

  return (
    <AcquirerAuthCtx.Provider
      value={{ token, acquirer, loading, error, login, logout, changePassword }}
    >
      {children}
    </AcquirerAuthCtx.Provider>
  );
}

export function useAcquirerAuth() {
  const ctx = useContext(AcquirerAuthCtx);
  if (!ctx) {
    throw new Error('useAcquirerAuth must be used within an AcquirerAuthProvider');
  }
  return ctx;
}
