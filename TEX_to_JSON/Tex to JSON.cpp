#include <bits/stdc++.h>
using namespace std;
typedef vector<string> Vstr;
const string in_path = "Tex_Files/";
const string out_path = "JSON_Files/";

// add "${fileDirname}\\**.cpp", to taks.json to compile both cpp files
extern void readTex(const string& in_path, Vstr& input_sources);
extern void inputTex(const string& input_source);
extern void printJSON(const string& output_source);

int main() {
   
   string output_source = "Problems.json";
   
   Vstr input_sources;
   readTex(in_path, input_sources);

   // Just to know what is being read
   cout << "+++++++++++++++++++++++++++++++++++++++++++++++++++++";
   cout << "\nFound .tex files:\n";
   for (const string& texfile : input_sources) {
      cout << texfile << '\n';
      inputTex(in_path + texfile);
   }
   printJSON(out_path + output_source);

   return 0;
}
