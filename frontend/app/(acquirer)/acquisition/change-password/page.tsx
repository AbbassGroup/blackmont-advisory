'use client';

import { useAcquirerAuth } from '@/context/acquirer-auth-context';
import { ChangePasswordForm } from '@/components/portal/change-password-form';

export default function AcquirerChangePasswordPage() {
  const { changePassword } = useAcquirerAuth();
  return <ChangePasswordForm home='/acquisition' changePassword={changePassword} />;
}
