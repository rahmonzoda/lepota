define("models/image", ["backbone"], function(e) {
    return e.Model.extend({fabricView: !1,defaults: {id: null,url: null,width: 0,height: 0,pa_top: 0,pa_left: 0,pa_width: 0,pa_height: 0,pa_stroke: "#000"},useMask: function() {
            return this.get("mask_type") == "1" && this.get("mask")
        }})
}), define("collections/images", ["backbone", "models/image"], function(e, t) {
    return e.Collection.extend({model: t})
}), define("models/product", ["backbone", "collections/images"], function(e, t) {
    return e.Model.extend({defaults: {id: null,images: []},initialize: function() {
            this.images = new t(this.get("images"))
        }})
}), define("models/art", ["backbone"], function(e) {
    return e.Model.extend({defaults: {id: null,url: null}})
}), define("collections/arts", ["backbone", "models/art"], function(e, t) {
    return e.Collection.extend({model: t})
}), define("views/art_inspector", ["backbone", "jquery"], function(e, t) {
    return e.View.extend({orientation: "landscape",template: {portrait: _.template(t("#art-inspector-portrait-template").html()),landscape: _.template(t("#art-inspector-landscape-template").html())},events: {"click #ai-remove": "removeArt","click #ai-center-h": "centerArtHorizontally","click #ai-center-v": "centerArtVertically","click #ai-forward": "bringArtForward","click #ai-backwards": "sendArtBackwards","click #ai-flip-x": "flipArtX","click #ai-flip-y": "flipArtY","click #ai-toggle-menu": "toggleArtMenu"},render: function() {
            var e = this;
            return this.$el.html(this.template[this.orientation]()), this.$artInspector = this.$("#ai-art-inspector"), this.$artMenu = this.$("#ai-art-menu"), this.$artColor = this.$("#ai-art-color"), this.$artColor.spectrum({chooseText: "Ok",cancelText: "Cancel",clickoutFiresChange: !0,showButtons: !0,showInitial: !0,move: function(t) {
                    e.fabricArt.lockColorChange || (e.fabricArt.set("fill", t.toHexString()), e.trigger("redraw-canvas"))
                },hide: function(t) {
                    e.fabricArt.lockColorChange || (e.fabricArt.set("fill", t.toHexString()), e.trigger("redraw-canvas"))
                }}), this.delegateEvents(), this
        },openInspector: function(e) {
            this.fabricArt = e, this.allowColorChange(), e.type == "image" ? this.$(".sp-replacer").hide() : (this.$artColor.spectrum("set", e.get("fill")), this.$(".sp-replacer").show()), this.$artInspector.show(), this.allowDelete(), this.allowActions()
        },allowColorChange: function() {
            this.fabricArt && ("lockColorChange" in this.fabricArt && this.fabricArt.lockColorChange ? this.$el.find(".sp-replacer").hide() : this.$el.find(".sp-replacer").show())
        },allowDelete: function() {
            this.fabricArt && ("lockDelete" in this.fabricArt && this.fabricArt.lockDelete ? this.$el.find("#ai-remove").hide() : this.$el.find("#ai-remove").show())
        },allowActions: function() {
            this.fabricArt && (this.fabricArt.lockMovementX ? (this.$el.find("#ai-center-h").hide(), this.$el.find("#ai-center-v").hide()) : (this.$el.find("#ai-center-h").show(), this.$el.find("#ai-center-v").show()), "alwaysOnTop" in this.fabricArt && this.fabricArt.alwaysOnTop ? this.$el.find("#ai-backwards").hide() : this.$el.find("#ai-backwards").show(), "alwaysOnBottom" in this.fabricArt && this.fabricArt.alwaysOnBottom ? this.$el.find("#ai-forward").hide() : this.$el.find("#ai-forward").show(), this.fabricArt.lockRotation ? (this.$el.find("#ai-flip-x").hide(), this.$el.find("#ai-flip-y").hide()) : (this.$el.find("#ai-flip-x").show(), this.$el.find("#ai-flip-y").show()))
        },closeInspector: function() {
            this.$artInspector.hide()
        },removeArt: function() {
            this.fabricArt.lockDelete || this.trigger("remove-art", this.fabricArt)
        },centerArtHorizontally: function() {
            this.fabricArt.lockMovementX || this.trigger("center-art-h", this.fabricArt)
        },centerArtVertically: function() {
            this.fabricArt.lockMovementY || this.trigger("center-art-v", this.fabricArt)
        },bringArtForward: function() {
            this.fabricArt.alwaysOnBottom || this.trigger("bring-art-forward", this.fabricArt)
        },sendArtBackwards: function() {
            this.fabricArt.alwaysOnTop || this.trigger("send-art-backwards", this.fabricArt)
        },flipArtX: function() {
            this.fabricArt.lockRotation || this.trigger("flip-art-x", this.fabricArt)
        },flipArtY: function() {
            this.fabricArt.lockRotation || this.trigger("flip-art-y", this.fabricArt)
        },closeArtMenu: function() {
            this.$artMenu.hide()
        },toggleArtMenu: function() {
            this.$artMenu.toggle()
        },onBodyClick: function(e) {
            if (this.orientation == "portrait") {
                var t = this.$(e.target);
                t.closest("#ai-toggle-menu").length == 0 && this.closeArtMenu()
            }
        }})
}), define("views/text_inspector", ["backbone", "jquery"], function(e, t) {
    return e.View.extend({fontFamilies: DizziOptions.fonts,orientation: "landscape",template: {portrait: _.template(t("#text-inspector-portrait-template").html()),landscape: _.template(t("#text-inspector-landscape-template").html())},events: {"change #ti-font-list": "changeFontFamily","click #ti-font-w-and-s button": "changeFontWeightAndStyle","click #ti-text-alignment button": "changeTextAlignment","keyup #ti-text": "changeTextValue","click #ti-remove": "removeText","click #ti-center-h": "centerTextHorizontally","click #ti-center-v": "centerTextVertically","click #ti-forward": "bringTextForward","click #ti-backwards": "sendTextBackwards","click #ti-flip-x": "flipTextX","click #ti-flip-y": "flipTextY","click #ti-toggle-menu": "toggleTextMenu","click #ti-toggle-editor": "toggleTextEditor"},initialize: function() {
            this.fontFamilies.length && WebFont.load({google: {families: this.fontFamilies}})
        },render: function() {
            var e = this;
            return this.$el.html(this.template[this.orientation]({fontFamilies: this.fontFamilies})), this.$textInspector = this.$("#ti-text-inspector"), this.$textMenu = this.$("#ti-text-menu"), this.$textEditor = this.$("#ti-text-editor"), this.$fontList = this.$("#ti-font-list"), this.$fontColor = this.$("#ti-font-color"), this.$text = this.$("#ti-text"), this.$textEditorBtn = this.$("#ti-toggle-editor"), this.$textMenuBtn = this.$("#ti-toggle-menu"), this.$fontList.select2({width: "100%",formatResult: function(e) {
                    return '<span style="font-family: ' + e.id + '">' + e.id + "</span>"
                },formatSelection: function(e) {
                    return '<span style="font-family: ' + e.id + '">' + e.id + "</span>"
                },escapeMarkup: function(e) {
                    return e
                }}), this.$fontColor.spectrum({chooseText: "Ok",cancelText: "Cancel",clickoutFiresChange: !0,showButtons: !0,showInitial: !0,move: function(t) {
                    e.fabricText.lockColorChange || (e.fabricText.set("fill", t.toHexString()), e.trigger("redraw-canvas"))
                },hide: function(t) {
                    e.fabricText.lockColorChange || (e.fabricText.set("fill", t.toHexString()), e.trigger("redraw-canvas"))
                }}), this.delegateEvents(), this.$el.trigger("create"), this
        },openInspector: function(e) {
            this.fabricText = e, this.$text.val(e.get("text")), this.$("#ti-font-list").select2("val", e.get("fontFamily")), this.isIphone ? (this.$fontColor.val(e.get("fill").replace("#", "")), this.$el.find(".current-color").css("background-color", e.get("fill"))) : this.$fontColor.spectrum("set", e.get("fill")), this.$("button").removeClass("active"), this.$("#ti-font-weight-bold").toggleClass("active", e.get("fontWeight") == "bold"), this.$("#ti-font-style-italic").toggleClass("active", e.get("fontStyle") == "italic"), this.$("#ti-text-align-" + e.get("textAlign")).addClass("active"), this.orientation == "portrait" && this.closeTextEditor(), this.$textInspector.show(), this.allowColorChange(), this.allowEditText(), this.allowDelete(), this.allowActions()
        },closeInspector: function() {
            this.$textInspector.hide()
        },removeText: function() {
            this.fabricText.lockDelete || this.trigger("remove-text", this.fabricText)
        },changeFontFamily: function(e) {
            this.fabricText.set("fontFamily", e.val), this.trigger("redraw-canvas")
        },changeFontWeightAndStyle: function(e) {
            var n = t(e.currentTarget);
            n.hasClass("active") ? (n.removeClass("active"), this.fabricText.set(n.data("property"), "normal")) : (n.addClass("active"), this.fabricText.set(n.data("property"), n.data("value"))), this.trigger("redraw-canvas")
        },changeTextAlignment: function(e) {
            var n = t(e.currentTarget);
            n.hasClass("active") || (this.$("#ti-text-alignment button").removeClass("active"), n.addClass("active"), this.fabricText.set(n.data("property"), n.data("value")), this.trigger("redraw-canvas"))
        },allowColorChange: function() {
            this.fabricText && ("lockColorChange" in this.fabricText && this.fabricText.lockColorChange ? this.$el.find(".sp-replacer").hide() : this.$el.find(".sp-replacer").show())
        },allowEditText: function() {
            "lockTextEdit" in this.fabricText && this.fabricText.lockTextEdit ? this.$el.find("#ti-text-editor .row.last").hide() : this.$el.find("#ti-text-editor .row.last").show()
        },allowDelete: function() {
            this.fabricText && ("lockDelete" in this.fabricText && this.fabricText.lockDelete ? this.$el.find("#ti-remove").hide() : this.$el.find("#ti-remove").show())
        },allowActions: function() {
            this.fabricText && (this.fabricText.lockMovementX ? (this.$el.find("#ti-center-h").hide(), this.$el.find("#ti-center-v").hide()) : (this.$el.find("#ti-center-h").show(), this.$el.find("#ti-center-v").show()), "alwaysOnTop" in this.fabricText && this.fabricText.alwaysOnTop ? this.$el.find("#ti-backwards").hide() : this.$el.find("#ti-backwards").show(), "alwaysOnBottom" in this.fabricText && this.fabricText.alwaysOnBottom ? this.$el.find("#ti-forward").hide() : this.$el.find("#ti-forward").show(), this.fabricText.lockRotation ? (this.$el.find("#ti-flip-x").hide(), this.$el.find("#ti-flip-y").hide()) : (this.$el.find("#ti-flip-x").show(), this.$el.find("#ti-flip-y").show()))
        },changeTextValue: function(e) {
            this.fabricText.lockTextEdit !== !1 && (this.fabricText.set("text", t(e.currentTarget).val()), this.trigger("redraw-canvas"))
        },centerTextHorizontally: function() {
            this.fabricText.lockMovementX || this.trigger("center-text-h", this.fabricText)
        },centerTextVertically: function() {
            this.fabricText.lockMovementX || this.trigger("center-text-v", this.fabricText)
        },bringTextForward: function() {
            this.fabricText.alwaysOnBottom || this.trigger("bring-text-forward", this.fabricText)
        },sendTextBackwards: function() {
            this.fabricText.alwaysOnTop || this.trigger("send-text-backwards", this.fabricText)
        },flipTextX: function() {
            this.fabricText.lockRotation || this.trigger("flip-text-x", this.fabricText)
        },flipTextY: function() {
            this.fabricText.lockRotation || this.trigger("flip-text-y", this.fabricText)
        },toggleTextMenu: function() {
            this.$textMenu.toggle(), this.$textMenuBtn.toggleClass("dz-active")
        },closeTextMenu: function() {
            this.$textMenu.hide(), this.$textMenuBtn.removeClass("dz-active")
        },toggleTextEditor: function() {
            this.$textEditor.toggle(), this.$textEditorBtn.toggleClass("dz-active")
        },closeTextEditor: function() {
            this.$textEditor.hide(), this.$textEditorBtn.removeClass("dz-active")
        },onBodyClick: function(e) {
            if (this.orientation == "portrait") {
                var t = this.$(e.target);
                t.closest("#ti-toggle-menu").length == 0 && this.closeTextMenu()
            }
        }})
}), define("views/export_dialog", ["backbone", "jquery"], function(e, t) {
    return e.View.extend({initialize: function() {
            this.template = _.template(t("#export-dialog-template").html())
        },events: {"click .close": "close","click #dz-export": "export"},render: function() {
            this.$el.html(this.template());
            var e = this;
            return t(document).on("keydown", function(t) {
                t.which == 27 && e.close()
            }), this.delegateEvents(), this
        },close: function() {
            this.$("#export-dialog").fadeOut(200)
        },"export": function(e) {
            this.trigger("do-export"), this.close()
        }})
}), define("views/access_inspector", ["backbone", "jquery"], function(e, t) {
    return e.View.extend({initialize: function() {
            this.template = _.template(t("#access-inspector-template").html())
        },events: {"click [type=checkbox]": "preExecute","click #dz_allow_move": "allow_move","click #dz_allow_resize": "allow_resize","click #dz_allow_rotate": "allow_rotate","click #dz_allow_color_change": "allow_color_change","click #dz_allow_text_edit": "allow_text_edit","click #dz_allow_delete": "allow_delete","click #dz_always_top": "always_top","click #dz_always_bottom": "always_bottom"},render: function() {
            return this.$el.html(this.template()), this.$el.hide(), this.delegateEvents(), this
        },openInspector: function(e, t) {
            this.object = e, this.canvas = t, e.type == "text" ? this.$el.find("#dz-allow-text-edit-li").show() : this.$el.find("#dz-allow-text-edit-li").hide(), this.$el.find("#dz_allow_move").prop("checked", !e.lockMovementX), this.$el.find("#dz_allow_resize").prop("checked", !e.lockScalingX), this.$el.find("#dz_allow_rotate").prop("checked", !e.lockRotation), this.$el.find("#dz_allow_color_change").prop("checked", !e.lockColorChange), this.$el.find("#dz_allow_text_edit").prop("checked", !e.lockTextEdit), this.$el.find("#dz_allow_delete").prop("checked", !e.lockDelete), this.$el.find("#dz_allow_delete").prop("checked", !e.lockDelete), this.$el.find("#dz_always_top").prop("checked", !!e.alwaysOnTop), this.$el.find("#dz_always_bottom").prop("checked", !!e.alwaysOnBottom)
        },closeInspector: function() {
            this.$el.hide()
        },preExecute: function(e) {
            this.lock = !t(e.target).prop("checked")
        },allow_move: function() {
            this.object.lockMovementX = this.lock, this.object.lockMovementY = this.lock
        },allow_resize: function() {
            this.object.lockScalingX = this.lock, this.object.lockScalingY = this.lock
        },allow_rotate: function() {
            this.object.lockRotation = this.lock, this.object.setControlsVisibility({mtr: !this.lock}), this.canvas.renderAll()
        },allow_color_change: function() {
            this.object.lockColorChange = this.lock, this.trigger("allow-color-change")
        },allow_text_edit: function() {
            this.object.lockTextEdit = this.lock, this.trigger("allow-text-edit")
        },allow_delete: function() {
            this.object.lockDelete = this.lock, this.trigger("allow-delete")
        },always_top: function(e) {
            this.object.alwaysOnTop = t(e.target).prop("checked"), !0 === this.object.alwaysOnBottom && (this.object.alwaysOnBottom = !1, this.$el.find("#dz_always_bottom").prop("checked", !1)), this.trigger("always-top")
        },always_bottom: function(e) {
            this.object.alwaysOnBottom = t(e.target).prop("checked"), !0 === this.object.alwaysOnTop && (this.object.alwaysOnTop = !1, this.$el.find("#dz_always_top").prop("checked", !1)), this.trigger("always-bottom")
        }})
}), define("views/controls", ["backbone", "jquery", "collections/arts", "views/art_inspector", "views/text_inspector", "views/export_dialog", "views/access_inspector"], function(e, t, n, r, i, s, o) {
    return e.View.extend({orientation: "landscape",template: {portrait: _.template(t("#controls-portrait-template").html()),landscape: _.template(t("#controls-landscape-template").html())},options: {viewMode: "normal"},initialize: function(e) {
            _.extend(this.options, e.options), this.arts = new n(DizziOptions.clipArts.arts), this.textInspectorView = new i, this.artInspectorView = new r, DizziOptions.template_id && (this.accessInspectorView = new o);
            if (DizziOptions.template_id || DizziOptions.item_id)
                this.exportDialogView = new s
        },events: {"click #c-toggle-actions-menu": "toggleActionsMenu","click #c-actions-menu": "closeActionsMenu","click #c-save": "saveProduct","click #c-cancel": "closeDialog","click #c-pdf": "openExportDialog","click #c-toggle-zoom-menu": "toggleZoomMenu","click #c-zoom-menu": "closeZoomMenu","click #c-add-photo": "triggerSelectFile","change #c-photo-file": "insertPhoto","click #c-toggle-arts": "toggleArts","click #c-close-arts": "closeArts","click #c-arts .art": "insertArt","change .first-level": "selectCategory","change .second-level": "selectSubCategory","click #c-add-text": "insertText","click #tai-user-permissions": "toggleUserPermissions"},render: function() {
            return this.$el.html(this.template[this.orientation](_.extend({}, this.model.toJSON(), {imageId: this.options.imageId,arts: this.arts.toJSON(),categories: DizziOptions.clipArts.categories}))).addClass("controls-layer-view-holder"), this.$el.append(this.artInspectorView.render().$el), this.$el.append(this.textInspectorView.render().$el), DizziOptions.template_id && this.$el.append(this.accessInspectorView.render().$el), (DizziOptions.template_id || DizziOptions.item_id) && this.$el.append(this.exportDialogView.render().$el), this.$actionsMenu = this.$("#c-actions-menu"), this.$zoomMenu = this.$("#c-zoom-menu"), this.$arts = this.$("#c-arts"), this.$exportDialog = this.$("#export-dialog"), this.$actionsMenuBtn = this.$("#c-toggle-actions-menu"), this.$zoomMenuBtn = this.$("#c-toggle-zoom-menu"), this.handleViewMode(), this.delegateEvents(), this.iPhoneHack(), this
        },handleViewMode: function() {
            this.options.viewMode === "preview" ? (this.textInspectorView.closeInspector(), this.artInspectorView.closeInspector(), this.$el.find(".nav-button, .image-thumbnails").hide()) : this.$el.find(".nav-button, .image-thumbnails").show()
        },saveProduct: function() {
            this.trigger("save-product")
        },closeDialog: function() {
            this.trigger("close-dialog")
        },toggleActionsMenu: function() {
            this.$actionsMenu.toggle(), this.$actionsMenuBtn.toggleClass("dz-active")
        },closeActionsMenu: function() {
            this.$actionsMenu.hide(), this.$actionsMenuBtn.removeClass("dz-active")
        },toggleZoomMenu: function() {
            this.$zoomMenu.toggle(), this.$zoomMenuBtn.toggleClass("dz-active")
        },closeZoomMenu: function() {
            this.$zoomMenu.hide(), this.$zoomMenuBtn.removeClass("dz-active")
        },triggerSelectFile: function(e) {
            this.$el.find("#c-photo-file").trigger("click")
        },insertPhoto: function(e) {
            var t = e.target, n = this;
            if (t.files && t.files[0]) {
                var r = new FileReader;
                r.onload = function(e) {
                    var r = t.files[0].name.split(".").pop();
                    (r == "svg" || r == "svgz") && navigator.userAgent.indexOf("Firefox") == -1 && (r = "svgstring"), n.trigger("insert-custom-image", e.target.result, r)
                }, r.onerror = function(e) {
                    alert("This file is not loaded, due some error")
                }, r.readAsDataURL(t.files[0])
            }
        },toggleArts: function() {
            this.$arts.toggle()
        },closeArts: function() {
            this.$arts.hide()
        },insertArt: function(e) {
            var n = t(e.currentTarget).data("art-id");
            this.trigger("insert-art", this.arts.get(n).get("url")), this.closeArts()
        },selectCategory: function(e) {
            var n = t(e.target).find("option:selected"), r = parseInt(n.attr("value")), i = this.$el.find(".categories.second-level");
            i.find(':not([value="0"])').remove();
            if (r) {
                var s = [r], o = JSON.parse(decodeURIComponent(n.attr("subcategories")));
                o.length && (_.each(o, function(e) {
                    s.push(parseInt(e.id)), i.append("<option value='" + e.id + "'>" + e.name + "</option>")
                }), i.attr("parent", r).show()), this.$el.find(".art").each(function() {
                    var e = JSON.parse(t(this).attr("categories-id"));
                    _.intersection(s, e).length ? t(this).closest("li").show() : t(this).closest("li").hide()
                })
            } else
                i.hide(), this.$el.find("li:has(.art)").show()
        },selectSubCategory: function(e) {
            var n = parseInt(t(e.target).val());
            n ? this.$el.find(".art").each(function() {
                var e = JSON.parse(t(this).attr("categories-id"));
                e.indexOf(n) >= 0 ? t(this).closest("li").show() : t(this).closest("li").hide()
            }) : (this.$el.find(".first-level").val(this.$el.find(".second-level").attr("parent")), this.$el.find(".first-level").trigger("change"))
        },insertText: function() {
            this.trigger("insert-text")
        },onBodyClick: function(e) {
            var t = this.$(e.target);
            t.closest("#c-toggle-actions-menu").length == 0 && this.closeActionsMenu(), t.closest("#c-toggle-zoom-menu").length == 0 && this.closeZoomMenu(), t.closest("#c-toggle-arts, #c-arts").length == 0 && this.closeArts()
        },openExportDialog: function(e) {
            e.preventDefault(), this.$exportDialog.fadeIn(200)
        },toggleUserPermissions: function() {
            this.accessInspectorView.$el.toggle()
        },iPhoneHack: function() {
            navigator.userAgent.match(/iPhone/i) && window.screen.height == 960 / 2 && this.$el.find(".nav-button").addClass("iphone-4")
        }})
}), define("views/fabric", ["backbone", "jquery"], function(e, t) {
    return e.View.extend({className: "canvas",options: {viewMode: "normal"},opts: {object: {originX: "center",originY: "center",left: 0,top: 0,cornerSize: 30}},initialize: function(e) {
            _.extend(this.options, e.options)
        },render: function() {
            var e = this, n = t("<canvas/>");
            return this.$el.append(n), this.canvas = new fabric.Canvas(n.get(0), {selection: !1}), this.canvas.on("object:selected", function(t) {
                switch (t.target.type) {
                    case "text":
                        e.trigger("art-deselected"), e.trigger("text-selected", t.target, e.canvas);
                        break;
                    default:
                        e.trigger("text-deselected"), e.trigger("art-selected", t.target, e.canvas)
                }
            }).on("selection:cleared", function() {
                e.trigger("art-deselected"), e.trigger("text-deselected")
            }), this
        },initAfterInsert: function() {
            this.delegateEvents(), this.resizeCanvas()
        },resizeCanvas: function() {
            var e = this.$el.width() / this.canvas.getWidth();
            this._removePrintArea(), this.canvas.setWidth(this.$el.width()), this.canvas.setHeight(this.$el.height()), this.canvas.forEachObject(function(t) {
                t.scaleX *= e, t.scaleY *= e, t.left *= e, t.top *= e, t.setCoords()
            }), this._createPintArea(), this._renderPintArea()
        },insertArt: function(e, t) {
            var n = this;
            t = t ? t : e.split(".").pop(), fabric.Image.fromURL(e, function(r) {
                if (r.height && r.width)
                    r.setControlsVisibility({mt: !1,mr: !1,mb: !1,ml: !1}), n._setClipTo(r), n._makeFitPrintArea(r), n.canvas.add(r), n.canvas.setActiveObject(r), n._alwaysOnTop();
                else if (t == "svg" || t == "svgz") {
                    var i = [];
                    fabric.loadSVGFromURL(e, function(e, t) {
                        var r = new fabric.Group(i, n.opts.object);
                        r.setControlsVisibility({mt: !1,mr: !1,mb: !1,ml: !1}), n._setClipTo(r), n._makeFitPrintArea(r), n.canvas.add(r), n.canvas.setActiveObject(r), n._alwaysOnTop()
                    }, function(e, t) {
                        t.set("id", e.getAttribute("id")), i.push(t)
                    })
                }
            }, this.opts.object)
        },removeArt: function(e) {
            this.canvas.remove(e)
        },insertText: function() {
            var e = new fabric.Text("Insert your text", _.extend({}, this.opts.object, {fontFamily: "Lora",fontWeight: "normal",fontStyle: "normal",fontSize: 40,textAlign: "center",fill: "#000000"}));
            e.setControlsVisibility({mt: !1,mr: !1,mb: !1,ml: !1}), this._setClipTo(e), this.canvas.add(e), this._makeFitPrintArea(e), this.canvas.setActiveObject(e), this._alwaysOnTop()
        },removeText: function(e) {
            this.canvas.remove(e)
        },centerObjectH: function(e) {
            e.setLeft(this.printArea.left + this.printArea.getWidth() / 2), e.setCoords(), this.canvas.renderAll()
        },centerObjectV: function(e) {
            e.setTop(this.printArea.top + this.printArea.getHeight() / 2), e.setCoords(), this.canvas.renderAll()
        },bringObjectForward: function(e) {
            e.bringForward(!0), this._alwaysOnTop()
        },sendObjectBackwards: function(e) {
            e.sendBackwards(!0), this._alwaysOnBottom()
        },flipObjectX: function(e) {
            e.setFlipX(!e.getFlipX()), this.canvas.renderAll()
        },flipObjectY: function(e) {
            e.setFlipY(!e.getFlipY()), this.canvas.renderAll()
        },switchViewMode: function(e) {
            this.options.viewMode = e;
            var t = this.printArea.left, n = this.printArea.top, r = this.printArea.getWidth();
            this._createPintArea();
            var i = this.printArea.getWidth() / r, s = this.printArea.left - t * i, o = this.printArea.top - n * i;
            this.canvas.forEachObject(function(e) {
                e.scaleX *= i, e.scaleY *= i, e.left = e.left * i + s, e.top = e.top * i + o, e.setCoords()
            })
        },toJSON: function() {
            this._removePrintArea();
            var e = this.canvas.toJSON(["_controlsVisibility", "cornerSize", "lockMovementX", "lockMovementY", "lockScalingX", "lockScalingY", "lockRotation", "lockColorChange", "lockTextEdit", "lockDelete", "alwaysOnTop", "alwaysOnBottom"]);
            return _.each(e.objects, function(e) {
                delete e.clipTo
            }), this._renderPintArea(), e
        },loadFromJSON: function(e, t) {
            var n = this;
            this._renderPintArea(), this.canvas.loadFromJSON(e, function() {
                n.canvas.forEachObject(function(e) {
                    n._setClipTo(e)
                }), t && t()
            })
        },onBodyClick: function(t) {
            var n = e.$(t.target);
            t.target.nodeName != "CANVAS" && n.closest("#c-toggle-actions-menu,#c-toggle-zoom-menu," + "#ai-toggle-menu,#ai-art-menu," + "#ti-toggle-menu,#ti-text-menu,#ti-toggle-editor,#ti-text-editor," + "#c-zoom-in,#c-zoom-out," + "#c-add-text," + "#dz_access-inspector").length == 0 && this.canvas.discardActiveObject()
        },getPrintAreaImageData: function(e) {
            var t, n, r = e.height / e.width, i = this.printArea.getHeight() / this.printArea.getWidth();
            return i > r ? n = e.dpi / 25.4 * (e.height / this.printArea.getHeight()) : n = e.dpi / 25.4 * (e.width / this.printArea.getWidth()), this._removePrintArea(), this.canvas.setBackgroundColor("#ffffff", this.canvas.renderAll.bind(this.canvas)), t = this.canvas.toDataURL({format: "jpeg",left: this.printArea.left + 1,top: this.printArea.top + 1,width: this.printArea.getWidth() - 2,height: this.printArea.getHeight() - 2,multiplier: n}), this.canvas.setBackgroundColor("", this.canvas.renderAll.bind(this.canvas)), t
        },_createPintArea: function() {
            var e = this.canvas.getWidth(), t = this.canvas.getHeight();
            this.canvas.contains(this.printArea) && this._removePrintArea();
            if (this.model.useMask()) {
                var n = this, r = this.canvas.getWidth() / this.model.get("mask_width_orig"), i = JSON.parse(this.model.get("mask"));
                fabric.util.enlivenObjects([i], function(e) {
                    n.printArea = e[0], n.printArea.set("selectable", !1), n.printArea.set("opacity", 0), n.printArea.top *= r, n.printArea.left *= r, n.printArea.scaleX *= r, n.printArea.scaleY *= r
                }, null, null);
                if (this.options.viewMode == "zoom") {
                    var s = this.printArea.getWidth(), o = this.printArea.getHeight(), u = e / s, a = t / o, f = Math.min(u, a);
                    this.printArea.left = u <= a ? 0 : (e - s * f) / 2, this.printArea.top = u >= a ? 0 : (t - o * f) / 2, this.printArea.scaleX *= f, this.printArea.scaleY *= f
                }
            } else {
                var s = this.model.get("pa_width") / 100 * e, o = this.model.get("pa_height") / 100 * t;
                switch (this.options.viewMode) {
                    case "normal":
                    case "preview":
                        this.printArea = new fabric.Rect({left: this.model.get("pa_left") / 100 * e,top: this.model.get("pa_top") / 100 * t,width: s - 2,height: o - 2,stroke: this.options.viewMode !== "preview" && !parseInt(DizziOptions.template_id) ? this.model.get("pa_stroke") : null,strokeWidth: 1,strokeDashArray: [5, 5],fill: null,selectable: !1});
                        break;
                    case "zoom":
                        var u = e / s, a = t / o, f = Math.min(u, a);
                        this.printArea = new fabric.Rect({left: u <= a ? 0 : (e - s * f) / 2,top: u >= a ? 0 : (t - o * f) / 2,width: s * f - 2,height: o * f - 2,stroke: parseInt(DizziOptions.template_id) ? null : this.model.get("pa_stroke"),strokeWidth: 1,strokeDashArray: [5, 5],fill: null,selectable: !1})
                }
            }
            this.opts.object.left = this.printArea.left + this.printArea.getWidth() / 2, this.opts.object.top = this.printArea.top + this.printArea.getHeight() / 2
        },_renderPintArea: function() {
            this.canvas._objects.unshift(this.printArea), this.canvas._onObjectAdded(this.printArea), this.canvas.renderAll()
        },_removePrintArea: function() {
            this.canvas.remove(this.printArea)
        },_makeFitPrintArea: function(e) {
            e.getWidth() > this.printArea.getWidth() && e.scaleToWidth(this.printArea.getWidth()), e.getHeight() > this.printArea.getHeight() && e.scaleToHeight(this.printArea.getHeight())
        },_setClipTo: function(e) {
            var t = this;
            switch (e.type) {
                case "text":
                case "image":
                    e.setClipTo(function(e) {
                        var n = 1 / this.scaleX * (this.flipX ? -1 : 1), r = 1 / this.scaleY * (this.flipY ? -1 : 1);
                        e.save(), e.rotate((this.flipX ^ this.flipY ? 1 : -1) * this.angle / 180 * Math.PI), e.scale(n, r), e.translate(-this.left, -this.top), t.printArea.opacity = 0, t.printArea.render(e), t.printArea.opacity = 1, e.restore()
                    });
                    break;
                case "group":
                    e.setClipTo(function(e) {
                        e.save(), e.translate(0, 0), t.printArea.opacity = 0, t.printArea.render(e), t.printArea.opacity = 1, e.restore()
                    })
            }
        },_alwaysOnTop: function() {
            var e = this;
            this.canvas.forEachObject(function(t) {
                !0 === t.alwaysOnTop && e.canvas.bringToFront(t)
            })
        },_alwaysOnBottom: function() {
            var e = this;
            this.canvas.forEachObject(function(t) {
                !0 === t.alwaysOnBottom && e.canvas.sendToBack(t)
            }), this.printArea.sendToBack()
        }})
}), define("views/image", ["backbone", "jquery", "views/fabric"], function(e, t, n) {
    return e.View.extend({options: {viewMode: "normal",previousImage: null,nextImage: null},initialize: function(e) {
            _.extend(this.options, e.options)
        },template: _.template(t("#image-template").html()),render: function() {
            return this.$el.html(this.template(t.extend(this.model.toJSON(), {previousImage: this.options.previousImage,nextImage: this.options.nextImage}))), this.model.fabricView ? this.model.fabricView.switchViewMode(this.options.viewMode) : (this.model.fabricView = new n({model: this.model,options: {viewMode: this.options.viewMode}}), this.model.fabricView.render()), this.$("img.dizzi-product").css({visibility: this.options.viewMode == "zoom" ? "hidden" : "visible"}), this.$(".previous-image, .next-image").toggle(this.options.viewMode == "normal"), this.$(".image-inner-wrapper").append(this.model.fabricView.$el), this
        },initAfterInsert: function() {
            this.resizeImage(), this.model.fabricView.$el.css({opacity: 0}).animate({opacity: 1}, 200), this.model.fabricView.initAfterInsert()
        },resizeImage: function() {
            var e = this.$("img.dizzi-product");
            if (e.width() == 0) {
                _.debounce(t.proxy(this.resizeImage, this), 200)();
                return
            }
            e.addClass("init");
            var n = e.parents(".designer-area"), r = e.parents(".image-holder"), i = n.width(), s = r.width() - e.width(), o = e.width() / e.height(), u = t(window).height() - e.offset().top - 30, a = u * o;
            a + s > i && (a = i - s, u = parseInt(a / o)), e.width(a).height(u).removeClass("init")
        }})
}), define("views/product", ["backbone", "jquery", "views/controls", "views/image"], function(e, t, n, r) {
    return e.View.extend({template: _.template(t("#product-template").html()),events: {"swipeleft .dizzi-product": "switchToPreviousImage","swiperight .dizzi-product": "switchToNextImage"},options: {imageId: null,viewMode: "normal"},initialize: function(e) {
            _.extend(this.options, e.options), this._setImage(), t(window).on("resize", _.debounce(_.bind(this.onWindowResize, this), 200)), t("body").on("click", _.bind(this.onBodyClick, this)), this.controlsView = new n({model: this.model,options: {imageId: this.image.id,viewMode: this.options.viewMode}}), this.imageView = null
        },initAfterInsert: function() {
            this.imageView.initAfterInsert(), this._addListeners()
        },render: function() {
            return this.$el.html(this.template(this.model.toJSON())), this.$el.trigger("create"), this.$imageHolder = this.$(".image-holder"), this._updateViewModeAttr(), this._renderImage(), this._renderControls(), this
        },changeImage: function(e, t) {
            t = t || "normal", this.options.imageId = e, this.options.viewMode = t, this.controlsView.options.viewMode = t, this._removeListeners(), this._setImage(), this._updateViewModeAttr(), this._renderImage(), this.controlsView.handleViewMode(), this.initAfterInsert(), this.$("ul.image-thumbnails li").removeClass("active"), this.$("li#image-thumbnail-" + e).addClass("active"), this.$("#c-zoom-in").prop("href", "#!/" + e + "/zoom"), this.$("#c-zoom-out").prop("href", "#!/" + e), this.$(".preview-in").prop("href", "#!/" + e + "/preview"), this.$(".preview-out").prop("href", "#!/" + e)
        },onWindowResize: function() {
            this._resizeControls(), this.imageView.resizeImage(), this.imageView.model.fabricView.resizeCanvas()
        },switchToNextImage: function() {
            var e = this._getNextImage();
            location.href = "#!/:image_id".replace(":image_id", e.id)
        },switchToPreviousImage: function() {
            var e = this._getPreviousImage();
            location.href = "#!/:image_id".replace(":image_id", e.id)
        },onBodyClick: function(e) {
            this.trigger("body-click", e)
        },saveProduct: function() {
            var e = this, t = this.imageView.model.fabricView.canvas, n = this.imageView.model.get("id"), r = 1, i = [], s = [], o;
            this.model.images.each(function(u) {
                e.changeImage(u.get("id"));
                var a = e.imageView.model.fabricView;
                DizziOptions.template_id && e.resizeCanvasAndRemoveCss(600, 600), i.push({id: u.get("id"),cw: a.canvas.width,ch: a.canvas.height,data: a.toJSON()}), fabric.Image.fromURL(u.get("url"), function(f) {
                    e.changeImage(u.get("id"));
                    if (u.get("is_general_image") || DizziOptions.is_product_page)
                        t = e.imageView.model.fabricView.canvas, t.deactivateAll().renderAll(), DizziOptions.template_id || (t._objects.unshift(f), t._onObjectAdded(f)), a._removePrintArea(), s.push({id: u.get("id"),single: t.toDataURL(e._dataUrlOpts("single", u)),thumbnail: t.toDataURL(e._dataUrlOpts("thumbnail", u)),full: t.toDataURL(e._dataUrlOpts("full", u))}), u.get("is_general_image") && (o = t.toDataURL(e._dataUrlOpts("full", u))), DizziOptions.template_id || t.remove(f);
                    r === e.model.images.length && (e.changeImage(n), e.replaceAllPreviews(s, o), e.saveData(i, o), e.closeDialog()), r++
                }, {height: t.height,width: t.width})
            })
        },closeDialog: function() {
            t("#dizzi-dialog").dialog && parent.jQuery("#dizzi-dialog").dialog("close")
        },resizeCanvasAndRemoveCss: function(e, t) {
            var n = this.imageView.model.fabricView;
            n.$el.css({height: e,width: t}), n.resizeCanvas(), n.$el.css({height: "",width: ""})
        },saveData: function(e, n) {
            e = JSON.stringify(e);
            if (DizziOptions.state_params && DizziOptions.state_params.ajax_save) {
                var r = DizziOptions.state_params;
                t.ajax({url: DizziOptions.urls.ajaxUrl + "?action=dz_save_canvas_data",type: "POST",data: {dz_canvas_data: e,dz_cart_preview: n,item_identifier: r.item_identifier},success: function(e) {
                    }})
            } else
                t("[name='dz_canvas_data']", parent.document).val(e), t("[name='dz_cart_preview']", parent.document).val(n)
        },replaceAllPreviews: function(e, n) {
            if (DizziOptions.item_key) {
                var r = DizziOptions.item_key;
                t(".dz-thumbnail-image[dz-cart-item-key='" + r + "']", parent.document).attr("src", n)
            } else if (DizziOptions.template_id)
                t(".dz-template-preview-big", parent.document).attr("src", n);
            else
                for (var i in e) {
                    var s = e[i], o, u;
                    o = t(".attachment-shop_single.dz-thumbnail-image[dz-image-id=" + s.id + "]", parent.document), o.attr("src", s.single), o.closest("a").attr("href", s.full), u = t(".attachment-shop_thumbnail.dz-thumbnail-image[dz-image-id=" + s.id + "]", parent.document), u.attr("src", s.thumbnail)
                }
        },_dataUrlOpts: function(e, t) {
            var n, r;
            switch (e) {
                case "single":
                    r = t.get("single_image_height"), n = t.get("single_image_width");
                    break;
                case "thumbnail":
                    r = t.get("shop_thumbnail_height"), n = t.get("shop_thumbnail_width");
                    break;
                case "full":
                    r = t.get("height"), n = t.get("width")
            }
            var i = this.imageView.model.fabricView.canvas, s = n / r, o = i.width / i.height, u = s > o ? i.width : i.height * s, a = s > o ? i.width / s : i.height, f = n / u, l = (i.width - u) / 2, c = (i.height - a) / 2;
            return {width: u,height: a,multiplier: f,left: l,top: c}
        },loadCanvasDataIfExist: function() {
            var e = this;
            if (DizziOptions.state_params && "dz_canvas_data" in DizziOptions.state_params) {
                var t = JSON.parse(DizziOptions.state_params.dz_canvas_data);
                if (t.length) {
                    var n = 0, r = function(i) {
                        e.changeImage(i.id);
                        var s = e.imageView.model.fabricView, o = s.canvas.height, u = s.canvas.width;
                        e.resizeCanvasAndRemoveCss(i.ch, i.cw), s.loadFromJSON(i.data, function() {
                            e.resizeCanvasAndRemoveCss(o, u), ++n < t.length ? r(t[n]) : e.changeImage(e.model.images.first().get("id"))
                        })
                    };
                    r(t[n])
                }
            }
            if ("templates" in DizziOptions && DizziOptions.templates.length) {
                for (var n in DizziOptions.templates) {
                    var i = DizziOptions.templates[n];
                    this.changeImage(i.image_id);
                    var s = i.template_state, o = this.imageView.model.fabricView.canvas.getWidth() / s.canvas.width;
                    for (var n in i.data.objects) {
                        var u = i.data.objects[n];
                        u.left = (u.left * s.scaleX + s.left) * o, u.top = (u.top * s.scaleY + s.top) * o, u.scaleX = u.scaleX * s.scaleX * o, u.scaleY = u.scaleY * s.scaleY * o, u.angle += s.angle
                    }
                    this.imageView.model.fabricView.loadFromJSON(i.data, function() {
                        e.changeImage(e.model.images.first().get("id")), e.imageView.model.fabricView.canvas.renderAll()
                    })
                }
                this.changeImage(this.model.images.first().get("id")), this.imageView.model.fabricView.canvas.renderAll()
            }
        },getUrlParameter: function(e) {
            var t = window.location.search.substring(1), n = t.split("&");
            for (var r = 0; r < n.length; r++) {
                var i = n[r].split("=");
                if (i[0] == e)
                    return i[1]
            }
            return ""
        },"export": function() {
            var e = this.controlsView.$exportDialog.find("form"), t = {height: parseInt(e.find("[name=height]").val()),width: parseInt(e.find("[name=width]").val()),dpi: parseInt(e.find("[name=dpi]").val()),color_scheme: parseInt(e.find("[name=color_scheme]:checked").val()),order: parseInt(this.getUrlParameter("order")) || DizziOptions.template_id};
            if (!t.height || !t.width || !t.dpi || !t.order) {
                alert("The export options are not valid");
                return
            }
            if (e.find("[name=all]:checked").val() == "1") {
                var n = this, r = [], i = n.imageView.model.get("id");
                this.model.images.each(function(e) {
                    n.changeImage(e.get("id"));
                    var i = n.imageView.model.fabricView;
                    i.canvas._objects.length > 1 && r.push(i.getPrintAreaImageData(t))
                }), n._generatePDF(r, t), n.changeImage(i)
            } else {
                var s = this.imageView.model.fabricView;
                this._generatePDF([s.getPrintAreaImageData(t)], t)
            }
        },_setImage: function() {
            this.options.imageId ? (this.image = this.model.images.get(this.options.imageId), this.imageIndex = this.model.images.indexOf(this.image)) : (this.image = this.model.images.at(0), this.imageIndex = 0)
        },_generatePDF: function(e, n) {
            var r = t('<form action="' + DizziOptions.urls.ajaxUrl + '?action=dz_export_pdf" method="POST"></form>');
            for (var i in e)
                r.append('<input type="hidden" name="content_images[]" value="' + e[i] + '">');
            for (var s in n)
                r.append('<input type="hidden" name="' + s + '" value="' + n[s] + '">');
            r.appendTo(t("body", parent.document)).get(0).submit(), r.remove()
        },_getNextImage: function() {
            return this.model.images.at(this.imageIndex == this.model.images.length - 1 ? 0 : this.imageIndex + 1)
        },_getPreviousImage: function() {
            return this.model.images.at(this.imageIndex == 0 ? this.model.images.length - 1 : this.imageIndex - 1)
        },_renderImage: function() {
            return this.imageView && this.imageView.remove(), this.imageView = new r({model: this.image,options: {previousImage: this._getPreviousImage(),nextImage: this._getNextImage(),viewMode: this.options.viewMode}}), this.imageView.render(), this.imageView.$el.appendTo(this.$imageHolder), this.options.viewMode == "preview" && this.imageView.model.fabricView.canvas.deactivateAll().renderAll(), this
        },_renderControls: function() {
            this._applyOrientation(), this.$el.append(this.controlsView.render().$el), this.$el.trigger("create")
        },_resizeControls: function() {
            this._applyOrientation() && (this.controlsView.$el.remove(), this.$el.append(this.controlsView.render().$el), this.$el.trigger("create"), this.imageView.model.fabricView.canvas.discardActiveObject())
        },_applyOrientation: function() {
            var e = t(window).width() >= 1e3 ? "landscape" : "portrait";
            this.$el.removeClass("orientation-landscape orientation-portrait").addClass("orientation-" + e), this.$el.show();
            var n = this.controlsView.orientation != e;
            return this.controlsView.orientation = e, this.controlsView.artInspectorView.orientation = e, this.controlsView.textInspectorView.orientation = e, n
        },_updateViewModeAttr: function() {
            this.$el.attr({"view-mode": this.options.viewMode})
        },_addListeners: function() {
            var e = this.imageView.model.fabricView, t = this.controlsView, n = this.controlsView.artInspectorView, r = this.controlsView.textInspectorView;
            e.listenTo(t, "insert-custom-image", e.insertArt), e.listenTo(t, "insert-art", e.insertArt), e.listenTo(t, "insert-text", e.insertText), e.listenTo(n, "redraw-canvas", e.canvas.renderAll.bind(e.canvas)), e.listenTo(n, "remove-art", e.removeArt), e.listenTo(n, "center-art-h", e.centerObjectH), e.listenTo(n, "center-art-v", e.centerObjectV), e.listenTo(n, "bring-art-forward", e.bringObjectForward), e.listenTo(n, "send-art-backwards", e.sendObjectBackwards), e.listenTo(n, "flip-art-x", e.flipObjectX), e.listenTo(n, "flip-art-y", e.flipObjectY), e.listenTo(r, "redraw-canvas", e.canvas.renderAll.bind(e.canvas)), e.listenTo(r, "remove-text", e.removeText), e.listenTo(r, "center-text-h", e.centerObjectH), e.listenTo(r, "center-text-v", e.centerObjectV), e.listenTo(r, "bring-text-forward", e.bringObjectForward), e.listenTo(r, "send-text-backwards", e.sendObjectBackwards), e.listenTo(r, "flip-text-x", e.flipObjectX), e.listenTo(r, "flip-text-y", e.flipObjectY), e.listenTo(this, "body-click", e.onBodyClick), t.listenTo(this, "body-click", t.onBodyClick), n.listenTo(this, "body-click", n.onBodyClick), r.listenTo(this, "body-click", r.onBodyClick), n.listenTo(e, "art-selected", n.openInspector), n.listenTo(e, "art-deselected", n.closeInspector), r.listenTo(e, "text-selected", r.openInspector), r.listenTo(e, "text-deselected", r.closeInspector);
            if (DizziOptions.template_id) {
                var i = this.controlsView.accessInspectorView;
                i.listenTo(e, "art-selected", i.openInspector), i.listenTo(e, "text-selected", i.openInspector), i.listenTo(e, "art-deselected", i.closeInspector), i.listenTo(e, "text-deselected", i.closeInspector), r.listenTo(i, "allow-color-change", r.allowColorChange), n.listenTo(i, "allow-color-change", n.allowColorChange), r.listenTo(i, "allow-text-edit", r.allowEditText), r.listenTo(i, "allow-delete", r.allowDelete), n.listenTo(i, "allow-delete", n.allowDelete), e.listenTo(i, "always-top", e._alwaysOnTop), e.listenTo(i, "always-bottom", e._alwaysOnBottom)
            }
            this.listenTo(t, "save-product", this.saveProduct), this.listenTo(t, "close-dialog", this.closeDialog), (DizziOptions.template_id || DizziOptions.item_id) && this.listenTo(t.exportDialogView, "do-export", this.export)
        },_removeListeners: function() {
            var e = this.imageView.model.fabricView, t = this.controlsView, n = this.controlsView.artInspectorView, r = this.controlsView.textInspectorView;
            e.stopListening(), t.stopListening(), n.stopListening(), r.stopListening(), this.stopListening()
        }})
}), require.config({baseUrl: DizziOptions.urls.pluginUrl + "/frontend/resources/js/app"}), define("backbone", [], function() {
    return Backbone
}), define("jquery", [], function() {
    return jQuery
}), require(["backbone", "jquery", "models/product", "views/product"], function(e, t, n, r) {
    e.View.prototype.close = function() {
        this.beforeClose && this.beforeClose(), this.remove(), this.unbind()
    };
    var i = e.Router.extend({initialize: function(e) {
            this.product = new n(e.data)
        },routes: {"": "showImage","!/:image_id": "showImage","!/:image_id/:view_mode": "showImage"},showImage: function(e, n) {
            n || (n = "normal"), this.productView ? this.productView.changeImage(e, n) : (this.productView = new r({model: this.product,options: {imageId: e,viewMode: n}}), this.productView.render(), this.productView.$el.attr("data-role", "page"), this.productView.$el.appendTo(t("body")), t.mobile.changePage(this.productView.$el, {changeHash: !1}), this.productView.initAfterInsert(), this.productView.loadCanvasDataIfExist())
        }}), s = new i({data: DizziOptions.product});
    e.history.start()
}), define("main", function() {
});
