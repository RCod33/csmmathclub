import hashlib
from dataclasses import dataclass, field
MAX_HASH_SIZE = 4
MAJOR_TOPIC = {
   'A': "Algebra", 'N': "Number Theory", 'C': "Discrete",
   'G': "Geometry", 'R': "Calculus", 'Z': "Any"
}

TOPIC = {
   'A': "Algebra", 'Q': "Inequalities", 'W': "Complex Numbers",     #Algebra       0-2
   'N': "Number Theory", 'D': "Divisibility",                       #Number Theory 3-4
   'C': "Combinatorics", 'P': "Probability", 'L': "Linear Algebra", #Discrete      5-7
   'R': "Calculus",                                                 #Calculus      8
   'G': "Geometry",                                                 #Geometry      9                                   #Linear Algebra 
   'Z': "Any"                                                       #Any           10
}

ALGEBRA = ['A', 'Q', 'W']
NUMBER_THEORY = ['N', 'D']
DISCRETE = ['C', 'P', 'L']
CALCULUS = ['R']
GEOMETRY = ['G']
TOPIC_MATRIX = [ALGEBRA, NUMBER_THEORY, DISCRETE, CALCULUS, GEOMETRY]

TOPIC_INV = {v: k for k, v in TOPIC.items()}  # Inverse mapping

TITLE_CNT = dict()

used_id = [False for _ in range(10000)]

@dataclass
class MathProblem:
   major_topic: str
   topic: str
   problem_level: int
   source: str
   week_discussed : tuple[int, int]
   title: str
   label: list[str]
   tex_string: list[str]
   id: str = field(default = None)


def generate_problem_id(mp: MathProblem):
   level_str = f"{mp.problem_level:02d}"  # two-digit format
    
   content = f"{mp.major_topic}|{level_str}|{mp.source}|{mp.title}" 
   hash_value = int(hashlib.sha256(content.encode()).hexdigest(), 16) % 10000
   
   while used_id[hash_value]:
      content += '+'
      hash_value = int(hashlib.sha256(content.encode()).hexdigest(), 16) % 10000
   used_id[hash_value] = True
   
   # Fix to 4 digits
   hash_string = str(hash_value).zfill(4)
   # Append topic identifier and level
   hash_string += TOPIC_INV.get(mp.topic, 'Z') + level_str
   mp.id = hash_string


def to_dict(mp: MathProblem) -> dict:
   return {
      "problemID": mp.id,
      "majorTopic": mp.major_topic,
      "subTopic": mp.topic,
      "problemLevel": mp.problem_level,
      "cameFrom": mp.source,
      "weekDiscussed": mp.week_discussed,
      "title": mp.title,
      "tags": mp.label,
      "texString": mp.tex_string,
    }

def get_major_topic(C):
   for topic in TOPIC_MATRIX:
      if C in topic and topic[0] in MAJOR_TOPIC:
         return MAJOR_TOPIC[topic[0]]
   return "Any"

