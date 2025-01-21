#include <bits/stdc++.h>
using namespace std;
namespace fs = filesystem;
typedef vector<string> Vstr;
typedef tuple<string, int, string, Vstr> stuff;
//-----------------------------GLOBAL DEFINITIONS-----------------------------------

#define tab 3
map<char,string> TOPIC = { 
   {'A', "Algebra"}, {'Q', "Inequalities"}, {'N', "Number Theory"}, {'C', "Calculus"}  
};

class MathProblem {
   private:
      string major_topic;
      int problem_level;
      string source;
      Vstr tex_string;
   
   public:
      MathProblem(const string& t, const int& d, const string& s, const Vstr& parts)
         : major_topic(t), problem_level(d), source(s), tex_string(parts) {}

      stuff getStuff(){
         return make_tuple(major_topic, problem_level, source, tex_string);
      }

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
         string topic, source;
         int level; Vstr pieces;
         int n = line.size();
       
         topic = (n <= 16)? "": TOPIC[line[16]];
         if (n > 20) {
            if (line[20] == ']'){
               level = line[19]-'0';
               source = (n <= 22)? "": line.substr(22, n - 23);
            }
            else {
               level = stoi(line.substr(19,2));
               source = (n <= 23)? "": line.substr(23, n - 24);
            }
         }
         else {
            level = 1; source = "";
         }

         // reach end with \end{problem} 
         
         while (getline(infile, line)) {
            if (line.compare(0, 13, "\\end{problem}") == 0) break;
            normalize(line);
            pieces.push_back(line);
         }
         // Create a MathProblem and add to the vector
         MathProblem mp(topic, level, source, pieces);
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
      auto [topic, level, source, tex] = problems[i].getStuff();
      auto last = tex.end() - 1;
      
      outfile << tb(1) << "{\n";
      outfile << tb(2) << qt("major-topic") << ": " << qt(topic) << ",\n";
      outfile << tb(2) << qt("problem-level") << ": " << qt(level) << ",\n";
      outfile << tb(2) << qt("came-from") << ": " << qt(source) << ",\n";
      outfile << tb(2) << qt("tex-string") << ": " << "[\n";

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
