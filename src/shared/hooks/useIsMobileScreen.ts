import { useEffect, useState } from "react";

export const useIsMobileScreen = (): boolean => {
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 769px)").matches
      );
    
      useEffect(() => {
        window
          .matchMedia("(min-width: 769px)")
          .addEventListener("change", (e) => setMatches(e.matches));
        return () =>
          window
            .matchMedia("(min-width: 769px)")
            .removeEventListener("change", (e) => setMatches(e.matches));
      }, []);
      
      return !matches
}