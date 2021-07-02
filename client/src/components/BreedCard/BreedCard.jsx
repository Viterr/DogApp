import {React} from 'react';
import './BreedCard.css';
import { Link } from "react-router-dom";
import imgNotFound from "../../assets/img/img404.webp"
function BreedCard({id,image,name,temperament}){
    const MAX_LENGHT = 57;
    return (
        <article className="card">
              <div className="card-img">
                <img src={image || imgNotFound} alt="Preview of Whizzbang Widget" />
              </div>
            <div className="card-content">
                <h3>{name}</h3>
                <p>
                {temperament ? temperament.substring(0,MAX_LENGHT-name.length): ''}...
                </p>
                <div className="card-footer">
                    <Link className="button" to={`/detail/${id}`} >
                        DETAIL
                    </Link>
                </div>
                  
            </div>
        </article>
    )
}

export default BreedCard