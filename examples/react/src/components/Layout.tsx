import Header from './Header';

//@ts-ignore
const Layout = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
}

export default Layout;
