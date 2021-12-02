import React from 'react';

const Layout = (props) => {
  const { children } = props;

  return (
  	<div className="layout">
      <header className="header"></header>
      <aside className="aside"></aside>
      <main className="main">{children}</main>
      <footer className="footer"></footer>
    </div>
  );
};

export default Layout;