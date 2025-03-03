// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import styles from "./Problems.module.css";
import problems from "../../JsonFiles/Problems.json";
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
               {/* Left side: Title and Problem Level */}
               <div className={styles.headerLeft}>
                  <h1 className={styles.problemTitle}>
                     <MathJax>{currentProblem.title}</MathJax>
                  </h1>
                  <h2 className={styles.problemLevel}>
                     <MathJax>{`Hardness: ${currentProblem.problemLevel}`}</MathJax>
                  </h2>
               </div>
               {/* Right side: Major Topic */}
               <h2 className={styles.subTopic}>
                  <MathJax>{currentProblem.subTopic}</MathJax>
               </h2>
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
               <h3>Same Week&apos;s Problems</h3>
               <ul>
                  {problems
                     .filter(p => 
                        p.weekDiscussed[0] === currentProblem.weekDiscussed[0] &&
                        p.weekDiscussed[1] === currentProblem.weekDiscussed[1]  )
                     .map(p  => (
                        <li key={p.problemID}>
                        <Link to="/Problem" state={{ currentProblem: p }}>
                           {p.title}
                        </Link>
                        </li>
                     ))
                  }
               </ul>
            </div>
            <div className={styles.tagsBox}>
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
