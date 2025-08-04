export function RectangleFlag({
  countryCode,
  className = '',
}: {
  countryCode: string;
  className?: string;
}) {
  return (
    <div className={`inline-block w-6 h-4 relative ${className}`}>
      <img
        src={`https://flagcdn.com/h240/${countryCode.toLowerCase()}.png`}
        alt={`${countryCode}`}
        className='w-full h-full object-cover'
      />
    </div>
  );
}
