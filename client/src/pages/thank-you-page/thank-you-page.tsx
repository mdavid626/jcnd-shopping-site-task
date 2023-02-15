import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import './thank-you-page.css';

const ThankYouPage: React.FC = () => (
  <div className="ThankYouPage">
    <Header />
    <div className="ThankYouPage-content">
      <div className="ThankYouPage-header">Order placed, thank you!</div>
      <Link to="/" className="ThankYouPage-newOrder">
        make new order
      </Link>
    </div>
  </div>
);

export default ThankYouPage;
