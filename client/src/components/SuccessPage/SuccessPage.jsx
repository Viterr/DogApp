import React from 'react'
import { Link,Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import './SuccessPage.css';
function SuccessPage(){
    const lastCreatedid = useSelector(state => state.data)
    return (
        
        <main className="container">
            {lastCreatedid.length ?  (
            <div className = "success-container">
                <div className="content"><h2> Dog Registration successful</h2></div>
                
                <ul className="success-button">
                    <li >
                        <Link to={"/detail/"+lastCreatedid[0].id} >
                            VIEW DETAIL 
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add"} >
                             ADD ANOTHER
                        </Link>
                    </li>
                </ul>
            </div>
            ): <Redirect to='/doglist' />}
        </main>
    )
}
export default SuccessPage