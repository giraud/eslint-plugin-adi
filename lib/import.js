'use strict';

var forbiddenImports = {
    'silicon': ['nitrogen']
};
var bundles = Object.keys(forbiddenImports);

// extract bundle name from a path like xxx/javascript/<bundlename>/yyy/zzz
// no checks on the path, we assume it is correct (plugin for internal project so it's ok)
function extractBundle(filename) {
    var jsPos = filename.indexOf('javascript');

    var bundleFilename = filename.slice(jsPos + 11);
    var slashPos = bundleFilename.indexOf('/');
    if (slashPos < 0) {
        // maybe a windows path
        slashPos = bundleFilename.indexOf('\\');
    }
    return bundleFilename.slice(0, slashPos);
}

module.exports = function(context) {
    return {
        'ImportDeclaration': function(node) {
            var bundle = extractBundle(context.getFilename());
            if (0 <= bundles.indexOf(bundle)) {
                var forbidden = forbiddenImports[bundle];
                for (var other of forbidden) {
                    if (0 <= node.source.value.indexOf(other)) {
                        context.report(node, 'Invalid import declaration: you are not allowed to import a file from ' + other);
                    }
                }
            }
        }
    };
};
