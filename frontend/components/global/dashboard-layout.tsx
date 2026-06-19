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
      <div className='flex items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight text-secondary'>
            {title}
          </h1>
          <p className='mt-0.5 text-sm text-muted-foreground'>{description}</p>
        </div>
        {button}
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;
