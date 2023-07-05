import { Fragment, useContext } from "react"
import { CategoriesContext } from "../../contexts/categories.context"
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap, selectIsLoading } from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
    //const { categoriesMap } = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap); 
    const isLoading = useSelector(selectIsLoading);

    return (
        <Fragment>
            {!isLoading ? (
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];

                    return (
                        <CategoryPreview key={title} title={title} products={products}/>
                    );
                })) : <Spinner/>
            }
        </Fragment>
    );
}

export default CategoriesPreview;