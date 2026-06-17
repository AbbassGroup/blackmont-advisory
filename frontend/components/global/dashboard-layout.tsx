const DashboardLayout = ({
  title,
  description,
  button,
  children,
}: {
  title: string;
  description: string;
  button?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-brand-black'>{title}</h1>
          <p className='text-sm text-brand-black/50 mt-0.5'>{description}</p>
        </div>
        {button}
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;
