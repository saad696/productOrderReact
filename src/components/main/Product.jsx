import { Col, Empty, message, Row } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import {
    CategoryCard,
    CategoryFooter,
    ContentHeader,
    ProductDrawer,
    ProductListSkeleton,
} from '..';
import { useGetProductDetailsByIdMutation } from '../../apis/apiSlice';

const Product = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [productDetails, setProductDetails] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [getProductDetailsById] = useGetProductDetailsByIdMutation();

    const getProductDetails = async () => {
        setLoading(true);
        try {
            const { data } = await getProductDetailsById(id);
            setProductDetails(data.result);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message.error('Something went wrong!');
        }
    };

    const handleSelectedProduct = (product) => {
        setSelectedProduct(product);
    };

    useEffect(() => {
        getProductDetails();
    }, [id]);

    return (
        <>
            <div className='bg-white p-4 rounded-md shadow-md'>
                <ContentHeader title='All Products' />
                <Row>
                    {loading ? (
                        <ProductListSkeleton />
                    ) : productDetails && productDetails.length ? (
                        productDetails.map((data) => (
                            <Col xs={8} md={6} key={data.productId}>
                                <CategoryCard
                                    name={data.itemDescription}
                                    img={data.productImages[0]}
                                    id={data.productId}
                                    showWishlistIcon={true}
                                    entireProd={data}
                                    handleSelectedProduct={
                                        handleSelectedProduct
                                    }
                                    fromProduct={true}
                                />
                            </Col>
                        ))
                    ) : (
                        <Col xs={24}>
                            <Empty description='No Sub-category/Product found!' />
                        </Col>
                    )}
                </Row>
            </div>
            <div className='relative h-[300px]'>
                <CategoryFooter />
            </div>
            {selectedProduct && (
                <ProductDrawer productDetails={selectedProduct} openDrawer={selectedProduct}/>
            )}
        </>
    );
};

export default Product;
