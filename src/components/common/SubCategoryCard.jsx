import { Image, Tooltip } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Dummmy } from '..';

const SubCategoryCard = ({
    subCategoryName,
    subCategoryImageURL,
    categoryId,
    subCategoryId,
    selectedId,
    scrollable = false,
    size = 'lg',
}) => {
    // class placements
    const top = size === 'lg' ? 'lg:top-[68%]' : 'lg:top-[55%]';
    const textSize = size === 'lg' ? 'text-base' : 'text-[12px]';
    const containerWidth = size === 'lg' ? 'lg:w-[150px]' : 'lg:w-[100px]';

    const [img, setImg] = useState(subCategoryImageURL);
    const navigate = useNavigate();

    const handleImgOnError = () => {
        setImg(Dummmy);
    };

    const handleClick = () => {
        sessionStorage.setItem('catId', categoryId);
        navigate(`/product/${subCategoryId}`);
    };

    return (
        <div
            className={`relative self-center w-[90px] ${containerWidth} ${
                scrollable && 'category-card'
            }`}
        >
            <span className='p-1'>
                <Tooltip title={subCategoryName} placement='bottom'>
                    <Image
                        preview={false}
                        className={`rounded-xl brightness-75 cursor-pointer border-2 border-black ${
                            selectedId === subCategoryId &&
                            'border-red-500 border-2 p-1 transition-all'
                        }`}
                        alt={subCategoryName}
                        src={img}
                        onError={handleImgOnError}
                        onClick={handleClick}
                    />
                </Tooltip>
                <p
                    className={`absolute w-[80%] top-[55%] left-[15%]  z-[999] text-white font-semibold text-[10px] truncate ${top} ${textSize}`}
                >
                    {subCategoryName}
                </p>
            </span>
        </div>
    );
};

export default SubCategoryCard;
