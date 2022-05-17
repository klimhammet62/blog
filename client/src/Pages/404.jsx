import React from 'react'
import Layout from '../common/Layout'

const error404 = () => {
    return (
        <>
            <Layout heading='Page not found' />
            <div className='wrapper-inner-page'>404 page not found</div>
        </>
    )
}

export default error404
