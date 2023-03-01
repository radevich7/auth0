import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PostAuthenticate() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      console.log(yes);
    }
  }, [location]);
  return (
    <>
      <h1>POST AUTH</h1>
    </>
  );
}
