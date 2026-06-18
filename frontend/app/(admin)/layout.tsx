import { AdminAuthProvider } from '../../context/admin-auth-context';

export const metadata = {
  title: 'Admin Portal | ABBASS Business Brokers',
  robots: { index: false, follow: false },
};

export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <div className='flex-1 min-h-0 overflow-auto'>{children}</div>
    </AdminAuthProvider>
  );
}
