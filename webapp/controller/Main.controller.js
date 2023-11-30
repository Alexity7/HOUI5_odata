sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "at/clouddna/training01/zalexapp1/data/formatter/Formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Formatter) {
        "use strict";

        return Controller.extend("at.clouddna.training01.zalexapp1.controller.Main", {

            formatter: Formatter,

            onInit: function () {

            },

            dateFormatter: function (sDate) {
                let dateObj = new Date(sDate);
                return dateObj.getDate() + "." + (dateObj.getMonth() + 1) + "." + dateObj.getFullYear();
            },

            onListItemClicked: function(oEvent) {
                const sPath = oEvent.getSource().getBindingContext().getPath();
            
                this.getOwnerComponent().getRouter().navTo("RouteCustomer", {
                    path: encodeURIComponent(sPath)
                }, false);
            },
            onCreatePressed: function(oEvent){

                let oModel = getView().getModel();
            }
        }
);
    });
