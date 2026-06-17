const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className='text-3xl md:text-4xl font-bold text-brand-black mb-4'>
      {children}
    </h2>
  );
};

export default Title;
