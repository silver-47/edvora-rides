import Image from 'next/image'
import Link from 'next/link'

const Header = ({ userData }) => {
  return (
    <header className='flex justify-between items-center py-5 px-10 bg-[#171717] text-white'>
      <Link href='/' passHref>
        <a className='text-4xl font-bold'>Edvora</a>
      </Link>
      <div className='relative flex justify-between items-center space-x-6'>
        <h4 className='text-xl font-bold cursor-default select-none'>{userData.name ?? 'username'}</h4>
        <Link href={userData.url ?? '/images/profile-pic.png'} passHref>
          <a className='peer relative flex-shrink-0 w-11 h-11 rounded-full overflow-hidden'>
            <Image src='/images/profile-pic.png' alt='profile-pic' layout='fill' priority quality='100' />
          </a>
        </Link>
        <div className='hidden peer-hover:block absolute right-2.5 top-14 w-32 h-8'>
          <div className='absolute -top-1 right-2 rotate-45 w-2 h-2 bg-white' />
          <span className='absolute inset-0 flex justify-center items-center bg-white text-[#171717] text-sm'>
            Station Code: {userData.station_code ?? '--'}
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
