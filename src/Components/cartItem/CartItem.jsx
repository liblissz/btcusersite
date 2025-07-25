import React, { useEffect, useState } from 'react'
import './CartItem.css'
import remove_icon from '../assets/Frontend_Assets/cart_cross_icon.png'
import { fetchCart, addToCart, removeFromCart, confirmOrder, downloadReceipt, placeOrder } from '../../Pages/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Shimer from '../Shimerload/Shimer'

const CartItem = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadin, setLoadin] = useState(false);
  const [status, setStatus] = useState('');
  const [orderId, setOrderId] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    number: '',   // was `phone`
    illness: '',
    address: ''   // was `location`
  });

  const [pin, setpin] = useState('')
  const nav = useNavigate();


  useEffect(() => {
    fetchCart().then(res => setCart(res.data));
  }, []);


  if (!cart) return <Shimer />
  const total = cart.items.reduce(
    (sum, i) => sum + i.quantity * i.productId.SalePrice,
    0
  );

  const getTotalCartAmount = () =>
    cart.items.reduce((sum, i) => {
      const quantity = Number(i.quantity) || 0;
      const price = Number(i.SalePrice) || 0;
      return sum + quantity * price;
    }, 0);


  // quantity change
  const handleQuantity = async (productId, delta) => {
    await addToCart(productId, delta); // negative delta to decrease
    const updated = await fetchCart();
    setCart(updated.data);
  };

  // form field change
  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const res = await placeOrder(form);
      const newOrderId = res.data._id;

      localStorage.setItem('latestOrderId', newOrderId);
      toast.success("Order placed! Please enter your PIN next.");

      const updated = await fetchCart(); // ✅ refresh cart
      setCart(updated.data);

      nav(`/confirm/${newOrderId}`);
    } catch (err) {
      toast.error("❌ Failed to place order.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };



  // Add this function inside your component
  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      const updated = await fetchCart();
      setCart(updated.data);
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };


  // const validatepin = async e => {
  //   e.preventDefault();

  //   // pull back the saved orderId
  //   const savedOrderId = localStorage.getItem('latestOrderId');
  //   if (!savedOrderId) {
  //     return toast.error("No order found — please submit your order first.");
  //   }

  //   setLoadin(true);
  //   try {
  //     // use the same helper you wired up to POST /order/updatestatus/:id
  //     const { data } = await confirmOrder(savedOrderId, pin);
  //     toast.success(data.message);
  //   } catch (err) {
  //     console.error("Error confirming pin:", err);
  //     toast.error(err.response?.data?.message || "Failed to confirm order");
  //   } finally {
  //     setLoadin(false);
  //   }
  // };

  const validatepin = async e => {
    e.preventDefault();
    const savedOrderId = localStorage.getItem('latestOrderId');
    if (!savedOrderId) {
      return toast.error("No order found — please submit your order first.");
    }

    setLoadin(true);
    try {
      // 1️⃣ confirm
      const { data: confirmData } = await confirmOrder(savedOrderId, pin);
      toast.success(confirmData.message);

      // 2️⃣ download receipt PDF
      const res = await downloadReceipt(savedOrderId);
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${savedOrderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      localStorage.removeItem('latestOrderId');
    } catch (err) {
      console.error("Error confirming pin or downloading receipt:", err);
      toast.error(err.response?.data?.message || "Failed to confirm order or download receipt");
    } finally {
      setLoadin(false);
    }
  };
  return (
    <div className='cartitem'>

      {localStorage.getItem('latestOrderId') ? "" :
        <>
          <div className="cart-item-format-main none">
            <p>products</p>
            <p>title</p>
            <p>price</p>
            <p>quantity</p>
            <p>total</p>
            <p>remove</p>
          </div>
          <hr />
          {
            cart.items.length === 0 &&

            <div className="cart-page">
              <h1>Your Cart</h1>
              <p>No items in cart.</p>
            </div>

          }
          {cart.items.map(i => {
            const { _id, Name, Picture, SalePrice, quantity } = i;
            const lineTotal = quantity * SalePrice;

            return (
              <div className="cartitem-format cart-item-format-main" key={_id}>
                <img src={Picture} className='cart-product-icon' alt={Name} />
                <p className="cart-item-title">{Name}</p>
                <p>{SalePrice} FCFA</p>

                <div className="quantity-controls">
                  <button className='btnsm' onClick={() => handleQuantity(i.productId, -1)} disabled={quantity <= 1}>–</button>
                  <span>{quantity}</span>
                  <button className='btnsm' onClick={() => handleQuantity(i.productId, +1)}>+</button>
                </div>

                <p>{lineTotal} FCFA</p>

                <img
                  className='cartitem-remove-icon'
                  src={remove_icon}
                  alt="Remove"
                  onClick={() => handleRemove(i.productId)}
                />
              </div>
            );
          })}
        </>
      }





      {localStorage.getItem('latestOrderId') ? "" :

        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>cart total</h1>
            <div>
              <div className="cartitem-total-item">
                <p>sub total</p>
                <p>{getTotalCartAmount()}frs</p>
              </div>
              <hr />
              {/* <div className="cartitem-total-item">
                    <p>sheeping fee</p>
                    <p>free</p>
                </div> */}
              <hr />
              <div className="cartitem-total-item">
                <h3>total</h3>
                <h3>{getTotalCartAmount()}frs</h3>
              </div>
            </div>

          </div>









          <form onSubmit={onSubmit} className="cartitems-promocode">
            <p>Order For This Products (Note: we only Supply in public Areas)</p>


            <div className="cartitem-promobox">
              <input
                name="name"
                type="text"
                placeholder='Your Name*'
                value={form.name}
                onChange={onChange}
                required
              />
            </div>
            <div className="cartitem-promobox">
              <input
                name="email"
                type="email"
                placeholder='Your Email*'
                value={form.email}
                onChange={onChange}
                required
              />
            </div>
            <div className="cartitem-promobox">
              <input
                name="number"
                type="tel"
                placeholder='Your Number*'
                value={form.number}
                onChange={onChange}
                required
              />

            </div>
            <div className="cartitem-promobox">
              <input
                name="illness"
                type="text"
                placeholder='Your Illness Details*'
                value={form.illness}
                onChange={onChange}
                required
              />
            </div>
            <div className="cartitem-promobox">
              <input
                name="address"
                type="text"
                placeholder='Your Location*'
                value={form.address}
                onChange={onChange}
                required
              />

            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Submit Order'}
            </button>
          </form>

        </div>
      }


      {status && <p className="form-status">{status}</p>}







      {/* pin  validation */}

      {localStorage.getItem('latestOrderId') ? <form onSubmit={validatepin} className="cartitems-promocode">
        <div className="cartitem-promobox">
          <input
            name="name"
            type="text"
            placeholder='Confirmation Pin*'
            value={pin}
            onChange={(e) => setpin(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loadin}>
          {loadin ? 'Sending...' : 'Submit Pin'}
        </button>
      </form> : ""
      }
    </div>

  )
}

export default CartItem





