import React from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import './about-page.css';

const AboutPage: React.FC = () => (
  <div className="AboutPage">
    <Header />
    <div className="AboutPage-content">
      <div className="AboutPage-description">Simple Shopping Site</div>
      <div>
        Created by: <a href="https://mdavid626.com">Dávid Molnár</a>
      </div>
      <a href="https://github.com/mdavid626/jcnd-shopping-site-task">
        Source Code
      </a>
    </div>
    <Footer />
  </div>
);

export default AboutPage;
