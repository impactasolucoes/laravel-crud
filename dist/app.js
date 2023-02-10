/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// customs
// require("jquery");
// require("summernote");
__webpack_require__(/*! ./js/customs/jqueryExtends */ "./src/js/customs/jqueryExtends.js");
__webpack_require__(/*! ./js/customs/loadEditor */ "./src/js/customs/loadEditor.js");
__webpack_require__(/*! ./js/customs/mask */ "./src/js/customs/mask.js");
__webpack_require__(/*! ./js/customs/textarea */ "./src/js/customs/textarea.js");
__webpack_require__(/*! ./js/customs/select2 */ "./src/js/customs/select2.js");

// internal components
__webpack_require__(/*! ./js/components/loading */ "./src/js/components/loading.js");
__webpack_require__(/*! ./js/components/listing */ "./src/js/components/listing.js");
__webpack_require__(/*! ./js/components/form */ "./src/js/components/form.js");
__webpack_require__(/*! ./js/components/ajaxInputEventHandler */ "./src/js/components/ajaxInputEventHandler.js");
__webpack_require__(/*! ./js/components/dates */ "./src/js/components/dates.js");
__webpack_require__(/*! ./js/components/multiselect */ "./src/js/components/multiselect.js");
__webpack_require__(/*! ./js/components/activeMultiselect */ "./src/js/components/activeMultiselect.js");
__webpack_require__(/*! ./js/components/showHidePanel */ "./src/js/components/showHidePanel.js");

/***/ }),

/***/ "./src/js/components/activeMultiselect.js":
/*!************************************************!*\
  !*** ./src/js/components/activeMultiselect.js ***!
  \************************************************/
/***/ (() => {

(function ($) {
  $(document).ready(function () {
    $(".btn-multiselect").click(function () {
      $(this).parent().find(".dropdown-menu").toggleClass("show");
    });
    $(document).mouseup(function (e) {
      var container = $(".multiselect-container.dropdown-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0 && container.hasClass("show")) {
        container.removeClass("show");
      }
    });
  });
})(window.jQuery);

/***/ }),

/***/ "./src/js/components/ajaxInputEventHandler.js":
/*!****************************************************!*\
  !*** ./src/js/components/ajaxInputEventHandler.js ***!
  \****************************************************/
/***/ (() => {

var $ = window.jQuery;
$(document).ready(function () {
  /**
   * -----------------------------------------------------------------------------------------------
   * Ajax para preenchimento de campos
   * -----------------------------------------------------------------------------------------------
   */

  $("[data-ajax-url]").each(function (idx, $ele) {
    switch ($($ele).data("ajax-event")) {
      case "click":
        $($ele).click(ajaxInputEventHandler);
        break;
      default:
        $($ele).blur(ajaxInputEventHandler);
    }
  });
  function ajaxInputEventHandler(e) {
    var $element = jQuery(e.target);
    var $url = $element.data("ajax-url");
    var $method = $element.data("ajax-method").toUpperCase() == "POST" ? "POST" : "GET";
    var $data = $element.data("ajax-data");
    var $dataFields = $element.data("ajax-data-fields");

    // Preenche parâmetros da URL. Exemplo: /url/{chave}
    $element.parents("form").find(":input").each(function () {
      if (!jQuery(this).attr("name")) return;
      $url = $url.replace("{" + jQuery(this).attr("name") + "}", jQuery(this).val());
    });

    // Pega os parametros do dataFields e cada elemento vira um parametro para
    // submeter ao formulário, sendo seu valor representando o nome de um :input do form.
    Object.keys($dataFields).forEach(function (key) {
      $data[key] = jQuery('[name="' + $dataFields[key] + '"]').val();
    });

    // Loading...
    window.initLoading();

    // Inicia a requisição, com o contexto do elemento principal (input que chama o ajax)
    $.ajax({
      method: $method,
      url: $url,
      data: $data,
      dataType: "json",
      context: $element
    }).done(function (json) {
      var $fieldsOptions = jQuery(this).data("ajax-fields-options");
      Object.keys($fieldsOptions).forEach(function (key) {
        var $field = jQuery('[name="' + key + '"]');
        if (!$field.length) return;

        // Perfil de dado esperado
        //[{ value: 1, label: 'UF'}, ...]
        if (Array.isArray(json[$fieldsOptions[key]])) {
          var template = json[$fieldsOptions[key]].reduce(function (prev, cur) {
            return prev + "<option value=\"".concat(cur.value, "\">").concat(cur.label, "</option>");
          }, "");
          $field.html(template);
        }
      });

      // Para cada campo configurado em fields, alimenta o :input correspondente
      var $fields = jQuery(this).data("ajax-fields");
      Object.keys($fields).forEach(function (key) {
        var $field = jQuery('[name="' + key + '"]');
        if (!$field.length) return;
        if ($field.is("div")) {
          $field.replaceWith(json[$fields[key]]);
          return;
        }
        if ($field.is("select") || $field.is("input")) {
          $field.val(json[$fields[key]]);
        }
      });
    }).fail(function () {
      alert("error");
    }).always(function () {
      window.finishLoading();
    });
  }
  ;
});

/***/ }),

/***/ "./src/js/components/asyncFileUpload.js":
/*!**********************************************!*\
  !*** ./src/js/components/asyncFileUpload.js ***!
  \**********************************************/
/***/ ((module) => {

module.exports = function asyncFileUpload() {
  var $inputs = window.jQuery('[data-file="async-upload"]');
  var inProgrees = false;
  var method = window.jQuery('input[name="_method"').val();
  var action = window.jQuery("#form").attr("action");
  if (!$inputs.length) return;
  function handleSuccess(res) {
    var _res$data = res.data,
      error = _res$data.error,
      success = _res$data.success;
    if (error) {
      var items = Object.values(error).reduce(function (prev, cur) {
        return prev + ", " + cur;
      }, "");
      alert("Falha no envio dos seguintes arquivos: " + items);
      this.value = null;
      this.files.length = 0;
      return;
    }
    Object.keys(success).forEach(function (key) {
      var $info = windwo;
      ow.jQuery("[mock-name=\"".concat(key, "\"]")).parent("div").find("[actions-container]");
      $info.find("[link-container]").attr("href", success[key].url).css("display", "none");
      $info.css("display", "block");
      $info.find("[destroy-file]").attr("destroy-file", success[key].hashName);
      window.jQuery("input[name=\"".concat(key, "\"]")).val(success[key].hashName);
    });
    $info.css("display", "block");
    inProgrees = false;
  }
  function handleFailure() {
    var $progressContainer = window.jQuery(this).next(".progress.mt-1");
    $progressContainer.find(".progress-bar").css("width", "0%");
    $progressContainer.css("display", "none");
    inProgrees = false;
  }

  /**
   * Handle input file
   * @param {event} e
   */
  function handleChange(e) {
    var files = new FormData();
    files.append(this.getAttribute("mock-name"), this.files[0]);
    var $progressContainer = window.jQuery(this).next(".progress.mt-1");
    $progressContainer.css("display", "block");
    var $progress = $progressContainer.find(".progress-bar");
    $progress.css("width", "0%");
    inProgrees = true;
    axios[method.toLowerCase()](action, files, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: function onUploadProgress(progressEvent) {
        var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
        $progress.css("width", percentCompleted + "%").html(percentCompleted === 100 ? "Concluído" : percentCompleted + "%");
      }
    }).then(handleSuccess)["catch"](handleFailure);
  }
  $inputs.each(function (idx, $input) {
    var accept = $input.getAttribute("accept");
    var extensions = null;
    if (accept) {
      accept = accept.split(",");
      extensions = accept.map(function (ext) {
        return ext.replace(/(\w*\/?\.?)(\w+[-?\w\.]*)/im, "$2");
      });
      $input.setAttribute("data-ext", extensions.join(","));
    }
    $input.onchange = handleChange;
    windwo;
    ow.jQuery($input).parent(".form-group").find("[destroy-file]").click(function (e) {
      e.preventDefault();
      var hash = window.jQuery(this).attr("destroy-file");
      var $inputFile = window.jQuery($input);
      var field = $inputFile.attr("mock-name");
      if (!hash) return;
      axios["delete"]("".concat(action, "?field=").concat(field, "&hash=").concat(hash)).then(function (res) {
        $inputFile.parent("div").find("[actions-container]").css("display", "none");
        $inputFile.parent("div").find('input[type="hidden"]').val(null);
        $inputFile.parent("div").find(".progress").css("display", "none");
        $inputFile.val(null);
      })["catch"](function () {
        alert("Falha ao excluir");
      });
    });
  });
};

/***/ }),

/***/ "./src/js/components/dates.js":
/*!************************************!*\
  !*** ./src/js/components/dates.js ***!
  \************************************/
/***/ (() => {

(function (moment, $) {
  /**
   * For handle date with time
   */
  $("[data-input='date-time']").on("change input", function () {
    // guarda a referência do elemento, ajuda na perfomance da execução do código
    var $ELEMENT_REF = $(this);
    var data = moment($ELEMENT_REF.val(), $ELEMENT_REF.data("input-format-client"));
    if (!data.isValid()) {
      $ELEMENT_REF.next("input:hidden").val("");
      return;
    }
    $ELEMENT_REF.next("input:hidden").val(data.format($ELEMENT_REF.data("input-format-server")));
  }).each(function () {
    var $ELEMENT_REF = $(this);
    var data = moment($ELEMENT_REF.next("input:hidden").val(), $ELEMENT_REF.data("input-format-server"));
    if (!data.isValid()) {
      $ELEMENT_REF.val("");
      return;
    }
    $ELEMENT_REF.val(data.format($ELEMENT_REF.data("input-format-client")));
  });

  /**
   * For handle date only
   */
  $("[data-input='date']").on("change input", function () {
    var $ELEMENT_REF = $(this);
    var data = moment($ELEMENT_REF.val(), $ELEMENT_REF.data("input-format-client"));
    if (!data.isValid()) {
      $ELEMENT_REF.next("input:hidden").val("");
      return;
    }
    $ELEMENT_REF.next("input:hidden").val(data.format($ELEMENT_REF.data("input-format-server")));
  }).each(function () {
    $ELEMENT_REF = $(this);
    var data = moment($ELEMENT_REF.next("input:hidden").val(), $ELEMENT_REF.data("input-format-server"));
    if (!data.isValid()) {
      $ELEMENT_REF.val("");
      return;
    }
    $ELEMENT_REF.val(data.format($ELEMENT_REF.data("input-format-client")));
  });
})(window.moment, window.jQuery);

/***/ }),

/***/ "./src/js/components/form.js":
/*!***********************************!*\
  !*** ./src/js/components/form.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var asyncFileUpload = __webpack_require__(/*! ./asyncFileUpload */ "./src/js/components/asyncFileUpload.js");
