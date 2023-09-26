import './Card.css'
import './SkeletonCard.css'

const SkeletonCard = () => {
  return (
    <div className="card isLoading">
      <figure>
        <div></div>
      </figure>
      <p></p>
      <p></p>
    </div>
  );
};

export default SkeletonCard;