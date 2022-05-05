import Link from 'next/link'
import Image from 'next/image'
import { dateformat } from 'utils'

const RidesList = ({ list = [] }) =>
  list.length > 0 ? (
    <div className='space-y-3'>
      {list.map((ride, index) => (
        <div
          key={'ride-' + index}
          className='flex items-center space-x-11 py-5 px-7 rounded-xl bg-[#171717] text-white'
        >
          <Link href={ride.map_url ?? '/images/map.png'} passHref>
            <a className='relative flex-shrink-0 h-36 w-72 rounded-md overflow-hidden'>
              <Image src='/images/map.png' alt='map' layout='fill' objectFit='cover' />
            </a>
          </Link>

          <div className='flex-grow relative text-lg font-medium leading-tight'>
            <p className='mb-2'>Ride Id : {ride.id}</p>
            <p className='mb-2'>Origin Station : {ride.origin_station_code}</p>
            <p className='mb-2'>station_path : {JSON.stringify(ride.station_path)}</p>
            <p className='mb-2'>Date : {dateformat(new Date(ride.date))}</p>
            <p className=''>Distance : {ride.distance}</p>
            <div className='absolute top-0 right-0 flex space-x-6 text-xs'>
              <p className='py-1 px-2.5 rounded-2xl bg-black/[.56]'>{ride.city}</p>
              <p className='py-1 px-2.5 rounded-2xl bg-black/[.56]'>{ride.state}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className='text-white text-xl'>No Rides to show...</p>
  )

export default RidesList
