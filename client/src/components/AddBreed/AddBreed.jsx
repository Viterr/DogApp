import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {getTemperaments,createBreed} from "../../actions/breeds";
import './AddBreed.css'
function AddBreed(){
    const temperaments = useSelector(state => state.temperaments);
    const errorState = useSelector(state => state.error)
    const history = useHistory();
    
    const dispatch = useDispatch();
    const inputRef = useRef({})
    const [inputs, setInputs] = useState({
        name: '',
        weightMin: '',
        weightMax: '',
        heightMin: '',
        heightMax: '',
        lifeSpanMin: '',
        lifeSpanMax: '',
        temperaments : []
    })
    const [errors, setErrors]  = useState({})
    
    useEffect(()=>{
      if(!temperaments.length) dispatch(getTemperaments());
        
    },[dispatch])

    const inputChangeHandler = (e) => {
        let nam = e.target.name;
        let val = e.target.value;
        inputRef.current[nam] ? inputRef.current[nam].className = '' : inputRef.current['temperaments'].className = 'div-check'
        setErrors({});
        if(nam === 'temperaments[]') { 
            e.target.checked ? 
                setInputs(e => ({...inputs, temperaments: inputs.temperaments.concat(val)})) : 
                setInputs(e => ({...inputs, temperaments: inputs.temperaments.filter(el => el !== val)}))
        }else{
            setInputs({...inputs, [nam]: val});
        }
    }  

    const submitHandler =  (e) => {
        e.preventDefault()
        setErrors({})
        for(const key in inputs){
            if(!inputs[key] || !inputs[key].length ){
                
                controlErrors(key)
                return;
            }
        }
        dispatch(createBreed(inputs,history));
    }

    const controlErrors = (key) =>{ 
        setErrors({[key]:  key+' Is required'})
        inputRef.current[key].focus();
        inputRef.current[key].className += ' hasError';
    }

    return (
    
        <main className="container">
            <div className="div-form">
                <h2>ADD NEW DOG</h2>
                <form onSubmit={submitHandler}>
                    <div>
                        <label>Name</label>
                        <div className="div-input">
                            <input type="text" name='name'  ref={el => inputRef.current['name'] = el} onChange={inputChangeHandler} placeholder="Name..."  />
                        </div>
                        {(errors.name ||  errorState)  && <div className='input-error'><p>{errors.name || errorState  }</p></div> }
                        <label>Weight</label>
                        <div className="div-input">
                            <div>Min</div>
                            <input type="number" name="weightMin" min="1" ref={el => inputRef.current['weightMin'] = el} onChange={inputChangeHandler} placeholder="Min..."/>
                            <div>Max</div>
                            <input type="number" name="weightMax" min="1" ref={el => inputRef.current['weightMax'] = el} onChange={inputChangeHandler} placeholder="Max..."/>
                        </div>
                        {(errors.weightMin || errors.weightMax) && <div className="input-error"><p>{errors.weightMin || errors.weightMax}</p></div> }
                        <label>Height</label>
                        <div className="div-input">
                            <div>Min</div>
                            <input type="number" name="heightMin" min="1" ref={el => inputRef.current['heightMin'] = el} onChange={inputChangeHandler} placeholder="Min..."/>
                            <div>Max</div>
                            <input type="number" name="heightMax" min="1" ref={el => inputRef.current['heightMax'] = el} onChange={inputChangeHandler} placeholder="Max..."/>
                        </div>
                        {(errors.heightMin || errors.heightMax) && <div className="input-error"><p>{errors.heightMin || errors.heightMax}</p></div> }
                        <label>Life Span</label>
                        <div className="div-input">
                            <div>Min</div>
                            <input type="number" name="lifeSpanMin" min="1" ref={el => inputRef.current['lifeSpanMin'] = el} onChange={inputChangeHandler} placeholder="Min..."/>
                            <div>Max</div>
                            <input type="number" name="lifeSpanMax" min="1" ref={el => inputRef.current['lifeSpanMax'] = el} onChange={inputChangeHandler} placeholder="Max..."/>
                        </div>
                        {(errors.lifeSpanMin || errors.lifeSpanMax) && <div className="input-error"><p>{errors.lifeSpanMin || errors.lifeSpanMax}</p></div> }
                    </div>
                    <div>
                        <label>Temperament</label>
                        <div className="div-check" ref={el => inputRef.current['temperaments'] = el}>
                            {
                                temperaments.map((el,id) => (
                                    <label className="check-container" key={id}  >{el.name}
                                        <input name="temperaments[]"   value={el.id} onChange={inputChangeHandler} type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                ))
                            }
                        </div>
                        {errors.temperaments && <div className="input-error"><p>{errors.temperaments}</p></div> }
                    </div>
                    <div className="div-submit">
                        <button type="submit" className="submit-btn">SUBMIT</button>
                    </div>
                </form>
            </div>
        </main>
    )
}


export default AddBreed;