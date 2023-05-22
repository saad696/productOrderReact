import React, { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsCountInCart, removeCartItem } from '../../../redux/slice/productSlice';
import { localStorageService } from '../../../utils/localStorageService';
import { Button, Col, Row, Space, Table, message } from 'antd';
import { ProductNameDescription } from '../../';
import { util } from '../../../utils/utils';

const CartTable = ({ handleRightBar }) => {
    const dispatch = useDispatch();
    const [datasource, setDatasource] = useState([]);
    const [cartTotal, setCartTotal] = useState([]);
    const cartCount = useSelector((state) => state.product.totalItems);

    const columns = [
        {
            title: 'Product',
            dataIndex: 'productName',
            key: 'productName',
            width: 200,
            render: (_, record) => <ProductNameDescription product={record} />,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 110,
        },
        {
            title: 'Price',
            dataIndex: 'total',
            key: 'total',
            width: 110,
        },
        {
            title: '',
            key: 'action',
            width: 40,
            render: (_, record) => (
                <Space size='middle'>
                    <a
                        onClick={() => {
                            removeItemsFromCart(record.addedItemUid);
                        }}
                    >
                        <DeleteOutlined className='text-red-500' />
                    </a>
                </Space>
            ),
        },
    ];

    const removeItemsFromCart = (uid) => {
        dispatch(removeCartItem(uid));
        getCartItems();
    };

    const getCartItems = () => {
        setDatasource(localStorageService.getCartItems());
    };

    const emptyCart = (from) => {
        localStorageService.clearCartItems();
        if (from === 'clear') {
            message.success('Cart has been sucessfully cleared');
        } else {
            message.success('Order has been placed');
        }
        dispatch(getItemsCountInCart())
        handleRightBar();
    };

    useEffect(() => {
        getCartItems();
    }, [cartCount]);

    useEffect(() => {
        setCartTotal(util.getCartTotal());
    }, [datasource]);

    return (
        <>
            <Table
                columns={columns}
                dataSource={datasource}
                pagination={false}
                scroll={{ y: 250, x: true }}
                className='border-b-2 border-dashed'
            />
            {datasource.length !== 0 && (
                <div>
                    <div className='flex justify-between p-4 bg-[#f5f5f5]'>
                        <p className='font-bold text-base lg:text-lg'>
                            Other Instructions
                        </p>
                        <p className='font-bold text-red-500 pointer'>
                            Add {'>'}
                        </p>
                    </div>
                    <div className='p-4'>
                        <p className='font-bold'>Purchase Order Number:</p>
                        <p className='px-2 py-2 my-3 bg-[#f5f5f5] rounded border-[1px]'>
                            #11324451662897
                        </p>
                    </div>
                    <div className='px-4'>
                        <div className='flex justify-between'>
                            <p className='font-bold text-base lg:text-lg'>
                                Addresses
                            </p>
                            <p className='font-bold text-red-500 pointer'>
                                Add {'>'}
                            </p>
                        </div>
                        <p className='text-gray-400'>
                            16, Yashodham Center Film City Road, Goregaon (E),
                            Mumbai 400063
                        </p>
                    </div>

                    <div className='m-4 border-t-2 border-dashed p-2'>
                        {cartTotal.map((total, idx) => (
                            <div
                                className='flex justify-between'
                                key={total.key}
                            >
                                <p
                                    className={
                                        idx === 5 &&
                                        'font-semibold border-t-[2px] mt-2 pt-1'
                                    }
                                >
                                    {total.key}
                                </p>
                                <p
                                    className={
                                        idx === 5 &&
                                        'font-semibold border-t-[2px] mt-2 pt-1'
                                    }
                                >
                                    {total.value
                                        .toFixed(2)
                                        .toLocaleString('en-IN')}{' '}
                                    {datasource[0]?.currency.symbol}
                                </p>
                            </div>
                        ))}

                        <Row gutter={[16, 16]} className='mt-6'>
                            <Col xs={12}>
                                <Button
                                    danger
                                    className='w-full'
                                    onClick={() => {
                                        emptyCart('clear');
                                    }}
                                >
                                    Clear cart
                                </Button>
                            </Col>
                            <Col xs={12}>
                                <Button
                                    className='w-full'
                                    onClick={() => {
                                        emptyCart('place');
                                    }}
                                >
                                    Place Order
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartTable;
