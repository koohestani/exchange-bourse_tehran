import React from 'react';

const SymbolItem = ({ symbol }) => {

    let symbolClosePriceStatus = 'text-muted';
    if (parseFloat(symbol.plp) < 0.0)
        symbolClosePriceStatus = 'text-danger';
    else if (parseFloat(symbol.plp) > 0.0)
        symbolClosePriceStatus = 'text-success';

    let symbolFinalPriceStatus = 'text-muted';
    if (parseFloat(symbol.pcp) < 0.0)
        symbolFinalPriceStatus = 'text-danger';
    else if (parseFloat(symbol.pcp) > 0.0)
        symbolFinalPriceStatus = 'text-success';

    const buyPower = ((symbol.Buy_I_Volume / symbol.Buy_CountI) / (symbol.Sell_I_Volume / symbol.Sell_CountI)).toFixed(2);
    let buyPowerStatus = 'font-weight-light';
    if (buyPower > 1.5)
        buyPowerStatus = 'font-weight-bold'

    const percentageLegalSalesToTotal = ((symbol.Sell_N_Volume / symbol.tvol) * 100).toFixed(2);
    let percentageLegalSalesToTotalStatus = 'font-weight-light';
    if (percentageLegalSalesToTotal > 30)
        percentageLegalSalesToTotalStatus = 'font-weight-bold';

    const coSellVolume = Math.floor(symbol.Sell_N_Volume / 1000000 * 100) / 100;
    const tradeVolume = Math.floor(symbol.tvol / 1000000 * 100) / 100;

    let basisStatus = 'statusFalse';
    if (parseInt(symbol.tvol) >= parseInt(symbol.bvol))
        basisStatus = 'statusTrue';
    
    let basisCoStatus = 'statusFalse';
    if (parseInt(symbol.Sell_N_Volume) >= parseInt(symbol.bvol))
        basisCoStatus = 'statusTrue';

    return (
        <tr>
            <th scope="row">{ symbol.l18 }</th>
            <td>
                <span className="text-muted">{ symbol.pl !== undefined ? symbol.pl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '' }</span>
                <span className={`mx-2 font-weight-bold ${symbolClosePriceStatus}`} >{ symbol.plp }</span>
            </td>
            <td>
                <span className="text-muted">{ symbol.pc !== undefined ? symbol.pc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '' }</span>
                <span className={`mx-2 font-weight-bold ${symbolFinalPriceStatus}`} >{ symbol.pcp ?? symbol.pcp }</span>
            </td>
            <td className="light-success-bg" >{ symbol.qd1 !== undefined ? symbol.qd1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '' }</td>
            <td className="light-danger-bg" >{ symbol.qo1 !== undefined ? symbol.qo1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '' }</td>
            <td className={`${buyPowerStatus}`} >{ buyPower }</td>
            <td className={`${percentageLegalSalesToTotalStatus}`} >{ percentageLegalSalesToTotal }</td>
            <td className={`${percentageLegalSalesToTotalStatus}`} >
                {coSellVolume}
                <span className="ml-1">M</span>
            </td>
            <td>
                { tradeVolume }
                <span className="ml-1">M</span>
            </td>
            <td>
                <div className={`${basisStatus}`}></div>
            </td>
            <td>
                <div className={`${basisCoStatus}`}></div>
            </td>
        </tr>
    )
}

export default SymbolItem;
