import React, { useContext } from 'react';

import FilterItems from './FilterItems';
import FilterItem from './FilterItem';

import SymbolContext from '../../context/symbol/SymbolContext';

const Filters = () => {

    const symbolContext = useContext(SymbolContext);
    const { setSingleFilter, removeFilters, filters } = symbolContext;


    const onChange = e => setSingleFilter({
        key: [e.target.id],
        value: e.target.value
    });

    const onRemoveFilters = () => removeFilters();

    return (
        <div className="main_section filter_section my-custom-scrollbar">
            <div className='d-flex flex-column'>
                <div className='main_section--title d-flex justify-content-between'>
                    <span>فیلترها</span>
                    <a href='#!' className='btn btn-warning btn-sm' onClick={onRemoveFilters}>حذف
                        فیلترها</a>
                </div>
                {
                    FilterItems.map(filter => {
                        return <FilterItem 
                            key={filter._id}
                            value={filters[filter.id] || ''}
                            onChange={onChange}
                            {...filter}
                        />
                    })
                }
            </div>
        </div>
    )
};

export default Filters;
