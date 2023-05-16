import {
    Button,
    Checkbox,
    Divider,
    Form,
    Image,
    InputNumber,
    Tag,
    Tooltip,
    Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Dummmy } from '../..';
import { util } from '../../../utils/utils';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import useWindowDimensions from '../../../hooks/use-widnow-dimensions';

const ProductDetails = ({ product }) => {
    const [img, setImg] = useState(product.productImages[0] || Dummmy);
    const [quantity, setQuantity] = useState(12);
    const [selectedDesc, setSelectedDesc] = useState({
        color: null,
        package: null,
    });

    const { width } = useWindowDimensions();

    const [quantityForm] = Form.useForm();

    const handleImgOnError = () => {
        setImg(Dummmy);
    };

    const handleAddItem = (selectedProd) => {
        console.log(
            selectedProd.variants.filter(
                (x) =>
                    x.colorDescription === selectedDesc.color &&
                    x.packingDescription === selectedDesc.package
            )
        );
    };

    return (
        <>
            <Typography.Title level={width < 768 && 4} className='!mb-0'>
                {product.itemDescription}
            </Typography.Title>
            <Divider />
            <div className='relative'>
                <Image
                    preview={false}
                    className={`rounded-xl brightness-75 cursor-pointer border-2 border-black`}
                    alt={product.itemDescription}
                    src={img}
                    onError={handleImgOnError}
                    width={250}
                />
                {width > 1000 && (
                    <Tooltip title='Add to wishlist' placement='right'>
                        <HeartOutlined className='absolute left-[50%] top-3 text-red-600 cursor-pointer text-lg' />
                    </Tooltip>
                )}
            </div>
            {/* main description */}
            <div className='my-8'>
                <Typography.Text className='text-gray-400 font-medium'>
                    #{product.itemNumber}
                </Typography.Text>
                <div className='flex justify-between items-center mb-4'>
                    <Typography.Title
                        level={width < 768 ? 5 : 3}
                        className='!m-0'
                    >
                        {product.itemDescription}
                    </Typography.Title>
                    <Typography.Title
                        level={width < 768 ? 5 : 3}
                        className='!m-0'
                    >
                        {product.currency.symbol}
                        {product.variants[0].grossPrice}
                    </Typography.Title>
                </div>
                <Typography.Text className='text-gray-400 font-medium text-xs lg:text-sm'>
                    {product.variants[0].saleDescription.length < 30
                        ? "Introducing the revolutionary TechGizmo 5000! With a sleek design and advanced features, this device offers unparalleled performance. Experience lightning-fast processing, crystal-clear visuals, and immersive sound. Whether you're a tech enthusiast, gamer, or creative professional, it caters to all your needs."
                        : product.variants[0].saleDescription}
                </Typography.Text>
            </div>
            {/* main description */}

            {/* color description */}

            <div className='mb-8'>
                <Typography.Title level={width < 768 ? 5 : 3}>
                    Please Select Color Description
                </Typography.Title>
                {util
                    .filterArrayOfObjects(product, 'colorDescription')
                    .map((_product) => (
                        <Tag
                            className='hover:cursor-pointer m-2'
                            key={_product._id}
                            color={
                                selectedDesc.color ===
                                    _product.colorDescription && 'red'
                            }
                            onClick={() => {
                                setSelectedDesc({
                                    package: null,
                                    color: _product.colorDescription,
                                });
                            }}
                        >
                            {_product.colorDescription}
                        </Tag>
                    ))}
            </div>

            {/* color description */}

            {/* packaging description */}
            {selectedDesc.color && (
                <div className='mb-8'>
                    <Typography.Title level={width < 768 ? 5 : 3}>
                        Please Select Packaging Description
                    </Typography.Title>
                    {product.variants
                        .filter(
                            (x) => x.colorDescription === selectedDesc.color
                        )
                        .map((_product) => (
                            <Tag
                                className='hover:cursor-pointer m-2'
                                key={_product._id}
                                color={
                                    selectedDesc.package ===
                                        _product.packingDescription && 'red'
                                }
                                onClick={() => {
                                    setSelectedDesc((prevState) => {
                                        return {
                                            ...prevState,
                                            package:
                                                _product.packingDescription,
                                        };
                                    });
                                }}
                            >
                                {_product.packingDescription}
                            </Tag>
                        ))}
                </div>
            )}
            {/* packaging description */}

            {/* quantity selection */}
            <div>
                <Typography.Title level={width < 768 ? 5 : 3}>
                    Enter Quantity
                </Typography.Title>
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
                    <Form.Item name='urgent'>
                        <Checkbox>Need Urgent Order?</Checkbox>
                    </Form.Item>
                    <Divider />
                    <Button
                        htmlType='submit'
                        onClick={() => {
                            handleAddItem(product);
                        }}
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