var handleFailureSendForm = __webpack_require__(/*! ./handleFailureSendForm */ "./src/js/components/handleFailureSendForm.js");
var handleSuccessSendForm = __webpack_require__(/*! ./handleSuccessSendForm */ "./src/js/components/handleSuccessSendForm.js");
window.jQuery(document).ready(function () {
  var $ = window.jQuery;
  if (!$("[data-its-form]").length) return;
  $('[data-toggle="tooltip"]').tooltip();
  var $deleteFiles = $("[data-destroy]");
  $("#form").validate({
    submitHandler: function submitHandler(form) {
      if (!$(form).data('ajax')) {
        return true;
      }
      $(form).submit(function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      });
      window.initLoading();
      var ACTION = form.getAttribute("action");
      $.ajax({
        url: ACTION,
        type: "POST",
        processData: false,
        contentType: false,
        data: new FormData(form)
      }).done(handleSuccessSendForm).fail(handleFailureSendForm);
    },
    errorElement: "li",
    errorPlacement: function errorPlacement(error, element) {
      error.appendTo(element.parent().children().last());
      $(element.parent().children().last()).css("display", "block");
    }
  });
  $("select[multiple]").each(function (idx, ele) {
    $(ele).multiselect({
      enableClickableOptGroups: true,
      enableCollapsibleOptGroups: true,
      includeSelectAllOption: true,
      enableCaseInsensitiveFiltering: !!ele.getAttribute("enable-filter"),
      collapseOptGroupsByDefault: true,
      maxHeight: 400
    });
  });
  $deleteFiles.each(function (idx, $link) {
    $link.onclick = function (e) {
      window.initLoading();
      e.preventDefault();
      e.stopPropagation();
      var path = $link.getAttribute("data-destroy");
      var fieldFile = $link.getAttribute("data-file-field");
      var $mainForm = $("#form");
      var id = $("[data-id]").val();
      if (!path || !fieldFile || !id) return;
      $.post("".concat(window.location.pathname.replace("/editar", ""), "/destroyfile?model_id=").concat(id, "&file_delete=").concat(fieldFile), {
        _token: $('[name="_token"]').val()
      }, function (jsonData) {
        if (jsonData.error) {
          alert(jsonData.error);
          return;
        }
        window.finishLoading();
        $($link).parent("span").prev("input").val(null);
        $($link).parent("span").remove();
      }).fail(function (jqXHR) {
        alert(jqXHR.responseJSON.error ? jqXHR.responseJSON.error : "Falha ao excluir o arquivo.");
      }).always(function () {
        window.finishLoading();
      });
    };
  });

  /**
   * Chamando componente de upload asyncrono
   */
  asyncFileUpload();

  /**
   * Configuração do show-rules
   */
  var inputsToBind = {};
  $("div[data-show-rules]").each(function () {
    var rules = $(this).data("show-rules");
    var hideField = $(this).data("field-name");
    Object.keys(rules).forEach(function (ruleField) {
      inputsToBind[ruleField] = true;
      var inputToHandle = $(":input[name='" + ruleField + "']");
      if (!inputToHandle.length) {
        return;
      }
      var setEventChange = false;
      var fieldHideRules;
      if (inputToHandle.data("hide-rules")) {
        fieldHideRules = inputToHandle.data("hide-rules");
      } else {
        fieldHideRules = {};
        setEventChange = true;
      }
      fieldHideRules[hideField] = rules[ruleField];
      inputToHandle.data("hide-rules", fieldHideRules);
      if (setEventChange) {
        inputToHandle.change(function () {
          if ($(this).is(":radio:not(:checked)")) {
            return;
          }
          var inputValue = $(this).val();
          var hideRules = $(this).data("hide-rules");
          for (var field in hideRules) {
            var fieldBlockToHide = $("div[data-field-name='" + field + "']");
            var valuesToCheck = hideRules[field];
            if (!(_typeof(valuesToCheck) == "object")) {
              valuesToCheck = [valuesToCheck];
            }
            var eventShow = false;
            for (var index in valuesToCheck) {
              if (inputValue == valuesToCheck[index]) {
                eventShow = true;
              }
            }
            eventShow ? fieldBlockToHide.show() : fieldBlockToHide.hide();
          }
        });
      }
    });
  });

  // Aciona o evento change dos inputs que deverão ser monitorados
  for (var field in inputsToBind) {
    $(":input[name='" + field + "']").trigger("change");
  }
  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  };

  // Mostra o Iframe dentro das modals do botão SEARCH
  $("[data-search-iframe]").on('show.bs.modal', function (e) {
    var id = $(this).attr('data-search-iframe');
    $('#iframe-' + id).attr('src', $('#iframe-' + id).attr('data-url'));
  });
});

/***/ }),

/***/ "./src/js/components/handleFailureSendForm.js":
/*!****************************************************!*\
  !*** ./src/js/components/handleFailureSendForm.js ***!
  \****************************************************/
/***/ ((module) => {

module.exports = function handleFailureSendForm(error) {
  var $alert = document.querySelector("[data-expect-alert]");
  window.jQuery('[data-container="loading"]').html("");
  if (error.status >= 500) {
    var alertError = "\n          <div class=\"container alert mb-1 alert-danger alert-dismissible fade show\" role=\"alert\" data-expect >\n          <span data-content>".concat(error.responseJSON.errors, "</span>\n          <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times</span>\n          </button>\n          </div>\n          ");
    $alert.innerHTML = alertError;
    $alert.scrollIntoView();
    return;
  }
  if (error.status !== 422 || !error.responseJSON.errors) return;
  var alertMessage = "\n      <div class=\"container alert mb-1 alert-danger alert-dismissible fade show\" role=\"alert\" data-expect >\n          <span data-content>Ops! Por favor, verifique os campos abaixo.</span>\n          <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times</span>\n          </button>\n      </div>\n      ";
  var camposInvalidos = error.responseJSON.errors;
  var hasScroll = false;

  // Erros enviados pela request do laravel
  Object.keys(camposInvalidos).forEach(function (name) {
    var input;
    var erros = "<li>" + camposInvalidos[name].join("</li><li>") + "</li>";
    if (name.includes(".")) {
      name = name.split(".");
      input = '[name="' + name[0] + "[" + name[1] + ']"]';
    } else {
      input = '[name="' + name + '"]';
    }
    var $input = window.jQuery(input);
    $input.hasClass("is-invalid") ? null : $input.toggleClass("is-invalid");
    $input.next(".invalid-feedback").html(erros);
    if (hasScroll) return;
    $input.get(0).scrollIntoView(true);
    hasScroll = true;
  });
  $alert.innerHTML = alertMessage;
  $alert.scrollIntoView();
};

/***/ }),

/***/ "./src/js/components/handleSuccessSendForm.js":
/*!****************************************************!*\
  !*** ./src/js/components/handleSuccessSendForm.js ***!
  \****************************************************/
/***/ ((module) => {

module.exports = function handleSuccessSendForm(res) {
  if (!res.url) {
    alert("Ops, pedimos desculpas pelo erro, entre em contato com o suporte para que possamos fazer os ajustes.");
    jQuery('[data-container="loading"]').html("");
    return;
  }
  var url = res.url;
  window.location.href = url;
};

/***/ }),

/***/ "./src/js/components/listing.js":
/*!**************************************!*\
  !*** ./src/js/components/listing.js ***!
  \**************************************/
/***/ (() => {

"use strict";


var $ = window.jQuery;
$(document).ready(function () {
  var $form = $("#listingForm");
  $(".actionButton").click(function () {
    var url = $(this).data("url");
    var _method = $(this).data("method");
    var confirmationText = $(this).data("confirmation");
    var continueFunction = null;
    var method = $(this).data("method") == "GET" ? "GET" : "POST";
    if (!$.inArray(method, ["GET", "POST", "PUT", "PATCH", "DELETE"]) == -1) {
      method = "GET";
    }
    var $checkboxes = $(".listing-checkboxes:checked");
    if ((url.indexOf("{id}") >= 0 || url.indexOf("{ids}") >= 0 || method != "GET") && !($checkboxes.length > 0)) {
      alert("Selecione no minimo 1 item da listagem");
      return;
    }
    var ids = [];
    $checkboxes.each(function () {
      ids.push($(this).val());
    });
    var id = ids[0];
    var idsFormatado = ids.join(",");
    url = url.replace("{id}", id).replace("{ids}", idsFormatado);
    if (method == "GET") {
      continueFunction = function continueFunction() {
        listagemLoading();
        window.location.href = url;
      };
    } else {
      $form.prop("action", url);
      $form.prop("method", method);
      $form.find('input[name="_method"]').val(_method);
      continueFunction = function continueFunction() {
        $form.submit();
      };
    }
    if (confirmationText.length > 0) {
      $("#confirmationModal").data("executar", continueFunction).modal("show");
      $("#confirmationModal .modal-body").html(confirmationText);
      $("#confirmationModal .btnConfirm").click(function () {
        var func = $("#confirmationModal").data("executar");
        func();
        e.preventDefault();
      });
    } else {
      continueFunction();
    }
  });
  function listagemLoading() {
    var open = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    if (!open) {
      window.finishLoading();
      return;
    }
    window.initLoading();
  }
  var $checkboxs = $("input.listing-checkboxes");
  function handleCheckboxChange(e) {
    if (this.checked) {
      $(this.parentNode.parentNode).addClass("active");
      return;
    }
    $(this.parentNode.parentNode).removeClass("active");
  }
  function handleBuscaAvancada() {
    $("#formBuscaAvacada").submit();
  }
  function handleTdClick(e) {
    // Verifica se é o clique para o SearchField
    var $tr = $(this).parents("tr");
    var data_search = $tr.attr('data-search-field');
    if (data_search) {
      parent.$('#modal-search-' + data_search).modal('hide');
      parent.$('#c-' + data_search).val($tr.attr('data-search-value'));
      return;
    }

    // Verifica se foi clicado em elementos
    if ($(e.target).is("a") || $(e.target).is("img") || $(e.target).is("input") || $(e.target).is("button")) {
      return;
    }
    var $checkbox = $(this).parents("tr").find(".listing-checkboxes:first");
    if ($checkbox.is(":checked")) {
      $checkbox.prop("checked", false);
      $(this).parents("tr").removeClass("active");
    } else {
      $checkbox.prop("checked", "checked");
      $(this).parents("tr").addClass("active");
    }
  }
  function handleDblClick(e) {
    if ($(e.target).is("a") || $(e.target).is("img") || $(e.target).is("input") || $(e.target).is("button")) {
      return;
    }
    var $item = $(this);
    $(".listing-checkboxes").prop("checked", false).parents("tr").removeClass("active");
    $item.addClass("active").find(".listing-checkboxes").prop("checked", "checked");
    if ($('.actionButton[data-verb="edit"]').length > 0) {
      $('.actionButton[data-verb="edit"]').trigger("click");
    }
  }

  // Funcão para atualizar a flag de um registro:
  function handleListingFlag() {
    var primaryKeyValue = $(this).parents("tr").find(".listing-checkboxes").val();
    var newFlag = null;
    if ($(this).parents("td").find("[data-double-flag]").length > 1) {
      newFlag = $(this).hasClass("flag-on") ? 1 : 0;
    } else {
      newFlag = $(this).hasClass("flag-on") ? 0 : 1;
    }
    var fieldName = $(this).data("field");
    listagemLoading();
    var postUrl = window.location.pathname.replace(/\/+$/, "") + "/" + primaryKeyValue + "/updateflag";
    var postData = {
      //'_method': 'PUT',
      responseFormat: "json",
      listingFlagField: fieldName,
      newFlag: newFlag
    };
    $.ajax({
      url: postUrl,
      method: "POST",
      data: postData,
      context: $(this),
      dataType: "json"
    }).done(function (jsonData) {
      if (jsonData.error) {
        alert(jsonData.error);
        listagemLoading(false);
        return;
      }
      if ($(this).parents("td").find("[data-double-flag]").length > 1) {
        jsonData.flag === "1" ? $(this).parents('td').find('[data-double-flag="off"]').remove() : $(this).parents('td').find('[data-double-flag="on"]').remove();
        $(this).attr("data-double-flag", "");
      }
      $(this).html(jsonData.flag).removeClass("flag-on").removeClass("flag-off").addClass(jsonData.flag == "1" ? "flag-on" : "flag-off");
    }).fail(function (jqXHR) {
      alert(jqXHR.responseJSON.error ? jqXHR.responseJSON.error : "Erro ao alterar.");
    }).always(function () {
      listagemLoading(false);
    });
  }
  function handleAllChecked() {
    if ($('[name="checkbox-listing"]').is(":checked")) {
      $(".listing-checkboxes").prop("checked", "checked").parents("tr").addClass("active");
    } else {
      $(".listing-checkboxes").prop("checked", false).parents("tr").removeClass("active");
    }
  }
  if ($checkboxs.length > 0) {
    $("#listagemTable tbody tr:not(.empty) td").click(handleTdClick);
    $("#listagemTable tbody tr:not(.empty)").dblclick(handleDblClick);
  }
  $("input.listing-checkboxes").change(handleCheckboxChange);
  $("#listagemTable").checkboxes("range", true);
  $('[data-avancada="buscar"]').click(handleBuscaAvancada);
  $("a.flagItem").click(handleListingFlag);
  $('input[name="checkbox-listing"]').click(handleAllChecked);
  $checkboxs.each(function (idx, $item) {
    $item.checked = false;
  });

  // Atilet tooltip para todos os actions
  if (!($('[data-toggle="tooltip"]:first').data && $('[data-toggle="tooltip"]:first').data("bs.tooltip"))) {
    $('[data-toggle="tooltip"]').tooltip();
  }
  $("#listingForm th order-asc").addClass("fas fa-sort-up");
  $("#listingForm th order-desc").addClass("fas fa-sort-down");
});
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};

/***/ }),

