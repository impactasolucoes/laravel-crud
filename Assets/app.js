// dependências
window.$ = window.jQuery = require('jquery');

require('jquery-ui');
require('jquery-validation');
require("jquery.checkboxes");
require("select2");
// require("summernote");

// customs
require("./js/customs/jqueryExtends");
require("./js/customs/loadEditor");
require("./js/customs/mask");
require("./js/customs/textarea");
require("./js/customs/select2");

// internal components
require("./js/components/loading");
require("./js/components/listing");
require("./js/components/form");
require("./js/components/ajaxInputEventHandler");
require("./js/components/dates");
require("./js/components/multiselect");
require("./js/components/activeMultiselect");
require('./js/components/showHidePanel');
