import { useState } from 'react'
import Header from 'components/Header'
import Image from 'next/image'
import dateformat from 'utils/dateformat'

export async function getServerSideProps() {
  const ridesResp = await fetch('https://assessment.api.vweb.app/rides')
  const userResp = await fetch('https://assessment.api.vweb.app/user')

  if (ridesResp.ok && userResp.ok) {
    const ridesData = await ridesResp.json()
    const userData = await userResp.json()

    const locations = ridesData
      .filter(({ state, city }, i, a) => a.findIndex(ride => ride.state === state && ride.city === city) === i)
      .map(({ state, city }) => ({ state, city }))

    return { props: { ridesData, locations, userData } }
  }

  return { notFound: true }
}

const Nearest = ({ ridesData, userData }) => {
  const [rides, setRides] = useState(ridesData ?? [])
  return (
    <div>
      <Header username={userData.name} />
      <div className='min-h-screen py-7 px-11 bg-[#292929]'>
        <div className='space-y-3'>
          {rides.map((ride, index) => (
            <div key={'ride-' + index} className='flex space-x-11 py-5 px-7 rounded-xl bg-[#171717] text-white'>
              <div className='relative flex-shrink-0 h-36 w-72 rounded-md overflow-hidden'>
                <Image src='/images/map.png' alt='map' layout='fill' />
              </div>
              <div className='flex-grow relative text-lg font-medium'>
                <p>Ride Id : {ride.id}</p>
                <p>Origin Station : {ride.origin_station_code}</p>
                <p>station_path : {JSON.stringify(ride.station_path)}</p>
                <p>Date : {dateformat(new Date(ride.date))}</p>
                <p>Distance : {0}</p>
                <div className='absolute top-0 right-0 flex text-xs'>
                  <p className='py-1 px-2.5 rounded-2xl bg-black/[.56]'>{ride.city}</p>
                  <p className='py-1 px-2.5 rounded-2xl bg-black/[.56]'>{ride.state}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Nearest
