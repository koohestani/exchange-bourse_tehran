const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const pageBody = await fetchSymbols();
        const pageComponents = pageBody.split("@");
        const [firstPart, secondPart, symbolsData, otherSymbolsData, ...other] = pageComponents;
        const bestLimits = readBestLimits(otherSymbolsData);
        const symbolsSplitted = symbolsData.split(";");
        let symbols = {};
        symbolsSplitted.forEach(item => {
            let symbol = parseSymbolData(item);
            if (!hasNumber(symbol.l18))
            {
                if (symbol.inscode in bestLimits)
                mergeSymbolData(symbol, bestLimits[symbol.inscode]);
            
                symbols[symbol.inscode] = symbol;
            }
        });

        await getClientType(symbols);
        res.json(symbols);

    } catch (error) {
        res.json(error);
    }
});

router.get('/volumn', async (req, res) => {
    try {
        const clientTypeBody = await fetchClientType();
        const clientTypeSplitted = clientTypeBody.split(';');

        let symbols = {};
        clientTypeSplitted.forEach(item => {
            const cols = item.split(',');
            let symbol = {};
            symbol['Buy_CountI'] = parseInt(cols[1]);
            symbol['Buy_CountN'] = parseInt(cols[2]);
            symbol['Buy_I_Volume'] = parseInt(cols[3]);
            symbol['Buy_N_Volume'] = parseInt(cols[4]);
            symbol['Sell_CountI'] = parseInt(cols[5]);
            symbol['Sell_CountN'] = parseInt(cols[6]);
            symbol['Sell_I_Volume'] = parseInt(cols[7]);
            symbol['Sell_N_Volume'] = parseInt(cols[8]);

            symbols[cols[0]] = symbol;
        });

        res.json(symbols);
    
    } catch (error) {
        res.json(error);
    }
});

const fetchSymbols = async () => {
    const URL = 'http://www.tsetmc.com/tsev2/data/MarketWatchInit.aspx?h=0&r=0';
    const { data } = await axios.get(URL);
    return data;
}

const fetchClientType = async () => {
    const URL = 'http://www.tsetmc.com/tsev2/data/ClientTypeAll.aspx';
    const { data } = await axios.get(URL);
    return data;
}


const readBestLimits = otherSymbolsData => {
    let bestLimit = {}
    otherSymbolsData.split(";").forEach(item => {
        bestLimitSpritted = item.split(',');
        if (!(bestLimitSpritted[0] in bestLimit))
            bestLimit[bestLimitSpritted[0]] = [];
        bestLimit[bestLimitSpritted[0]].push(bestLimitSpritted);
    });

    return bestLimit;
}

const parseSymbolData = symbolData => {
    const symbolSplittedData = symbolData.split(",");
    let symbol = {};

    let l18 = symbolSplittedData[2].replace("ي", "ی");
    l18 = l18.replace("ك", "ک");

    symbol['inscode'] = symbolSplittedData[0];
    symbol['iid'] = symbolSplittedData[1];
    symbol['l18'] = l18;
    symbol['l30'] = symbolSplittedData[3];
    symbol['heven'] = symbolSplittedData[4];
    symbol['pf'] = symbolSplittedData[5];
    symbol['pc'] = parseInt(symbolSplittedData[6]);
    symbol['pl'] = parseInt(symbolSplittedData[7]);
    symbol['tno'] = parseInt(symbolSplittedData[8]);
    symbol['tvol'] = parseInt(symbolSplittedData[9]);
    symbol['tval'] = symbolSplittedData[10];
    symbol['pmin'] = parseInt(symbolSplittedData[11]);
    symbol['pmax'] = parseInt(symbolSplittedData[12]);
    symbol['py'] = parseInt(symbolSplittedData[13]);
    symbol['eps'] = symbolSplittedData[14] == "" ? undefined : parseInt(symbolSplittedData[14]);
    symbol['bvol'] = parseInt(symbolSplittedData[15]);
    symbol['visitcount'] = symbolSplittedData[16];
    symbol['flow'] = symbolSplittedData[17];
    symbol['cs'] = parseInt(symbolSplittedData[18]);
    symbol['tmax'] = parseInt(symbolSplittedData[19]);
    symbol['tmin'] = parseInt(symbolSplittedData[20]);
    symbol['z'] = symbolSplittedData[21];
    symbol['yval'] = symbolSplittedData[22];

    symbol['pcc'] = symbol['pc'] - symbol['py'];
    symbol['pcp'] = parseFloat(symbol['pcc'] / symbol['py'] * 100).toFixed(2);
    symbol['plc'] = symbol['tno'] == 0 ? 0 : symbol['pl'] - symbol['py'];
    symbol['plp'] = symbol['tno'] == 0 ? 0 : parseFloat(symbol['plc'] / symbol['py'] * 100).toFixed(2);
    symbol['pe'] = symbol['eps'] ? parseFloat(symbol['pc'] / symbol['eps']).toFixed(2) : undefined;

    return symbol
}

const mergeSymbolData = (symbol, bestLimit) => {
    bestLimit.forEach(item => {
        symbol["zo"+item[1]] = parseInt(item[2]);
        symbol["zd"+item[1]] = parseInt(item[3]);
        symbol["pd"+item[1]] = parseInt(item[4]);
        symbol["po"+item[1]] = parseInt(item[5]);
        symbol["qd"+item[1]] = parseInt(item[6]);
        symbol["qo"+item[1]] = parseInt(item[7]);
    });
}

const getClientType = async symbols => {
    const clientTypeBody = await fetchClientType();
    const clientTypeSplitted = clientTypeBody.split(';');

    clientTypeSplitted.forEach(item => {
        const cols = item.split(',');
        if (cols[0] in symbols)
        {
            let symbol = {};
            symbol['Buy_CountI'] = parseInt(cols[1]);
            symbol['Buy_CountN'] = parseInt(cols[2]);
            symbol['Buy_I_Volume'] = parseInt(cols[3]);
            symbol['Buy_N_Volume'] = parseInt(cols[4]);
            symbol['Sell_CountI'] = parseInt(cols[5]);
            symbol['Sell_CountN'] = parseInt(cols[6]);
            symbol['Sell_I_Volume'] = parseInt(cols[7]);
            symbol['Sell_N_Volume'] = parseInt(cols[8]);
            
            symbols[cols[0]] = {...symbols[cols[0]], ...symbol};
        }
    });
}

const hasNumber = string => {
    return /\d/.test(string);
}

module.exports = router;