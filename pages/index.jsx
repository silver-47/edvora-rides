import { useMemo, useState, useEffect } from 'react'
import Head from 'next/head'
import { Tab } from '@headlessui/react'
import Header from 'components/Header'
import Filters from 'components/Filters'
import Select from 'components/Select'
import RidesList from 'components/RidesList'

export async function getServerSideProps() {
  try {
    const ridesResp = await fetch(`${process.env.API_URL}/rides`)
    const userResp = await fetch(`${process.env.API_URL}/user`)

    if (!ridesResp.ok) throw new Error('Rides response error! Status Code: ' + ridesResp.status)
    if (!userResp.ok) throw new Error('User response error! Status Code: ' + userResp.status)

    const ridesJson = await ridesResp.json()
    const userData = await userResp.json()

    const ridesData = ridesJson
      .map(({ station_path, ...rest }) => {
        let i = 0
        while (i < station_path.length && station_path[i] < userData.station_code) i++

        let distance
        if (i === 0) distance = station_path[i] - userData.station_code
        else if (i === station_path.length) distance = userData.station_code - station_path[i - 1]
        else distance = Math.min(station_path[i] - userData.station_code, userData.station_code - station_path[i - 1])

        return { ...rest, station_path, distance }
      })
      .sort((a, b) => a.distance - b.distance)

    return { props: { ridesData, userData } }
  } catch (err) {
    console.error(err)
    return { notFound: true }
  }
}

const HomePage = ({ ridesData, userData }) => {
  const [nearestRides, setNearestRides] = useState([])
  const [upcomingRides, setUpcomingRides] = useState([])
  const [pastRides, setPastRides] = useState([])

  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const states = useMemo(
    () =>
      ridesData
        .map(({ state }) => state)
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort((a, b) => a > b),
    []
  )

  const cities = useMemo(() => {
    setSelectedCity('')
    return ridesData
      .filter(({ state }) => state === selectedState)
      .map(({ city }) => city)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => a > b)
  }, [selectedState])

  useEffect(() => {
    let filteredRides = []

    if (selectedState.length > 0) {
      if (selectedCity.length > 0)
        filteredRides = ridesData.filter(({ state, city }) => state === selectedState && city === selectedCity)
      else filteredRides = ridesData.filter(({ state }) => state === selectedState)
    } else filteredRides = ridesData

    setNearestRides(filteredRides)
    setUpcomingRides(
      filteredRides
        .filter(({ date }) => new Date() < new Date(date))
        .sort((a, b) => new Date(a.date) > new Date(b.date))
    )
    setPastRides(
      filteredRides
        .filter(({ date }) => new Date() >= new Date(date))
        .sort((a, b) => new Date(a.date) < new Date(b.date))
    )
  }, [selectedState, selectedCity])

  return (
    <div>
      <Header userData={userData} />

      <Tab.Group as='div' className='min-h-screen py-7 px-11 bg-[#292929]'>
        {({ selectedIndex }) => (
          <>
            <Head>
              <title>{['Nearest rides', 'Upcoming rides', 'Past rides'][selectedIndex]} | Edvora Rides</title>
            </Head>
            <div className='mx-1 flex justify-between items-center'>
              <Tab.List className='flex space-x-11'>
                {({ selectedIndex }) =>
                  ['Nearest rides', `Upcoming rides (${upcomingRides.length})`, `Past rides (${pastRides.length})`].map(
                    (title, index) => (
                      <Tab
                        key={index}
                        className={`${
                          selectedIndex === index ? 'font-bold text-white border-b-2' : 'text-[#d0cbcb]'
                        } text-lg focus:outline-none`}
                      >
                        {title}
                      </Tab>
                    )
                  )
                }
              </Tab.List>

              <Filters>
                <h3 className='mb-5 pb-2 px-1 font-light text-xl text-[#a5a5a5] border-b border-[#cbcbcb]'>Filters</h3>
                <Select items={states} value={selectedState} placeholder='Select State' onChange={setSelectedState} />
                <Select items={cities} value={selectedCity} placeholder='Select City' onChange={setSelectedCity} />
              </Filters>
            </div>

            <Tab.Panels className='mt-7'>
              <Tab.Panel as={RidesList} list={nearestRides} />
              <Tab.Panel as={RidesList} list={upcomingRides} />
              <Tab.Panel as={RidesList} list={pastRides} />
            </Tab.Panels>
          </>
        )}
      </Tab.Group>
    </div>
  )
}

export default HomePage
