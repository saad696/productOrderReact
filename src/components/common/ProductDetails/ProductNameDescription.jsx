import { Col, Row, Image } from 'antd';
import React, { useState } from 'react';
import { Dummmy } from '../..';

const ProductNameDescription = ({ product }) => {
    const [img, setImg] = useState(product.productImages[0] || Dummmy);

    const handleImgOnError = () => {
        setImg(Dummmy);
    };

    return (
        <Row align={'middle'}>
            <Col xs={0} md={7}>
                <Image
                    preview={false}
                    alt={product.productName}
                    src={img}
                    onError={handleImgOnError}
                    width={40}
                    className='rounded'
                />
            </Col>
            <Col xs={24} md={17}>
                <strong className='text-[12px]'>{product.productName}</strong>
                <p className='text-[9px] font-semibold'>{product.packingDescription}</p>
            </Col>
        </Row>
    );
};

export default React.memo(ProductNameDescription);
