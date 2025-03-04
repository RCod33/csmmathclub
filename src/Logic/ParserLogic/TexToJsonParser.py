from typing import List, Tuple
from pathlib import Path
import json
import re
from ParserDefinitions import *

problems = []
label_set = set()

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
   
   file_style = re.compile(r".*S(\d+) W(\d+)\.tex$") #e.g S2 W1.tex
   file_name = Path(input_path).name
   match = file_style.match(file_name)
   if match:
      week_discussed = (match.group(1), match.group(2))
   else:
      week_discussed = ('0', '0')   
   
   while start in tex and end in tex: 
      start_index = tex.index(start) 
      end_index = tex.index(end, start_index) 
      problem_chunk = tex[start_index: end_index].split('\n')
      
      #\begin{problem}[A][9][USAMO 2007]
      first_line_info = problem_chunk[0].split('][')
      first_line_info[-1] = first_line_info[-1][0 : -1] # Remove last bracket
      is_title_it = True
      try:
         topic_char = first_line_info[0][-1]
         sub_topic = TOPIC[topic_char]
      except (KeyError, IndexError):
         topic_char, sub_topic = 'Z', "Any"
         
      major_topic = get_major_topic(topic_char)
      
      try:
         problem_level = int(first_line_info[1])
      except (ValueError, IndexError):
         problem_level = 0
      
      try:   
         source_list = first_line_info[2].split('/') 
         if len(source_list) > 1:
            source_str = title = ' '.join(source_list)
            is_title_it = False
         else:
            source_str = source_list[0]      
      except IndexError:
         source_str = "Any"
      
      if is_title_it:
         if source_str in TITLE_CNT:
            TITLE_CNT[source_str] += 1
         else:
            TITLE_CNT[source_str] = 1
         title = f"{source_str} P{TITLE_CNT[source_str]}"
          
      # % Polynomials ^ Algebra ^ Student Math League  
      raw_tags = problem_chunk[1].split('^')
      raw_tags[0] = raw_tags[0].replace('%', '')
      labels = [label.strip() for label in raw_tags]
      label_set.update(labels)
       
      tex_string = problem_chunk[2 : -1]  
      mp = MathProblem(
         major_topic, sub_topic, problem_level, source_str, week_discussed, title, labels, tex_string, "0000"
      )
      generate_problem_id(mp)
      problems.append(mp)
      tex = tex[end_index + len(end):]
      
def read_tex(directory):
   path = Path(directory)
   #print(f"Checking directory: {path.resolve()}")
   if not path.exists():
      print(f"Error: Directory {directory} does not exist.")
      return
   routes = path.rglob('*.tex') 
   for tex_file in routes:
      #print("file: ", Path(tex_file).name)
      input_tex(tex_file)   
   
   
def print_json(output_path = 'default.json'):
   with open(output_path, "w") as f:
      problems_dict = [to_dict(mp) for mp in problems]
      
      json.dump(problems_dict, f, indent=3)
      #print(50*'+')
      #print(f"JSON file saved as {Path(output_path).name}")
      
      