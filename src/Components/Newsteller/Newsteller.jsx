import React, { useState } from 'react';
import './Newsteller.css';
import toast from 'react-hot-toast';
import axios from 'axios';

const Newsteller = () => {
  const [email, setEmail] = useState('');
  const [loading, setloading] = useState(false);

  const submitemail = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }
    try {
      setloading(true);
      const savesata = await axios.post("https://btcbackend-e7yt.onrender.com/subscriber", { Email: email });
      if (savesata.status === 200) {
        toast.success(savesata.data.message);
        setEmail(""); // clear input
      } else {
        toast.error("Error during subscription");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Subscription failed");
    } finally {
      setloading(false);
    }
  };

  return (
    <form onSubmit={submitemail} className='newsteller'>
      <h2>Get exclusive offers on your email</h2>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
        <input
          type="email"
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type='submit' disabled={loading}>
          {loading ? "Loading..." : "Subscribe"}
        </button>
      </div>
    </form>
  );
};

export default Newsteller;
