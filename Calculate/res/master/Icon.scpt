-- This AppleScript creates a Icon.icns from a 1024x1024 Icon.psd file.
-- Requires Icon.psd and Icon.jsx 
-- Run from the command line using:
-- osascript Icon.scpt

-- First, run the jsx file to create scaled versions of the icon
tell application "Finder"
    set parentFolder to container of (path to me) as text
end tell
set jsxpath to (POSIX path of parentFolder) & "Icon.jsx"
tell application "Adobe Photoshop CS6"
     do javascript ("#include " & jsxpath)
end tell

-- Next, create Icon.icns file
do shell script "iconutil -c icns Icon.iconset"
do shell script "mv Icon.icns ../widget"

-- Clean up
do shell script "rm -Rf Icon.iconset"