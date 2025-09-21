import { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import styles from "./Problems.module.css";
import problems from "../../JsonFiles/Problems.json";

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
      navigate("/problemset", { replace: true });
    }
  }, [currentProblem, navigate]);

  useEffect(() => {
    if (!currentProblem) return;

    const mathJaxTimer = setTimeout(() => {
      if (window.MathJax) {
        window.MathJax.typeset();
      }
    }, 500);

    const tikzJaxTimer = setTimeout(() => {
      if (window.renderTikz) {
        try {
          window.renderTikz();
        } catch (error) {
          console.error("Error during TikzJax rendering:", error);
        }
      }
    }, 1000);

    return () => {
      clearTimeout(mathJaxTimer);
      clearTimeout(tikzJaxTimer);
    };
  }, [currentProblem]);

  const tikzDiagrams = useMemo(() => {
    if (!currentProblem) return [];
    const tikzRegex = /\\begin{tikzpicture}[\s\S]*?\\end{tikzpicture}/g;
    return currentProblem.texString.join("").match(tikzRegex) || [];
  }, [currentProblem]);

  if (!currentProblem) {
    return null;
  }

  return (
    <MathJaxContext config={mathJaxConfig}>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.problemHeader}>
            <div className={styles.headerLeft}>
              <h1 className={styles.problemTitle}>
                <MathJax>{currentProblem.title}</MathJax>
              </h1>
              <h2 className={styles.problemLevel}>
                <MathJax>{`Hardness: ${currentProblem.problemLevel}`}</MathJax>
              </h2>
            </div>
            <h2 className={styles.subTopic}>
              <MathJax>{currentProblem.subTopic}</MathJax>
            </h2>
          </div>
          <div className={styles.problemBox}>
            <p>
              <MathJax>{currentProblem.texString.join("")}</MathJax>
            </p>
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
            <h3>Same Week&apos;s Problems</h3>
            <ul>
              {problems
                .filter(
                  (problem) =>
                    problem.weekDiscussed[0] === currentProblem.weekDiscussed[0] &&
                    problem.weekDiscussed[1] === currentProblem.weekDiscussed[1]
                )
                .map((problem) => (
                  <li key={problem.problemID}>
                    <Link to="/problem" state={{ currentProblem: problem }}>
                      {problem.title}
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