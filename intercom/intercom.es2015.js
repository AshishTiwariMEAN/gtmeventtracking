import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

var Angulartics2Intercom = (function () {
    function Angulartics2Intercom(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.setUserProperties
            .subscribe(function (x) { return _this.setUserProperties(x); });
        this.angulartics2.setUserPropertiesOnce
            .subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2Intercom.prototype.pageTrack = function (path) {
        try {
            this.eventTrack('Pageview', {
                url: path
            });
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Intercom.prototype.eventTrack = function (action, properties) {
        try {
            Intercom('trackEvent', action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Intercom.prototype.setUserProperties = function (properties) {
        try {
            if (properties.userId && !properties.user_id) {
                properties.user_id = properties.userId;
            }
            Intercom('boot', properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Intercom.decorators = [
        { type: Injectable },
    ];
    Angulartics2Intercom.ctorParameters = function () { return [
        { type: Angulartics2, },
    ]; };
    return Angulartics2Intercom;
}());

export { Angulartics2Intercom };
//# sourceMappingURL=intercom.es2015.js.map
