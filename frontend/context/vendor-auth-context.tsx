'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { apiClient } from '@/lib/api';

// Separate from the admin token so a broker and vendor can both stay signed in.
const TOKEN_KEY = 'vendorToken';

type VendorProfile = {
  _id: string;
  email: string;
  username?: string;
  listingId: string;
};

type VendorAuthContextType = {
  token: string | null;
  vendor: VendorProfile | null;
  loading: boolean;
  error: string | null;
  login: (credentials: { identifier: string; password: string }) => Promise<void>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
};

const VendorAuthCtx = createContext<VendorAuthContextType | undefined>(undefined);

export function VendorAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  });
  const [vendor, setVendor] = useState<VendorProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Attach the vendor Bearer token to every apiClient request.
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
      .get('/api/vendor/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        if (active) setVendor(data.vendor);
      })
      .catch(() => {
        if (active) {
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
          setVendor(null);
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
        const { data } = await apiClient.post('/api/vendor/login', {
          identifier,
          password,
        });
        if (!data?.token) throw new Error('No token received');
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setVendor(data.vendor);
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
    setVendor(null);
  }, []);

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      if (!token) throw new Error('Not authenticated');
      await apiClient.post(
        '/api/vendor/change-password',
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    },
    [token],
  );

  return (
    <VendorAuthCtx.Provider
      value={{ token, vendor, loading, error, login, logout, changePassword }}
    >
      {children}
    </VendorAuthCtx.Provider>
  );
}

export function useVendorAuth() {
  const ctx = useContext(VendorAuthCtx);
  if (!ctx) {
    throw new Error('useVendorAuth must be used within a VendorAuthProvider');
  }
  return ctx;
}
