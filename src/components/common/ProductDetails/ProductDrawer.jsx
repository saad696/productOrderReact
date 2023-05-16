import { Col, Drawer, Row } from 'antd';
import { ProductDetailCart, ProductDetails } from '../..';
import useWindowDimensions from '../../../hooks/use-widnow-dimensions';

const ProductDrawer = ({ productDetails, openDrawer, handleProductDrawer }) => {
    const { width } = useWindowDimensions();
    return (
        <>
            <Drawer
                title=''
                closable={false}
                open={openDrawer}
                onClose={handleProductDrawer}
                placement='right'
                width={width < 500 ? '90%' : '70%'}
                className='z-[9999999999]'
            >
                <Row>
                    <Col
                        xs={24}
                        lg={12}
                        className='lg:border-r-2 lg:border-gray-100 lg:border-dashed lg:pr-4'
                    >
                        <ProductDetails product={productDetails} />
                    </Col>
                    <Col xs={24} lg={12} className='lg:pl-4'>
                        <ProductDetailCart />
                    </Col>
                </Row>
            </Drawer>
        </>
    );
};

export default ProductDrawer;
