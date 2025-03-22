import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';

function DonatePage() {
  const navigate = useNavigate();
  const { projectName, projectId } = useParams(); // Allows you to get the parameter
  const { addToCart } = useCart(); // useCart is the hook we built in the context file
  const [donationAmount, setDonationAmount] = useState<number>(0);

  // Function to add things to cart
  const handleAddToCart = () => {
    const newItem: CartItem = {
      projectId: Number(projectId),
      projectName: projectName || 'No Project Found',
      donationAmount,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Donate to {projectName}</h2>

      <div>
        <input
          type="number"
          placeholder="Enter donation amount"
          value={donationAmount}
          onChange={(x) => setDonationAmount(Number(x.target.value))} // Set dontation amount when it is changed
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default DonatePage;
