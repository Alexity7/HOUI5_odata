sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("at.clouddna.training01.zalexapp1.controller.Main", {
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
        }
);
    });
