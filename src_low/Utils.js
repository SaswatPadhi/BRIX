function HighlightElement(e){
    e.style.opacity = 1;
}

function LowlightElement(e){
    e.style.opacity = 0.4;
}

function stopEvent(e)
{
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
}

function offsetOf (elem)
{
    var curleft = curtop = 0;
    if (elem.offsetParent)
    {
        do
        {
            curleft += elem.offsetLeft;
            curtop += elem.offsetTop;
        } while (elem = elem.offsetParent);
    }
    return [curleft,curtop];
}

function getBlurValue(blur) {
    var userAgent = navigator.userAgent;
    if (userAgent && userAgent.indexOf('Firefox/4') != -1) {
        var kernelSize = (blur < 8 ? blur / 2 : Math.sqrt(blur * 2));
        var blurRadius = Math.ceil(kernelSize);
        return blurRadius * 2;
    }
    return blur;
};

var createInterlace = function (size, color1, color2) {
    var proto = document.createElement("canvas").getContext("2d");
    proto.canvas.width = size * 2;
    proto.canvas.height = size * 2;
    proto.fillStyle = color1; // top-left
    proto.fillRect(0, 0, size, size);
    proto.fillStyle = color2; // top-right
    proto.fillRect(size, 0, size, size);
    proto.fillStyle = color2; // bottom-left
    proto.fillRect(0, size, size, size);
    proto.fillStyle = color1; // bottom-right
    proto.fillRect(size, size, size, size);
    var pattern = proto.createPattern(proto.canvas, "repeat");
    pattern.data = proto.canvas.toDataURL();
    return pattern;
};

getMetrics = function(text, font) {
    var metrics = document.getElementById("metrics");
    if (metrics) {
        metrics.style.cssText = "display: block";
        var parent = metrics.firstChild;
        parent.firstChild.textContent = text;
    } else {
        // setting up html used for measuring text-metrics
        var parent = document.createElement("span");
        parent.appendChild(document.createTextNode(text));
        parent.appendChild(image);
        var metrics = document.createElement("div");
        metrics.id = "metrics";
        metrics.appendChild(parent);
        document.body.insertBefore(metrics, document.body.firstChild);
    }
    // direction of the text
    var direction = window.getComputedStyle(document.body, "")["direction"];
    // getting css equivalent of ctx.measureText()
    parent.style.cssText = "font: " + font + "; white-space: nowrap; display: inline;";
    var width = parent.offsetWidth;
    var height = parent.offsetHeight;
    // capturing the "top" and "bottom" baseline
    parent.style.cssText = "font: " + font + "; white-space: nowrap; display: block;";
    var top = image.offsetTop;
    var bottom = top - height;
    // capturing the "middle" baseline
    parent.style.cssText = "font: " + font + "; white-space: nowrap; line-height: 0; display: block;";
    var middle = image.offsetTop + 1;
    // capturing "1em"
    parent.style.cssText = "font: " + font + "; white-space: nowrap; height: 1em; display: block;";
    parent.firstChild.textContent = "";
    var em = parent.offsetHeight;
    // cleanup
    metrics.style.display = "none";
    return {
        direction: direction,
        top: top,
        em: em,
        middle: middle,
        bottom: bottom,
        height: height,
        width: width
    };
};
