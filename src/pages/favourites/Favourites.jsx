import { useEffect, useState } from "react";
import { getFavourites,deleteFavourites } from "../services/Api";
import Book from "../../components/Book";
import { Grid } from "@mui/material";

export const Favourites = () => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        fetchFavourites();
    }, [])

    const fetchFavourites = async () => {
        const favouritesBooks = await getFavourites();
        if(favouritesBooks?.length){
            setFavourites(favouritesBooks);
        }
        return favouritesBooks;
    }

    const handleDeletefavourites = async (id) => {
        try {
            const res = await deleteFavourites(id);
            console.log(res);
            fetchFavourites(); 
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <h1 className="page-title">Favourites</h1>
        <Grid container spacing={4} justifyContent="center" className="item-list">
            {favourites && favourites.map(book => {
                return (
                    <Grid
                        key={book.id}
                        container
                        item
                        xs={4}
                        justifyContent="center"
                    >
                        <Book book={book} favourite={true} handleDeletefavourites={() => handleDeletefavourites(book.id)} />
                    </Grid>
                )
            })}
        </Grid>
        </>
)
}

export default Favourites;