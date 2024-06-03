
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import React from 'react';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import {Button, Container} from "react-bootstrap";
import {Link} from "react-router-dom";


export default function PaginationBar({currentCategory, currentPage, totalPages}) {
    const renderPages = () => {
        const pages = [];
        let start = currentPage > 4 ? currentPage - 4 : 1;
        let end = (currentPage + 4 < totalPages) ? currentPage + 4 : totalPages;
        console.log(`start is ${start}, end is ${end}`);
        for (let i = start; i < end + 1; i++) {
            let element = (
                <div>
                    <Button href={`/catalog/${currentCategory.id}/${i}`}>{i}</Button>
                </div>
            )
            console.log(`${i} ${currentPage}, ${i === currentPage}`);
            //console.log(`currentCategory ${currentCategory.id}`);
            console.log("================================================================\n");
            if (i === currentPage) {
                element = (
                    <div>
                        <Button href={`/catalog/${currentCategory.id}/${i}`}>{i}</Button>
                    </div>
                )
            }
            pages.push(element);
        }
        return pages;
    };

    return (
        <nav aria-label='...'>
            <Container className='mb-0'>
                <div >
                    <Button href={currentCategory ? `/catalog/${currentCategory.id}/${currentPage - 1}` : '#'} tabIndex={-1} aria-disabled='true'>
                        Предыдущая
                    </Button>
                </div>
                {renderPages()}
                <div>
                    <Button href={currentCategory ? `/catalog/${currentCategory.id}/${currentPage + 1}` : '#'}>Следующая</Button>
                </div>
            </Container>
        </nav>
    );
}