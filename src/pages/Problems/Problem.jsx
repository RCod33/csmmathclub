import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MathJax, MathJaxContext } from "better-react-mathjax";

// MathJax configuration
const mathJaxConfig = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']]  // Enable inline math with $...$
    }
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

  // Add an effect to trigger re-rendering of MathJax
  useEffect(() => {
    // Trigger MathJax re-processing
    if (window.MathJax) {
    window.MathJax.typeset();
  }}, [currentProblem]);

  if (!currentProblem) {
    return null;
  }

  return (
   <MathJaxContext version={3} config={mathJaxConfig}>
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
       <p>
         {console.log("textString contents:", currentProblem.textString)}
         {currentProblem.textString.join("")}
       </p>
     </section>
   </MathJaxContext>
 );
}


export default Problem;
