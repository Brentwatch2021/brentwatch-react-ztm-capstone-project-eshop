import { useNavigate } from 'react-router-dom';
import { BackgroundImage,Body,DirectoryItemContainer } from './directory-item.styles'
import { DirectoryCategory } from '../../store/categories/category.types';
import { FC } from 'react';

type DirectoryItemProps = {
  category:DirectoryCategory;
}

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
    const { imageUrl,title,route } = category;
    const navigate = useNavigate();

    const onNavigationHandler = () => navigate(route);

    return (
      <DirectoryItemContainer onClick={onNavigationHandler}>
        <BackgroundImage imageUrl={imageUrl}/>
        <Body>
            <h2>{title}</h2>
            <p>Shop Now</p>
        </Body>
      </DirectoryItemContainer>
    );
}

export default DirectoryItem;