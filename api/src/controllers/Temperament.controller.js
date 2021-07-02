const { Temperament } = require('../db');
const { Op } = require("sequelize");
const fetch = require('node-fetch')
const {BASE_URL,IMG_URL} = require('../utils/constants');
async function getAllTemperaments(req, res, next){
    try {
        let myTemperaments =  await Temperament.findAll()
        if(myTemperaments.length == 0){
            const fetched = await fetch(BASE_URL);
            const data = await fetched.json();
            const arrValues = [];
            
            const mapped = data.map(el => el.temperament).join(',').split(',')
            //res.send(mapped)
            const values = [... new Set(mapped)].forEach(el => arrValues.push({name:el.trim()}))
            myTemperaments = await Temperament.bulkCreate(arrValues, {returning: true})
        }else{
            console.log('internal bd');
        }
        res.send(myTemperaments)
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllTemperaments,
    
}