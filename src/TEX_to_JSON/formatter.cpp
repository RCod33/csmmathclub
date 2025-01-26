#include <bits/stdc++.h>
using namespace std;
namespace fs = filesystem;
const short int maxHashSize = 4;
typedef vector<string> Vstr;
typedef tuple<string, int, string, string, Vstr> stuff;
//-----------------------------GLOBAL DEFINITIONS-----------------------------------

#define tab 3
#define NaN string::npos
map<char,string> TOPIC = { 
   {'A', "Algebra"}, {'Q', "Inequalities"}, {'N', "Number Theory"}, {'C', "Calculus"}  
};
map<string, string> TOPIC_INV = {
   {"Algebra", "A"}, {"Inequalities", "Q"}, {"Number Theory", "N"}, {"Calculus", "C"}
};

class MathProblem {
   private:
      string problem_id, major_topic, source, title;
      int problem_level;
      Vstr tex_string;
   
   public:
      MathProblem(const string& mt, const int& d, const string& s, const string& t, const Vstr& p)
         : major_topic(mt), problem_level(d), source(s), title(t), tex_string(p) {}

      void setID(const string& id) { problem_id = id; }

      stuff getStuff(){
         return make_tuple(major_topic, problem_level, source, title, tex_string);
      }
      string getID() { return problem_id; }

};

vector<MathProblem> problems;
//--------------------------------FORMAT FUNCTIONS----------------------------------

string qt(const string& text_quoted) {
    return "\"" + text_quoted + "\"";
}

string qt(const int& int_quoted) {
    return "\"" + to_string(int_quoted) + "\"";
}

string tb(int indent_level){
   return string(tab*indent_level, ' ');
}

void normalize(string& text) {
   ostringstream escaped;
   bool inSpaceSequence = false;
   bool c0 = true;

   for (char c : text) {
      if (c == '\\') 
         escaped << "\\\\"; 
      else if (isspace(c)) {
         if (!inSpaceSequence && !c0) 
            escaped << ' ';
         inSpaceSequence = true;
      }
      else {
         escaped << c;  
         inSpaceSequence = false;  
         c0 = false;  // we can allow 1st spaces now
      }           
   }
   text = escaped.str();
}

void generateProblemID(MathProblem& mp) {
   auto [topic, level, source, title, tex] = mp.getStuff();
   string level_str = (level < 10)? "0" + to_string(level): to_string(level);
   // Combine the input data into a single string
   string content = topic + "|" + level_str + "|" + source + "|" + tex[0];

    // Use std::hash to hash the content
   hash<string> hasher;
   size_t hashValue = hasher(content);
   string hashString = to_string(hashValue);

   // Truncate or pad to 4 digits
   if (hashString.length() > maxHashSize) 
      hashString = hashString.substr(0, maxHashSize);
   else 
      hashString = string(maxHashSize - hashString.length(), '0') + hashString; // Pad with leading zeros
    
   hashString += TOPIC_INV[topic] + level_str; 

   mp.setID(hashString);
}

//--------------------------------PRINCIPAL FUNCTIONS-------------------------------

void readTex(const string& in_path, Vstr& input_sources) {

   if (!fs::exists(in_path) || !fs::is_directory(in_path)) {
      cerr << "Directory does not exist or is not valid." << '\n';
      abort(); 
   }

   // Iterate over files in the directory
   for (const auto& entry : fs::directory_iterator(in_path)) {
      string texfile = entry.path().filename().string();

      // Check if the file ends with .tex
      if (texfile.size() >= 4 && texfile.substr(texfile.size() - 4) == ".tex") 
         input_sources.push_back(texfile);
   }
}

void inputTex(const string& input_source) {
   string line;
   
   ifstream infile(input_source);  // Open the file
   if (!infile.is_open()) {
      cerr << "Error: File could not be opened." << '\n';
      return;
   }
   while (getline(infile, line)) {
      // magic comment 
      if (line == "%rolan-rolan") break;
      
      // \begin{problem}[A][9][USAMO 2007]
      if (line.compare(0, 15, "\\begin{problem}") == 0) {
         string topic, source, title ;
         int level; Vstr pieces;
         line = line.substr(15);
      
         // Extract title (first {})
         size_t open_brace = line.find('{');
         size_t close_brace = line.find('}', open_brace);
         if (open_brace != NaN && close_brace != NaN && close_brace > open_brace)
            title = line.substr(open_brace + 1, close_brace - open_brace - 1);
         else 
            title = "Untitled"; // Default if missing

         // remove what we used for simplicity
         line = line.substr(close_brace + 1);
         int n = line.size();
         topic = (n <= 0)? "General": TOPIC[line[1]];
         if (n > 5) {
            if (line[5] == ']'){
               level = line[4]-'0';
               source = (n <= 7)? "": line.substr(7, n - 8);
            }
            else {
               level = stoi(line.substr(4,2));
               source = (n <= 8)? "": line.substr(8, n - 9);
            }
         }
         else {
            level = 0; source = "";
         }

         // reach end with \end{problem} 
         
         while (getline(infile, line)) {
            if (line.compare(0, 13, "\\end{problem}") == 0) break;
            normalize(line);
            pieces.push_back(line);
         }
         // Create a MathProblem and add to the vector
         MathProblem mp(topic, level, source, title, pieces);
         generateProblemID(mp);
         problems.push_back(mp);
      }   
   }
   infile.close();
}

void printJSON(const string& output_source) {
   
   // Write to the file
   ofstream outfile(output_source);
   if (!outfile.is_open()) {
      cerr << "Error: Could not open file '" << output_source << "' for writing.\n";
      return;
   }
   outfile << "[\n";
   for (int i = 0; i < problems.size(); ++i) {
      auto [topic, level, source, title, tex] = problems[i].getStuff();
      string id = problems[i].getID();
      auto last = tex.end() - 1;
      
      outfile << tb(1) << "{\n";
      outfile << tb(2) << qt("problemID") << ": " << qt(id) << ",\n";
      outfile << tb(2) << qt("title") << ": " << qt(title) << ",\n";
      outfile << tb(2) << qt("majorTopic") << ": " << qt(topic) << ",\n";
      outfile << tb(2) << qt("problemLevel") << ": " << qt(level) << ",\n";
      outfile << tb(2) << qt("cameFrom") << ": " << qt(source) << ",\n";
      outfile << tb(2) << qt("texString") << ": " << "[\n";

      for (string pie: tex) {
         string line_break = (*last == pie)? "\n": ",\n";
         outfile << tb(3) << qt(pie) << line_break;
      }
      outfile << tb(2) << "]\n";
      string last_escape = (i + 1 == problems.size())? "}\n": "},\n";
      outfile << tb(1) << last_escape;
   }
   outfile << "]";
   cout << "-----------------------------------------------------";
   cout << "\nThe text has been written to '" << output_source << "'\n";
   outfile.close();     
}
