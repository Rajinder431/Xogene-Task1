import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDrugDetails } from '../api/rxNormAPI';

const DrugDetails = () => {
  const { drugName } = useParams();
  const [drugDetails, setDrugDetails] = useState(null);

  useEffect(() => {
    const fetchDrugDetails = async () => {
      try {
        const data = await getDrugDetails(drugName);
        setDrugDetails(data);
      } catch (error) {
        console.error('Error fetching drug details:', error);
      }
    };
    fetchDrugDetails();
  }, [drugName]);

  if (!drugDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{drugDetails.name}</h1>
      <p><strong>rxCUI:</strong> {drugDetails.rxCUI}</p>
      <p><strong>Synonyms:</strong> {drugDetails.synonyms.join(', ')}</p>
      <p><strong>Associated NDCs:</strong></p>
      <ul>
        {drugDetails.NDCs.map((ndc) => (
          <li key={ndc}>{ndc}</li>
        ))}
      </ul>
    </div>
  );
};

export default DrugDetails;
