sap.ui.define([
    "at/clouddna/training01/zalexapp1/controller/BaseController",
    "at/clouddna/training01/zalexapp1/data/formatter/Formatter",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, Formatter, MessageBox) {
        "use strict";

        return BaseController.extend("at.clouddna.training01.zalexapp1.controller.Main", {

            formatter: Formatter,

            onInit: function () {
                
            },

            dateFormatter: function (sDate) {
                let dateObj = new Date(sDate);
                return dateObj.getDate() + "." + (dateObj.getMonth() + 1) + "." + dateObj.getFullYear();
            },

            onListItemClicked: function (oEvent) {
                const sPath = oEvent.getSource().getBindingContext().getPath();

                this.getOwnerComponent().getRouter().navTo("RouteCustomer", {
                    path: encodeURIComponent(sPath)
                }, false);
            },
            onCreatePressed: function () {
                this.getOwnerComponent().getRouter().navTo("CreateCustomer", null, false);
            },
            onDeletePressed: function (oEvent) {

                let sSelectedPath = oEvent.getParameter("listItem").getBindingContext().getPath();

                this.getView().getModel().remove(sSelectedPath, {
                    success: function (oData, response) {
                        this.getView().getModel().refresh();
                        MessageBox.success("Erfolgreich gelöscht");
                    }.bind(this),
                    error: (oError) => {
                        console.error(oError);
                    }
                });
            }
        }
        );
    });
