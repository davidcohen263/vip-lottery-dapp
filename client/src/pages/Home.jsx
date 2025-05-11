import Layout from "../components/Layout";

const Home = () => (
  <Layout>
    <section className="text-center py-24">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-400 animate-pulse">
        🚀 ברוך הבא להגרלת הקריפטו
      </h1>
      <p className="mt-4 text-lg text-gray-400">קנה כרטיס ואולי תזכה בפרס חיים</p>
      <button className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-bold text-white shadow-md">
        הצטרף עכשיו
      </button>
    </section>
  </Layout>
);

export default Home;