
import axios from 'axios';
import { useEffect, useState } from 'react'

const useUserLocation = () => {
    const [location, setLocation] = useState<{ [k: string]: unknown }>({});

    useEffect(() => {
        axios
            .get("https://ipapi.co/json/")
            .then(({data}) => setLocation(data))
            .catch((err) => console.warn(err));
    }, []);
    
  return { location };
}

export default useUserLocation