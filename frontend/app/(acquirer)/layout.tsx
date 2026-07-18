import { AcquirerAuthProvider } from '../../context/acquirer-auth-context';

export const metadata = {
  title: 'Acquisition Portal | Blackmont Advisory',
  robots: { index: false, follow: false },
};

export default function AcquirerGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AcquirerAuthProvider>
      <div className='flex-1 min-h-0 overflow-auto'>{children}</div>
    </AcquirerAuthProvider>
  );
}