/***/ "./src/js/components/loading.js":
/*!**************************************!*\
  !*** ./src/js/components/loading.js ***!
  \**************************************/
/***/ (() => {

"use strict";


var $ = window.jQuery;
window.initLoading = function () {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[data-container="loading"]';
  $(element).html("\n      <div class=\"loading-container fixed\">\n          <div class=\"lds-roller\">\n              <div></div>\n              <div></div>\n              <div></div>\n              <div></div>\n          </div>\n      </div>\n    ");
};
window.finishLoading = function () {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[data-container="loading"]';
  $(element).html("");
};

/***/ }),

/***/ "./src/js/components/multiselect.js":
/*!******************************************!*\
  !*** ./src/js/components/multiselect.js ***!
  \******************************************/
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function (root, factory) {
  // check to see if 'knockout' AMD module is specified if using requirejs
  // if (typeof define === 'function' && define.amd &&
  //     typeof require === 'function' && typeof require.specified === 'function' && require.specified('knockout')) {

  //     // AMD. Register as an anonymous module.
  //     define(['jquery', 'knockout'], factory);
  // } else {
  //     // Browser globals
  //     factory(root.jQuery, root.ko);
  // }
  factory(root.jQuery, root.ko);
})(window, function ($, ko) {
  "use strict";

  // jshint ;_;
  if (typeof ko !== 'undefined' && ko.bindingHandlers && !ko.bindingHandlers.multiselect) {
    ko.bindingHandlers.multiselect = {
      after: ['options', 'value', 'selectedOptions', 'enable', 'disable'],
      init: function init(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var $element = $(element);
        var config = ko.toJS(valueAccessor());
        $element.multiselect(config);
        if (allBindings.has('options')) {
          var options = allBindings.get('options');
          if (ko.isObservable(options)) {
            ko.computed({
              read: function read() {
                options();
                setTimeout(function () {
                  var ms = $element.data('multiselect');
                  if (ms) ms.updateOriginalOptions(); //Not sure how beneficial this is.
                  $element.multiselect('rebuild');
                }, 1);
              },
              disposeWhenNodeIsRemoved: element
            });
          }
        }

        //value and selectedOptions are two-way, so these will be triggered even by our own actions.
        //It needs some way to tell if they are triggered because of us or because of outside change.
        //It doesn't loop but it's a waste of processing.
        if (allBindings.has('value')) {
          var value = allBindings.get('value');
          if (ko.isObservable(value)) {
            ko.computed({
              read: function read() {
                value();
                setTimeout(function () {
                  $element.multiselect('refresh');
                }, 1);
              },
              disposeWhenNodeIsRemoved: element
            }).extend({
              rateLimit: 100,
              notifyWhenChangesStop: true
            });
          }
        }

        //Switched from arrayChange subscription to general subscription using 'refresh'.
        //Not sure performance is any better using 'select' and 'deselect'.
        if (allBindings.has('selectedOptions')) {
          var selectedOptions = allBindings.get('selectedOptions');
          if (ko.isObservable(selectedOptions)) {
            ko.computed({
              read: function read() {
                selectedOptions();
                setTimeout(function () {
                  $element.multiselect('refresh');
                }, 1);
              },
              disposeWhenNodeIsRemoved: element
            }).extend({
              rateLimit: 100,
              notifyWhenChangesStop: true
            });
          }
        }
        var setEnabled = function setEnabled(enable) {
          setTimeout(function () {
            if (enable) $element.multiselect('enable');else $element.multiselect('disable');
          });
        };
        if (allBindings.has('enable')) {
          var enable = allBindings.get('enable');
          if (ko.isObservable(enable)) {
            ko.computed({
              read: function read() {
                setEnabled(enable());
              },
              disposeWhenNodeIsRemoved: element
            }).extend({
              rateLimit: 100,
              notifyWhenChangesStop: true
            });
          } else {
            setEnabled(enable);
          }
        }
        if (allBindings.has('disable')) {
          var disable = allBindings.get('disable');
          if (ko.isObservable(disable)) {
            ko.computed({
              read: function read() {
                setEnabled(!disable());
              },
              disposeWhenNodeIsRemoved: element
            }).extend({
              rateLimit: 100,
              notifyWhenChangesStop: true
            });
          } else {
            setEnabled(!disable);
          }
        }
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
          $element.multiselect('destroy');
        });
      },
      update: function update(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var $element = $(element);
        var config = ko.toJS(valueAccessor());
        $element.multiselect('setOptions', config);
        $element.multiselect('rebuild');
      }
    };
  }
  function forEach(array, callback) {
    for (var index = 0; index < array.length; ++index) {
      callback(array[index], index);
    }
  }

  /**
   * Constructor to create a new multiselect using the given select.
   *
   * @param {jQuery} select
   * @param {Object} options
   * @returns {Multiselect}
   */
  function Multiselect(select, options) {
    this.$select = $(select);
    this.options = this.mergeOptions($.extend({}, options, this.$select.data()));

    // Placeholder via data attributes
    if (this.$select.attr("data-placeholder")) {
      this.options.nonSelectedText = this.$select.data("placeholder");
    }

    // Initialization.
    // We have to clone to create a new reference.
    this.originalOptions = this.$select.clone()[0].options;
    this.query = '';
    this.searchTimeout = null;
    this.lastToggledInput = null;
    this.options.multiple = this.$select.attr('multiple') === "multiple";
    this.options.onChange = $.proxy(this.options.onChange, this);
    this.options.onSelectAll = $.proxy(this.options.onSelectAll, this);
    this.options.onDeselectAll = $.proxy(this.options.onDeselectAll, this);
    this.options.onDropdownShow = $.proxy(this.options.onDropdownShow, this);
    this.options.onDropdownHide = $.proxy(this.options.onDropdownHide, this);
    this.options.onDropdownShown = $.proxy(this.options.onDropdownShown, this);
    this.options.onDropdownHidden = $.proxy(this.options.onDropdownHidden, this);
    this.options.onInitialized = $.proxy(this.options.onInitialized, this);
    this.options.onFiltering = $.proxy(this.options.onFiltering, this);

    // Build select all if enabled.
    this.buildContainer();
    this.buildButton();
    this.buildDropdown();
    this.buildReset();
    this.buildSelectAll();
    this.buildDropdownOptions();
    this.buildFilter();
    this.updateButtonText();
    this.updateSelectAll(true);
    if (this.options.enableClickableOptGroups && this.options.multiple) {
      this.updateOptGroups();
    }
    this.options.wasDisabled = this.$select.prop('disabled');
    if (this.options.disableIfEmpty && $('option', this.$select).length <= 0) {
      this.disable();
    }
    this.$select.wrap('<span class="multiselect-native-select" />').after(this.$container);
    this.options.onInitialized(this.$select, this.$container);
  }
  Multiselect.prototype = {
    defaults: {
      /**
       * Default text function will either print 'None selected' in case no
       * option is selected or a list of the selected options up to a length
       * of 3 selected options.
       *
       * @param {jQuery} options
       * @param {jQuery} select
       * @returns {String}
       */
      buttonText: function buttonText(options, select) {
        if (this.disabledText.length > 0 && (select.prop('disabled') || select.children().length === 0 && this.disableIfEmpty)) {
          return this.disabledText;
        } else if (options.length === 0) {
          return this.nonSelectedText;
        } else if (this.allSelectedText && options.length === $('option', $(select)).length && $('option', $(select)).length !== 1 && this.multiple) {
          if (this.selectAllNumber) {
            return this.allSelectedText + ' (' + options.length + ')';
          } else {
            return this.allSelectedText;
          }
        } else if (this.numberDisplayed != 0 && options.length > this.numberDisplayed) {
          return options.length + ' ' + this.nSelectedText;
        } else {
          var selected = '';
          var delimiter = this.delimiterText;
          options.each(function () {
            var label = $(this).attr('label') !== undefined ? $(this).attr('label') : $(this).text();
            selected += label + delimiter;
          });
          return selected.substr(0, selected.length - this.delimiterText.length);
        }
      },
      /**
       * Updates the title of the button similar to the buttonText function.
       *
       * @param {jQuery} options
       * @param {jQuery} select
       * @returns {@exp;selected@call;substr}
       */
      buttonTitle: function buttonTitle(options, select) {
        if (options.length === 0) {
          return this.nonSelectedText;
        } else {
          var selected = '';
          var delimiter = this.delimiterText;
          options.each(function () {
            var label = $(this).attr('label') !== undefined ? $(this).attr('label') : $(this).text();
            selected += label + delimiter;
          });
          return selected.substr(0, selected.length - this.delimiterText.length);
        }
      },
      checkboxName: function checkboxName(option) {
        return false; // no checkbox name
      },

      /**
       * Create a label.
       *
       * @param {jQuery} element
       * @returns {String}
       */
      optionLabel: function optionLabel(element) {
        return $(element).attr('label') || $(element).text();
      },
      /**
       * Create a class.
       *
       * @param {jQuery} element
       * @returns {String}
       */
      optionClass: function optionClass(element) {
        return $(element).attr('class') || '';
      },
      /**
       * Triggered on change of the multiselect.
       *
       * Not triggered when selecting/deselecting options manually.
       *
       * @param {jQuery} option
       * @param {Boolean} checked
       */
      onChange: function onChange(option, checked) {},
      /**
       * Triggered when the dropdown is shown.
       *
       * @param {jQuery} event
       */
      onDropdownShow: function onDropdownShow(event) {},
      /**
       * Triggered when the dropdown is hidden.
       *
       * @param {jQuery} event
       */
      onDropdownHide: function onDropdownHide(event) {},
      /**
       * Triggered after the dropdown is shown.
       *
       * @param {jQuery} event
       */
      onDropdownShown: function onDropdownShown(event) {},
      /**
       * Triggered after the dropdown is hidden.
       *
       * @param {jQuery} event
       */
      onDropdownHidden: function onDropdownHidden(event) {},
      /**
       * Triggered on select all.
       */
      onSelectAll: function onSelectAll() {},
      /**
       * Triggered on deselect all.
       */
      onDeselectAll: function onDeselectAll() {},
      /**
       * Triggered after initializing.
       *
       * @param {jQuery} $select
       * @param {jQuery} $container
       */
      onInitialized: function onInitialized($select, $container) {},
      /**
       * Triggered on filtering.
       *
       * @param {jQuery} $filter
       */
      onFiltering: function onFiltering($filter) {},
      enableHTML: false,
      buttonClass: 'btn btn-multiselect',
      inheritClass: false,
      buttonWidth: 'auto',
      buttonContainer: '<div class="btn-group" role="group" />',
      dropRight: false,
      dropUp: false,
      selectedClass: 'active',
      // Maximum height of the dropdown menu.
      // If maximum height is exceeded a scrollbar will be displayed.
      maxHeight: false,
      includeSelectAllOption: false,
      includeSelectAllIfMoreThan: 0,
      selectAllText: ' Todos',
      selectAllValue: 'multiselect-all',
      selectAllName: false,
      selectAllNumber: true,
      selectAllJustVisible: true,
      enableFiltering: false,
      enableCaseInsensitiveFiltering: false,
      enableFullValueFiltering: false,
      enableClickableOptGroups: false,
      enableCollapsibleOptGroups: false,
      collapseOptGroupsByDefault: false,
      filterPlaceholder: 'Search',
      // possible options: 'text', 'value', 'both'
      filterBehavior: 'text',
      includeFilterClearBtn: true,
      preventInputChangeEvent: false,
      nonSelectedText: 'Nenhum selecionado',
      nSelectedText: 'selecionados',
      allSelectedText: 'Todos selecionados',
      numberDisplayed: 1,
      disableIfEmpty: false,
      disabledText: '',
      delimiterText: ', ',
      includeResetOption: false,
      includeResetDivider: false,
      resetText: 'Resetar',
      templates: {
        button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span></button>',
        ul: '<ul class="multiselect-container dropdown-menu"></ul>',
        filter: '<li class="multiselect-item multiselect-filter"><div class="input-group mx-2 mb-2"><div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-search"></i></span></div><input class="form-control multiselect-search" type="text" /></div></li>',
        filterClearBtn: '<div class="input-group-append"><button class="btn btn-primary multiselect-clear-filter" type="button"><i class="fa fa-times-circle"></i></button></div>',
        li: '<li class="dropdown-item"><div class="form-check" tabindex="0"><label></label></div></li>',
        divider: '<li class="dropdown-item multiselect-item dropdown-divider"></li>',
        liGroup: '<li class="dropdown-item multiselect-item multiselect-group"><label></label></li>',
        resetButton: '<li class="multiselect-reset text-center"><div class="input-group"><a class="btn btn-primary btn-block"></a></div></li>'
      }
    },
    constructor: Multiselect,
    /**
     * Builds the container of the multiselect.
     */
    buildContainer: function buildContainer() {
      this.$container = $(this.options.buttonContainer);
      this.$container.on('show.bs.dropdown', this.options.onDropdownShow);
      this.$container.on('hide.bs.dropdown', this.options.onDropdownHide);
      this.$container.on('shown.bs.dropdown', this.options.onDropdownShown);
      this.$container.on('hidden.bs.dropdown', this.options.onDropdownHidden);
    },
    /**
     * Builds the button of the multiselect.
     */
    buildButton: function buildButton() {
      this.$button = $(this.options.templates.button).addClass(this.options.buttonClass);
      if (this.$select.attr('class') && this.options.inheritClass) {
        this.$button.addClass(this.$select.attr('class'));
      }
      // Adopt active state.
      if (this.$select.prop('disabled')) {
        this.disable();
      } else {
        this.enable();
      }

      // Manually add button width if set.
      if (this.options.buttonWidth && this.options.buttonWidth !== 'auto') {
        this.$button.css({
          'width': '100%',
          //this.options.buttonWidth,
          'overflow': 'hidden',
          'text-overflow': 'ellipsis'
        });
        this.$container.css({
          'width': this.options.buttonWidth
        });
      }

      // Keep the tab index from the select.
      var tabindex = this.$select.attr('tabindex');
      if (tabindex) {
        this.$button.attr('tabindex', tabindex);
      }
      this.$container.prepend(this.$button);
    },
    /**
     * Builds the ul representing the dropdown menu.
     */
    buildDropdown: function buildDropdown() {
      // Build ul.
      this.$ul = $(this.options.templates.ul);
      if (this.options.dropRight) {
        this.$ul.addClass('float-right');
      }

      // Set max height of dropdown menu to activate auto scrollbar.
      if (this.options.maxHeight) {
        // TODO: Add a class for this option to move the css declarations.
        this.$ul.css({
          'max-height': this.options.maxHeight + 'px',
          'overflow-y': 'auto',
          'overflow-x': 'hidden'
        });
      }
      if (this.options.dropUp) {
        var height = Math.min(this.options.maxHeight, $('option[data-role!="divider"]', this.$select).length * 26 + $('option[data-role="divider"]', this.$select).length * 19 + (this.options.includeSelectAllOption ? 26 : 0) + (this.options.enableFiltering || this.options.enableCaseInsensitiveFiltering ? 44 : 0));
        var moveCalc = height + 34;
        this.$ul.css({
          'max-height': height + 'px',
          'overflow-y': 'auto',
          'overflow-x': 'hidden',
          'margin-top': "-" + moveCalc + 'px'
        });
      }
      if (this.options.multiple) {
        // Prevent the dropdown from closing after each click
        this.$ul.on("click", function (e) {
          e.stopPropagation();
        });
      }
      this.$container.append(this.$ul);
    },
    /**
     * Build the dropdown options and binds all necessary events.
     *
     * Uses createDivider and createOptionValue to create the necessary options.
     */
    buildDropdownOptions: function buildDropdownOptions() {
      this.$select.children().each($.proxy(function (index, element) {
        var $element = $(element);
        // Support optgroups and options without a group simultaneously.
        var tag = $element.prop('tagName').toLowerCase();
        if ($element.prop('value') === this.options.selectAllValue) {
          return;
        }
        if (tag === 'optgroup') {
          this.createOptgroup(element);
        } else if (tag === 'option') {
          if ($element.data('role') === 'divider') {
            this.createDivider();
          } else {
            this.createOptionValue(element);
          }
        }

        // Other illegal tags will be ignored.
      }, this));

      // Bind the change event on the dropdown elements.
      $(this.$ul).off('change', 'li:not(.multiselect-group) input[type="checkbox"], li:not(.multiselect-group) input[type="radio"]');
      $(this.$ul).on('change', 'li:not(.multiselect-group) input[type="checkbox"], li:not(.multiselect-group) input[type="radio"]', $.proxy(function (event) {
        var $target = $(event.target);
        var checked = $target.prop('checked') || false;
        var isSelectAllOption = $target.val() === this.options.selectAllValue;

        // Apply or unapply the configured selected class.
        if (this.options.selectedClass) {
          if (checked) {
            $target.closest('li').addClass(this.options.selectedClass);
          } else {
            $target.closest('li').removeClass(this.options.selectedClass);
          }
        }

        // Get the corresponding option.
        var value = $target.val();
        var $option = this.getOptionByValue(value);
        var $optionsNotThis = $('option', this.$select).not($option);
        var $checkboxesNotThis = $('input', this.$container).not($target);
        if (isSelectAllOption) {
          if (checked) {
            this.selectAll(this.options.selectAllJustVisible, true);
          } else {
            this.deselectAll(this.options.selectAllJustVisible, true);
          }
        } else {
          if (checked) {
            $option.prop('selected', true);
            if (this.options.multiple) {
              // Simply select additional option.
              $option.prop('selected', true);
            } else {
              // Unselect all other options and corresponding checkboxes.
              if (this.options.selectedClass) {
                $($checkboxesNotThis).closest('li').removeClass(this.options.selectedClass);
              }
              $($checkboxesNotThis).prop('checked', false);
              $optionsNotThis.prop('selected', false);
            }
            if (this.options.selectedClass === "active") {
              $optionsNotThis.closest("a").css("outline", "");
            }
          } else {
            // Unselect option.
            $option.prop('selected', false);
          }

          // To prevent select all from firing onChange: #575
          this.options.onChange($option, checked);

          // Do not update select all or optgroups on select all change!
          this.updateSelectAll();
          if (this.options.enableClickableOptGroups && this.options.multiple) {
            this.updateOptGroups();
          }
        }
        this.$select.change();
        this.updateButtonText();
        if (this.options.preventInputChangeEvent) {
          return false;
        }
      }, this));
      $('li a', this.$ul).on('mousedown', function (e) {
        if (e.shiftKey) {
          // Prevent selecting text by Shift+click
          return false;
        }
      });
      $(this.$ul).on('touchstart click', 'li a', $.proxy(function (event) {
        event.stopPropagation();
        var $target = $(event.target);
        if (event.shiftKey && this.options.multiple) {
          if ($target.is("label")) {
            // Handles checkbox selection manually (see https://github.com/davidstutz/bootstrap-multiselect/issues/431)
            event.preventDefault();
            $target = $target.find("input");
            $target.prop("checked", !$target.prop("checked"));
          }
          var checked = $target.prop('checked') || false;
          if (this.lastToggledInput !== null && this.lastToggledInput !== $target) {
            // Make sure we actually have a range
            var from = this.$ul.find("li:visible").index($target.parents("li"));
            var to = this.$ul.find("li:visible").index(this.lastToggledInput.parents("li"));
            if (from > to) {
              // Swap the indices
              var tmp = to;
              to = from;
              from = tmp;
            }

            // Make sure we grab all elements since slice excludes the last index
            ++to;

            // Change the checkboxes and underlying options
            var range = this.$ul.find("li").not(".multiselect-filter-hidden").slice(from, to).find("input");
            range.prop('checked', checked);
            if (this.options.selectedClass) {
              range.closest('li').toggleClass(this.options.selectedClass, checked);
            }
            for (var i = 0, j = range.length; i < j; i++) {
              var $checkbox = $(range[i]);
              var $option = this.getOptionByValue($checkbox.val());
              $option.prop('selected', checked);
            }
          }

          // Trigger the select "change" event
          $target.trigger("change");
        }

        // Remembers last clicked option
        if ($target.is("input") && !$target.closest("li").is(".multiselect-item")) {
          this.lastToggledInput = $target;
        }
        $target.blur();
      }, this));

      // Keyboard support.
      this.$container.off('keydown.multiselect').on('keydown.multiselect', $.proxy(function (event) {
        if ($('input[type="text"]', this.$container).is(':focus')) {
          return;
        }
        if (event.keyCode === 9 && this.$container.hasClass('open')) {
          this.$button.click();
        } else {
          var $items = $(this.$container).find("li:not(.divider):not(.disabled) a").filter(":visible");
          if (!$items.length) {
            return;
          }
          var index = $items.index($items.filter(':focus'));

          // Navigation up.
          if (event.keyCode === 38 && index > 0) {
            index--;
          }
          // Navigate down.
          else if (event.keyCode === 40 && index < $items.length - 1) {
            index++;
          } else if (!~index) {
            index = 0;
          }
          var $current = $items.eq(index);
          $current.focus();
          if (event.keyCode === 32 || event.keyCode === 13) {
            var $checkbox = $current.find('input');
            $checkbox.prop("checked", !$checkbox.prop("checked"));
            $checkbox.change();
          }
          event.stopPropagation();
          event.preventDefault();
        }
      }, this));
      if (this.options.enableClickableOptGroups && this.options.multiple) {
        $("li.multiselect-group input", this.$ul).on("change", $.proxy(function (event) {
          event.stopPropagation();
          var $target = $(event.target);
          var checked = $target.prop('checked') || false;
          var $li = $(event.target).closest('li');
          var $group = $li.nextUntil("li.multiselect-group").not('.multiselect-filter-hidden').not('.disabled');
          var $inputs = $group.find("input");
          var values = [];
          var $options = [];
          if (this.options.selectedClass) {
            if (checked) {
              $li.addClass(this.options.selectedClass);
            } else {
              $li.removeClass(this.options.selectedClass);
            }
          }
          $.each($inputs, $.proxy(function (index, input) {
            var value = $(input).val();
            var $option = this.getOptionByValue(value);
            if (checked) {
              $(input).prop('checked', true);
              $(input).closest('li').addClass(this.options.selectedClass);
              $option.prop('selected', true);
            } else {
              $(input).prop('checked', false);
              $(input).closest('li').removeClass(this.options.selectedClass);
              $option.prop('selected', false);
            }
            $options.push(this.getOptionByValue(value));
          }, this));

          // Cannot use select or deselect here because it would call updateOptGroups again.

          this.options.onChange($options, checked);
          this.$select.change();
          this.updateButtonText();
          this.updateSelectAll();
        }, this));
      }
      if (this.options.enableCollapsibleOptGroups && this.options.multiple) {
        $("li.multiselect-group .caret-container", this.$ul).on("click", $.proxy(function (event) {
          var $li = $(event.target).closest('li');
          var $inputs = $li.nextUntil("li.multiselect-group").not('.multiselect-filter-hidden');
          var visible = true;
          $inputs.each(function () {
            visible = visible && !$(this).hasClass('multiselect-collapsible-hidden');
          });
          if (visible) {
            $inputs.attr('hidden', true).addClass('multiselect-collapsible-hidden');
          } else {
            $inputs.removeAttr('hidden').removeClass('multiselect-collapsible-hidden');
          }
        }, this));
      }
    },
    /**
     * Create an option using the given select option.
     *
     * @param {jQuery} element
     */
    createOptionValue: function createOptionValue(element) {
      var $element = $(element);
      if ($element.is(':selected')) {
        $element.prop('selected', true);
      }

      // Support the label attribute on options.
      var label = this.options.optionLabel(element);
      var classes = this.options.optionClass(element);
      var value = $element.val();
      var inputType = this.options.multiple ? "checkbox" : "radio";

      // Generate a random number between 0 and MAX_SAFE_INTEGER to use as a highly unique ID
      var randomNum = Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));

      // This element ID is required for the label and checkbox so that Bootstrap 4 will select the option when the label is clicked
      // Ex: "bootstrap-multiselect-option-7-2193414947069541"
      var optionComponentId = "bootstrap-multiselect-option-" + value + "-" + randomNum;
      var $li = $(this.options.templates.li);
      var $label = $('label', $li);
      var $div = $('div', $li);
      $label.addClass(inputType);
      $label.addClass("form-check-label");
      $label.attr("title", label);
      $label.attr("for", optionComponentId);
      $li.addClass(classes);

      // Hide all children items when collapseOptGroupsByDefault is true
      if (this.options.collapseOptGroupsByDefault && $(element).parent().prop("tagName").toLowerCase() === "optgroup") {
        $li.addClass("multiselect-collapsible-hidden");
        $li.attr('hidden', true);
      }
      if (this.options.enableHTML) {
        $label.html(" " + label);
      } else {
        $label.text(" " + label);
      }
      var $checkbox = $('<input/>').attr('type', inputType);
      $checkbox.attr('id', optionComponentId);
      $checkbox.addClass('form-check-input');
      var name = this.options.checkboxName($element);
      if (name) {
        $checkbox.attr('name', name);
      }
      $div.prepend($checkbox);
      var selected = $element.prop('selected') || false;
      $checkbox.val(value);
      if (value === this.options.selectAllValue) {
        $li.addClass("multiselect-item multiselect-all");
        $checkbox.parent().parent().parent().addClass('multiselect-all');
      }
      $label.attr('title', $element.attr('title'));
      this.$ul.append($li);
      if ($element.is(':disabled')) {
        $checkbox.attr('disabled', 'disabled').prop('disabled', true).closest('a').attr("tabindex", "-1").closest('li').addClass('disabled');
      }
      $checkbox.prop('checked', selected);
      if (selected && this.options.selectedClass) {
        $checkbox.closest('li').addClass(this.options.selectedClass);
      }
    },
    /**
     * Creates a divider using the given select option.
     *
     * @param {jQuery} element
     */
    createDivider: function createDivider(element) {
      var $divider = $(this.options.templates.divider);
      this.$ul.append($divider);
    },
    /**
     * Creates an optgroup.
     *
     * @param {jQuery} group
     */
    createOptgroup: function createOptgroup(group) {
      var label = $(group).attr("label");
      var value = $(group).attr("value");
      var $li = $('<li class="multiselect-item multiselect-group"><a href="javascript:void(0);"><label class="mb-0"><b></b></label></a></li>');
      var classes = this.options.optionClass(group);
      $li.addClass(classes);
      if (this.options.enableHTML) {
        $('label b', $li).html(" " + label);
      } else {
        $('label b', $li).text(" " + label);
      }
      if (this.options.enableCollapsibleOptGroups && this.options.multiple) {
        $('a', $li).append('<span class="caret-container ml-3"><i class="fas fa-angle-down"></i></span>');
      }
      if (this.options.enableClickableOptGroups && this.options.multiple) {
        $('a label', $li).prepend('<input type="checkbox" value="' + value + '"/>');
      }
      if ($(group).is(':disabled')) {
        $li.addClass('disabled');
      }
      this.$ul.append($li);
      $("option", group).each($.proxy(function ($, group) {
        this.createOptionValue(group);
      }, this));
    },
    /**
     * Build the reset.
     *
     */
    buildReset: function buildReset() {
      if (this.options.includeResetOption) {
        // Check whether to add a divider after the reset.
        if (this.options.includeResetDivider) {
          this.$ul.prepend($(this.options.templates.divider));
        }
        var $resetButton = $(this.options.templates.resetButton);
        if (this.options.enableHTML) {
          $('a', $resetButton).html(this.options.resetText);
        } else {
          $('a', $resetButton).text(this.options.resetText);
        }
        $('a', $resetButton).click($.proxy(function () {
          this.clearSelection();
        }, this));
        this.$ul.prepend($resetButton);
      }
    },
    /**
     * Build the select all.
     *
     * Checks if a select all has already been created.
     */
    buildSelectAll: function buildSelectAll() {
      if (typeof this.options.selectAllValue === 'number') {
        this.options.selectAllValue = this.options.selectAllValue.toString();
      }
      var alreadyHasSelectAll = this.hasSelectAll();
      if (!alreadyHasSelectAll && this.options.includeSelectAllOption && this.options.multiple && $('option', this.$select).length > this.options.includeSelectAllIfMoreThan) {
        // Check whether to add a divider after the select all.
        if (this.options.includeSelectAllDivider) {
          this.$ul.prepend($(this.options.templates.divider));
        }
        var $li = $(this.options.templates.li);
        $('label', $li).addClass("checkbox");
        if (this.options.enableHTML) {
          $('label', $li).html(" " + this.options.selectAllText);
        } else {
          $('label', $li).text(" " + this.options.selectAllText);
        }
        if (this.options.selectAllName) {
          $('label', $li).prepend('<input type="checkbox" name="' + this.options.selectAllName + '" />');
        } else {
          $('label', $li).prepend('<input type="checkbox" />');
        }
        var $checkbox = $('input', $li);
        $checkbox.val(this.options.selectAllValue);
        $li.addClass("multiselect-item multiselect-all");
        $checkbox.parent().parent().parent().addClass('multiselect-all');
        this.$ul.prepend($li);
        $checkbox.prop('checked', false);
      }
    },
    /**
     * Builds the filter.
     */
    buildFilter: function buildFilter() {
      // Build filter if filtering OR case insensitive filtering is enabled and the number of options exceeds (or equals) enableFilterLength.
      if (this.options.enableFiltering || this.options.enableCaseInsensitiveFiltering) {
        var enableFilterLength = Math.max(this.options.enableFiltering, this.options.enableCaseInsensitiveFiltering);
        if (this.$select.find('option').length >= enableFilterLength) {
          this.$filter = $(this.options.templates.filter);
          $('input', this.$filter).attr('placeholder', this.options.filterPlaceholder);

          // Adds optional filter clear button
          if (this.options.includeFilterClearBtn) {
            var clearBtn = $(this.options.templates.filterClearBtn);
            clearBtn.on('click', $.proxy(function (event) {
              clearTimeout(this.searchTimeout);
              this.query = '';
              this.$filter.find('.multiselect-search').val('');
              $('li', this.$ul).removeAttr('hidden').removeClass('multiselect-filter-hidden');
              this.updateSelectAll();
              if (this.options.enableClickableOptGroups && this.options.multiple) {
                this.updateOptGroups();
              }
            }, this));
            this.$filter.find('.input-group').append(clearBtn);
          }
          this.$ul.prepend(this.$filter);
          this.$filter.val(this.query).on('click', function (event) {
            event.stopPropagation();
          }).on('input keydown', $.proxy(function (event) {
            // Cancel enter key default behaviour
            if (event.which === 13) {
              event.preventDefault();
            }

            // This is useful to catch "keydown" events after the browser has updated the control.
            clearTimeout(this.searchTimeout);
            this.searchTimeout = this.asyncFunction($.proxy(function () {
              if (this.query !== event.target.value) {
                this.query = event.target.value;
                var currentGroup, currentGroupVisible;
                $.each($('li', this.$ul), $.proxy(function (index, element) {
                  var value = $('input', element).length > 0 ? $('input', element).val() : "";
                  var text = $('label', element).text();
                  var filterCandidate = '';
                  if (this.options.filterBehavior === 'text') {
                    filterCandidate = text;
                  } else if (this.options.filterBehavior === 'value') {
                    filterCandidate = value;
                  } else if (this.options.filterBehavior === 'both') {
                    filterCandidate = text + '\n' + value;
                  }
                  if (value !== this.options.selectAllValue && text) {
                    // By default lets assume that element is not
                    // interesting for this search.
                    var showElement = false;
                    if (this.options.enableCaseInsensitiveFiltering) {
                      filterCandidate = filterCandidate.toLowerCase();
                      this.query = this.query.toLowerCase();
                    }
                    if (this.options.enableFullValueFiltering && this.options.filterBehavior !== 'both') {
                      var valueToMatch = filterCandidate.trim().substring(0, this.query.length);
                      if (this.query.indexOf(valueToMatch) > -1) {
                        showElement = true;
                      }
                    } else if (filterCandidate.indexOf(this.query) > -1) {
                      showElement = true;
                    }

                    // Toggle current element (group or group item) according to showElement boolean.
                    if (!showElement) {
                      $(element).attr('hidden', true);
                      $(element).addClass('multiselect-filter-hidden');
                    }
                    if (showElement) {
                      $(element).removeAttr('hidden');
                      $(element).removeClass('multiselect-filter-hidden');
                    }

                    // Differentiate groups and group items.
                    if ($(element).hasClass('multiselect-group')) {
                      // Remember group status.
                      currentGroup = element;
                      currentGroupVisible = showElement;
                    } else {
                      // Show group name when at least one of its items is visible.
                      if (showElement) {
                        $(currentGroup).removeAttr('hidden').removeClass('multiselect-filter-hidden');
                      }

                      // Show all group items when group name satisfies filter.
                      if (!showElement && currentGroupVisible) {
                        $(element).removeAttr('hidden').removeClass('multiselect-filter-hidden');
                      }
                    }
                  }
                }, this));
              }
              this.updateSelectAll();
              if (this.options.enableClickableOptGroups && this.options.multiple) {
                this.updateOptGroups();
              }
              this.options.onFiltering(event.target);
            }, this), 300, this);
          }, this));
        }
      }
    },
    /**
     * Unbinds the whole plugin.
     */
    destroy: function destroy() {
      this.$container.remove();
      this.$select.removeAttr('hidden');

      // reset original state
      this.$select.prop('disabled', this.options.wasDisabled);
      this.$select.data('multiselect', null);
    },
    /**
     * Refreshs the multiselect based on the selected options of the select.
     */
    refresh: function refresh() {
      var inputs = {};
      $('li input', this.$ul).each(function () {
        inputs[$(this).val()] = $(this);
      });
      $('option', this.$select).each($.proxy(function (index, element) {
        var $elem = $(element);
        var $input = inputs[$(element).val()];
        if ($elem.is(':selected')) {
          $input.prop('checked', true);
          if (this.options.selectedClass) {
            $input.closest('li').addClass(this.options.selectedClass);
          }
        } else {
          $input.prop('checked', false);
          if (this.options.selectedClass) {
            $input.closest('li').removeClass(this.options.selectedClass);
          }
        }
        if ($elem.is(":disabled")) {
          $input.attr('disabled', 'disabled').prop('disabled', true).closest('li').addClass('disabled');
        } else {
          $input.prop('disabled', false).closest('li').removeClass('disabled');
        }
      }, this));
      this.updateButtonText();
      this.updateSelectAll();
      if (this.options.enableClickableOptGroups && this.options.multiple) {
        this.updateOptGroups();
      }
    },
    /**
     * Select all options of the given values.
     *
     * If triggerOnChange is set to true, the on change event is triggered if
     * and only if one value is passed.
     *
     * @param {Array} selectValues
     * @param {Boolean} triggerOnChange
     */
    select: function select(selectValues, triggerOnChange) {
      if (!$.isArray(selectValues)) {
        selectValues = [selectValues];
      }
      for (var i = 0; i < selectValues.length; i++) {
        var value = selectValues[i];
        if (value === null || value === undefined) {
          continue;
        }
        var $option = this.getOptionByValue(value);
        var $checkbox = this.getInputByValue(value);
        if ($option === undefined || $checkbox === undefined) {
          continue;
        }
        if (!this.options.multiple) {
          this.deselectAll(false);
        }
        if (this.options.selectedClass) {
          $checkbox.closest('li').addClass(this.options.selectedClass);
        }
        $checkbox.prop('checked', true);
        $option.prop('selected', true);
        if (triggerOnChange) {
          this.options.onChange($option, true);
        }
      }
      this.updateButtonText();
      this.updateSelectAll();
      if (this.options.enableClickableOptGroups && this.options.multiple) {
        this.updateOptGroups();
      }
    },
    /**
     * Clears all selected items.
     */
    clearSelection: function clearSelection() {
      this.deselectAll(false);
      this.updateButtonText();
      this.updateSelectAll();
      if (this.options.enableClickableOptGroups && this.options.multiple) {
        this.updateOptGroups();
      }
    },
    /**
     * Deselects all options of the given values.
     *
     * If triggerOnChange is set to true, the on change event is triggered, if
     * and only if one value is passed.
     *
     * @param {Array} deselectValues
     * @param {Boolean} triggerOnChange
     */
    deselect: function deselect(deselectValues, triggerOnChange) {
      if (!$.isArray(deselectValues)) {
        deselectValues = [deselectValues];
      }
      for (var i = 0; i < deselectValues.length; i++) {
        var value = deselectValues[i];
        if (value === null || value === undefined) {
          continue;
        }
        var $option = this.getOptionByValue(value);
        var $checkbox = this.getInputByValue(value);
        if ($option === undefined || $checkbox === undefined) {
          continue;
        }
        if (this.options.selectedClass) {
          $checkbox.closest('li').removeClass(this.options.selectedClass);
        }
        $checkbox.prop('checked', false);
        $option.prop('selected', false);
        if (triggerOnChange) {
          this.options.onChange($option, false);
        }
      }
      this.updateButtonText();
      this.updateSelectAll();
      if (this.options.enableClickableOptGroups && this.options.multiple) {
        this.updateOptGroups();
      }
    },
    /**
     * Selects all enabled & visible options.
     *
     * If justVisible is true or not specified, only visible options are selected.
     *
     * @param {Boolean} justVisible
     * @param {Boolean} triggerOnSelectAll
     */
    selectAll: function selectAll(justVisible, triggerOnSelectAll) {
      var justVisible = typeof justVisible === 'undefined' ? true : justVisible;
      var allLis = $("li:not(.divider):not(.disabled):not(.multiselect-group)", this.$ul);
      var visibleLis = $("li:not(.divider):not(.disabled):not(.multiselect-group):not(.multiselect-filter-hidden):not(.multiselect-collapsible-hidden)", this.$ul).filter(':visible');
      if (justVisible) {
        $('input:enabled', visibleLis).prop('checked', true);
        visibleLis.addClass(this.options.selectedClass);
        $('input:enabled', visibleLis).each($.proxy(function (index, element) {
          var value = $(element).val();
          var option = this.getOptionByValue(value);
          $(option).prop('selected', true);
        }, this));
      } else {
        $('input:enabled', allLis).prop('checked', true);
        allLis.addClass(this.options.selectedClass);
        $('input:enabled', allLis).each($.proxy(function (index, element) {
          var value = $(element).val();
          var option = this.getOptionByValue(value);
          $(option).prop('selected', true);
        }, this));
      }
      $('li input[value="' + this.options.selectAllValue + '"]', this.$ul).prop('checked', true);
      if (this.options.enableClickableOptGroups && this.options.multiple) {
        this.updateOptGroups();
      }
      if (triggerOnSelectAll) {
        this.options.onSelectAll();
      }
    },
    /**
     * Deselects all options.
     *
     * If justVisible is true or not specified, only visible options are deselected.
     *
     * @param {Boolean} justVisible
     */
    deselectAll: function deselectAll(justVisible, triggerOnDeselectAll) {
      var justVisible = typeof justVisible === 'undefined' ? true : justVisible;
      var allLis = $("li:not(.divider):not(.disabled):not(.multiselect-group)", this.$ul);
      var visibleLis = $("li:not(.divider):not(.disabled):not(.multiselect-group):not(.multiselect-filter-hidden):not(.multiselect-collapsible-hidden)", this.$ul).filter(':visible');
      if (justVisible) {
        $('input[type="checkbox"]:enabled', visibleLis).prop('checked', false);
        visibleLis.removeClass(this.options.selectedClass);
        $('input[type="checkbox"]:enabled', visibleLis).each($.proxy(function (index, element) {
          var value = $(element).val();
          var option = this.getOptionByValue(value);
          $(option).prop('selected', false);
        }, this));
      } else {
        $('input[type="checkbox"]:enabled', allLis).prop('checked', false);
        allLis.removeClass(this.options.selectedClass);
        $('input[type="checkbox"]:enabled', allLis).each($.proxy(function (index, element) {
          var value = $(element).val();
          var option = this.getOptionByValue(value);
          $(option).prop('selected', false);
        }, this));
      }
      $('li input[value="' + this.options.selectAllValue + '"]', this.$ul).prop('checked', false);
      if (this.options.enableClickableOptGroups && this.options.multiple) {
        this.updateOptGroups();
      }
      if (triggerOnDeselectAll) {
        this.options.onDeselectAll();
      }
    },
    /**
     * Rebuild the plugin.
     *
     * Rebuilds the dropdown, the filter and the select all option.
     */
    rebuild: function rebuild() {
      this.$ul.html('');

      // Important to distinguish between radios and checkboxes.
      this.options.multiple = this.$select.attr('multiple') === "multiple";
      this.buildSelectAll();
      this.buildDropdownOptions();
      this.buildFilter();
      this.updateButtonText();
      this.updateSelectAll(true);
      if (this.options.enableClickableOptGroups && this.options.multiple) {
        this.updateOptGroups();
      }
      if (this.options.disableIfEmpty && $('option', this.$select).length <= 0) {
        this.disable();
      } else {
        this.enable();
      }
      if (this.options.dropRight) {
        this.$ul.addClass('pull-right');
      }
    },
    /**
     * The provided data will be used to build the dropdown.
     */
    dataprovider: function dataprovider(_dataprovider) {
      var groupCounter = 0;
      var $select = this.$select.empty();
      $.each(_dataprovider, function (index, option) {
        var $tag;
        if ($.isArray(option.children)) {
          // create optiongroup tag
          groupCounter++;
          $tag = $('<optgroup/>').attr({
            label: option.label || 'Group ' + groupCounter,
            disabled: !!option.disabled,
            value: option.value
          });
          forEach(option.children, function (subOption) {
            // add children option tags
            var attributes = {
              value: subOption.value,
              label: subOption.label || subOption.value,
              title: subOption.title,
              selected: !!subOption.selected,
              disabled: !!subOption.disabled
            };

            //Loop through attributes object and add key-value for each attribute
            for (var key in subOption.attributes) {
              attributes['data-' + key] = subOption.attributes[key];
            }
            //Append original attributes + new data attributes to option
            $tag.append($('<option/>').attr(attributes));
          });
        } else {
          var attributes = {
            'value': option.value,
            'label': option.label || option.value,
            'title': option.title,
            'class': option['class'],
            'selected': !!option['selected'],
            'disabled': !!option['disabled']
          };
          //Loop through attributes object and add key-value for each attribute
          for (var key in option.attributes) {
            attributes['data-' + key] = option.attributes[key];
          }
          //Append original attributes + new data attributes to option
          $tag = $('<option/>').attr(attributes);
          $tag.text(option.label || option.value);
        }
        $select.append($tag);
      });
      this.rebuild();
    },
    /**
     * Enable the multiselect.
     */
    enable: function enable() {
      this.$select.prop('disabled', false);
      this.$button.prop('disabled', false).removeClass('disabled');
    },
    /**
     * Disable the multiselect.
     */
    disable: function disable() {
      this.$select.prop('disabled', true);
      this.$button.prop('disabled', true).addClass('disabled');
    },
    /**
     * Set the options.
     *
     * @param {Array} options
     */
    setOptions: function setOptions(options) {
      this.options = this.mergeOptions(options);
    },
    /**
     * Merges the given options with the default options.
     *
     * @param {Array} options
     * @returns {Array}
     */
    mergeOptions: function mergeOptions(options) {
      return $.extend(true, {}, this.defaults, this.options, options);
    },
    /**
     * Checks whether a select all checkbox is present.
     *
     * @returns {Boolean}
     */
    hasSelectAll: function hasSelectAll() {
      return $('li.multiselect-all', this.$ul).length > 0;
    },
    /**
     * Update opt groups.
     */
    updateOptGroups: function updateOptGroups() {
      var $groups = $('li.multiselect-group', this.$ul);
      var selectedClass = this.options.selectedClass;
      $groups.each(function () {
        var $options = $(this).nextUntil('li.multiselect-group').not('.multiselect-filter-hidden').not('.disabled');
        var checked = true;
        $options.each(function () {
          var $input = $('input', this);
          if (!$input.prop('checked')) {
            checked = false;
          }
        });
        if (selectedClass) {
          if (checked) {
            $(this).addClass(selectedClass);
          } else {
            $(this).removeClass(selectedClass);
          }
        }
        $('input', this).prop('checked', checked);
      });
    },
    /**
     * Updates the select all checkbox based on the currently displayed and selected checkboxes.
     */
    updateSelectAll: function updateSelectAll(notTriggerOnSelectAll) {
      if (this.hasSelectAll()) {
        var allBoxes = $("li:not(.multiselect-item):not(.multiselect-filter-hidden):not(.multiselect-group):not(.disabled) input:enabled", this.$ul);
        var allBoxesLength = allBoxes.length;
        var checkedBoxesLength = allBoxes.filter(":checked").length;
        var selectAllLi = $("li.multiselect-all", this.$ul);
        var selectAllInput = selectAllLi.find("input");
        if (checkedBoxesLength > 0 && checkedBoxesLength === allBoxesLength) {
          selectAllInput.prop("checked", true);
          selectAllLi.addClass(this.options.selectedClass);
        } else {
          selectAllInput.prop("checked", false);
          selectAllLi.removeClass(this.options.selectedClass);
        }
      }
    },
    /**
     * Update the button text and its title based on the currently selected options.
     */
    updateButtonText: function updateButtonText() {
      var options = this.getSelected();

      // First update the displayed button text.
      if (this.options.enableHTML) {
        $('.multiselect .multiselect-selected-text', this.$container).html(this.options.buttonText(options, this.$select));
      } else {
        $('.multiselect .multiselect-selected-text', this.$container).text(this.options.buttonText(options, this.$select));
      }

      // Now update the title attribute of the button.
      $('.multiselect', this.$container).attr('title', this.options.buttonTitle(options, this.$select));
    },
    /**
     * Get all selected options.
     *
     * @returns {jQUery}
     */
    getSelected: function getSelected() {
      return $('option', this.$select).filter(":selected");
    },
    /**
     * Gets a select option by its value.
     *
     * @param {String} value
     * @returns {jQuery}
     */
    getOptionByValue: function getOptionByValue(value) {
      var options = $('option', this.$select);
      var valueToCompare = value.toString();
      for (var i = 0; i < options.length; i = i + 1) {
        var option = options[i];
        if (option.value === valueToCompare) {
          return $(option);
        }
      }
    },
    /**
     * Get the input (radio/checkbox) by its value.
     *
     * @param {String} value
     * @returns {jQuery}
     */
    getInputByValue: function getInputByValue(value) {
      var checkboxes = $('li input:not(.multiselect-search)', this.$ul);
      var valueToCompare = value.toString();
      for (var i = 0; i < checkboxes.length; i = i + 1) {
        var checkbox = checkboxes[i];
        if (checkbox.value === valueToCompare) {
          return $(checkbox);
        }
      }
    },
    /**
     * Used for knockout integration.
     */
    updateOriginalOptions: function updateOriginalOptions() {
      this.originalOptions = this.$select.clone()[0].options;
    },
    asyncFunction: function asyncFunction(callback, timeout, self) {
      var args = Array.prototype.slice.call(arguments, 3);
      return setTimeout(function () {
        callback.apply(self || window, args);
      }, timeout);
    },
    setAllSelectedText: function setAllSelectedText(allSelectedText) {
      this.options.allSelectedText = allSelectedText;
      this.updateButtonText();
    }
  };
  $.fn.multiselect = function (option, parameter, extraOptions) {
    return this.each(function () {
      var data = $(this).data('multiselect');
      var options = _typeof(option) === 'object' && option;

      // Initialize the multiselect.
      if (!data) {
        data = new Multiselect(this, options);
        $(this).data('multiselect', data);
      }

      // Call multiselect method.
      if (typeof option === 'string') {
        data[option](parameter, extraOptions);
        if (option === 'destroy') {
          $(this).data('multiselect', false);
        }
      }
    });
  };
  $.fn.multiselect.Constructor = Multiselect;
  $(function () {
    $("select[data-role=multiselect]").multiselect();
  });
});

