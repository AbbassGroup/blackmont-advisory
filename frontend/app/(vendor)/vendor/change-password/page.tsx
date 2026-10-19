'use client';

import { useVendorAuth } from '@/context/vendor-auth-context';
import { ChangePasswordForm } from '@/components/portal/change-password-form';

export default function VendorChangePasswordPage() {
  const { changePassword } = useVendorAuth();
  return <ChangePasswordForm home='/vendor' changePassword={changePassword} />;
}
