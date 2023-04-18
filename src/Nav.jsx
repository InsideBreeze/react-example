import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItem: "center",
  backgroundColor: "gray",
  padding: "10px 20px",
  position: "sticky",
  top: 0,
};
const Nav = ({ setIsScrolled }) => {
  const scrollDetectorRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsScrolled(!entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: "0px 0px",
      }
    );

    observer.observe(scrollDetectorRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <div ref={scrollDetectorRef} />
      <div style={containerStyle}>
        <div>Apple</div>
        <div>Banana</div>
        <div>CC</div>
        <div>Lemon</div>
      </div>
    </>
  );
};

export default Nav;
