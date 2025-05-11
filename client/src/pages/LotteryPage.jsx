import React from "react";
import { useParams } from "react-router-dom";

const LotteryPage = () => {
  const { id } = useParams();

  return (
    <div className="text-white p-8">
      <h1 className="text-3xl font-bold mb-4">🎟️ פרטי הגרלה #{id}</h1>
      <p>כאן יופיעו פרטים על ההגרלה, תמונה, כפתור קנייה ועוד</p>
    </div>
  );
};

export default LotteryPage;
