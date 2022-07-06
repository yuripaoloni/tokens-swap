import Alert from "./Alert";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-full dark:bg-slate-750">
      <Alert />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