/***/ }),

/***/ "./src/js/components/showHidePanel.js":
/*!********************************************!*\
  !*** ./src/js/components/showHidePanel.js ***!
  \********************************************/
/***/ (() => {

(function ($) {
  var $panels = document.querySelectorAll("div[data-show-rules-panel]");
  if (!$panels.length) return;
  $panels.forEach(function ($panel) {
    var rules = JSON.parse($panel.getAttribute("data-show-rules-panel"));
    Object.keys(rules).forEach(function (key) {
      var $shoter = document.querySelector("[name=".concat(key, "]"));
      $shoter && $shoter.addEventListener("change", function (_ref) {
        var target = _ref.target;
        if (target.value === String(rules[key])) {
          return $($panel).show();
        }
        $($panel).hide();
      });
    });
  });
})(jQuery);

/***/ }),

/***/ "./src/js/customs/jqueryExtends.js":
/*!*****************************************!*\
  !*** ./src/js/customs/jqueryExtends.js ***!
  \*****************************************/
/***/ (() => {

(function ($) {
  $.extend(jQuery.validator.messages, {
    required: "Este campo é obrigatório.",
    remote: "Por favor, corrija este campo.",
    email: "Por favor, forneça um endereço de email válido",
    url: "Por favor, forneça uma URL válida.",
    date: "Por favor, forneça uma data válida.",
    dateISO: "Por favor, forneça uma data válida (ISO).",
    number: "Por favor, forneça um número válido.",
    digits: "Por favor, forneça somente dígitos.",
    creditcard: "Por favor, forneça um cartão de crédito válido.",
    equalTo: "Por favor, forneça o mesmo valor novamente.",
    accept: "Por favor, forneça um valor com uma extensão válida.",
    maxlength: jQuery.validator.format("Por favor, forneça menos que {0} caracteres."),
    minlength: jQuery.validator.format("Por favor, forneça pelo menos {0} caracteres."),
    rangelength: jQuery.validator.format("Por favor, forneça um valor entre {0} e {1} caracteres de comprimento."),
    range: jQuery.validator.format("Por favor, forneça um valor entre {0} e {1}."),
    max: jQuery.validator.format("Por favor, forneça um valor menor ou igual a {0}."),
    min: jQuery.validator.format("Por favor, forneça um valor maior ou igual a {0}.")
  });

  // $.extend($.summernote.lang, {
  //   "pt-BR": {
  //     font: {
  //       bold: "Negrito",
  //       italic: "Itálico",
  //       underline: "Sublinhado",
  //       clear: "Remover estilo da fonte",
  //       height: "Altura da linha",
  //       name: "Fonte",
  //       strikethrough: "Riscado",
  //       subscript: "Subscrito",
  //       superscript: "Sobrescrito",
  //       size: "Tamanho da fonte",
  //     },
  //     image: {
  //       image: "Imagem",
  //       insert: "Inserir imagem",
  //       resizeFull: "Redimensionar Completamente",
  //       resizeHalf: "Redimensionar pela Metade",
  //       resizeQuarter: "Redimensionar a um Quarto",
  //       floatLeft: "Flutuar para Esquerda",
  //       floatRight: "Flutuar para Direita",
  //       floatNone: "Não Flutuar",
  //       shapeRounded: "Forma: Arredondado",
  //       shapeCircle: "Forma: Círculo",
  //       shapeThumbnail: "Forma: Miniatura",
  //       shapeNone: "Forma: Nenhum",
  //       dragImageHere: "Arraste Imagem ou Texto para cá",
  //       dropImage: "Solte Imagem ou Texto",
  //       selectFromFiles: "Selecione a partir dos arquivos",
  //       maximumFileSize: "Tamanho máximo do arquivo",
  //       maximumFileSizeError: "Tamanho máximo do arquivo excedido.",
  //       url: "URL da imagem",
  //       remove: "Remover Imagem",
  //       original: "Original",
  //     },
  //     video: {
  //       video: "Vídeo",
  //       videoLink: "Link para vídeo",
  //       insert: "Inserir vídeo",
  //       url: "URL do vídeo?",
  //       providers: "(YouTube, Vimeo, Vine, Instagram, DailyMotion ou Youku)",
  //     },
  //     link: {
  //       link: "Link",
  //       insert: "Inserir link",
  //       unlink: "Remover link",
  //       edit: "Editar",
  //       textToDisplay: "Texto para exibir",
  //       url: "Para qual URL este link leva?",
  //       openInNewWindow: "Abrir em uma nova janela",
  //     },
  //     table: {
  //       table: "Tabela",
  //       addRowAbove: "Adicionar linha acima",
  //       addRowBelow: "Adicionar linha abaixo",
  //       addColLeft: "Adicionar coluna à esquerda",
  //       addColRight: "Adicionar coluna à direita",
  //       delRow: "Excluir linha",
  //       delCol: "Excluir coluna",
  //       delTable: "Excluir tabela",
  //     },
  //     hr: {
  //       insert: "Linha horizontal",
  //     },
  //     style: {
  //       style: "Estilo",
  //       p: "Normal",
  //       blockquote: "Citação",
  //       pre: "Código",
  //       h1: "Título 1",
  //       h2: "Título 2",
  //       h3: "Título 3",
  //       h4: "Título 4",
  //       h5: "Título 5",
  //       h6: "Título 6",
  //     },
  //     lists: {
  //       unordered: "Lista com marcadores",
  //       ordered: "Lista numerada",
  //     },
  //     options: {
  //       help: "Ajuda",
  //       fullscreen: "Tela cheia",
  //       codeview: "Ver código-fonte",
  //     },
  //     paragraph: {
  //       paragraph: "Parágrafo",
  //       outdent: "Menor tabulação",
  //       indent: "Maior tabulação",
  //       left: "Alinhar à esquerda",
  //       center: "Alinhar ao centro",
  //       right: "Alinha à direita",
  //       justify: "Justificado",
  //     },
  //     color: {
  //       recent: "Cor recente",
  //       more: "Mais cores",
  //       background: "Fundo",
  //       foreground: "Fonte",
  //       transparent: "Transparente",
  //       setTransparent: "Fundo transparente",
  //       reset: "Restaurar",
  //       resetToDefault: "Restaurar padrão",
  //       cpSelect: "Selecionar",
  //     },
  //     shortcut: {
  //       shortcuts: "Atalhos do teclado",
  //       close: "Fechar",
  //       textFormatting: "Formatação de texto",
  //       action: "Ação",
  //       paragraphFormatting: "Formatação de parágrafo",
  //       documentStyle: "Estilo de documento",
  //       extraKeys: "Extra keys",
  //     },
  //     help: {
  //       insertParagraph: "Inserir Parágrafo",
  //       undo: "Desfazer o último comando",
  //       redo: "Refazer o último comando",
  //       tab: "Tab",
  //       untab: "Desfazer tab",
  //       bold: "Colocar em negrito",
  //       italic: "Colocar em itálico",
  //       underline: "Sublinhado",
  //       strikethrough: "Tachado",
  //       removeFormat: "Remover estilo",
  //       justifyLeft: "Alinhar à esquerda",
  //       justifyCenter: "Centralizar",
  //       justifyRight: "Alinhar à esquerda",
  //       justifyFull: "Justificar",
  //       insertUnorderedList: "Lista não ordenada",
  //       insertOrderedList: "Lista ordenada",
  //       outdent: "Recuar parágrafo atual",
  //       indent: "Avançar parágrafo atual",
  //       formatPara: "Alterar formato do bloco para parágrafo(tag P)",
  //       formatH1: "Alterar formato do bloco para H1",
  //       formatH2: "Alterar formato do bloco para H2",
  //       formatH3: "Alterar formato do bloco para H3",
  //       formatH4: "Alterar formato do bloco para H4",
  //       formatH5: "Alterar formato do bloco para H5",
  //       formatH6: "Alterar formato do bloco para H6",
  //       insertHorizontalRule: "Inserir Régua horizontal",
  //       "linkDialog.show": "Inserir um Hiperlink",
  //     },
  //     history: {
  //       undo: "Desfazer",
  //       redo: "Refazer",
  //     },
  //     specialChar: {
  //       specialChar: "CARACTERES ESPECIAIS",
  //       select: "Selecionar Caracteres Especiais",
  //     },
  //   },
  // });
})(window.jQuery);

/***/ }),

