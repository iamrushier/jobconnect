import React from "react";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>JobConnect HomePage - Welcome {user?.username}</h1>
      <p>User details: {JSON.stringify(user)}</p>
    </div>
  );
};

export default HomePage;
