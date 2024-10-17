// api/rxNormAPI.js

export const searchDrugs = async (query) => {
    // Mocked search response
    return {
      drugGroup: {
        conceptGroup: [
          {
            conceptProperties: [
              { rxcui: '1234', name: 'Aspirin' },
              { rxcui: '5678', name: 'Ibuprofen' },
            ]
          }
        ]
      }
    };
  };
  
  export const getSpellingSuggestions = async (query) => {
    // Mocked suggestion response
    return {
      suggestionGroup: {
        suggestionList: {
          suggestion: ['Zyrtec', 'Zoloft']
        }
      }
    };
  };
  
  export const getDrugDetails = async (drugName) => {
    // Mocked drug details response
    return {
      rxCUI: '1234',
      name: drugName,
      synonyms: ['Synonym1', 'Synonym2'],
      NDCs: ['NDC1', 'NDC2', 'NDC3'],
    };
  };
  