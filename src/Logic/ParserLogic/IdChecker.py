import json
from pathlib import Path

out_path = Path.cwd().joinpath(*["src", "JsonFiles", "Problems.json"])

with open(out_path, "r") as file:
   data = json.load(file)  

used_id = [False for _ in range(10000)]
problem_ids = [item["ProblemID"] for item in data if "ProblemID" in item]
collision = -1

for problem_id in problem_ids:
   if used_id[problem_id]:
      collision = problem_id
      break
   used_id[problem_id] = True
   
if collision == -1:
   print("No collisions found")
else:
   print(f"Collision found at {collision}")
      