/***/ "./src/js/customs/loadEditor.js":
/*!**************************************!*\
  !*** ./src/js/customs/loadEditor.js ***!
  \**************************************/
/***/ (() => {

(function ($, axios) {
  $(document).ready(function () {
    $summernote = $('[data-type="summernote"]');
    if (!$summernote[0]) return;
    $summernote.summernote({
      lang: "pt-BR",
      toolbar: [
      // [groupName, [list of button]]
      ["style", ["bold", "italic", "underline", "strikethrough", "clear"]], ["fontsize", ["fontsize"]], ["color", ["color"]], ["para", ["ul", "ol", "paragraph"]], ["height", ["height"]], ["insert", ["picture", "table", "link", "video"]], ["misc", ["fullscreen", "codeview"]]],
      codeviewFilter: false,
      codeviewIframeFilter: true
      // Enviando em base64, caso queira sar a forma do v1 descomente esta a parte e adcione a rotta de upload
      // callbacks: {
      //     onImageUpload: function(files) {
      //         const form = new FormData()
      //         const config = {
      //             headers: {'content-type': 'multipart/form-data'}
      //         }

      //         Array.from(files).forEach(function(file, idx){
      //             form.append('media' + idx, file, file.name)
      //         })

      //         axios.post(END_POINT, form, config)
      //         .then(function(res) {

      //             console.log(res)
      //             return
      //             const imgUrl = res.data.imgUrl
      //             const img = document.createElement('img')
      //             img.src = imgUrl
      //             $summernote.summernote('insertNode', img)
      //         })
      //         .catch(function(err){
      //             alert('falha no upload da imagem, verifique a extensão da imagem')
      //         })
      //     }
      // }
    });
  });
})(window.jQuery, window.axios);

/***/ }),

