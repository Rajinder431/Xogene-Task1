import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchDrugs, getSpellingSuggestions } from '../api/rxNormAPI';

const DrugSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setError(null);
    setSuggestions([]);

    try {
      const data = await searchDrugs(query);
      if (data && data.drugGroup && data.drugGroup.conceptGroup) {
        setResults(data.drugGroup.conceptGroup.flatMap(group => group.conceptProperties || []));
      } else {
        const suggestionData = await getSpellingSuggestions(query);
        if (suggestionData.suggestionGroup.suggestionList) {
          setSuggestions(suggestionData.suggestionGroup.suggestionList.suggestion);
        } else {
          setError('No drugs or spelling suggestions found for this query.');
        }
      }
    } catch (err) {
      setError('An error occurred while searching.');
    }
  };

  const handleSelectDrug = (drugName) => {
    navigate(`/drugs/${drugName}`);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a drug"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}
      {suggestions.length > 0 && (
        <div>
          <h3>Did you mean:</h3>
          {suggestions.map((s, i) => (
            <p key={i}>{s}</p>
          ))}
        </div>
      )}
      {results.length > 0 && (
        <ul>
          {results.map((drug) => (
            <li key={drug.rxcui} onClick={() => handleSelectDrug(drug.name)}>
              {drug.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DrugSearch;
