import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'

const Select = ({ items = [], value = '', placeholder = 'Please Select', onChange = () => {} }) => (
  <Listbox as='div' className='relative mb-3' value={value} onChange={onChange}>
    <Listbox.Button className='flex justify-between items-center py-2 px-3 rounded-md bg-[#232323] w-full focus:outline-none'>
      <span className='truncate text-white'>{value.length > 0 ? value : placeholder}</span>
      <svg
        className='flex-shrink-0 h-3 w-3 text-[#a5a5a5]'
        viewBox='0 0 12 10'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M6.09409 9.18994L0.816466 0.0488263L11.3717 0.0488253L6.09409 9.18994Z' fill='currentColor' />
      </svg>
    </Listbox.Button>
    <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
      <Listbox.Options className='z-50 absolute top-11 max-h-36 w-full overflow-auto py-1 rounded-md bg-[#232323] text-white'>
        <Listbox.Option value='' className='py-1 px-3 cursor-default select-none'>
          --- None ---
        </Listbox.Option>
        {items.map((item, index) => (
          <Listbox.Option key={index} value={item} className='py-1 px-3 cursor-default select-none'>
            {item}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Transition>
  </Listbox>
)
export default Select
