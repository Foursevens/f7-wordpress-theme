import { dom } from '@fortawesome/fontawesome-svg-core';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

import FooterDetails from '../components/footer';
import NavigationBar from '../components/navigation-bar';

import './tailwind.css';
import './main.css';

export default function MainLayout({ children }) {
  return (
    <div className="h-full flex flex-col">
      <Helmet>
        <style>{dom.css()}</style>
      </Helmet>
      <header>
        <NavigationBar />
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="mt-10">
        <FooterDetails />
      </footer>
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed right-0 bottom-0 z-50">
          <div className="bg-red-200 sm:bg-red-300 md:bg-red-400 lg:bg-red-500 xl:bg-red-600 font-900 font-title p-1 text-red-900">
            <span className="sm:hidden">XS</span>
            <span className="hidden sm:inline md:hidden">SM</span>
            <span className="hidden md:inline lg:hidden">MD</span>
            <span className="hidden lg:inline xl:hidden">LG</span>
            <span className="hidden xl:inline">XL</span>
          </div>
        </div>
      )}
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};