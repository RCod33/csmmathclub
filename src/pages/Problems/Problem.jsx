import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MathJax, MathJaxContext } from "better-react-mathjax";

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
      <div className="mathjax-container">
      <section>
         <h1>
            <MathJax>{currentProblem.title}</MathJax>
         </h1>
         <h3>
            <MathJax>{currentProblem.cameFrom}</MathJax>
         </h3>
         <h2>
            <MathJax>{currentProblem.problemLevel}</MathJax>
         </h2>
         <h2>
            <MathJax>{currentProblem.majorTopic}</MathJax>
         </h2>
         <p>{currentProblem.textString.join("")}</p>
      </section>
      </div>
      </MathJaxContext>
   );
}

export default Problem;
