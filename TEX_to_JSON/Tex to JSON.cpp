#include <bits/stdc++.h>
#include "formatter.h"
using namespace std;
/* You may need to modify your local tasks.json  
   to compile the .h file as well */

int main() {
   string input_source = "main.tex";
   string output_source = "Problems.json";
   
   inputTex(input_source);
   printJSON(output_source);

   return 0;
}
