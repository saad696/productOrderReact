import { CloseCircleFilled, DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Drawer, Layout, Row, Space, Table } from 'antd';
import React, { useEffect } from 'react';
import useWindowDimensions from '../../hooks/use-widnow-dimensions';

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

const RightBar = ({ openDrawer, handleRightBar }) => {
    const { width } = useWindowDimensions();

    

    useEffect(() => {
        JSON.parse(localStorage.getItem('cart'))
    }, [])

    return (
        <>
            {width > 1000 ? (
                <Layout.Sider
                    theme='light'
                    width={420}
                    className='rounded-md shadow-md'
                >
                    <Table columns={columns} dataSource={} />
                </Layout.Sider>
            ) : (
                <Drawer
                    title=''
                    closable={false}
                    open={openDrawer}
                    onClose={handleRightBar}
                    placement='right'
                    width={340}
                    className="z-[9999999]"
                >
                    <div className='flex justify-end'>
                        <Button className="flex items-center mb-6" size="small" onClick={handleRightBar}><CloseCircleFilled /></Button>
                    </div>
                    <Table columns={columns} dataSource={JSON.parse(localStorage.getItem('cart'))} />
                </Drawer>
            )}
        </>
    );
};

export default RightBar;
