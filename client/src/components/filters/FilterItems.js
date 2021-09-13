const FilterItems = [
    {
        _id: 1,
        title: 'حد بالای آخرین قیمت',
        discription: 'بین -5 تا +5 وارد نمایید.',
        id: 'upClosePrice',
        min: -5,
        max: +5,
        step: 0.25
    },
    {
        _id: 2,
        title: 'حد پایین آخرین قیمت',
        discription: 'بین -5 تا +5 وارد نمایید.',
        id: 'downClosePrice',
        min: -5,
        max: +5,
        step: 0.25
    },
    {
        _id: 3,
        title: 'حد بالای قیمت پایانی',
        discription: 'بین -5 تا +5 وارد نمایید.',
        id: 'upFinalPrice',
        min: -5,
        max: +5,
        step: 0.25
    },
    {
        _id: 4,
        title: 'حد پایین قیمت پایانی',
        discription: 'بین -5 تا +5 وارد نمایید.',
        id: 'downFinalPrice',
        min: -5,
        max: +5,
        step: 0.25
    },
    {
        _id: 5,
        title: 'اختلاف آخرین قیمت و پایانی',
        discription: 'از -10 تا +10 (برای مثال عدد 4 نمایان گر نمادهایی که پایانی 4 درصد بالاتر قیمت لحظه است)',
        id: 'finalExpClose',
        min: -10,
        max: +10,
        step: 0.5
    },
    {
        _id: 6,
        title: 'پول هوشمند',
        discription: 'برای مثال اگر 2 وارد نمایید نماد هایی که قدرت خرید حقیقی دو برابر فروشنده بوده نمایش داده می شود',
        id: 'powerPrice',
        min: 0,
        max: 1000,
        step: 1
    },
    {
        _id: 7,
        title: 'درصد فروش حقوقی نسبت به کل',
        discription: 'برای مثال اگر 30 وارد نمایید، نماد هایی که حداقل 30 درصد عرضه آنها توسط حقوقی انجام شده است نمایش داده می شود.',
        id: 'coSellVolume',
        min: 0,
        max: 100,
        step: 1
    },
    {
        _id: 8,
        title: 'حجم صف خرید نسبت به حجم مبنا',
        discription: 'برای مثال اگر 1.5 وارد نمایید، نماد هایی که صف خرید بوده و حجم صف آنها کمتر از 1.5 برابر مبنا است نمایش داده می شود.',
        id: 'buyVolumeRatioBasis',
        min: 0,
        max: 1000,
        step: 0.5
    },
    {
        _id: 9,
        title: 'حجم صف فروش نسبت به حجم مبنا',
        discription: 'برای مثال اگر 2 وارد نمایید، نماد هایی که صف فروش بوده و حجم صف آنها کمتر از 2 برابر مبنا است نمایش داده می شود.',
        id: 'sellVolumeRatioBasis',
        min: 0,
        max: 1000,
        step: 0.5
    },
    {
        _id: 10,
        title: 'عرضه حقوقی نسبت به مبنا',
        discription: 'برای مثال اگر 2 وارد نمایید تنها نماد هایی نمایش داده می شوند که حقوقی حداقل دو برابر مبنا عرضه داشته است.',
        id: 'coVolumeRatioBasis',
        min: 0,
        max: 1000,
        step: 0.5
    },
    {
        _id: 11,
        title: 'حداقل حجم نسبت به مبنا',
        discription: 'برای مثال اگر 2 وارد نمایید تنها نماد هایی نمایش داده می شوند که دو برابر مبنا حجم خورده اند',
        id: 'volumeRatioBasis',
        min: 0,
        max: 1000,
        step: 1
    }
];

export default FilterItems;