/***/ "./src/js/customs/mask.js":
/*!********************************!*\
  !*** ./src/js/customs/mask.js ***!
  \********************************/
/***/ (() => {

(function ($) {
  $(document).ready(function () {
    var hasInputWithMask = $("[data-input]")[0];
    if (!hasInputWithMask) {
      return false;
    }
    Inputmask({
      mask: '99/99/9999',
      placeholder: '__/__/____'
    }).mask(document.querySelectorAll('[data-input="date"]'));
    Inputmask({
      mask: '99/99/9999 99:99:99',
      placeholder: '__/__/____ __:__:__'
    }).mask(document.querySelectorAll('[data-input="date-time"]'));
    Inputmask({
      mask: '99:99:99',
      placeholder: '__:__:__'
    }).mask(document.querySelectorAll('[data-input="time"]'));
    Inputmask({
      mask: '999.999.999-99',
      placeholder: '___.___.___-__'
    }).mask(document.querySelectorAll('[data-input="cpf"]'));
    Inputmask({
      mask: '99999-999',
      placeholder: '_____-___'
    }).mask(document.querySelectorAll('[data-input="cep"]'));
    Inputmask({
      alias: 'numeric',
      groupSeparator: ',',
      digits: 2,
      digitsOptional: false,
      prefix: 'R$',
      placeholder: '0'
    }).mask(document.querySelectorAll('[data-input="money"]'));
    Inputmask({
      mask: '99999-9999',
      placeholder: '____-____'
    }).mask(document.querySelectorAll('[data-input="cel"]'));
    Inputmask({
      alias: 'numeric',
      placeholder: '0'
    }).mask(document.querySelectorAll('[data-input="number"]'));
    var maskCelDDD = function maskCelDDD(event) {
      if ($(this).val().replace(/\D/g, "").length == 11) {
        $(this).inputmask('(99)99999-999[9]');
      } else {
        $(this).inputmask('(99)9999-9999[9]');
      }
    };
    $('[data-input="cel_with_ddd"]').on('keyup', maskCelDDD);
    $('[data-input="cel_with_ddd"]').on('blur', maskCelDDD).trigger('blur');
    Inputmask({
      mask: '9999-9999',
      placeholder: '____-____'
    }).mask(document.querySelectorAll('[data-input="phone"]'));
    Inputmask({
      mask: '(99) 9999-9999',
      placeholder: '(__) ____-____'
    }).mask(document.querySelectorAll('[data-input="phone_with_ddd"]'));
    Inputmask({
      alias: 'email'
    }).mask(document.querySelectorAll('[data-input="email"]'));
  });
})(window.jQuery);

/***/ }),

