import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([2]); // Item thứ 3 mở sẵn

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const faqData = [
    {
      question: 'Can you help me recycle my old phone or other electronics?',
      answer: '',
    },
    {
      question: 'Can I pay for my device over time?',
      answer: '',
    },
    {
      question: 'Can I buy a protection plan for my device?',
      answer:
        "We've got you covered for life's not-so-happy accidents. Our protection plans cover drops, spills and more. We call it BackUp, and you'll see the option to purchase it alongside your device when you're checking out. After all, the longer you're able to use your device, the better it is for the planet.",
    },
  ];

  return (
    <section className='w-full bg-background-secondary'>
      <div className='px-4 md:px-6 lg:px-8 mx-auto max-w-[720px] py-8 md:py-14'>
        <div className='flex flex-col mb-4'>
          <h2 className='text-[22px] font-semibold text-center md:text-left'>
            3 questions people always ask
          </h2>

          <div className='space-y-2 md:space-y-4 mt-4 md:mt-2'>
            {faqData.map((item, index) => (
              <div
                key={index}
                className='bg-background md:bg-transparent rounded-md md:rounded-none overflow-hidden'
              >
                <button
                  onClick={() => toggleItem(index)}
                  className='w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-accent transition-all duration-200 cursor-pointer group'
                >
                  <span className='text-base md:text-xl font-semibold pr-4 transition-colors duration-200 group-hover:text-primary'>
                    {item.question}
                  </span>
                  <div className='flex-shrink-0 transition-all duration-300 ease-in-out'>
                    <ChevronDown
                      className={`w-4 h-4 md:w-5 md:h-5 text-gray-500 transition-all duration-300 ease-in-out transform group-hover:text-primary ${
                        openItems.includes(index) ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openItems.includes(index) && item.answer
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  {item.answer && (
                    <div className='px-4 md:px-6 pb-4 md:pb-6'>
                      <div className='pt-2 transform transition-transform duration-300 ease-out'>
                        <p className='text-sm md:text-base text-muted leading-relaxed'>
                          {item.answer.split('BackUp').map((part, i, arr) => (
                            <span key={i}>
                              {part}
                              {i < arr.length - 1 && (
                                <strong className='font-semibold text-primary cursor-pointer underline hover:text-primary/80 transition-colors duration-200'>
                                  BackUp
                                </strong>
                              )}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
