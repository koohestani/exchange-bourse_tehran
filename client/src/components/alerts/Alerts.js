import React, { Fragment, useContext } from 'react'
import SymbolContext from '../../context/symbol/SymbolContext';
import Spinner from '../layouts/Spinner';

let alertedSymbol = {};

const Alerts = () => {
    const symbolContext = useContext(SymbolContext);
    const { symbols, filters, hasFilter, loading, date, filterDate } = symbolContext;

    if (!hasFilter)
    {
        alertedSymbol = {};
        return '';
    }
    
    if (loading || symbols.length === 0)
        return <Spinner />

    const checkFilters = symbol => {
        let result = true;
        const closePrice = parseFloat(symbol.plp);
        const finalPrice = parseFloat(symbol.pcp);

        if (symbol.bvol === 1 || symbol.tvol === 0 ||
            symbol.Sell_I_Volume === 0 ||
            symbol.Buy_I_Volume === 0 ||
            symbol.inscode === undefined)
                result = false;
        else if (filters.upClosePrice && filters.upClosePrice.length && closePrice > filters.upClosePrice)
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

    let symbolWithName = {}
    if (symbols)
    {
        const filteredSymbol = symbols.filter(symbol => {
            if (!checkFilters(symbol))
                return false;
    
            return true;
        }).map(symbol => symbol.inscode);

        symbolWithName = symbols.reduce((items, symbol) => ({ ...items, [symbol.inscode]: symbol.l18 }), {})
        
        Object.keys(alertedSymbol).filter(inscode => {
            if (!filteredSymbol.includes(inscode))
                delete alertedSymbol[inscode];
        });

        let currentDatePlus1Min = new Date();
        currentDatePlus1Min.setMinutes(currentDatePlus1Min.getMinutes() + 1);

        let currentDateMinus20Sect = new Date();
        currentDateMinus20Sect.setSeconds(currentDateMinus20Sect.getSeconds() - 20);
        
        const hasNotify = currentDateMinus20Sect > filterDate ? true : false
        filteredSymbol.forEach(inscode => {
            if (!(inscode in alertedSymbol))
                alertedSymbol[inscode] = {
                    date: currentDatePlus1Min,
                    notify: hasNotify
                }
        });
    }

    let currentDate = new Date();

    let currentDatePlus30Sec = new Date();
    currentDatePlus30Sec.setSeconds(currentDatePlus30Sec.getSeconds() + 45);

    return (
        <Fragment>
            {
                Object.keys(alertedSymbol).map(inscode => {
                    if (alertedSymbol[inscode].notify === true)
                    {
                        // notify(`نماد ${symbolWithName[inscode]} اضافه شد`);
                        alertedSymbol[inscode].notify = false;
                    }

                    if (alertedSymbol[inscode].date >= currentDate)
                    {
                        return (<div key={inscode} className={`badge p-2 m-1 ${alertedSymbol[inscode].date > currentDatePlus30Sec ? 'badge-danger' : 'badge-info'}`}>
                           نماد {symbolWithName[inscode]} اضافه شد
                        </div>)
                    }
                })
            }
        </Fragment>
    )
}

export default Alerts
