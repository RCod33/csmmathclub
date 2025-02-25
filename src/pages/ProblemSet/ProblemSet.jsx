/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import FilterBox from "../../Componetns/FilterBox/FilterBox";
import problems from "../../TEX_to_JSON/JSON_Files/Problems_2.json";
import "./ProblemSet.css";

function ProblemSet() {
   if (!Array.isArray(problems)) return null;
 
   return (
   <>
   <section className="container-fluid">
      <table className="table">
         <thead>
            <tr>
               <th>ID</th>
               <th>Problem</th>
               <th>Topic</th>
               <th>Difficulty</th>
               <th>Week Discussed</th>
            </tr>
         </thead>
         <tbody>
            {problems.map((currentProblem) => (
               <tr key={currentProblem.problemID}>
                  <td>{currentProblem.problemID}</td>
                  <td>
                     <Link
                        to="/Problem"
                        state={{ currentProblem: currentProblem }}
                     >
                     {currentProblem.title}
                     </Link>
                  </td>
                  <td>{currentProblem.majorTopic}</td>
                  <td>{`Level: ${currentProblem.problemLevel}`}</td>
                  <td>
                     {currentProblem.weekDiscussed[0] === '0' && currentProblem.weekDiscussed[1] === '0' 
                        ? "None" 
                        : `S${currentProblem.weekDiscussed[0]} 
                           W${currentProblem.weekDiscussed[1]}`
                     }
                  </td> 
               </tr>
               
             ))}
           </tbody>
         </table>
       </section>
       <FilterBox />
     </>
   );
 }

export default ProblemSet;
