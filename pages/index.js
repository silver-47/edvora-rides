import { useMemo, useState, useEffect } from 'react'
import Header from 'components/Header'
import Image from 'next/image'
import dateformat from 'utils/dateformat'
import Filters from 'components/Filters'
import Select from 'components/Select'

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

const Nearest = ({ ridesData, locations, userData }) => {
  const [rides, setRides] = useState([])

  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const states = useMemo(
    () =>
      locations
        .map(({ state }) => state)
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort((a, b) => a > b),
    []
  )

  const cities = useMemo(() => {
    setSelectedCity('')
    return locations
      .filter(({ state }) => state === selectedState)
      .map(({ city }) => city)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => a > b)
  }, [selectedState])

  useEffect(() => {
    if (selectedState.length > 0) {
      if (selectedCity.length > 0)
        setRides(ridesData.filter(({ state, city }) => state === selectedState && city === selectedCity))
      else setRides(ridesData.filter(({ state }) => state === selectedState))
    } else setRides(ridesData)
  }, [selectedState, selectedCity])

  return (
    <div>
      <Header username={userData.name} />
      <div className='min-h-screen py-7 px-11 bg-[#292929]'>
        <div className='flex justify-between items-center mb-7 mx-1'>
          <div>---</div>
          <Filters>
            <h3 className='mb-5 pb-2 px-1 font-light text-xl text-[#a5a5a5] border-b border-[#cbcbcb]'>Filters</h3>
            <Select items={states} value={selectedState} placeholder='Select State' onChange={setSelectedState} />
            <Select items={cities} value={selectedCity} placeholder='Select City' onChange={setSelectedCity} />
          </Filters>
        </div>
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
