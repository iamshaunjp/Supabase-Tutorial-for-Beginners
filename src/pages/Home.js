import supabase from "../config/supabaseClints";
import { useEffect, useState } from "react";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase;
      .from("smoothies")
      .select()
  if (error) {
    setFetchError("could not fetch the smoothies")
    setSmoothies(null)
    console.log(error);
  }
    };
  }, []);

  return (
    <div className='page home'>
      <h2>Home</h2>
    </div>
  );
};

export default Home;
