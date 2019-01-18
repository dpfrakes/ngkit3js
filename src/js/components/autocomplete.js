import Togglable from '../mixin/togglable';
import Class from '../mixin/class';
import {
    ajax,
    append,
    debounce
} from 'ngkit-util';

export default {

    mixins: [Class,Togglable],

    props: {
        source: String,
        minLength: Number,
        param: String,
        delay: Number,
        flipDropdown: Boolean
    },

    data: {
        minLength: 3,
        param: 'search',
        method: 'get',
        delay: 300,
        loadingClass: 'ng-loading',
        flipDropdown: true,
        skipClass: 'ng-skip',
        hoverClass: 'ng-active',
        source: null,
        renderer: null,
        visible  : false,
        value    : null,
        selected : false,
        uniqid: "autodrop-" + Date.now(),
        active: false,
        template: `<ul class="ng-nav ng-nav-autocomplete ng-autocomplete-results">{{~items}}<li data-value="{{$item.value}}"><a>{{$item.value}}</a></li>{{/items}}</ul>`
    },


    connected() {
        const self = this;
        this.pulltrigger = debounce(function() {
            if(self.select) {
                return (self.select = false);
            }
            self.handle();
        }, self.delay);

        this.dropdown = this.$el.querySelector(".ng-dropdown");
        this.input = this.$el.querySelector("input[type=text]");
        this.input.setAttribute("autocomplete", "off");


        if (!this.dropdown) {
            this.$mount(append(this.$el, `<div id="${this.uniqid}" class="ng-dropdown"></div>`));

        }
        if (this.flipDropdown) {
            this.dropdown = this.$el.querySelector(".ng-dropdown");
            this.dropdown.classList.add('ng-dropdown-flip');
        }
    },

    events: [

        {
            name: 'keydown',
            handler(e) {
                if (e && e.which && !e.shiftKey) {

                    switch (e.which) {
                        case 13: // enter
                            this.selected = true;

                            if (this.selected && this.visible) {
                                e.preventDefault();
                                this.selectOption();
                            }
                            break;
                        case 38: // up
                            e.preventDefault();
                            this.pick('prev', true);
                            break;
                        case 40: // down
                            e.preventDefault();
                            this.pick('next', true);
                            break;
                        case 27:
                        case 9: // esc, tab
                            this.hide();
                            break;
                        default:
                            break;
                    }
                }
            }
        },

        {
            name: 'keyup',
            handler() {
                this.pulltrigger();
            }
        },

        {
            name: 'blur',
            handler() {
                setTimeout(function() { this.hide(); }, 200);
            }
        },

        {

            name: 'click',

            delegate() {
                return `#${this.uniqid} .ng-autocomplete-results > li`;
            },

            handler(e) {
                e.preventDefault();
                this.selectOption();
            }

        },

        {

            name: 'mouseover',

            delegate() {
                return `#${this.uniqid} .ng-autocomplete-results > li`;
            },

            handler(e) {
                e.preventDefault();
                let elm = e.target;
                if(elm.tagName.toLowerCase() === "a") {
                   elm = elm.parentElement;
                }
                this.pick(elm);
            }

        }


    ],

    methods: {

        handle() {
            const $this = this, old = this.value;

            this.value = this.input.value;

            if (this.value.length < this.minLength) return this.hide();

            if (this.value != old) {
                $this.request();
            }

            return this;
        },

        pick(item, scrollinview) {

            var $this    = this,
                items    = this.dropdown.querySelector('.ng-autocomplete-results').querySelectorAll('li:not(.' + this.skipClass + ')'),
                _selected = false;


            if (typeof item !== "string" && !item.classList.contains(this.skipClass)) {
                _selected = item;
            } else if (item == 'next' || item == 'prev') {

                if (this.selected) {
                    var index = items.index(this.selected);

                    if (item == 'next') {
                        _selected = items.eq(index + 1 < items.length ? index + 1 : 0);
                    } else {
                        _selected = items.eq(index - 1 < 0 ? items.length - 1 : index - 1);
                    }

                } else {
                    _selected = items[(item == 'next') ? 'first' : 'last']();
                }
            }

            if (_selected) {
                this.selected = _selected;
                //items.classList.remove(this.hoverClass);
                //this.selected.classList.add(this.hoverClass);

                // jump to selected if not in view
                if (scrollinview) {

                    var top       = _selected.position().top,
                        scrollTop = $this.dropdown.scrollTop(),
                        dpheight  = $this.dropdown.height();

                    if (top > dpheight ||  top < 0) {
                        $this.dropdown.scrollTop(scrollTop + top);
                    }
                }
            }


        },


        selectOption() {
            if(!this.selected) return;

            var data = this.selected.dataset.value;

            // this.element.trigger("ng.autocomplete.select", [data, this]);

            if (data) {
                this.input.value = data;
            }

            this.hide();

        },

        show() {
            if (this.visible) return;
            this.visible = true;
            this.$el.classList.add("ng-open");

            this.active = true;
            return this;
        },

        hide() {
            if (!this.visible) return;
            this.visible = false;
            this.$el.classList.remove("ng-open");

            if (this.active === true) {
                this.active = false;
            }

            return this;
        },


        request() {
            var $this   = this,
                release = function(data) {

                    if(data) {
                        $this.render(data);
                    }

                    $this.$el.classList.remove($this.loadingClass);
                };

            this.$el.classList.add(this.loadingClass);

            if (this.source) {

                let source = this.source;

                switch(typeof (this.source)) {
                    case 'function':
                        this.source.apply(this, [release]);

                        break;

                    case 'object':
                        if(source.length) {

                            var items = [];

                            source.forEach(function(item) {
                                if(item.value && item.value.toLowerCase().indexOf($this.value.toLowerCase())!= -1) {
                                    items.push(item);
                                }
                            });

                            release(items);
                        }

                        break;

                    case 'string':
                        var params = {};

                        params[this.param] = this.value;

                        ajax(this.source, {
                            data: params,
                            method: this.method,
                            responseType: 'json'
                        }).then(
                            xhr => {
                                if(xhr.responseType === "json") {
                                    release(xhr.response || []);
                                }else{
                                    release(xhr.response || []);
                                }

                            },
                            e => console.log("Error in Autocomplete: ", e)
                        );


                        break;

                    default:
                        release(null);
                }

            } else {
                $this.$el.classList.remove($this.loadingClass);
            }
        },

        render(data) {

            this.dropdown.innerHTML = "";

            this.selected = false;

            if (this.renderer) {

                this.renderer.apply(this, [data]);

            } else if(data && data.length) {

                let _html = `<ul class="ng-nav ng-nav-autocomplete ng-autocomplete-results">`;
                for(let i = 0; i < data.length; i++) {
                    const obj = data[i];
                    _html = _html + `<li data-value="${obj.value}"><a>${obj.value}</a></li>`;
                }
                _html = _html + "</ul>";

                    this.$mount(append(this.dropdown, _html));

                this.show();

                // this.trigger('ng.autocomplete.show');
            }

            return this;
        }




    }

};


