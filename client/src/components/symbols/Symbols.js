import React, { Fragment, useContext, useEffect, useState } from 'react';

import SymbolItem from './SymbolItem';
import Spinner from '../layouts/Spinner';
import SymbolContext from '../../context/symbol/SymbolContext';
import Alerts from '../alerts/Alerts';

const Symbols = () => {

    const symbolContext = useContext(SymbolContext);
    const { symbols, filters, getSymbols, hasFilter, loading, error, date } = symbolContext;
    const [search, setSearch] = useState('');

    useEffect(() => {
        getSymbols();
        const interval = setInterval(() => {
            getSymbols();
        }, 5000);

        return () => clearInterval(interval);
        //eslint-disable-next-line
    }, []);

    if (loading)
        return <Spinner />;

    const checkFilters = symbol => {
        let result = true;
        const closePrice = parseFloat(symbol.plp);
        const finalPrice = parseFloat(symbol.pcp);


        if (filters.upClosePrice && filters.upClosePrice.length && closePrice > filters.upClosePrice)
            result = false;
        else if (filters.downClosePrice && filters.downClosePrice.length && closePrice < filters.downClosePrice)
            result = false;
        else if (filters.upFinalPrice && filters.upFinalPrice.length && finalPrice > filters.upFinalPrice)
            result = false;
        else if (filters.downFinalPrice && filters.downFinalPrice.length && finalPrice < filters.downFinalPrice)
            result = false;
        else if (filters.finalExpClose && filters.finalExpClose.length && (finalPrice - closePrice) < filters.finalExpClose)
            result = false;
        else if (filters.powerPrice && filters.powerPrice.length &&
            ((symbol.Buy_I_Volume / symbol.Buy_CountI) / (symbol.Sell_I_Volume / symbol.Sell_CountI)) < filters.powerPrice)
            result = false;
        else if (filters.coSellVolume && filters.coSellVolume.length &&
            ((symbol.Sell_N_Volume / symbol.tvol) * 100) < filters.coSellVolume)
            result = false;
        else if (filters.coVolumeRatioBasis && filters.coVolumeRatioBasis.length && symbol.Sell_N_Volume < symbol.bvol * filters.coVolumeRatioBasis)
            return false;
        else if (filters.volumeRatioBasis && filters.volumeRatioBasis.length && symbol.tvol < symbol.bvol * filters.volumeRatioBasis)
            return false;
            
        else if (filters.buyVolumeRatioBasis && filters.buyVolumeRatioBasis.length)
        {
            if (symbol.tmax !== symbol.pl)
                result = false;
            else if (symbol.qd1 > symbol.bvol * filters.buyVolumeRatioBasis)
                result = false;
        }

        else if (filters.sellVolumeRatioBasis && filters.sellVolumeRatioBasis.length)
        {
            if (symbol.tmin !== symbol.pl)
                result = false;
            else if (symbol.qo1 > symbol.bvol * filters.sellVolumeRatioBasis)
                result = false;
        }

        return result;
    };

    const searchOnChange = e => setSearch(e.target.value);

    return (
        <Fragment>
            <div className='main_section table-responsive my-custom-scrollbar'>
                <Alerts />
                {error !== null
                    ? (<div className='header_section-alert p-2'>
                            <div className='alert alert-danger'>
                                <strong>{error}</strong>
                            </div>
                        </div>)
                    : ''
                }   
                <div className='main_section--header d-flex justify-content-between align-items-center p-2'>
                    <div className='search d-flex form-inline'>
                        <strong className="ml-1">جستجو : </strong>
                        <input type='text' className="form-control" placeholder="نام نماد ..." onChange={searchOnChange} value={search} />
                    </div>
                    <div className='clock'>
                        <strong>آخرین بروزرسانی : </strong>
                        { date ?? (<strong>{ date }</strong>)}
                    </div>
                </div>
                <table className="exchange-table w-100">
                <thead>
                    <tr>
                        <th id="name" scope="col">نماد</th>
                        <th id="close_price" scope="col">آخرین قیمت</th>
                        <th id="final_price" scope="col">قیمت پایانی</th>
                        <th id="1_buy_volume" scope="col">حجم تقاضا</th>
                        <th id="1_sell_volume" scope="col">حجم عرضه</th>
                        <th id="power_buy" scope="col">قدرت خرید</th>
                        <th id="co_buy_volume" scope="col">فروش حقوقی به کل</th>
                        <th id="co_sell_volume" scope="col">حجم فروش حقوقی</th>
                        <th id="trade_volume" scope="col">حجم معاملات</th>
                        <th id="basis_volume" scope="col">حجم مبنا</th>
                        <th id="basis_volume" scope="col">مبنا توسط حقوقی</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        symbols.filter(symbol => {
                            if (symbol.bvol === 1 || symbol.tvol === 0 ||
                            symbol.Sell_I_Volume === 0 ||
                            symbol.Buy_I_Volume === 0 ||
                            symbol.inscode === undefined)
                                return false

                            if (hasFilter && !checkFilters(symbol))
                                return false;

                            if (!search)
                                return true;
      
                            return symbol.l18.includes(search);
                        }).map(symbol => <SymbolItem key={symbol.inscode} symbol={symbol} />)
                    }
                </tbody>
            </table>
            </div>
        </Fragment>
    )
};

export default Symbols;
