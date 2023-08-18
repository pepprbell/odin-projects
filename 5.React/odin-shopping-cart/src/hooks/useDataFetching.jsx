import { useState, useEffect } from "react";

const useDataFetching = (category, dataHandler) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [storage, setStorage] = dataHandler
  const prev = storage.get(category)

  useEffect(() => {
    setLoading(true)

    if (prev !== undefined) {
      setData(prev)
      setError(null)
      setLoading(false)
      return
    }
    
    console.log('fetching...')
    fetch("https://api.nookipedia.com/nh/" + category, {
      mode: 'cors',
      method: 'GET',
      headers: { 
        'X-API-KEY': apiKey,
      }
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => {
        setStorage(prev => new Map([...prev, [category, response]]))
        setData(response)
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
    }, [category]);
    
    return { data, error, loading };
};

export default useDataFetching;