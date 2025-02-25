from pathlib import Path
from formatter2 import read_tex, print_json, problems

in_path = Path.cwd().joinpath(*["src", "TEX_to_JSON", "Math_Club_Problems"])
out_path = Path.cwd().joinpath(*["src", "TEX_to_JSON", "JSON_Files", "Problems_2.json"])

# Ensure the output directory exists
Path(out_path).parent.mkdir(parents=True, exist_ok=True)

# Ensure the output directory exists
Path(out_path).parent.mkdir(parents=True, exist_ok=True)

read_tex(in_path) 
print_json(out_path)  

print(f"There are {len(problems)} problems in the list")   

