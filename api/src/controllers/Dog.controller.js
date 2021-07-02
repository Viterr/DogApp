const { Dog,Temperament } = require('../db');
const { Op } = require("sequelize");
const axios = require('axios');
const uuid = require('uuid');
const {BASE_URL,IMG_URL} = require('../utils/constants');
const {sortAsc, sortDesc, mapMerged}  = require('../utils/functions') 

async function getAllBreeds(req, res, next){
    const {name,page,key,direction,filter,value} = req.query;
    
    let paginationProps = {
        page_number : 1,
        page_size : 8,
        totalItems:0
    }
    try {
        const breeds = await Dog.findAll({
             //logging: console.log,
            where: {
                name: {
                    [Op.iLike]: `%${name || ''}%`
                }
            },
            include: {
                model: Temperament,
                as: "temperament",
                attributes:['name'],
                through: {
                    attributes: []
                  } 
            },
            attributes: ['id','name','weight']
        })
    
        const breedsApi = axios.get(BASE_URL);
        let [breedsResult, breedsApiResult] = await Promise.all([breeds, breedsApi]);
        let mergedResult = [...breedsResult, ...breedsApiResult.data];
        
        if(name){
            let newre = new RegExp(`${name}`,'i')
            mergedResult = mergedResult.filter(el =>newre.test(el.name))
            if(!mergedResult.length) return res.sendStatus(404)
        }
    
        if(filter && value){
            let newre = new RegExp(`${value.trim()}`,'i')
          
            mergedResult = mergedResult.filter(el => {
                console.log(el[filter] === value);
                return Array.isArray(el[filter]) ? newre.test(el[filter].map(el => el.name).join(',')) : filter === 'id' ? el[filter] == value : newre.test(el[filter]) 
            })
            //console.log(mergedResult);
        }
        
        let response = mapMerged(mergedResult)

        if(key && direction){
            response =  direction === 'desc' ? sortDesc([...response], key) : sortAsc([...response], key);
        }
        
        let fullbreeds = response;
        
        paginationProps.totalItems = response.length
        if(page){
            paginationProps.page_number = page
        }
        response = response.slice((paginationProps.page_number - 1) * paginationProps.page_size, paginationProps.page_number * paginationProps.page_size);
        response = {
            fullbreeds:fullbreeds,
            data: response,
            totalItems: paginationProps.totalItems
        }
        res.send(response)
        
    } catch (error) {
        next(error)
    }
}

async function createBreed(req, res, next){
    const {name, weightMin, weightMax,heightMin,heightMax,lifeSpanMin,lifeSpanMax,temperaments} = req.body
    if(!name || !weightMin || !weightMax || !heightMin || !heightMax || !temperaments) return res.sendStatus(400)
    
    try {
        const newBreed = await Dog.create({
            name: name.trim().toLowerCase().replace(/^(.)|\s+(.)/g, c => c.toUpperCase()), // Capitalize
            height : `${heightMin} - ${heightMax}`,
            weight : `${weightMin} - ${weightMax}`,
            lifeSpan : (!lifeSpanMin && !lifeSpanMax) ? '' : `${lifeSpanMin} - ${lifeSpanMax} years`
        })

        await newBreed.addTemperament(temperaments)
        const response2 = await newBreed.getTemperament()
        
        res.status(200).json({
            message:'Breed created successfully',
            data : [{
                id: newBreed.id,
                name: newBreed.name,
                height: newBreed.height,
                weight: newBreed.weight,
                temperament: response2.map(el => el.name).join(',')
                }]
        })
    
    } catch (error) {
        
        next({
            message: error.original.detail
        })
    }
}

async function getBreedById(req, res, next){
    const {id} = req.params
    try {
        let result;
        if(uuid.validate(id)){
            result = await Dog.findByPk(id, {
                // logging: console.log,
                include: {
                    model: Temperament,
                    as: "temperament",
                    attributes:['name'],
                    through: {
                        attributes: []
                      } 
                }
            })
            result = [result.toJSON()];
        }else{
            const response  = await axios.get(BASE_URL+id);
            result = [response.data]
        }
        if(!result[0].name) return res.sendStatus(404)
        const response = result.map(el => {
            if(Array.isArray(el.temperament)){
                return {
                    name: el.name, 
                    temperament:el.temperament.map(ele => ele.name).join(','),
                    image : IMG_URL,
                    height : el.height+' cm',
                    weight : el.weight+' kg',
                    life_span: el.lifeSpan
                }
            }else{
                return {
                    name: el.name, 
                    temperament:el.temperament, 
                    image: `https://cdn2.thedogapi.com/images/${el.reference_image_id}.jpg`,
                    height : el.height.metric +' cm',
                    weight : el.weight.metric +' kg',
                    life_span: el.life_span
                }
            }
        })
        
        res.send(response)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllBreeds,
    createBreed,
    getBreedById
}