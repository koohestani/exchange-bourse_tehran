import React, { Fragment } from 'react';
import Symbols from '../symbols/Symbols';
import Filters from '../filters/Filters';

const HomePage = () => {
    return (
        <Fragment>
            <div className='row'>
                <div className='col-12 col-lg-3 d-flex justify-content-center align-items-center'><Filters /></div>
                <div className='col-12 col-lg-9 d-flex justify-content-center align-items-center'><Symbols /></div>
            </div>
        </Fragment>
    )
};

export default HomePage;
