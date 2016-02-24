SET CURRENT_PATH=%~dp0
cd ..\..
cmd /c tsc --outFile %CURRENT_PATH%out\app.js
cd %CURRENT_PATH%
node bundle.js
pause