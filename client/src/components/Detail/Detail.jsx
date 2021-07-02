import React, { useState, useEffect } from "react";
import BreedService from "../../utils/API"
import './Detail.css'

export default function Detail(props){
    const initialBreedState = {
        height: "",
        image: "",
        life_span:"",
        name: "",
        temperament:"",
        weight: "",
        err:false
    };

     
    const [currentBreed, setCurrentBreed] = useState(initialBreedState);

      const getBreed = async (id) => {
          try {
            const response =  await BreedService.getById(id)
            setCurrentBreed(response.data[0])
          } catch (error) {
            setCurrentBreed({
                ...currentBreed,
                err:true
            })
          }
      };

      useEffect(() => {
        
        getBreed(props.match.params.id)
        // eslint-disable-next-line
      }, [props.match.params.id]);

    return (
        <main className="container">
            
            <div className='detail-container'>
            {!currentBreed.err ? (
                <div>
                    
                    <h2>{currentBreed.name}</h2>
                    <div className="detail-content">
                        <div className="detail-content-left">
                            <h3>Temperament: </h3>
                            <p>
                                {currentBreed.temperament}
                            </p>
                            <span className="span-subtitle">Weight: </span><span className='span-text'> {currentBreed.weight}</span><br/>
                            <span className="span-subtitle">Height: </span><span className='span-text'> {currentBreed.height}</span><br/>
                            <span className="span-subtitle">Life Expectancy: </span><span className='span-text'> {currentBreed.life_span}</span>
                        </div>
                        <div className="detail-content-right" style={{backgroundImage: `url(${currentBreed.image})` }}>
                            
                        </div>
                    </div>
                </div>
            ) : (
                
                    <h2>Dog Not Found</h2>
                
            )}

            </div>
            
        </main>
    )
}