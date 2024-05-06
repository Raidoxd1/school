function hasCity(country, arr) {
    return function result(city) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === city) {
                return city + ' is a city from ' + country
            }
        }
        return city + ' is not a city from ' + country
    }
}