import { CloseCircleFilled } from '@ant-design/icons';
import { Button, Divider, Drawer, Layout } from 'antd';
import React, {  } from 'react';
import useWindowDimensions from '../../hooks/use-widnow-dimensions';
import { CartTable } from '../';

const RightBar = ({ openDrawer, handleRightBar }) => {
    const { width } = useWindowDimensions();

    return (
        <>
            {width > 1000 ? (
                <Layout.Sider
                    theme='light'
                    width={420}
                    className='rounded-md'
                >
                    <CartTable handleRightBar={handleRightBar}/>
                </Layout.Sider>
            ) : (
                <Drawer
                    title=''
                    closable={false}
                    open={openDrawer}
                    onClose={handleRightBar}
                    placement='right'
                    width={'100%'}
                    className='z-[9999999]'
                >
                    <div className='flex justify-between'>
                        <p className='font-semibold text-lg mb-0'>
                            Shopping Cart
                        </p>
                        <Button
                            className='flex items-center'
                            size='small'
                            onClick={handleRightBar}
                        >
                            <CloseCircleFilled />
                        </Button>
                    </div>
                    <Divider />
                    <CartTable handleRightBar={handleRightBar}/>
                </Drawer>
            )}
        </>
    );
};

export default RightBar;
