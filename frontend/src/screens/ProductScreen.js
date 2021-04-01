import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Row, Col, Image, ListGroup, Card, Button} from "react-bootstrap";
import Rating from "../components/Rating";
// now getting it from server
// import products from "../products";
import axios from "axios"

const ProductScreen = ({match}) => {
    // const product = products.find(p => p._id === match.params.id);
    const [product, setProduct] = useState({});
    let _id = match.params.id;
    useEffect(() => {
        const fetchProduct = async () => {
            const {data} = await axios.get(`/api/products/${_id}`)
            setProduct(data)
        }
        fetchProduct()
    }, [_id])

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            <Row>
                <Col md={6}>
                    {/* fluid keeps image in its container */}
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    {/* flush takes away the border */}
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating rating={product.rating} numReviews={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: ${product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price</Col>
                                    <Col><strong>{product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status</Col>
                                    <Col>{product.countInStock > 0 ? 'In Stock': 'Out of Stock'}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button  className="btn-block" type="button" disabled={product.countInStock === 0}>
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen