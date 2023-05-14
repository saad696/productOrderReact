import React from 'react';

import { Avatar, Button, Layout } from 'antd';
import { Logo } from '..';
import useWindowDimensions from '../../hooks/use-widnow-dimensions';
import { MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;

const CustomHeader = ({ handleRightBar }) => {
    const { width } = useWindowDimensions();

    return (
        <>
            <Header>
                <div className='flex justify-between items-center'>
                    <img
                        src={Logo}
                        alt='Logo'
                        style={{
                            float: 'left',
                            width: 120,
                            height: 31,
                            margin: '16px 24px 16px 0',
                        }}
                    />
                    <div className='flex items-center'>
                        {width > 500 && (
                            <>
                                <Avatar className='bg-[#fde3cf] text-[#f56a00]'>
                                    A
                                </Avatar>
                                <div className=' ml-2'>
                                    <p className='text-white font-semibold text-xs'>
                                        User Admin
                                    </p>
                                    <p className='text-gray-500 text-xs'>
                                        user.admin@elred.com
                                    </p>
                                </div>
                            </>
                        )}
                        {width < 1000 && (
                            <Button
                                className='text-white ml-8 flex items-center'
                                onClick={handleRightBar}
                                size={"small"}
                            >
                                <MenuOutlined />
                            </Button>
                        )}
                    </div>
                </div>
            </Header>
        </>
    );
};

export default CustomHeader;
