import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoandingPage = () => {
    return (
        <section className='w-100 d-flex justify-content-center align-items-center'>
            <div className='text-white text-center flex-column'>
                <Spinner>
                </Spinner>
                <div>
                    Betöltés...
                </div>
            </div>
        </section>
    )
}

export default LoandingPage