import React from 'react';
import { Link } from 'react-router-dom';

function Logo(props) {
  return (
    <Link to="/">
      <div className="header-logo">
        МАЙНД ГЕЙМ
      </div>
    </Link>
  );
}

export default Logo;
