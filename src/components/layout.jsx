import React from 'react';
import PropTypes from 'prop-types';

import Header from './header';

import './layout.css';

export default function Layout({ children, showHero }) {
  return (
    <>
      <Header showHero={showHero} />
      <div className="container mx-auto">
        <main className="m-6">{children}</main>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed right-0 bottom-0">
          <div className="bg-red-200 sm:bg-red-300 md:bg-red-400 lg:bg-red-500 xl:bg-red-600 font-black p-1 text-red-900">
            <span className="sm:hidden">XS</span>
            <span className="hidden sm:inline md:hidden">SM</span>
            <span className="hidden md:inline lg:hidden">MD</span>
            <span className="hidden lg:inline xl:hidden">LG</span>
            <span className="hidden xl:inline">XL</span>
          </div>
        </div>
      )}
    </>
  );
}

Layout.defaultProps = {
  showHero: false,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showHero: PropTypes.bool,
};
