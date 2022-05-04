import Image from 'next/image'
import Link from 'next/link'

const Header = ({ username = 'username' }) => {
  return (
    <header className='flex justify-between items-center py-5 px-10 bg-[#171717] text-white'>
      <Link href='/' passHref>
        <a className='text-4xl font-bold'>Edvora</a>
      </Link>
      <div className='flex justify-between items-center space-x-6'>
        <h4 className='text-xl font-bold cursor-default select-none'>{username}</h4>
        <div className='relative flex-shrink-0 w-11 h-11 rounded-full overflow-hidden'>
          <Image src='/images/profile-pic.png' alt='profile-pic' layout='fill' priority quality='100' />
        </div>
      </div>
    </header>
  )
}

export default Header
