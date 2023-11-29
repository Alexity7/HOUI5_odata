sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, JSONModel, Fragment) {
    /* ... */
        "use strict";

        return Controller.extend("at.clouddna.training01.zalexapp1.controller.Customer", {
            _fragmentList: {},
            onInit: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                const oEditModel = new JSONModel({
                    editmode: false
                });
            
                /*this.setContentDensity();*/
            
                this.getView().setModel(oEditModel, "editModel");
            
                this._showCustomerFragment("CustomerDisplay");

                oRouter.getRoute("RouteCustomer").attachPatternMatched(this._onPatternMatched, this);
                /*oRouter.getRoute("CreateCustomer").attachPatternMatched(this._onCreatePatternMatched, this);*/
            },

            _showCustomerFragment: function(sFragmentName) {
                let page = this.getView().byId("ObjectPageLayout");
                
                page.removeAllSections();
                
                if(this._fragmentList[sFragmentName]) {
                    page.addSection(this._fragmentList[sFragmentName]);
                } else {
                    Fragment.load({
                        id: this.getView().createId(sFragmentName),
                        name: "at.clouddna.training01.zalexapp1.view.fragment." + sFragmentName,
                        controller: this
                    }).then(function(oFragment) {
                        this._fragmentList[sFragmentName] = oFragment;
                        page.addSection(this._fragmentList[sFragmentName]);
                    }.bind(this));
                }
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
            },
            onEditPressed: function(){
                this._toggleEdit(true);
            },
            _toggleEdit: function(bEditMode){
                let oEditModel = this.getView().getModel("editModel");
                        
                oEditModel.setProperty("/editmode", bEditMode);
                        
                this._showCustomerFragment(bEditMode ? "CustomerEdit" : "CustomerDisplay");
              },
            
            onSavePressed: function(){
                let oModel = this.getView().getModel();
                let oData = oModel.getData();
                MessageBox.success(JSON.stringify(oData));
            
                this._toggleEdit(false);
            },
            
            onCancelPressed: function(){
                this._toggleEdit(false);
            },
        });
    });
