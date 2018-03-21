import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Angulartics2 } from 'angulartics2';

var Angulartics2Clicky = (function () {
    function Angulartics2Clicky(angulartics2, titleService) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.titleService = titleService;
        if (typeof clicky === 'undefined') {
            console.warn('Angulartics 2 Clicky Plugin: clicky global not found');
        }
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventOrGoalTrack(x.action, x.properties); });
    }
    Angulartics2Clicky.prototype.pageTrack = function (path) {
        var title = this.titleService.getTitle();
        clicky.log(path, title, 'pageview');
    };
    Angulartics2Clicky.prototype.eventOrGoalTrack = function (action, properties) {
        if (typeof properties.goal === 'undefined') {
            var title = properties.title || null;
            var type = properties.type != null ? this.validateType(properties.type) : null;
            clicky.log(action, title, type);
        }
        else {
            var goalId = properties.goal;
            var revenue = properties.revenue;
            clicky.goal(goalId, revenue, !!properties.noQueue);
        }
    };
    Angulartics2Clicky.prototype.validateType = function (type) {
        var EventType = ['pageview', 'click', 'download', 'outbound'];
        return EventType.indexOf(type) > -1 ? type : 'pageview';
    };
    Angulartics2Clicky.decorators = [
        { type: Injectable },
    ];
    Angulartics2Clicky.ctorParameters = function () { return [
        { type: Angulartics2, },
        { type: Title, },
    ]; };
    return Angulartics2Clicky;
}());

export { Angulartics2Clicky };
//# sourceMappingURL=clicky.es2015.js.map
