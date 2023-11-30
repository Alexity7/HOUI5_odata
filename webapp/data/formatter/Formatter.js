sap.ui.define([], function () {
    "use strict";
    return {
        gender: function (sKey) {
            let oView = this.getView(),
                oI18nModel = oView.getModel("i18n"),
                oResourceBundle = oI18nModel.getResourceBundle(),
                sText;

            if (sKey === 1) {
                sText = oResourceBundle.getText("female");
            } else {

                sText = oResourceBundle.getText("male");
            }
            return sText;
        }
    }
});