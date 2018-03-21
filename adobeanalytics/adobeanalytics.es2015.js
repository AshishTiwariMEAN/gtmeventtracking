import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

var Angulartics2AdobeAnalytics = (function () {
    function Angulartics2AdobeAnalytics(angulartics2, location) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.location = location;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.setUserProperties
            .subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2AdobeAnalytics.prototype.pageTrack = function (path) {
        if (typeof s !== 'undefined' && s) {
            s.clearVars();
            s.t({ pageName: path });
        }
    };
    Angulartics2AdobeAnalytics.prototype.eventTrack = function (action, properties) {
        if (!properties) {
            properties = properties || {};
        }
        if (typeof s !== 'undefined' && s) {
            if (typeof properties === 'object') {
                this.setUserProperties(properties);
            }
            if (action) {
                var linkName = (properties['linkName']) ? properties['linkName'] : action;
                var disableDelay = !!properties['disableDelay'] ? true : this;
                if (properties['action']) {
                    action = properties['action'];
                }
                this.setPageName();
                if (action.toUpperCase() === 'DOWNLOAD') {
                    s.tl(disableDelay, 'd', linkName);
                }
                else if (action.toUpperCase() === 'EXIT') {
                    s.tl(disableDelay, 'e', linkName);
                }
                else {
                    s.tl(disableDelay, 'o', linkName);
                }
            }
        }
    };
    Angulartics2AdobeAnalytics.prototype.setPageName = function () {
        var path = this.location.path(true);
        var hashNdx = path.indexOf('#');
        if (hashNdx > 0 && hashNdx < path.length) {
            s.pageName = path.substring(hashNdx + 1);
        }
        else {
            s.pageName = path;
        }
    };
    Angulartics2AdobeAnalytics.prototype.setUserProperties = function (properties) {
        if (typeof s !== 'undefined' && s) {
            if (typeof properties === 'object') {
                for (var key in properties) {
                    if (properties.hasOwnProperty(key)) {
                        s[key] = properties[key];
                    }
                }
            }
        }
    };
    Angulartics2AdobeAnalytics.decorators = [
        { type: Injectable },
    ];
    Angulartics2AdobeAnalytics.ctorParameters = function () { return [
        { type: Angulartics2, },
        { type: Location, },
    ]; };
    return Angulartics2AdobeAnalytics;
}());

export { Angulartics2AdobeAnalytics };
//# sourceMappingURL=adobeanalytics.es2015.js.map
