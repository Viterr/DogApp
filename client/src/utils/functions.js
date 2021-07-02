export function sortAsc(arr, key) {
    return arr.sort((a,b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0))
}

export function sortDesc(arr, key) {
    return arr.sort((a,b) => (a[key] > b[key]) ? -1 : ((b[key] > a[key]) ? 1 : 0))
}