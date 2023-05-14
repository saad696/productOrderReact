import { Col, Row, Skeleton } from 'antd';
import React from 'react';

const ProductListSkeletion = () => {
    return (
        <>
            <Row gutter={[64, 64]}>
                <Col xs={6}>
                    <Skeleton.Image active={true} />
                </Col>
                <Col xs={6}>
                    <Skeleton.Image active={true} />
                </Col>
                <Col xs={6}>
                    <Skeleton.Image active={true} />
                </Col>
            </Row>
        </>
    );
};

export default ProductListSkeletion;
