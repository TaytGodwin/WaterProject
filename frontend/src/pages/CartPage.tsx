import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart(); // Gets the context file that you built

  return (
    <div>
      <h2>Your cart</h2>
      {/* Map out what is in the cart */}
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.projectId}>
                {item.projectName}: ${item.donationAmount.toFixed(2)}
                <button onClick={() => removeFromCart(item.projectId)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Total: </h3>
      <button>Checkout:</button>
      <button onClick={() => navigate('/projects')}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;
