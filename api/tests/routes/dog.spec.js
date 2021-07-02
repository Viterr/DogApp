/* eslint-disable import/no-extraneous-dependencies */
const { Op } = require("sequelize");
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);

const dog_a = {
  name: 'Puggi',weightMin: 20,weightMax: 30, heightMin: 20,heightMax: 30,temperaments:[]
};


const dogDB1 = {
  name: 'Puggi',
  height: '10 - 22',
  weight: '30 - 33',
  
};
const dogDB2 = {
  name: 'DogiiTest',
  height: '11 - 20',
  weight: '33 - 30',
  
};
const dogDB3 = {
  name: 'DogTest',
  height: '18 - 28',
  weight: '30 - 30',
};


describe('Routes Testing', () => {
  
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true }))

    describe('GET /dogs', () => {
      it('respon con 200', () =>
        agent.get('/dogs').expect(200)
      );
      it('Debe devolver un objeto JSON ', () =>
        agent.get('/dogs')
        .expect('Content-Type',/json/)
      );
      it('El objeto debe contener los datos necesarios (name,image,temperament) ', () =>
        agent.get('/dogs')
        .then(dog => { 
          expect(dog.body.data[0]).to.have.property('name');
          expect(dog.body.data[0]).to.have.property('image');
          expect(dog.body.data[0]).to.have.property('temperament');
        })
      );
      it('Debe devolver los primeros 8 elementos  ', () =>
        agent.get('/dogs')
        .then(dog => {
          expect(dog.body.data).to.have.lengthOf(8);
        })
      );
    });

    describe('GET /dogs?name', () => {
        beforeEach( async function(){
          await Dog.bulkCreate([dogDB1,dogDB2,dogDB3]);
        })
        it(' Devuelve los registro que contengan el texto ingresado  ', () =>
          agent.get('/dogs?name=Test')
          .then(dog => {
            expect(dog.body.data[0].name).to.match(/Test/gi);
            expect(dog.body.data[1].name).to.match(/Test/gi);
          })
        );
        it(' Debe devolver la cantidad exacta de coincidencias', () =>
          agent.get('/dogs?name=Test')
          .then(dog => {
            expect(dog.body.data).to.have.lengthOf(2);
          })
        );
        it(' Si el registro no se encutra cargado en la db, debe buscar en la API externa ', () =>
          agent.get('/dogs?name=Affenpinscher')
          .then(dog => {
            expect(dog.body.data[0].name).to.have.equal('Affenpinscher');
          })
        );
        it(' El Texto a buscar no debe ser CASE SENSITIVE ', () =>
          agent.get('/dogs?name=tESt')
          .expect(200)
          .then(dog => {
            expect(dog.body.data).to.have.lengthOf(2);
          })
        );
        it('Si no encontró ningun resultado debe devolver 404 ', () =>
          agent.get('/dogs?name=noexiste').expect(404)
        );
    });
    
    describe('GET /dogs/:id', () => {
        let dogDbRows;
        beforeEach( async function(){
          await Dog.bulkCreate([dogDB1,dogDB2,dogDB3]);
          dogDbRows = await Dog.findAll();
        })
        it(' Devuelve el registro con el ID solicitado  ', async () => {
          const response = await agent.get('/dogs/'+dogDbRows[0].id)
          expect(response.body[0].name).to.have.equal(dogDbRows[0].name);
        })
        it(' Devuelve el registro con los campos necesarios para mostrar ',  () => 
          agent.get('/dogs/'+dogDbRows[0].id)
          .then(dog => {
            expect(dog.body[0]).to.have.property('name');
            expect(dog.body[0]).to.have.property('image');
            expect(dog.body[0]).to.have.property('height');
            expect(dog.body[0]).to.have.property('weight');
            expect(dog.body[0]).to.have.property('life_span');
            expect(dog.body[0]).to.have.property('temperament');
          })
        )
        it(' Debe devolver valores cargados  ',  () => 
          agent.get('/dogs/'+dogDbRows[0].id)
          .then(dog => { 
            expect(dog.body[0].name).to.have.equal(dogDB1.name);
            expect(dog.body[0].height).to.have.equal(dogDB1.height+' cm');
            expect(dog.body[0].weight).to.have.equal(dogDB1.weight+' kg'); 
          }) 
        )

        it(' Si no se encuentra el id devuelve 404  ',  () => 
          agent.get('/dogs/noexiste').expect(404)
        )
    });

    describe('POST /dog', () => {
      let resTemperament;
      beforeEach( async function(){
          resTemperament = await agent.get('/temperament');
          dog_a.temperaments = [resTemperament.body[0].id,resTemperament.body[1].id];
      })
      it(' Devuelve como respuesta 200  ',  () => {
        return agent.post('/dog').send(dog_a).expect(200);  
      })

      it(' Todos los datos de la raza deben ser cargados correctamente  ',  async () => {

        const resultPost = await agent.post('/dog').send(dog_a);
        const responsebyID = await agent.get('/dogs/'+resultPost.body.data[0].id);
       
        expect(responsebyID.body[0].name).to.have.equal(resultPost.body.data[0].name);
        expect(responsebyID.body[0].height).to.have.equal(resultPost.body.data[0].height+ ' cm');
        expect(responsebyID.body[0].weight).to.have.equal(resultPost.body.data[0].weight+ ' kg');
        expect(responsebyID.body[0].lifeSpan).to.have.equal(resultPost.body.data[0].life_span);
        expect(responsebyID.body[0].temperament).to.have.equal(`${resTemperament.body[0].name},${resTemperament.body[1].name}`);
        
      })

      it('Devuelve 400 si falta algun campo obligatorio', () =>
        agent.post('/dog').send({weightMin: 20,weightMax: 30, heightMin: 20}).expect(400)
      );
      
    });

});
