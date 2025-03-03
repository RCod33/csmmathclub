import json
from pathlib import Path
from ParserDefinitions import MAJOR_TOPIC

json_problems_path = Path.cwd().joinpath("src", "JsonFiles", "Problems.json")
json_categories_path = Path.cwd().joinpath("src", "JsonFiles", "Categories.json")

with open(json_problems_path, 'r') as file:
   data = json.load(file)

# Ensure the output directory exists
Path(json_categories_path).parent.mkdir(parents=True, exist_ok=True)


CATEGORIES = { MAJOR_TOPIC[k]: set() for k in MAJOR_TOPIC if k != 'Z' }

for problem in data:
   if problem["majorTopic"] == "Any":
      continue

   tags = problem["tags"]
   major_topic = problem["majorTopic"]   
   CATEGORIES[major_topic].update(tags)
   
major_topics_list = [] 
print("Updating Categories...")
print(50*'+')
 
with open(json_categories_path, 'w') as f:
   for major_topic in CATEGORIES:
      major_topics_dict = {
         major_topic: list(CATEGORIES[major_topic])
      }
      print(f"The topic {major_topic} has {len(CATEGORIES[major_topic])} labels")
      major_topics_list.append(major_topics_dict)
      
   json.dump(major_topics_list, f, indent = 3)
   

