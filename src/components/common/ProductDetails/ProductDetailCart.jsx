import { Table, Typography } from 'antd';
import React from 'react';
import useWindowDimensions from '../../../hooks/use-widnow-dimensions';

const columns = [
    {
        title: 'Product',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: '',
        key: 'action',
        render: (_, record) => (
            <Space size='middle'>
                <a>
                    <DeleteOutlined />
                </a>
            </Space>
        ),
    },
];

const ProductDetailCart = () => {
    const { width } = useWindowDimensions();

    return (
        <>
            <Typography.Title level={width < 768 ? 5 : 3}>
                Order List
            </Typography.Title>
            <Table columns={columns} data={null} />
        </>
    );
};

export default ProductDetailCart;
