import CategoryCard from '../../components/CategoryCard'
import ItemsCard from '../../components/ItemsCard';

const MyGroup = () => {
    return (
        <CategoryCard CardTitle={'My Groups'}>
                    <ItemsCard />
                    <ItemsCard />
                    <ItemsCard />
                    <ItemsCard />

                </CategoryCard>
    );
};

export default MyGroup;