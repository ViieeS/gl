/**
 * Set input for NewsPublisher
 * @version 1.0.0
 */

if (typeof(gl) == 'undefined') {
    gl = {
        Init: false
    };
}

gl = {
    initialize: function () {
        if (!jQuery().colorbox) {
            document.write('<script src="' + glConfig.assetsUrl + 'vendor/colorbox/jquery.colorbox-min.js"><\/script>');
            document.write('<script src="' + glConfig.assetsUrl + 'vendor/colorbox/i18n/jquery.colorbox-ru.js"><\/script>');
        }
        if (!jQuery().select2) {
            document.write('<script src="' + glConfig.assetsUrl + 'vendor/select2/js/select2.min.js"><\/script>');
            document.write('<script src="' + glConfig.assetsUrl + 'vendor/select2/js/i18n/ru.js"><\/script>');
        }
        $(document).ready(function () {

        });
        gl.Init = true;
    }
};


gl.location = {
    config: {
        'tvInput': '#np-city'
    },
    placeholder: {},
    locations: [],
    baseParams: {
        limit: 0,
        active: 1,
        default: 0,
        action: 'getlist'
    },
    initialize: function () {
        if (!!!gl.Init) {
            gl.initialize();
        }

        $(document).on('click touchend', '.gl-current-select', function (e) {
            gl.location.modal();
            e.preventDefault();
            return false;
        });

        $(document).ready(function () {
            gl.location.setDefaults('location');
            gl.location.input.load('location');
        });

    },

    setDefaults: function (key) {
        var inputValue = this.getInputValue();

        this.locations = inputValue.split(', ');
        var field = $('[name="' + key + '"]');
        if (!field) {
            return false;
        }
        $.each(this.locations, function (i, val) {
            $("<option selected></option>")
                .val(i)
                .text(val)
                .appendTo(field);
        });
    },

    getInputValue: function () {
        return $(this.config.tvInput).val();
    },

    setInputValue: function () {
        return $(this.config.tvInput).val(this.locations.join(', '));
    },

    addLocation: function (name) {
        this.locations.push(name);
        return this.setInputValue();
    },
    removeLocation: function (name) {
        var index = this.locations.indexOf(name);
        if (index != -1) {
            this.locations.splice(index, 1);
        }
        return this.setInputValue();
    },
    checkDuplicates: function (name) {
        return this.locations.indexOf(name) != -1;
    },

    getOpts: function (evt) {
        var opts = "{}";

        if (!!evt) {
            opts = JSON.stringify(evt.params, function (key, value) {
                if (value && value.nodeName) return "[DOM node]";
                if (value instanceof $.Event) return "[$.Event]";
                return value;
            });
        }
        opts = JSON.parse(opts);
        return opts;
    },

    callbacks: {
        selecting: function (evt) {
            var data = gl.location.getOpts(evt).args.data;
            var name_ru = data.name_ru ? data.name_ru : data.text; // @todo Workaround badcode, how to set data.name_ru for default options?
            if (gl.location.checkDuplicates(name_ru))
                evt.preventDefault();
        },
        select: function (evt) {
            var data = gl.location.getOpts(evt).data;
            return gl.location.addLocation(data.name_ru);
        },
        unselect: function (evt) {
            var data = gl.location.getOpts(evt).data;
            var name_ru = data.name_ru ? data.name_ru : data.text; // @todo Workaround badcode, how to set data.name_ru for default options?
            return gl.location.removeLocation(name_ru);
        }
    },

    input: {
        close: function (key) {
            var field = $('[name="' + key + '"]');
            if (!field) {
                return false;
            }
            field.select2('close');
        },
        destroy: function (key) {
            var field = $('[name="' + key + '"]');
            if (!field) {
                return false;
            }
            field.select2('destroy');
        },
        load: function (key) {
            var field = $('[name="' + key + '"]');
            if (!field) {
                return false;
            }

            field.select2({
                templateResult: gl.location.input.getResult,
                templateSelection: gl.location.input.getSelection,
                maximumSelectionLength: 5,
                language: "ru",
                placeholder: "Начните вводить название города",
                theme: "bootstrap",
                ajax: {
                    url: glConfig.actionUrl,
                    dataType: 'json',
                    delay: 200,
                    type: 'POST',
                    data: function (params) {
                        return $.extend({},
                            gl.location.baseParams, {
                                class: glConfig.locationClass,
                                query: params.term
                            });
                    },
                    processResults: function (data, page) {
                        return {
                            results: data.results
                        };
                    },
                    cache: false
                }
            });

            field.on("select2:selecting", function (e) {
                gl.location.callbacks.selecting(e);
            });
            field.on("select2:select", function (e) {
                gl.location.callbacks.select(e);
            });
            field.on("select2:unselect", function (e) {
                gl.location.callbacks.unselect(e);
            });

        },
        getResult: function (el) {
            if (!el.id) {
                return '';
            }
            return $('<div>' + el.name_ru + '</div>');
        },
        getSelection: function (el) {
            if (!el.id) {
                return '';
            }
            return el.name_ru ? el.name_ru : el.text; // @todo Workaround badcode, how to set data.name_ru for default options?
        }
    }

};


gl.location.initialize();