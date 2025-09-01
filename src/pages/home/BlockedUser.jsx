import CategoryCard from '../../components/CategoryCard'
import ItemsCard from '../../components/ItemsCard';

const BlockedUser = () => {
    return (
        <CategoryCard CardTitle={'Blocked user'}>
            <ItemsCard/>
            <ItemsCard/>
            <ItemsCard/>
        </CategoryCard>
    );
};

export default BlockedUser;