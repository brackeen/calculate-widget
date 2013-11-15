
CalcWidget.UI.scrollArea =  null;

CalcWidget.UI.minWidth = 320;
CalcWidget.UI.minHeight = 160;
CalcWidget.UI.growboxInset;

CalcWidget.UI.scrollTo = function(element) {
    CalcWidget.UI.scrollArea.reveal(element);
};

CalcWidget.UI.scrollUp = function() {
    var scrollArea = CalcWidget.UI.scrollArea;
    scrollArea.verticalScrollTo(scrollArea.content.scrollTop - scrollArea.singlepressScrollPixels);
};

CalcWidget.UI.scrollDown = function() {
    var scrollArea = CalcWidget.UI.scrollArea;
    scrollArea.verticalScrollTo(scrollArea.content.scrollTop + scrollArea.singlepressScrollPixels);
};

CalcWidget.UI.scrollPageUp = function() {
    var scrollArea = CalcWidget.UI.scrollArea;
    scrollArea.verticalScrollTo(scrollArea.content.scrollTop - scrollArea.viewHeight);
};

CalcWidget.UI.scrollPageDown = function() {
    var scrollArea = CalcWidget.UI.scrollArea;
    scrollArea.verticalScrollTo(scrollArea.content.scrollTop + scrollArea.viewHeight);
};

CalcWidget.UI.scrollHome = function() {
    var scrollArea = CalcWidget.UI.scrollArea;
    scrollArea.verticalScrollTo(0);
};

CalcWidget.UI.scrollEnd = function() {
    var scrollArea = CalcWidget.UI.scrollArea;
    scrollArea.verticalScrollTo(scrollArea.content.scrollHeight - scrollArea.viewHeight);
};

CalcWidget.UI.refreshScrollArea = function() {
    CalcWidget.UI.scrollArea.refresh();
};

CalcWidget.UI.onLoad = function() {
    CalcWidget.UI.onLoadInternal();
    CalcWidget.UI.scrollArea = new AppleScrollArea(document.getElementById("scrollArea"));
    CalcWidget.UI.scrollArea.scrollsHorizontally = false;
    CalcWidget.UI.scrollArea.singlepressScrollPixels = 25;

    // Info button
    var flipElement = document.getElementById("info-button");
    if (!flipElement.loaded) {
        flipElement.loaded = true;
        flipElement.object = new AppleInfoButton(flipElement,
            document.getElementById("front"),
            "white", "white", CalcWidget.UI.showBack);
    }

    // Done button
    var doneElement = document.getElementById("done-button");
    new AppleGlassButton(doneElement, "Done", CalcWidget.UI.showFront);

    CalcWidget.UI.scrollArea.refresh();

    if (window.widget) {
        window.widget.onhide = function() {CalcWidget.Calc.saveUserVars();};

        // Removed - keep vars in case of widget upgrade.
        //widget.onremove = function() { CalcWidget.Calc.clearUserVars(); CalcWidget.Calc.clearHistory(); }
        window.widget.onremove = function() {CalcWidget.Calc.saveUserVars();};
    }
};

CalcWidget.UI.resizeStart = function(event) {
    document.addEventListener("mousemove", CalcWidget.UI.resize, true);
    document.addEventListener("mouseup", CalcWidget.UI.resizeEnd, true);

    CalcWidget.UI.growboxInset = {x:(window.innerWidth - event.x), y:(window.innerHeight - event.y)};

    event.stopPropagation();
    event.preventDefault();
};

CalcWidget.UI.resize = function(event) {
    var width = Math.max(CalcWidget.UI.minWidth, event.x + CalcWidget.UI.growboxInset.x);
    var height = Math.max(CalcWidget.UI.minHeight, event.y + CalcWidget.UI.growboxInset.y);

    window.resizeTo(width, height);
    CalcWidget.UI.refreshScrollArea();

    event.stopPropagation();
    event.preventDefault();
};

CalcWidget.UI.resizeEnd = function(event) {
    document.removeEventListener("mousemove", CalcWidget.UI.resize, true);
    document.removeEventListener("mouseup", CalcWidget.UI.resizeEnd, true);

    CalcWidget.UI.focusTextField();

    event.stopPropagation();
    event.preventDefault();

    // Save size
    CalcWidget.setPref("width", window.innerWidth);
    CalcWidget.setPref("height", window.innerHeight);
};