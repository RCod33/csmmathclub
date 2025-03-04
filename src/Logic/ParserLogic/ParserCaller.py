from pathlib import Path
from TexToJsonParser import read_tex, print_json #, problems, label_set

in_path = Path.cwd().joinpath(*["src", "MathClubProblems"])
out_path = Path.cwd().joinpath(*["src", "JsonFiles", "Problems.json"])

# Ensure the output directory exists
Path(out_path).parent.mkdir(parents=True, exist_ok=True)

tex_files = list(in_path.rglob('*.tex'))
latest_input_time = max((f.stat().st_mtime for f in tex_files), default=0)
last_update = out_path.stat().st_mtime

if latest_input_time > last_update:
   #print("Modification detected, updating...")
   read_tex(in_path)
   print_json(out_path)
   #print(f"There are {len(problems)} problems")
   #print(f"There are {len(label_set)} labels")
   
'''for tex_file in tex_files:
      tex_date = tex_file.stat().st_mtime
      if tex_date > last_update:
         print("file: ", Path(tex_file).name)
         input_tex(tex_file)} '''
  
