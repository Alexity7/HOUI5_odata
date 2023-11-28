sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("at.clouddna.training01.zalexapp1.controller.Customer", {
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("RouteCustomer").attachPatternMatched(this._onPatternMatched, this);
            },
            _onPatternMatched: function(oEvent) {
                let sPath = oEvent.getParameters().arguments["path"];
                sPath = decodeURIComponent(sPath);
                this.getView().bindElement( sPath );
            },
            genderFormatter: function(sKey){
                let oView = this.getView();
                let oI18nModel = oView.getModel("i18n");
                let oResourceBundle = oI18nModel.getResourceBundle();
                let sText = oResourceBundle.getText(sKey);
                return sText;
            }
        });
    });
