'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';

const TOKEN_KEY = 'adminToken';

type User = {
  user: {
    username: string;
    email: string;
    role: string;
  };
  token: string;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<User>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (tokenStr: string, password: string) => Promise<void>;
};

const AuthCtx = createContext<AuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  });
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Attach the Bearer token to every request when one is available
  useEffect(() => {
    const interceptor = apiClient.interceptors.request.use((config) => {
      // If a token exists and no Authorization header is manually set, apply the Bearer token
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return () => apiClient.interceptors.request.eject(interceptor);
  }, [token]);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setLoading(true);
      setError(null);
      try {
        const { data: loginRes } = await apiClient.post('/api/auth/login', {
          email,
          password,
        });
        if (!loginRes?.token) throw new Error('No token received');

        localStorage.setItem(TOKEN_KEY, loginRes.token);
        setToken(loginRes.token);

        // Fetch the current user with the new token immediately
        const { data: me } = await apiClient.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${loginRes.token}` },
        });
        setUser(me);
        return me;
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

  const forgotPassword = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.post('/api/auth/forgot-password', { email });
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        'Failed to send reset email';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(
    async (tokenStr: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        await apiClient.post(`/api/auth/reset-password/${tokenStr}`, {
          password,
        });
      } catch (e: any) {
        const msg =
          e?.response?.data?.message ||
          e?.message ||
          'Failed to reset password';
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
    setUser(null);
    setError(null);
    router.push('/admin/login');
  }, [router]);

  // Verify token on mount
  useEffect(() => {
    if (token && !user) {
      apiClient
        .get('/api/auth/me')
        .then(({ data }) => setUser(data))
        .catch(() => {
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
        });
    }
  }, [token, user]);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      error,
      login,
      logout,
      forgotPassword,
      resetPassword,
    }),
    [token, user, loading, error, login, logout, forgotPassword, resetPassword],
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx)
    throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  return ctx;
}
