import { Col, Drawer, Row } from 'antd';
import { ProductDetails } from '../..';

const ProductDrawer = ({ productDetails, openDrawer, handleProductDrawer }) => {
    return (
        <>
            <Drawer
                title=''
                closable={false}
                open={openDrawer}
                onClose={handleProductDrawer}
                placement='right'
                width={'70%'}
                className='z-[9999999]'
            >
                <Row>
                    <Col xs={12} className='border-r-2 border-gray-100 border-dashed pr-4'><ProductDetails product={productDetails} /></Col>
                    <Col xs={12}></Col>
                </Row>
            </Drawer>
        </>
    );
};

export default ProductDrawer;
