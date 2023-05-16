import { HeartOutlined } from '@ant-design/icons';
import { Image, Tooltip } from 'antd';
import { useState } from 'react';
import { Dummmy } from '..';

const CategoryCard = ({
    name,
    img,
    id,
    getCatIdonClick,
    showWishlistIcon = false,
    fromProduct = false,
    entireProd,
    handleSelectedProduct,
}) => {
    const posLeftLg = fromProduct ? "lg:left-[13%]" : "lg:left-[22%]"

    const [viewImg, setViewImg] = useState(img || Dummmy);

    const handleImgOnError = () => {
        setViewImg(Dummmy);
    };

    return (
        <div className='relative w-full !max-w-[80px] lg:!max-w-[100px] category-card'>
            <span className='p-1'>
                <Tooltip title={name} placement='bottom'>
                    <Image
                        preview={false}
                        className={`rounded-xl brightness-75 cursor-pointer hover:border-red-500 hover:border-2 p-1 transition-all`}
                        alt={name}
                        src={viewImg}
                        onError={handleImgOnError}
                        onClick={() => {
                            !fromProduct
                                ? getCatIdonClick(id)
                                : handleSelectedProduct(entireProd);
                        }}
                    />
                    <Tooltip title='Add to wishlist' placement='right'>
                        {showWishlistIcon && (
                            <HeartOutlined className='absolute top-3 right-3 text-red-600 cursor-pointer' />
                        )}
                    </Tooltip>
                    <p className={`absolute w-[80%] top-[55%] lg:top-[60%] left-[21%] ${posLeftLg} z-[999] text-white font-semibold text-[10px] lg:text-xs truncate`}>
                        {name}
                    </p>
                </Tooltip>
            </span>
        </div>
    );
};

export default CategoryCard;
