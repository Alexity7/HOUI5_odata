/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"atclouddnatraining01/zalexapp1/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
