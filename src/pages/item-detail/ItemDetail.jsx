import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import { getItemDetail } from "../services/Api";
import "../item-detail/itemDetail.css";
import Container from "@mui/material/Container";

export const ItemDetail = () => {
    const [itemDetail, setItemDetail] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        fetchItemDetail(id);
    }, [])

    const fetchItemDetail = async () => {
        const detail = await getItemDetail(id);
        if(detail){
            setItemDetail(detail);
        }
        return detail;
    }

    return (
        <>
            <Container>
                <h2 className="page-title">Item detail</h2>
                <div className="item-detail">
                    <div className="item-image"><img src={itemDetail.image} /></div>
                    <div className="itemContent">
                        <h2>{itemDetail.title}</h2>
                        <div className="year">Publish year: {itemDetail.year}</div>
                        <div className="desc">{itemDetail.description}</div>
                        <div className="price">${itemDetail.price}</div>
                        <div className="detail-block">
                            <h3 className="block-title">Product Details</h3>
                            <div className="detail-list">
                                <span>Publisher</span> {itemDetail.publisher}
                            </div>
                            <div className="detail-list">
                                <span>Pages</span> {itemDetail.pages}
                            </div>
                            <div className="detail-list">
                                <span>Language</span> {itemDetail.language}
                            </div>
                        </div>
                        <div className="detail-block">
                            <h3 className="block-title">About the Author</h3>
                            <div className="desc">{itemDetail.aboutAuthor}</div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ItemDetail;