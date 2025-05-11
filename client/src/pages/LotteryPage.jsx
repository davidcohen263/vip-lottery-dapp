import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const LotteryPage = () => {
  const { id } = useParams();

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">🎟️ פרטי הגרלה #{id}</h2>
      <p className="text-gray-400">פרטי ההגרלה יופיעו כאן.</p>
    </Layout>
  );
};

export default LotteryPage;
