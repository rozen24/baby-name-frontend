import Header from "../components/Header";
import MainContent from "../components/MainContent";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center m-auto align-middle">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default HomePage;
