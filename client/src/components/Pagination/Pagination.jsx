import React from "react";
import {Link } from "react-router-dom";
import './Pagination.css';
function Pagination({breedsPerPage, totalBreeds, Paginate, currentPage}){
    const pageNumbers = []
    let maxLeft = (currentPage - Math.floor(breedsPerPage / 2))
    let maxRight = (currentPage + Math.floor(breedsPerPage / 2))
    let totalPages = Math.ceil(totalBreeds/breedsPerPage);

    if(maxLeft< 1){
        maxLeft = 1;
        maxRight = breedsPerPage;
    }
    if(maxRight>totalPages){
        maxLeft = totalPages - (breedsPerPage - 1)
        
        if (maxLeft < 1){
        	maxLeft = 1
        }
        maxRight = totalPages
    }
    for(let i = maxLeft; i <= maxRight;i++){
        pageNumbers.push(i)
    }
    if(currentPage !== 1){
        pageNumbers.unshift(1)
    }
    if(currentPage !== totalPages){
        //console.log(Number(totalPages));
        pageNumbers.push(Number(totalPages))
    }
    return (
        <section className="section-pagination">
            <article>
                <ul className="pagination">
                    {
                        pageNumbers.map((number,index) => (
                            <li key ={index} >
                                <Link to='!#' className={currentPage === number ? 'active' : ''} onClick={Paginate}>
                                    {number}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </article>
        </section>
    )
}

export default Pagination