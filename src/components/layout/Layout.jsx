import React from 'react';

import { Button, Layout, Menu } from 'antd';
import {
    DropboxOutlined,
    AppstoreOutlined,
    ShoppingOutlined,
    HeartOutlined,
    AlertOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

import { CustomHeader, Logo, RightBar } from '..';
import { useState } from 'react';
import useWindowDimensions from '../../hooks/use-widnow-dimensions';

const { Content, Footer, Sider } = Layout;

const CustomLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [openRightBar, setOpenRightBar] = useState(false);

    const { width } = useWindowDimensions();

    const handleRightBar = () => setOpenRightBar(!openRightBar);

    return (
        <>
            <Layout>
                {/* header */}
                <CustomHeader handleRightBar={handleRightBar} />
                {/* header */}

                {/* outer container */}
                <Content className='px-[12px] lg:px-[30px]'>
                    {/* layout */}
                    <Layout
                        style={{
                            padding: '24px 0',
                        }}
                    >
                        {/* sidebar */}
                        <Sider
                            width={180}
                            trigger={null}
                            collapsible
                            collapsed={width < 768 ? true : collapsed}
                            theme='light'
                            className='rounded-md shadow-md'
                        >
                            <img
                                src={Logo}
                                alt='Logo'
                                height={32}
                                className='bg-white p-6 rounded-md'
                            />
                            {/* only showing the collapse button on smaller devices */}
                            {width > 768 && (
                                <Button
                                    className='bg-white min-w-full rounded-none'
                                    type='text'
                                    icon={
                                        collapsed ? (
                                            <MenuUnfoldOutlined />
                                        ) : (
                                            <MenuFoldOutlined />
                                        )
                                    }
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        fontSize: '16px',
                                        width: 64,
                                        height: 64,
                                    }}
                                />
                            )}
                            <Menu
                                mode='inline'
                                defaultSelectedKeys={['2']}
                                defaultOpenKeys={['2']}
                                items={[
                                    {
                                        key: '1',
                                        icon: <AppstoreOutlined />,
                                        label: 'Dashboard',
                                        disabled: true,
                                    },
                                    {
                                        key: '2',
                                        icon: <DropboxOutlined />,
                                        label: 'All Products',
                                    },
                                    {
                                        key: '3',
                                        icon: <ShoppingOutlined />,
                                        label: 'Orders',
                                        disabled: true,
                                    },
                                    {
                                        key: '4',
                                        icon: <HeartOutlined />,
                                        label: 'Favorites',
                                        disabled: true,
                                    },
                                    {
                                        key: '5',
                                        icon: <AlertOutlined />,
                                        label: 'New Arrivals',
                                        disabled: true,
                                    },
                                ]}
                            />
                        </Sider>
                        {/* sidear */}

                        {/* main container */}
                        <Content
                            style={{
                                padding:
                                    width < 1000
                                        ? '0 0px 0 18px'
                                        : '0 18px 0 18px',
                                minHeight: '80vh',
                            }}
                        >
                            {children}
                        </Content>
                        {/* main container */}
                        {/* right sidebar */}
                        <RightBar
                            openDrawer={openRightBar}
                            handleRightBar={handleRightBar}
                        />
                        {/* right sidebar */}
                    </Layout>
                    {/* layout */}
                </Content>
                {/* outer container */}

                {/* footer */}
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer>
                {/* footer */}
            </Layout>
        </>
    );
};

export default CustomLayout;
