import React from 'react'
import SlidingWords from '../SlidingWords/SlidingWords'
// import BusinessList from '../BusinessList/BusinessList'
import { Button, Container } from 'react-bootstrap'
import './Home.css'

function Home({ businesses }) {
    // const renderBusinesses = businesses.map(businessData =>
    //     <BusinessList
    //         id={businessData.business_id}
    //         name={businessData.business_name}
    //         category={businessData.business_category}
    //         image={businessData.business_image}
    //         phone_numer={businessData.business_number}
    //         address={businessData.business_address}
    //         city={businessData.business_city}
    //         state={businessData.business_state}
    //         zipcode={businessData.business_zipcode}
    //         description={businessData.business_description}
    //     />)
    return (
        <div className='Home d-flex flex-column position-absolute w-100'>
            <Container className='d-flex justify-content-center align-items-center vh-100'>
                <div className='hero text-white display-2 fw-bolder'>Find your new favorite <SlidingWords words={["Restaurant", "Doctor", "Dentist", "Mechanic", "Everything"]} />
                    <Button variant='outline-light' size="lg" className='rounded-0'>Support local businesses</Button>
                </div>
            </Container>
            <div className='local-businesses py-5'>
                <h2 className='text-center'>Local Businesses</h2>
                {/* {renderBusinesses} */}
            </div>
        </div>
    )
}

export default Home