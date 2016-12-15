'use strict';

module.exports = function(context) {
    return {
        'ClassDeclaration': function(node) {
            context.report(node, 'Class declaration is not authorized');
        }
    };
};
