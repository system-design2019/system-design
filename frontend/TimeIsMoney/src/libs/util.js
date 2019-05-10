let util = {

};
util.title = function(title) {
    title = title ? title : 'T.I.M.';
    window.document.title = title;
};

export default util;