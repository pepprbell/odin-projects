import { useState, useEffect } from "react";
import addKRName from "../utils/addKRName";

const useItemFetching = (category, name) => {
  const [itemData, setData] = useState([]);
  const [itemError, setError] = useState(null);
  const [itemLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    
    // console.log('fetching item...')
    fetch("https://api.nookipedia.com/nh/" + category + '/' + name, {
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

        setData(addedData)
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [category]);
    
  return { itemData, itemError, itemLoading };
};

export default useItemFetching;