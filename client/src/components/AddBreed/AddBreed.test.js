import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

//import { addTodo } from '../../actions';
import { Provider } from 'react-redux';
import { Link, MemoryRouter } from 'react-router-dom';
import configureStore from "redux-mock-store";
import AddBreed from './AddBreed.jsx';

configure({adapter: new Adapter()});

describe('<AddTodo />',() => {
    let wrapper;
    let store;
    const state = {
        data: [
          {
            id:1,
            name:"Pug",
            weight:"6-8",
            height:"25-30",
            lifeSpan: '10-15 years',
          },
          {
              id:2,
              name:"Samoyed",
              weight:"23 - 27",
              height:"48 - 60",
              lifeSpan: '12 - 14 years',
          }
        ],
        temperaments:[
          {
              id: "4cf89dc0-bc1c-11eb-951c-7707afc1b9c3",
              name: "Stubborn"
              
          },
          {
              id: "4cf89dc1-bc1c-11eb-951c-7707afc1b9c3",
              name: "Curious",
          }
        ],
        fullbreeds:[
          
        ]
        
    }
    const mockStore = configureStore();
    store = mockStore(state);

  describe('Estructura', () => {
    beforeEach(() => {
        wrapper =   mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={[ '/add' ]}>
              <AddBreed />
            </MemoryRouter>
          </Provider>)
    })
    it('Renderiza un <form>', () => {
      expect(wrapper.find('form')).toHaveLength(1)
    })

    it('Renderiza un labels con el texto "Name"', () => {
      
      expect(wrapper.find('label').at(0).text()).toEqual('Name');
      
      //
    })

    it('Renderiza un input con la propiedad "name" igual a "name"', () => {
      expect(wrapper.find('input[name="name"]')).toHaveLength(1); 
    })

    it('Renderiza un label con el texto igual a "Weight"', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find('label').at(1).text()).toEqual('Weight');
    })

    it('Renderiza 2 Inputs para ingregar Weight MAx y Weight Min"', () => {
      expect(wrapper.find('input[name="weightMin"]')).toHaveLength(1);
      expect(wrapper.find('input[name="weightMax"]')).toHaveLength(1);
    })

    it('Renderiza un label con el texto igual a "Height"', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find('label').at(2).text()).toEqual('Height');
    })

    it('Renderiza un input con la propiedad "name" igual a "heightMin" y heightMax', () => {
        expect(wrapper.find('input[name="heightMin"]')).toHaveLength(1);
        expect(wrapper.find('input[name="heightMax"]')).toHaveLength(1);
    })

    it('Renderiza un label con el texto igual a "Life Span"', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find('label').at(3).text()).toEqual('Life Span');
    })

    it('Renderiza un input con la propiedad "name" igual a "lifeSpanMin" y "lifeSpanMax"' , () => {
        expect(wrapper.find('input[name="lifeSpanMin"]')).toHaveLength(1);
        expect(wrapper.find('input[name="lifeSpanMax"]')).toHaveLength(1);
    })

    it('Renderiza un label con el texto igual a "Temperament"', () => {
        // El orden en el que se encuentran los Labels es importante.
        expect(wrapper.find('label').at(4).text()).toEqual('Temperament');
    })
  
    it('Renderiza 2 inputs de type "Checkbox"' , () => {
        expect(wrapper.find('input[type="checkbox"]')).toHaveLength(2);
    })
    
    it('Renderiza un boton con el "type" "submit"', () => {
      expect(wrapper.find('button[type="submit"]')).toHaveLength(1)
    })
  })

});