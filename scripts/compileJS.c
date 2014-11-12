#include <stdio.h>
#include <vector>
#include <iostream>
#include <cstring>

int minifyJS(std::vector<char> vContent);

int main(int argc, char const *argv[])
{
	int isOptimize = std::strcmp(argv[1],"-O") ? 0 : 1;
	int iBegin = isOptimize ? 3 : 2;
	int nFiles = argc - iBegin + 1;
	std::cout << std::endl;
	std::cout << "target: " << argv[iBegin-1] << std::endl;
	std::cout << "nfiles: " << nFiles << std::endl;
	std::cout << "optimize: " << ( isOptimize ? "true" : "false" ) << std::endl;
	std::cout << std::endl;
	
	FILE *pTarget;
	pTarget = fopen(argv[iBegin-1], "w+");
	if (!pTarget) {
		std::cout << "error with targetFile and sourceDir"  << std::endl;
		return 1; 
	}

	for (int i = iBegin; i < argc; ++i)
	{
		std::cout << argv[i];
		
		std::vector<char> vContent;
		if (FILE *pFile = fopen(argv[i], "r"))
		{
			char cBuffer[1024];
			while (size_t iSize = fread(cBuffer, 1, sizeof(cBuffer), pFile))
			{
				vContent.insert(vContent.end(), cBuffer, cBuffer + iSize);
			}

			if ( i < argc - 2 ) {
				vContent.push_back('\r');
				vContent.push_back('\n');
			}

			fclose(pFile);
			std::cout << std::endl;
		} 
		else 
		{
			std::cout << " - faild"  << std::endl;
		}
		
		if(isOptimize)
		{
			minifyJS(vContent);
		}

		fwrite(&vContent[0], sizeof(char), vContent.size(), pTarget);
	}
	fclose(pTarget);
	return 0;
}

int minifyJS(std::vector<char> vContent)
{
	/*Use the following online service to compress it or a c-library*/

	/*POST http://javascript-minifier.com/raw?input=...*/
	return 0;
}