// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import styles from "./Problems.module.css";

// MathJax configuration
const mathJaxConfig = {
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
};

function Problem() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentProblem = location.state?.currentProblem;

  useEffect(() => {
    if (!currentProblem) {
      alert("No se encontraron detalles del problema. Redirigiendo...");
      navigate("/ProblemSet");
    }
  }, [currentProblem, navigate]);

  useEffect(() => {
    const checkMathJax = setInterval(() => {
      if (window.MathJax) {
        window.MathJax.typeset();
        clearInterval(checkMathJax);
      }
    }, 1);
  }, [currentProblem]);

  return (
   <MathJaxContext config={mathJaxConfig}>
     <div className={styles.container}>
       <div className={styles.mainContent}>
         <div className={styles.problemHeader}>
           <h1>
             <MathJax>{currentProblem.title}</MathJax>
           </h1>
           <div className={styles.problemDetails}>
             <h2>
               <MathJax>{currentProblem.problemLevel}</MathJax>
             </h2>
             <h2>
               <MathJax>{currentProblem.majorTopic}</MathJax>
             </h2>
           </div>
         </div>
         <div className={styles.problemBox}>
           <p>
             <MathJax>{currentProblem.texString.join("")}</MathJax>
           </p>
         </div>
       </div>
       <div className={styles.sidebar}>
         <div className={styles.linksBox}>
           {/* Links to other problems */}
           <h3>Explore More Problems</h3>
           <ul>
             <li><a href="/problems/1">Problem 1</a></li>
             <li><a href="/problems/2">Problem 2</a></li>
             <li><a href="/problems/3">Problem 3</a></li>
           </ul>
         </div>
         <div className={styles.tagsBox}>
           {/* Problem tags */}
           <h3>Tags</h3>
           <ul>
             {currentProblem.tags.map((tag) => (
               <li key={tag}>{tag}</li>
             ))}
           </ul>
         </div>
       </div>
     </div>
   </MathJaxContext>
 );

}

export default Problem;
