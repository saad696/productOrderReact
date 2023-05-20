import { Button, Divider, Space, Table, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import useWindowDimensions from '../../../hooks/use-widnow-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import {
    clearProducts,
    removeProductById,
} from '../../../redux/slice/productSlice';

const ProductDetailCart = () => {
    const { width } = useWindowDimensions();

    const selectedProducts = useSelector((state) => state.product.list);
    const dispatch = useDispatch();

    // table columns
    const columns = [
        {
            title: 'Product',
            dataIndex: 'productName',
            key: 'productName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'grossPrice',
            key: 'grossPrice',
            render: (_, record) => <p>{record.total.toLocaleString()}</p>,
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size='middle'>
                    <a
                        onClick={() => {
                            dispatch(removeProductById(record.addedItemUid));
                        }}
                    >
                        <DeleteOutlined />
                    </a>
                </Space>
            ),
        },
    ];
    // table columns

    const calculateTotal = useMemo(() => {
        console.log('inside');
        return selectedProducts.reduce(
            (acc, product) => +acc + +product.total,
            0
        );
    }, [selectedProducts]);

    console.log(calculateTotal);
    return (
        <>
            <div className='w-full'>
                <Space className='justify-between w-full'>
                    <Typography.Title level={width < 768 ? 5 : 3}>
                        Order List
                    </Typography.Title>
                    <Button
                        onClick={() => {
                            dispatch(clearProducts());
                        }}
                    >
                        Clear
                    </Button>
                </Space>
            </div>
            <Divider />
            <Table
                columns={columns}
                dataSource={selectedProducts}
                pagination={false}
                footer={() => (
                    <strong className='text-right block'>
                        Total Price: {calculateTotal}{' '}
                        {selectedProducts[0]?.currency.symbol}
                    </strong>
                )}
            />
            <Divider />
            <Button htmlType='submit' danger className='w-full'>
                <span className='font-semibold'>Add to cart</span>
            </Button>
        </>
    );
};

export default ProductDetailCart;
