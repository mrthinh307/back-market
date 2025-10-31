'use client';
import Image from 'next/image';
import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import FormInput from '@/components/form/FormInput';
import { Button } from '@/components/ui/button';

function Payment() {
  const [selectedPayment, setSelectedPayment] = useState<string>('card');
  return (
    <div>
      <h2 className='text-[22px] font-semibold mb-4'>Choose payment method</h2>

      <RadioGroup
        value={selectedPayment}
        onValueChange={setSelectedPayment}
        className='py-6 rounded-t-lg bg-secondary-background shadow-sm'
      >
        <Accordion
          type='single'
          collapsible
          value={selectedPayment}
          onValueChange={setSelectedPayment}
        >
          {/* Credit/Debit Card */}
          <AccordionItem value='card'>
            <div className='flex items-center gap-4 px-6 py-1 hover:bg-accent'>
              <RadioGroupItem
                value='card'
                id='card-option'
                className='size-5'
              />
              <AccordionTrigger>
                <div className='flex items-center justify-between flex-1'>
                  <Label
                    htmlFor='card-option'
                    className='text-base cursor-pointer'
                  >
                    Credit/debit card
                  </Label>
                  <div className='flex items-center gap-1'>
                    <Image
                      src='https://front-office.statics.backmarket.com/bc3a0a6c858dc749268db2a6e573ac352a65ce0f/img/payment/networks-v5/visa.svg'
                      alt='Visa'
                      width={36}
                      height={20}
                    />
                    <Image
                      src='https://front-office.statics.backmarket.com/bc3a0a6c858dc749268db2a6e573ac352a65ce0f/img/payment/networks-v5/mastercard.svg'
                      alt='Mastercard'
                      width={36}
                      height={20}
                    />
                    <Image
                      src='https://front-office.statics.backmarket.com/bc3a0a6c858dc749268db2a6e573ac352a65ce0f/img/payment/networks-v5/amex.svg'
                      alt='Amex'
                      width={36}
                      height={20}
                    />
                  </div>
                </div>
              </AccordionTrigger>
            </div>
            <AccordionContent className='px-6 pb-5 pt-2 hover:bg-secondary-background'>
              <div className='md:px-6'>
                <FormInput
                  label='Card number'
                  type='text'
                  icon='/assets/images/card-icon.svg?url'
                  iconClassName='size-5'
                />
                <div className='flex flex-col md:flex-row md:gap-3'>
                  <FormInput
                    label='Expiration date'
                    type='text'
                    icon='/assets/images/celander-icon.svg?url'
                    iconClassName='size-5 md:size-6'
                    className='w-full'
                  />
                  <FormInput
                    label='CVV'
                    type='text'
                    icon='/assets/images/cvv-icon.svg?url'
                    className='w-full'
                    iconClassName='size-5 md:size-6'
                  />
                </div>
                <FormInput
                  label='Card holder'
                  type='text'
                  icon='/assets/images/user-icon.svg?url'
                  iconClassName='size-5'
                />
                <div className='mt-3 flex-1 flex justify-end underline font-semibold cursor-pointer'>
                  What is CVV?
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion
          type='single'
          collapsible
          value={selectedPayment}
          onValueChange={setSelectedPayment}
        >
          {/* Credit/Debit Card */}
          <AccordionItem value='cod'>
            <div className='flex items-center gap-4 px-6 py-1 hover:bg-accent'>
              <RadioGroupItem value='cod' id='cod-option' className='size-5' />
              <AccordionTrigger>
                <div className='flex items-center justify-between flex-1'>
                  <Label
                    htmlFor='cod-option'
                    className='text-base cursor-pointer'
                  >
                    Cash on Delivery (COD)
                  </Label>
                </div>
              </AccordionTrigger>
            </div>
            <AccordionContent className='px-6 pb-5 pt-2 hover:bg-secondary-background'>
              <div className='md:px-6'>
                <p className='text-base text-secondary-foreground'>
                  Pay with cash upon delivery. <br />
                  Please ensure you have the exact amount as our delivery
                  personnel may not carry change.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </RadioGroup>
      <div className='pb-6 px-6 rounded-b-lg bg-secondary-background shadow-sm flex justify-end'>
        <div className='content-center flex-col'>
          <Button className='mt-2'>Continue to Payment</Button>
          <div className='flex gap-1 mt-1'>
            <Image
              src='/assets/images/cvv-icon.svg?url'
              alt='CVV Icon'
              width={16}
              height={16}
              className='dark:invert'
            />
            <span className='text-xs text-muted-foreground'>
              Secure payment
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
