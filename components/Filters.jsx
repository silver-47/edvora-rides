import { Fragment } from 'react'
import { Disclosure, Transition } from '@headlessui/react'

const Filters = ({ children }) => (
  <Disclosure as='div' className='relative flex-shrink-0'>
    <Disclosure.Button className='flex items-center space-x-2 text-[#f2f2f2] focus:outline-none'>
      <svg className='flex-shrink-0 h-4 w-4' viewBox='0 0 18 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M-6.10352e-05 12.0001H5.99994V10.0001H-6.10352e-05V12.0001ZM-6.10352e-05 9.15527e-05V2.00009H17.9999V9.15527e-05H-6.10352e-05ZM-6.10352e-05 7.00009H11.9999V5.00009H-6.10352e-05V7.00009Z'
          fill='currentColor'
          fillOpacity='0.8'
        />
      </svg>
      <span className='font-medium'>Filters</span>
    </Disclosure.Button>
    <Transition
      as={Fragment}
      enter='transition origin-top-right ease-out duration-75'
      enterFrom='opacity-0 scale-0'
      enterTo='opacity-100 scale-100'
      leave='transition origin-top-right ease-in duration-100'
      leaveFrom='opacity-100 scale-100'
      leaveTo='opacity-0 scale-0'
    >
      <Disclosure.Panel className='z-50 absolute right-0 top-8 w-60 py-6 px-8 rounded-2xl bg-[#131313]'>
        {children}
      </Disclosure.Panel>
    </Transition>
  </Disclosure>
)

export default Filters
