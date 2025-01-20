// formatter.h
#ifndef FORMATTER_H
#define FORMATTER_H
#include <bits/stdc++.h>

using namespace std;
typedef vector<string> Vstr;
typedef tuple<string, int, string, Vstr> stuff;
//----------------------------------------------------------------------------------

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

extern map<char, string> TOPIC;
extern vector<MathProblem> problems;
//--------------------------------I/O FUNCTIONS-------------------------------------
void inputTex(const string& input_source);
void printJSON(const string& output_source);
#endif
