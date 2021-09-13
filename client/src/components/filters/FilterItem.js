import React from 'react'

const FilterItem = ({ title, discription, ...otherState }) => {
    return (
        <div className='filter_section--item p-2 d-flex justify-content-between align-items-start'>
            <div className='filter_item--info d-flex flex-column'>
                <div className='title align-items-center'>
                    <div className='filterStatus ml-1'></div>
                    <label className='m-0' htmlFor="formControlRange">{title}</label>
                </div>
                <small className='text-muted'>{discription}</small>
            </div>
            <input type="number" className='custom-input number' {...otherState} />
        </div>    
    )
}

export default FilterItem
