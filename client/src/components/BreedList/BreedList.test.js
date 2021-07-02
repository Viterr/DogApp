import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Link, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from "redux-mock-store";

import BreedList from './BreedList';
import BreedCard from '../BreedCard/BreedCard';
import Pagination from '../Pagination/Pagination';

configure({adapter: new Adapter()});

describe('<Breedlist />', () => {
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
        
      ],
      totalItems:2
      
  }

  const mockStore = configureStore();
  store = mockStore(state);
  //const status = "Todo";
  beforeEach(  () => {
    wrapper =   mount(<Provider store={store}>
                      <MemoryRouter initialEntries={[ '/doglist' ]}>
                        <BreedList />
                      </MemoryRouter>
                    </Provider>)
  })
  
  it('deberia mapear la cantidad de Cards que haya en el store y renderizar un <Card /> por cada uno',  () => {
     expect(wrapper.find(BreedCard)).toHaveLength(2)
     
  })

  it('deberia pasar como props al componente Card el `name` de la Raza', () => {
    expect(wrapper.find(BreedCard).at(0).prop('name')).toBe('Pug');
  })

  it('Deberia contener un input para realizar filtrado por name', () => {
    expect(wrapper.find('.input-finder')).toHaveLength(1);
  })

  it('deberia renderizar una Imagen, por cada <Card> que exista', () => {
    expect(wrapper.find('img')).toHaveLength(2)
  })

  it('El <Link> deberia redirigir a "/detail/:id", y que el "id" matchee el id de cada Raza', () => {
    expect(wrapper.find(Link).at(1).prop('to')).toEqual('/detail/2')
  })
  
  it('Deberia renderizar  un elemento Pagination ', () => {
    
    expect(wrapper.find(Pagination)).toHaveLength(1)
  })
  

});