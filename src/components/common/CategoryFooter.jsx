import { HomeFilled } from '@ant-design/icons';
import { Button, message } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ProductListSkeleton, SubCategoryCard } from '..';
import { useGetSubCategoriesByIdMutation } from '../../apis/apiSlice';

const CategoryFooter = () => {
    const catId = sessionStorage.getItem('catId');
    const { id: subCatId } = useParams();

    const [subCategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const [getSubCategoriesById] = useGetSubCategoriesByIdMutation();

    const getSubCategories = async () => {
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

    useEffect(() => {
        getSubCategories();
    }, []);

    return (
        <>
            <div className='absolute w-full bottom-0 bg-white p-4 rounded-md shadow-md'>
                <div className='flex items-center'>
                    <Button
                        size={'large'}
                        className='flex items-center mr-6'
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        <HomeFilled />
                    </Button>
                    <div className='flex  overflow-x-auto overflow-y-hidden border-l-2 border-gray-200 pl-4 w-full'>
                        <div className='flex flex-nowrap'>
                            {loading ? (
                                <ProductListSkeleton />
                            ) : (
                                subCategories?.map((category) => (
                                    <SubCategoryCard
                                        key={category.subCategoryId}
                                        {...category}
                                        selectedId={subCatId}
                                        scrollable={true}
                                        size={'sm'}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryFooter;
