import { VendorAuthProvider } from '../../context/vendor-auth-context';

export const metadata = {
  title: 'Vendor Portal | Blackmont Advisory',
  robots: { index: false, follow: false },
};

export default function VendorGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VendorAuthProvider>
      <div className='flex-1 min-h-0 overflow-auto'>{children}</div>
    </VendorAuthProvider>
  );
}
