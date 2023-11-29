sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "at/clouddna/training01/zalexapp1/data/formatter/Formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, JSONModel, Fragment, Formatter) {
    /* ... */
        "use strict";

        return Controller.extend("at.clouddna.training01.zalexapp1.controller.Customer", {
            _fragmentList: {},

            formatter: Formatter,
            onInit: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                const oEditModel = new JSONModel({
                    editmode: false
                });
            
                this.setContentDensity();
            
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
            
            setContentDensity : function() {
                if (!this._sContentDensityClass) {
                    if (!sap.ui.Device.support.touch) {
                        this._sContentDensityClass = "sapUiSizeCompact";
                    } else {
                        this._sContentDensityClass = "sapUiSizeCozy";
                    }
                }
                return this._sContentDensityClass;
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
