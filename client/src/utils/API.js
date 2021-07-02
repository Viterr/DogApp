import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-type": "application/json"
  }
});

const getBreeds = () => {
    return http.get("/dogs");
  };
const getByName = (value) => {
    return http.get("/dogs?name="+value);
}; 
  
  const getBySort = data => {
   
    return http.get(`/dogs`, { 
      params: data
    });
  };
  
  const create = data => {
    return http.post("/dog", data);
  };

  const findByName = title => {
    return http.get(`/dogs?name=${title}`);
  };

  const getById = id => {
    return http.get(`/dogs/${id}`);
  };

//Temperaments
const getTemperaments = () => {
    return http.get("/temperament");
};

const BreedService = {
    getBreeds,
    getByName,
    getBySort,
    create,
    findByName,
    getById,
    getTemperaments,
}

export default BreedService