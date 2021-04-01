(function() {

    //version 1.0.0

    var adConfig = {
        "ads_host": "a.exdynsrv.com",
        "syndication_host": "syndication.exdynsrv.com",
        "idzone": 4232278,
        "popup_fallback": false,
        "popup_force": false,
        "chrome_enabled": true,
        "new_tab": false,
        "frequency_period": 720,
        "frequency_count": 1,
        "trigger_method": 2,
        "trigger_class": "mob_ad",
        "only_inline": false,
        "t_venor": false
    };

    window.document.querySelectorAll || (document.querySelectorAll = document.body.querySelectorAll = Object.querySelectorAll = function(o, e, t, i, n) {
        var r = document,
            c = r.createStyleSheet();
        for (n = r.all, e = [], t = (o = o.replace(/\[for\b/gi, "[htmlFor").split(",")).length; t--;) {
            for (c.addRule(o[t], "k:v"), i = n.length; i--;) n[i].currentStyle.k && e.push(n[i]);
            c.removeRule(0)
        }
        return e
    });
    var popMagic = {
        version: "1.0.0",
        cookie_name: "",
        url: "",
        config: {},
        open_count: 0,
        top: null,
        browser: null,
        venor_loaded: !1,
        venor: !1,
        configTpl: {
            ads_host: "",
            syndication_host: "",
            idzone: "",
            frequency_period: 720,
            frequency_count: 1,
            trigger_method: 1,
            trigger_class: "",
            popup_force: !1,
            popup_fallback: !1,
            chrome_enabled: !0,
            new_tab: !1,
            cat: "",
            tags: "",
            el: "",
            sub: "",
            sub2: "",
            sub3: "",
            only_inline: !1,
            t_venor: !1,
            cookieconsent: !0
        },
        init: function(o) {
            if (void 0 !== o.idzone && o.idzone) {
                for (var e in this.configTpl) this.configTpl.hasOwnProperty(e) && (void 0 !== o[e] ? this.config[e] = o[e] : this.config[e] = this.configTpl[e]);
                void 0 !== this.config.idzone && "" !== this.config.idzone && (!0 !== this.config.only_inline && this.loadHosted(), this.addEventToElement(window, "load", this.preparePop))
            }
        },
        getCountFromCookie: function() {
            if (!this.config.cookieconsent) return 0;
            var o = popMagic.getCookie(popMagic.cookie_name),
                e = void 0 === o ? 0 : parseInt(o);
            return isNaN(e) && (e = 0), e
        },
        shouldShow: function() {
            if (popMagic.open_count >= popMagic.config.frequency_count) return !1;
            var o = popMagic.getCountFromCookie();
            return popMagic.open_count = o, !(o >= popMagic.config.frequency_count)
        },
        venorShouldShow: function() {
            return !popMagic.config.t_venor || popMagic.venor_loaded && "0" === popMagic.venor
        },
        setAsOpened: function() {
            var o = 1;
            o = 0 !== popMagic.open_count ? popMagic.open_count + 1 : popMagic.getCountFromCookie() + 1, popMagic.config.cookieconsent && (popMagic.setCookie(popMagic.cookie_name, o, popMagic.config.frequency_period), o >= popMagic.config.frequency_count && popMagic.setCookie("nb-no-req-" + popMagic.config.idzone, !0, popMagic.config.frequency_period))
        },
        loadHosted: function() {
            var o = document.createElement("script");
            for (var e in o.type = "application/javascript", o.async = !0, o.src = "//" + this.config.ads_host + "/popunder1000.js", o.id = "popmagicldr", this.config) this.config.hasOwnProperty(e) && "ads_host" !== e && "syndication_host" !== e && o.setAttribute("data-exo-" + e, this.config[e]);
            var t = document.getElementsByTagName("body").item(0);
            t.firstChild ? t.insertBefore(o, t.firstChild) : t.appendChild(o)
        },
        preparePop: function() {
            if ("object" != typeof exoJsPop101 || !exoJsPop101.hasOwnProperty("add")) {
                if (popMagic.top = self, popMagic.top !== self) try {
                    top.document.location.toString() && (popMagic.top = top)
                } catch (o) {}
                if (popMagic.cookie_name = "zone-cap-" + popMagic.config.idzone, popMagic.config.t_venor && popMagic.shouldShow()) {
                    var o = new XMLHttpRequest;
                    o.onreadystatechange = function() {
                        o.readyState == XMLHttpRequest.DONE && (popMagic.venor_loaded = !0, 200 == o.status && (popMagic.venor = o.responseText))
                    };
                    var e = "https:" !== document.location.protocol && "http:" !== document.location.protocol ? "https:" : document.location.protocol;
                    o.open("GET", e + "//" + popMagic.config.syndication_host + "/venor.php", !0);
                    try {
                        o.send()
                    } catch (o) {
                        popMagic.venor_loaded = !0
                    }
                }
                if (popMagic.buildUrl(), popMagic.browser = popMagic.browserDetector.detectBrowser(navigator.userAgent), popMagic.config.chrome_enabled || "chrome" !== popMagic.browser.name && "crios" !== popMagic.browser.name) {
                    var t = popMagic.getPopMethod(popMagic.browser);
                    popMagic.addEvent("click", t)
                }
            }
        },
        getPopMethod: function(o) {
            return popMagic.config.popup_force ? popMagic.methods.popup : popMagic.config.popup_fallback && "chrome" === o.name && o.version >= 68 && !o.isMobile ? popMagic.methods.popup : o.isMobile ? popMagic.methods.default : "chrome" === o.name ? popMagic.methods.chromeTab : popMagic.methods.default
        },
        buildUrl: function() {
            var o = "https:" !== document.location.protocol && "http:" !== document.location.protocol ? "https:" : document.location.protocol,
                e = top === self ? document.URL : document.referrer,
                t = {
                    type: "inline",
                    name: "popMagic",
                    ver: this.version
                };
            this.url = o + "//" + this.config.syndication_host + "/splash.php?cat=" + this.config.cat + "&idzone=" + this.config.idzone + "&type=8&p=" + encodeURIComponent(e) + "&sub=" + this.config.sub + ("" !== this.config.sub2 ? "&sub2=" + this.config.sub2 : "") + ("" !== this.config.sub3 ? "&sub3=" + this.config.sub3 : "") + "&block=1&el=" + this.config.el + "&tags=" + this.config.tags + "&cookieconsent=" + this.config.cookieconsent + "&scr_info=" + function(o) {
                var e = o.type + "|" + o.name + "|" + o.ver;
                return encodeURIComponent(btoa(e))
            }(t)
        },
        addEventToElement: function(o, e, t) {
            o.addEventListener ? o.addEventListener(e, t, !1) : o.attachEvent ? (o["e" + e + t] = t, o[e + t] = function() {
                o["e" + e + t](window.event)
            }, o.attachEvent("on" + e, o[e + t])) : o["on" + e] = o["e" + e + t]
        },
        addEvent: function(o, e) {
            var t;
            if ("3" != popMagic.config.trigger_method)
                if ("2" != popMagic.config.trigger_method || "" == popMagic.config.trigger_method) popMagic.addEventToElement(document, o, e);
                else {
                    var i, n = [];
                    i = -1 === popMagic.config.trigger_class.indexOf(",") ? popMagic.config.trigger_class.split(" ") : popMagic.config.trigger_class.replace(/\s/g, "").split(",");
                    for (var r = 0; r < i.length; r++) "" !== i[r] && n.push("." + i[r]);
                    for (t = document.querySelectorAll(n.join(", ")), r = 0; r < t.length; r++) popMagic.addEventToElement(t[r], o, e)
                }
            else
                for (t = document.querySelectorAll("a"), r = 0; r < t.length; r++) popMagic.addEventToElement(t[r], o, e)
        },
        setCookie: function(o, e, t) {
            if (!this.config.cookieconsent) return !1;
            t = parseInt(t, 10);
            var i = new Date;
            i.setMinutes(i.getMinutes() + parseInt(t));
            var n = encodeURIComponent(e) + "; expires=" + i.toUTCString() + "; path=/";
            document.cookie = o + "=" + n
        },
        getCookie: function(o) {
            if (!this.config.cookieconsent) return !1;
            var e, t, i, n = document.cookie.split(";");
            for (e = 0; e < n.length; e++)
                if (t = n[e].substr(0, n[e].indexOf("=")), i = n[e].substr(n[e].indexOf("=") + 1), (t = t.replace(/^\s+|\s+$/g, "")) === o) return decodeURIComponent(i)
        },
        randStr: function(o, e) {
            for (var t = "", i = e || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = 0; n < o; n++) t += i.charAt(Math.floor(Math.random(), i.length));
            return t
        },
        isValidUserEvent: function(o) {
            return !!("isTrusted" in o && o.isTrusted && "ie" !== popMagic.browser.name && "safari" !== popMagic.browser.name) || 0 != o.screenX && 0 != o.screenY
        },
        isValidHref: function(o) {
            if (void 0 === o || "" == o) return !1;
            return !/\s?javascript\s?:/i.test(o)
        },
        findLinkToOpen: function(o) {
            var e = o,
                t = !1;
            try {
                for (var i = 0; i < 20 && !e.getAttribute("href") && e !== document && "html" !== e.nodeName.toLowerCase();) e = e.parentNode, i++;
                var n = e.getAttribute("target");
                n && -1 !== n.indexOf("blank") || (t = e.getAttribute("href"))
            } catch (o) {}
            return popMagic.isValidHref(t) || (t = !1), t || window.location.href
        },
        getPuId: function() {
            return "ok" + Math.floor(89999999 * Math.random() + 1e7)
        },
        browserDetector: {
            browserDefinitions: [
                ["firefox", /Firefox\/([0-9.]+)(?:\s|$)/],
                ["opera", /Opera\/([0-9.]+)(?:\s|$)/],
                ["opera", /OPR\/([0-9.]+)(:?\s|$)$/],
                ["edge", /Edg(?:e|)\/([0-9.]+)/],
                ["ie", /Trident\/7\.0.*rv:([0-9.]+)\).*Gecko$/],
                ["ie", /MSIE\s([0-9.]+);.*Trident\/[4-7].0/],
                ["ie", /MSIE\s(7\.0)/],
                ["safari", /Version\/([0-9.]+).*Safari/],
                ["chrome", /(?!Chrom.*Edg(?:e|))Chrom(?:e|ium)\/([0-9.]+)(:?\s|$)/],
                ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9.]+)(:?\s|$)/],
                ["bb10", /BB10;\sTouch.*Version\/([0-9.]+)/],
                ["android", /Android\s([0-9.]+)/],
                ["ios", /Version\/([0-9.]+).*Mobile.*Safari.*/],
                ["yandexbrowser", /YaBrowser\/([0-9./],["yandexbrowser",/YaBrowser\/([0-9._]+)/],
                ["crios", /CriOS\/([0-9.]+)(:?\s|$)/]
            ],
            detectBrowser: function(o) {
                var e = o.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WebOS|Windows Phone/i);
                for (var t in this.browserDefinitions) {
                    var i = this.browserDefinitions[t];
                    if (i[1].test(o)) {
                        var n = i[1].exec(o),
                            r = n && n[1].split(/[._]/).slice(0, 3),
                            c = Array.prototype.slice.call(r, 1).join("") || "0";
                        return r && r.length < 3 && Array.prototype.push.apply(r, 1 === r.length ? [0, 0] : [0]), {
                            name: i[0],
                            version: r.join("."),
                            versionNumber: parseFloat(r[0] + "." + c),
                            isMobile: e
                        }
                    }
                }
                return {
                    name: "other",
                    version: "1.0",
                    versionNumber: 1,
                    isMobile: e
                }
            }
        },
        methods: {
            default: function(o) {
                if (!popMagic.shouldShow() || !popMagic.venorShouldShow() || !popMagic.isValidUserEvent(o)) return !0;
                var e = o.target || o.srcElement,
                    t = popMagic.findLinkToOpen(e);
                return window.open(t, "_blank"), popMagic.setAsOpened(), popMagic.top.document.location = popMagic.url, void 0 !== o.preventDefault && (o.preventDefault(), o.stopPropagation()), !0
            },
            chromeTab: function(o) {
                if (!popMagic.shouldShow() || !popMagic.venorShouldShow() || !popMagic.isValidUserEvent(o)) return !0;
                if (void 0 === o.preventDefault) return !0;
                o.preventDefault(), o.stopPropagation();
                var e = top.window.document.createElement("a"),
                    t = o.target || o.srcElement;
                e.href = popMagic.findLinkToOpen(t), document.getElementsByTagName("body")[0].appendChild(e);
                var i = new MouseEvent("click", {
                    bubbles: !0,
                    cancelable: !0,
                    view: window,
                    screenX: 0,
                    screenY: 0,
                    clientX: 0,
                    clientY: 0,
                    ctrlKey: !0,
                    altKey: !1,
                    shiftKey: !1,
                    metaKey: !0,
                    button: 0
                });
                i.preventDefault = void 0, e.dispatchEvent(i), e.parentNode.removeChild(e), window.open(popMagic.url, "_self"), popMagic.setAsOpened()
            },
            popup: function(o) {
                if (!popMagic.shouldShow() || !popMagic.venorShouldShow() || !popMagic.isValidUserEvent(o)) return !0;
                var e = "";
                if (popMagic.config.popup_fallback && !popMagic.config.popup_force) {
                    var t = Math.max(Math.round(.8 * window.innerHeight), 300);
                    e = "menubar=1,resizable=1,width=" + Math.max(Math.round(.7 * window.innerWidth), 300) + ",height=" + t + ",top=" + (window.screenY + 100) + ",left=" + (window.screenX + 100)
                }
                var i = document.location.href,
                    n = window.open(i, popMagic.getPuId(), e);
                setTimeout(function() {
                    n.location.href = popMagic.url
                }, 200), popMagic.setAsOpened(), void 0 !== o.preventDefault && (o.preventDefault(), o.stopPropagation())
            }
        }
    };
    popMagic.init(adConfig);
})();