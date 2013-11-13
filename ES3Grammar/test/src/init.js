// Setup the fileUtils package before deleting the org object.
var fileUtils = Packages.org.apache.commons.io.FileUtils;

// Delete the Rhino org object so ANTLR can create it
delete org

// Convert webkit alert() to rhino print()
alert=print


