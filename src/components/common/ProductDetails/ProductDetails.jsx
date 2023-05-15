import { Button, Checkbox, Divider, Form, Image, InputNumber, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Dummmy } from '../..';
import { util } from '../../../utils/utils';
import { ShoppingCartOutlined } from '@ant-design/icons';

const ProductDetails = ({ product }) => {
    const [img, setImg] = useState(product.productImages[0]);
    const [quantity, setQuantity] = useState(12);

    const [quantityForm] = Form.useForm();

    const handleImgOnError = () => {
        setImg(Dummmy);
    };

    const handleAddItem = () => {
        console.log(quantityForm.getFieldsValue());
    };

    return (
        <>
            <Typography.Title>{product.itemDescription}</Typography.Title>
            <Image
                preview={false}
                className={`rounded-xl brightness-75 cursor-pointer border-2 border-black`}
                alt={product.itemDescription}
                src={img}
                onError={handleImgOnError}
                width={250}
            />
            {/* main description */}
            <div className='my-8'>
                <Typography.Text className='text-gray-400 font-medium'>
                    #{product.itemNumber}
                </Typography.Text>
                <div className='flex justify-between items-center mb-4'>
                    <Typography.Title level={3} className='!m-0'>
                        {product.itemDescription}
                    </Typography.Title>
                    <Typography.Title level={3} className='!m-0'>
                        {product.currency.symbol}
                        {product.variants[0].grossPrice}
                    </Typography.Title>
                </div>
                <Typography.Text className='text-gray-400 font-medium'>
                    {product.variants[0].saleDescription.length < 30
                        ? "Introducing the revolutionary TechGizmo 5000! With a sleek design and advanced features, this device offers unparalleled performance. Experience lightning-fast processing, crystal-clear visuals, and immersive sound. Whether you're a tech enthusiast, gamer, or creative professional, it caters to all your needs."
                        : product.variants[0].saleDescription.length}
                </Typography.Text>
            </div>
            {/* main description */}

            {/* color description */}
            <div className='mb-8'>
                <Typography.Title level={3}>
                    Please Select Color Description
                </Typography.Title>
                {util
                    .filterArrayOfObjects(product, 'colorDescription')
                    .map((product) => (
                        <Tag className='hover:cursor-pointer m-2'>
                            {product.colorDescription}
                        </Tag>
                    ))}
            </div>
            {/* color description */}

            {/* packaging description */}
            <div className='mb-8'>
                <Typography.Title level={3}>
                    Please Select Packaging Description
                </Typography.Title>
                {util
                    .filterArrayOfObjects(product, 'packingDescription')
                    .map((product) => (
                        <Tag className='hover:cursor-pointer m-2'>
                            {product.packingDescription}
                        </Tag>
                    ))}
            </div>
            {/* packaging description */}

            {/* quantity selection */}
            <div>
                <Typography.Title level={3}>Enter Quantity</Typography.Title>
                <Form name='productQuantityForm' form={quantityForm}>
                    <Form.Item
                        name='productQuantity'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter quantity',
                            },
                            {
                                pattern: new RegExp(/^(1[2-9]|[2-9][0-9])$/),
                                message:
                                    'Quantity should be more than 12 and less than 100',
                            },
                        ]}
                    >
                        <InputNumber
                            min={12}
                            max={100}
                            value={quantity}
                            className='w-full'
                        />
                    </Form.Item>
                    <Form.Item
                        name='urgent'
                    >
                        <Checkbox>Need Urgent Order?</Checkbox>
                    </Form.Item>
                    <Divider />
                    <Button
                        htmlType='submit'
                        onClick={handleAddItem}
                        danger
                        className='w-full'
                    >
                        <span className='font-semibold'>Add Product</span>
                    </Button>
                </Form>
            </div>
            {/* quantity selection */}
        </>
    );
};

export default ProductDetails;
