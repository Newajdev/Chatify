import CategoryCard from '../../components/CategoryCard'
import ItemsCard from '../../components/ItemsCard';

const AllGroups = () => {
    return (
        <CategoryCard CardTitle={'All Groups'} >
            <ItemsCard></ItemsCard>
            <ItemsCard></ItemsCard>
            <ItemsCard></ItemsCard>
            <ItemsCard></ItemsCard>
        </CategoryCard>
    );
};

export default AllGroups;