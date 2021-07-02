import {React} from 'react';
import { useSelector} from 'react-redux';

import './FullPageLoader.css';
import loadGif from '../../assets/img/dogLoader.gif'
export default function FullPageLoader(){
    const loading = useSelector(state => state.loading)

    if(!loading) return null
    return (
        <div className="page-loader">
            <div className="loader"> 
                <img src={loadGif} alt="" />
            </div>

        </div>
    )
}