import { Col, Divider, Input, Row, Typography } from 'antd';
import React from 'react';
import useWindowDimensions from '../../hooks/use-widnow-dimensions';

const { Title } = Typography;

const ContentHeader = ({ title }) => {
    const {width} = useWindowDimensions()

    return (
        <>
            <Row align='middle'>
                <Col xs={24} md={12}>
                    <Title className='!mb-0' level={width > 768 ? 2 : 4}>{title}</Title>
                </Col>
                <Col xs={0} md={12}>
                    <Input.Search size='medium' placeholder='Search Here...' />
                </Col>
            </Row>
            <Divider />
        </>
    );
};

export default ContentHeader;