/***/ "./src/js/customs/select2.js":
/*!***********************************!*\
  !*** ./src/js/customs/select2.js ***!
  \***********************************/
/***/ (() => {

(function ($) {
  $(window.document).ready(function () {
    $('[data-form-select2]').select2({
      placeholder: "Buscar",
      language: {
        inputTooShort: function inputTooShort() {
          return "Digite um valor...";
        },
        noResults: function noResults() {
          return "Nenhum resultado encontrado.";
        }
      },
      minimumInputLength: 1,
      ajax: {
        dataType: 'json'
      }
    });
  });
})(window.jQuery);

/***/ }),

/***/ "./src/js/customs/textarea.js":
/*!************************************!*\
  !*** ./src/js/customs/textarea.js ***!
  \************************************/
/***/ (() => {

(function ($) {
  $(window.document).ready(function () {
    $("[data-textarea]").each(function () {
      this.setAttribute("style", "height:" + this.scrollHeight + "px;");
    }).on("input", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
      var height = +this.style.height.replace(/\D+/, "");
      this.style.overflowY = height >= 500 ? "scroll" : "hidden";
    });
  });
})(window.jQuery);

/***/ }),

/***/ "./src/app.scss":
/*!**********************!*\
  !*** ./src/app.scss ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/app": 0,
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunklaravel_crud"] = self["webpackChunklaravel_crud"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["app"], () => (__webpack_require__("./src/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["app"], () => (__webpack_require__("./src/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;