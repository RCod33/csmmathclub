import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Latex from "react-latex-next";

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

  if (!currentProblem) {
    return null;
  }

  return (
    <section>
      <h1>
        <Latex>{currentProblem.title}</Latex>
      </h1>
      <h3>
        <Latex>{currentProblem.cameFrom}</Latex>
      </h3>
      <h2>
        <Latex>{currentProblem.problemLevel}</Latex>
      </h2>
      <h2>
        <Latex>{currentProblem.majorTopic}</Latex>
      </h2>
      <p>
        <Latex>{currentProblem.textString}</Latex>
      </p>
    </section>
  );
}

export default Problem;
