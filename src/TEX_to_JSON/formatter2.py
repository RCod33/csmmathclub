from typing import List, Tuple
from pathlib import Path
import hashlib
import json
import re

MAX_HASH_SIZE = 4
TOPIC = {
   'A': "Algebra", 'Q': "Inequalities", 'N': "Number Theory", 'D': "Calculus", 
   'C': "Combinatorics", 'G': "Geometry", 'P': "Probability", 'L': "Linear Algebra",
   'W': "Complex Numbers", 'Z': "Miscellaneous"
}
TOPIC_INV = {v: k for k, v in TOPIC.items()}  # Inverse mapping

TOPIC_SHORTHAND = {
   'A': "Alg", 'Q': "Ineq", 'N': "NT", 'D': "Calc",
   'C': "Combo", 'G': "Geo", 'P': "Prob", 'L': "LA",
   'W': "CN", 'Z': "Misc"
}

problems = []

class MathProblem:
   def __init__(self, major_topic, problem_level, source, week_discussed, title, tex_string):
      self.major_topic = major_topic
      self.problem_level = problem_level
      self.source = source
      self.week_discussed = week_discussed
      self.title = title
      self.tex_string = tex_string

   def get_stuff(self) -> Tuple[str, int, str, List[str]]:
      return self.major_topic, self.problem_level, self.source, self.tex_string

   def set_id(self, id):
      self.id = id
   
   def get_id(self):
      return self.id

def generate_problem_id(mp: MathProblem):
   topic, level, source, tex = mp.get_stuff()
   level_str = f"{level:02d}"  # two-digit format
    
   content = f"{topic}|{level_str}|{source}|{tex[0]}" 
   hash_value = int(hashlib.sha256(content.encode()).hexdigest(), 16)
   hash_string = str(hash_value)
   
   # Fix to 4 digits
   if len(hash_string) > MAX_HASH_SIZE:
      hash_string = hash_string[:MAX_HASH_SIZE]
   else:
      hash_string = hash_string.zfill(MAX_HASH_SIZE)

   # Append topic identifier and level
   hash_string += TOPIC_INV.get(topic, "Z") + level_str
   mp.set_id(hash_string)

def to_dict(mp: MathProblem) -> dict:
   return {
      "problemID": mp.id,
      "majorTopic": mp.major_topic,
      "problemLevel": mp.problem_level,
      "cameFrom": mp.source,
      "weekDiscussed": mp.week_discussed,
      "title": mp.title,
      "texString": mp.tex_string,
    }

#//////////////////////////////////////////////////////////////////////////////

def input_tex(input_path):
   start = "\\begin{problem}"
   end = "\\end{problem}"
   
   try:
      with open(input_path, 'r', encoding='utf-8') as file:
         tex = file.read()
   except FileNotFoundError:
      print("Error: File could not be opened.\n")
      return None
   
   if not start in tex or not end in tex:
      print("Error: Problem environment not found in file.\n")
      return None
   
   file_style = re.compile(r".*S(\d+) W(\d+)\.tex$")
   file_name = Path(input_path).name
   match = file_style.match(file_name)
   if match:
      week_discussed = (match.group(1), match.group(2))
      print(f"Extracted week_discussed: {week_discussed} from filename: {file_name}")
   else:
      week_discussed = ('0', '0')
      print(f"Filename {file_name} does not match the expected pattern.")
     
   
   #FIXME add a title to the problem and check try and except
   
   while start in tex and end in tex: 
      start_index = tex.index(start) 
      end_index = tex.index(end, start_index) 
      problem_chunk = tex[start_index: end_index].split('\n')
      
   
      #\begin{problem}[A][9][USAMO 2007]
      first_line_info = problem_chunk[0].split('][')
      first_line_info[-1] = first_line_info[-1][0 : -1] # Remove last bracket
      size = len(first_line_info)
      major_topic = TOPIC.get(first_line_info[0][-1],'Miscellaneous') if size > 0 else 'Miscellaneous'
      problem_level = int(first_line_info[1]) if size > 1 else 1
      source = first_line_info[2] if size > 2 else 'None'
      tex_string = problem_chunk[1 : -1]
      
      if source == 'None':
         title = TOPIC_SHORTHAND.get(major_topic, "Misc") + " " + str(problem_level)
      else:
         title = source
         
      mp = MathProblem(major_topic, problem_level, source, week_discussed, title, tex_string)
      generate_problem_id(mp)
      problems.append(mp)
      tex = tex[end_index + len(end):]
      
   
def read_tex(directory):
   path = Path(directory)
   print(f"Checking directory: {path.resolve()}")
   if not path.exists():
      print(f"Error: Directory {directory} does not exist.")
      return
   routes = path.rglob('*.tex') 
   for tex_file in routes:
      print("file: ", Path(tex_file).name)
      input_tex(tex_file)
      

def print_json(output_path = 'default.json'):
   with open(output_path, "w") as f:
      json.dump([to_dict(mp) for mp in problems], f, indent=3)
      print(f"JSON file saved as {output_path}")
      
in_path = Path.cwd().joinpath(*["src", "TEX_to_JSON", "Math_Club_Problems"])
out_path = Path.cwd().joinpath(*["src", "TEX_to_JSON", "JSON_Files", "Problems_2.json"])

# Ensure the output directory exists
Path(out_path).parent.mkdir(parents=True, exist_ok=True)

# Ensure the output directory exists
Path(out_path).parent.mkdir(parents=True, exist_ok=True)

read_tex(in_path) 
print_json(out_path)  

print(f"There are {len(problems)} problems in the list")   
