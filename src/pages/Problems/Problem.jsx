import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
      // Give MathJax and TikzJax extra time to render
      const mathJaxTimer = setTimeout(() => {
         if (window.MathJax) {
            console.log("Running MathJax typeset.");
            window.MathJax.typeset();
         } else {
            console.error("MathJax is not loaded.");
         }
      }, 500);

      const tikzJaxTimer = setTimeout(() => {
         if (window.renderTikz) {
            console.log("Running TikzJax render.");
            try {
               window.renderTikz();
            } catch (err) {
               console.error("Error during TikzJax rendering:", err);
            }
         } else {
            console.error("TikzJax did not load or is not available at the expected time.");
         }
      }, 1000);

      return () => {
         clearTimeout(mathJaxTimer);
         clearTimeout(tikzJaxTimer);
      };
   }, [currentProblem]);

   // Extract TikZ content from texString
   const extractTikzContent = (texString) => {
      const tikzRegex = /\\begin{tikzpicture}[\s\S]*?\\end{tikzpicture}/g;
      return texString.match(tikzRegex) || [];
   };

   const tikzDiagrams = extractTikzContent(currentProblem.texString.join(""));

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
                  {/* Render TikZ Diagrams properly inside <script type="text/tikz"> */}
                  <div className="tikzjax">
                     {tikzDiagrams.map((diagram, index) => (
                        <script key={index} type="text/tikz">
                           {diagram}
                        </script>
                     ))}
                  </div>
               </div>
            </div>

            <div className={styles.sidebar}>
               <div className={styles.linksBox}>
                  {/* Links to other problems */}
                  <h3>Same Week&apos;s Problems</h3>
                  <ul>
                     {problems
                        .filter(
                           (p) =>
                              p.weekDiscussed[0] === currentProblem.weekDiscussed[0] &&
                              p.weekDiscussed[1] === currentProblem.weekDiscussed[1]
                        )
                        .map((p) => (
                           <li key={p.problemID}>
                              <Link to="/Problem" state={{ currentProblem: p }}>
                                 {p.title}
                              </Link>
                           </li>
                        ))}
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
