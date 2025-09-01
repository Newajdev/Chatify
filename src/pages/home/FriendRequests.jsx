import CategoryCard from '../../components/CategoryCard'
import ItemsCard from '../../components/ItemsCard';
const FriendRequests = () => {
    return (
        <CategoryCard CardTitle={'Requests'} >
            <ItemsCard></ItemsCard>
            <ItemsCard></ItemsCard>
            <ItemsCard></ItemsCard>
            <ItemsCard></ItemsCard>
        </CategoryCard>
    );
};

export default FriendRequests;