import { Link } from "react-router-dom";
import { addFavourites } from "../pages/services/Api";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import favoriteIcon from '../favorite-icon.svg';
import favoriteFullIcon from '../favorite-full-icon.svg';
import DeleteModal from "../components/DeleteModal";
import { Fragment } from "react";


export const Book = (props) => {
    const { id, image, title, year, price, description, favourite } = props.book;

    const isFavourite = props.favouriteData?.find(res => res.id === props.book.id);

    const handleAddfavourites = async () => {
        try {
            const res = await addFavourites(props.book);
            favouriteId = props.id;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={ image }
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                { title }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                { description.length > 200 ? description.substring(0, 200) + "..." : description }
                </Typography>
            </CardContent>
            <CardActions className="book-action">
                <Link to={'/books/'+id} className="custom-link">Learn More</Link>
                {!props.favourite &&
                <Fragment>
                    {!isFavourite 
                    ? <Button size="small" onClick={handleAddfavourites}><img src={favoriteIcon} width="16px" /></Button> 
                    : <Button size="small" onClick={() => props.handleDeletefavourites}><img src={favoriteFullIcon} width="16px" /></Button>
                    }
                </Fragment>
                }
                {props.favourite && <DeleteModal handleDeletefavourites={props.handleDeletefavourites}/>}
            </CardActions>
        </Card>
    )
}

export default Book;
