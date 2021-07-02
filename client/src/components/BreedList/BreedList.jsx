import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBreeds,
  getBreedSort,
  getBreedByName,
  getTemperaments
} from "../../actions/breeds";
import BreedCard from "../BreedCard/BreedCard";
import './BreedList.css';
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import Pagination from "../Pagination/Pagination";

function BreedList(){
    const initialFilterSort = {
        sort: {
            key :'',
            direction : ''
        },
        filter:{
            filter:'',
            value:''
        }
    }
    const [inputName, setInputName] = useState('');
    const [selectOrder, setselectOrder] = useState(initialFilterSort);
    const [currentPage, setCurrentPage] = useState(1);
    const [breedsPerPage] = useState(8);

    const state = useSelector(state => state);
    const breeds = state.data;
    const totalBreeds = state.totalItems;
    const temperaments = state.temperaments;
    const fullbreeds = state.fullbreeds;
    const dispatch = useDispatch();

    useEffect(() => {
        if(!breeds.length) dispatch(getAllBreeds());
        if(!temperaments.length)dispatch(getTemperaments());
        // eslint-disable-next-line
      }, [dispatch]);
    

    const handleSubmit = (e) => {
        e.preventDefault()
        
        dispatch(getBreedByName(inputName.toLowerCase()))
        setCurrentPage(1)
        setselectOrder(initialFilterSort)
    }

    const handleInputChange = (e) => {
        setInputName(e.target.value);
    }

    const handleSelectChange = (e) =>{
        let filter = selectOrder.filter.filter;
        let value = selectOrder.filter.value ;
        let key = selectOrder.sort.key ;
        let direction = selectOrder.sort.direction;
        let page;
        if(e.target.className.includes('filter')){
            filter =e.target.name.split('_')[1];
            value = e.target.value;
            setselectOrder({
                ...selectOrder,
                filter:{
                    filter: e.target.name.split('_')[1],
                    value:e.target.value
                }
            })
            page=1
        }else{
            [key, direction] = e.target.value.split('_');
            setselectOrder({
                ...selectOrder,
                sort:{
                    key,
                    direction
                }
            })
            page=currentPage
        }
        setInputName('');
        dispatch(getBreedSort({filter,key,value,direction, page}))
        
    }

    

    const Paginate = (e) => {
        e.preventDefault()
        setCurrentPage(Number(e.target.innerText))
        
        dispatch(getBreedSort({
            ...selectOrder.filter,
            ...selectOrder.sort,
            name: inputName,
            page:Number(e.target.innerText)
        }))
    }

    return (
        <main className="container">
            <section className="section-finder">
                <form className="form-finder" onSubmit={handleSubmit}>
                    <div>
                        <input value={inputName} onChange={handleInputChange} className="input-finder"/>
                        
                        <button className="button-finder">SEND</button>
                    </div>
                    
                    <div className="filter-section">
                        <select name='filter_temperament'  defaultValue={''} onChange={handleSelectChange} className="select-finder filter">
                            <option value='' >Filter by Temperament</option>
                            {
                                temperaments.map((el,id) => 
                                    <option value={el.name} key={id}> {el.name} </option>
                                )
                            }
                            
                        </select >
                        <select name='filter_id'  defaultValue={''} onChange={handleSelectChange} className="select-finder filter">
                            <option value='' >Filter by breeds</option>
                            {
                                fullbreeds.map((el,id) => 
                                    <option value={el.id} key={id}> {el.name} </option>
                                )
                            }
                            
                        </select >
                        <select onChange={handleSelectChange} defaultValue={'name_asc'}  className="select-finder">
                            <option value="name_asc" > Name Ascending </option>
                            <option value="name_desc"> Name Descending </option>
                            <option value="weight_asc"> Weight Ascending </option>
                            <option value="weight_desc"> Weight Descending </option>
                        </select >
                    </div>
                </form>
            </section>
            <section className="card-row">
                {
                    breeds ? breeds.map((breed,index)=>(
                        <BreedCard
                            key={index}
                            id={breed.id}
                            image={breed.image}
                            name={breed.name}
                            temperament={breed.temperament}
                        />
                    ))
                    : (
                        <div className="content-noresults">
                        <p>¡ No se encontraron resultados !</p>
                        </div>
                     )
                }
            </section>
            <Pagination
               breedsPerPage={breedsPerPage}
               totalBreeds = {totalBreeds}
               Paginate = {Paginate}
               currentPage = {currentPage}
            />
            <FullPageLoader />
        </main>
    )
}

export default BreedList