

/**
 * get value from object
 * @param {object} obj object
 * @param {string} paramsString eg. a.b.c[0].name
 * @param {any} defaultValue default value
 */
export default function(obj, paramsString, defaultValue) {
    if (!obj) return defaultValue;
    var words = parseSyntax(paramsString);
    var cur = obj;
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var key = word.type == 'Object' ? word.word : word.index;
        cur = cur[key];
        if (i < words.length - 1) {
            if (cur == null || typeof cur != 'object') {
                return defaultValue;
            }
        }
    }
    if (cur == null || typeof cur == 'undefined') {
        return defaultValue
    }
    return cur;
}

function parseSyntax(str) {
    var pos = 0;
    var totalLength = str.length;
    var words = [];
    var prePos = 0;
    var isInArray = false;

    while (pos < totalLength) {
        var cur = str.charAt(pos);
        if (isInArray) {
            if (cur == ']') {
                words.push({
                    type: 'Array',
                    index: str.substring(prePos, pos)
                });
                prePos = pos + 1;
                isInArray = false;
            }
        } else {
            if (cur == '.' || pos == totalLength - 1 || cur == '[') {
                var word = str.substring(prePos, pos);
                if (pos == totalLength - 1) {
                    word = str.substring(prePos, pos + 1)
                }
                words.push({
                    type: 'Object',
                    word: word
                });
                prePos = pos + 1;
                if (cur == '[') {
                    isInArray = true;
                }
            }
        }
        pos++;
    }

    return words.filter(function (m) {
        return m.type != 'Object' || m.word != ''
    })
}