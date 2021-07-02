const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      // it('should throw an error if name is null', (done) => {
      //   Dog.create({})
      //     .then(() => done(new Error('It requires a valid name')))
      //     .catch(() => done());
      // });
      
      it('Campo "name" es obligatorio ',  () => 
        Dog.create({
          height: '18 - 28',
          weight: '30 - 30',
        })
        .then(() => done(new Error('It requires a valid name')))
        .catch(e => expect(e.errors[0].path).to.equal('name'))
      )
      it('Campo "height" es obligatorio ',  () => 
        Dog.create({
          name : 'Pug',
          
          weight: '30 - 30'
        })
        .then(() => done(new Error('It requires a valid Height')))
        .catch(e => expect(e.errors[0].path).to.equal('height'))
      )
      it('Campo "weight" es obligatorio ',  () => 
        Dog.create({
          name : 'Pug',
          height: '18 - 28'
        })
        .then(() => done(new Error('It requires a valid name')))
        .catch(e => expect(e.errors[0].path).to.equal('weight'))
      )
    });
  });
});
