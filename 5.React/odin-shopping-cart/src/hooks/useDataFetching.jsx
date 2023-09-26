import { useState, useEffect } from "react";
import addKRName from "../utils/addKRName";

const useDataFetching = (category, dataHandler) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [storage, setStorage] = dataHandler
  const prev = storage.get(`${category}-default`)

  useEffect(() => {
    setLoading(true)

    if (prev !== undefined) {
      setData(prev)
      setError(null)
      setLoading(false)
      return
    }
    
    // console.log('fetching...')
    fetch("https://api.nookipedia.com/nh/" + category, {
      mode: 'cors',
      method: 'GET',
      headers: { 
        'X-API-KEY': import.meta.env.VITE_ACNH_KEY,
      }
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => {
        const addedData = addKRName(response, category)

        setStorage(prev => new Map([...prev, [`${category}-default`, addedData]]))
        setData(addedData)
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
    }, [category]);
    
    return { data, error, loading };
};

export default useDataFetching;