import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getFavourites, getProducts } from "../services/Api";
import { Grid, TextField, Button } from "@mui/material";
import Container from "@mui/material/Container";
import Book from "../../components/Book";
import "../home/Home.css";

export const Home = () => {

    const [books, setBooks] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [q, setSearchQ ] = useState('');
    const navigate = useNavigate();
    const [getParameters] = useSearchParams();
    const [loadProduct, setLoadProduct] = useState(3);
    let isParams = q ? q : getParameters.get("q");

    useEffect(() => {
        fetchFavourites();
        if(getParameters.get("q")){
            handleFilter();
        } else {
            fetchBooks();
        }
    }, [loadProduct])

    const handleInput = (event) => {
        setSearchQ(event.target.value);
    }

    const fetchFavourites = async () => {
        const favouritesBooks = await getFavourites();
        if(favouritesBooks?.length){
            setFavourites(favouritesBooks);
        }
        return favouritesBooks;
    }

    const fetchBooks = async () => {
        const booksList = await getProducts(isParams, loadProduct);
        if(booksList?.length){
            setBooks(booksList);
        }
        return booksList;
    }

    const handleFilter = async () => {
        const searchBooks = await getProducts(isParams, loadProduct);
        setBooks(searchBooks);
        navigate('/?q='+isParams);
        return searchBooks;
    }

    const handleClearsearch = async () => {
        setSearchQ('');
        isParams = '';
        fetchBooks();
        navigate('/');
    }

    const handleLoadMore = async () => {
        await setLoadProduct(prev => prev + 3);
    }

    return (
        <>
            <Container>
                <div className="filter">
                    <TextField 
                        label="search" 
                        value={q} 
                        type="text"
                        onChange={handleInput}
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        onClick={handleFilter}
                        disabled={!q}
                    >Search</Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="info"
                        onClick={handleClearsearch}
                        disabled={!q}
                    >Clear</Button>
                </div>
                <h1 className="page-title">Books</h1>
                <Grid container spacing={4} justifyContent="center" className="item-list">
                    {books && books.map(book => {
                        return (
                            <Grid
                                key={book.id}
                                container
                                item
                                xs={4}
                                justifyContent="center"
                            >
                                <Book book={ book } favouriteData={favourites} />
                            </Grid>
                        )
                    })}
                </Grid>
                <div className="load-more">
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="info"
                        onClick={handleLoadMore}
                    >Load More</Button>
                </div>
            </Container>
        </>
    )
}

export default Home;