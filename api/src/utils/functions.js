const {IMG_URL} = require('../utils/constants');

function sortAsc(arr, key) {
    return arr.sort((a,b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0))
}

function sortDesc(arr, key) {
    return arr.sort((a,b) => (a[key] > b[key]) ? -1 : ((b[key] > a[key]) ? 1 : 0))
}

function mapMerged(arr) {
    return arr.map(el => {
        let myWeigth = (typeof el.weight === "object") ? Number(el.weight.imperial.match(/(\d*\.?\d+)/g)[0] ) : Number(el.weight.match(/(\d*\.?\d+)/g)[0])
        if(Array.isArray(el.temperament)){
            return {id:el.id,name: el.name, temperament:el.temperament.map(ele => ele.name).join(','),image:IMG_URL, weight: myWeigth}
        }else{
            return {id:el.id,name: el.name, temperament:el.temperament, image: el.image.url, weight: myWeigth}
        }
    })
}

module.exports = {
    sortAsc,
    sortDesc,
    mapMerged
}