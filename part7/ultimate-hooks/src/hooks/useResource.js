import axios from 'axios';
import { useEffect, useState } from 'react';

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const getRes = async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    };
    getRes();
  }, []);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setResources([...resources, response.data]);
  };

  const service = {
    create,
  };

  return [resources, service];
};

export default useResource;
