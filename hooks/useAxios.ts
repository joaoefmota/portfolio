import { useState, useEffect } from "react";
import axios from "axios";

export default function useAxios<T>(config: {
  url: string | null;
  initialValue?: T;
  transform?: (data: T) => T;
}) {
  const [data, setData] = useState<T>(config.initialValue!);

  useEffect(() => {
    if (config.url == null) return;
    axios.get(config.url).then((response) => {
      setData(
        config.transform ? config.transform(response.data) : response.data
      );
    });
  }, [config.url]);

  return data;
}
