import { Col, Divider, Empty, message, Row } from 'antd';
import React from 'react';
import { useState } from 'react';
import {
    CategoryCard,
    ContentHeader,
    ProductListSkeleton,
    SubCategoryCard,
} from '..';
import {
    useGetCategoriesQuery,
    useGetSubCategoriesByIdMutation,
} from '../../apis/apiSlice';

const MainCategory = () => {
    const [subCategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const { data, isLoading, isSuccess, isError } = useGetCategoriesQuery();
    const [getSubCategoriesById] = useGetSubCategoriesByIdMutation();

    const getCatIdonClick = async (catId) => {
        setLoading(true);
        try {
            const { data } = await getSubCategoriesById(catId);
            setSubcategories(data.result);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message.error('Something went wrong!');
        }
    };

    return (
        <>
            <div className='bg-white p-4 rounded-md shadow-md'>
                <ContentHeader title='Print Heads' />
                {/* category listing */}
                <div className='flex overflow-x-auto overflow-y-hidden'>
                    <div className='flex flex-nowrap'>
                        {isLoading ? (
                            <ProductListSkeleton />
                        ) : (
                            data?.result.map(
                                (category) =>
                                    isSuccess && (
                                        <CategoryCard
                                            name={category.categoryName}
                                            img={category.categoryImageURL}
                                            id={category.categoryId}
                                            getCatIdonClick={getCatIdonClick}
                                        />
                                    )
                            )
                        )}
                    </div>
                </div>
                <Divider className='mt-0' />
                {/* category listing */}
                {/* sub category grid */}
                <Row>
                    {loading ? (
                        <ProductListSkeleton />
                    ) : subCategories && subCategories.length ? (
                        subCategories.map((details) => (
                            <Col xs={12} md={8} lg={6}>
                                <SubCategoryCard {...details} />
                            </Col>
                        ))
                    ) : (
                        <Col xs={24}>
                            <Empty />
                        </Col>
                    )}
                </Row>
                {/* sub category grid */}
            </div>
        </>
    );
};

export default MainCategory;
