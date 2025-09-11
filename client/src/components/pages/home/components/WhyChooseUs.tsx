import Image from 'next/image';

function WhyChooseUs() {
  const whyChooseUsCOntent = [
    {
      icon: '/assets/images/verified.png',
      text: 'Professionally refurbished',
    },
    {
      icon: '/assets/images/cashback-icon.svg',
      text: 'Cashback with Trade-in',
    },
    {
      icon: '/assets/images/card-visit.svg',
      text: 'Pay-as-you-go',
    },
    {
      icon: '/assets/images/phone-icon.svg',
      text: 'App exclusive features',
    },
  ];

  return (
    <section className='container mb-14'>
      <div className='w-full bg-background-secondary rounded-lg grid gap-3 grid-cols-2 md:grid-cols-4 p-3'>
        {whyChooseUsCOntent.map((item, index) => (
          <div key={index} className='flex gap-3 items-center justify-start'>
            <div className='p-2 rounded-md bg-sub-background shrink-0'>
              <Image
                src={item.icon}
                alt={item.text}
                width={24}
                height={24}
                className='dark:invert'
              />
            </div>
            <span className='font-semibold text-sm underline'>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
