import { Location } from '@angular/common';
import { Angulartics2 } from 'angulartics2';
export declare class Angulartics2AdobeAnalytics {
    private angulartics2;
    private location;
    constructor(angulartics2: Angulartics2, location: Location);
    pageTrack(path: string): void;
    /**
     * Track Event in Adobe Analytics
     *
     * @param action associated with the event
     * @param properties action detials
     * @param {string} properties.category
     * @param {string} [properties.label]
     * @param {number} [properties.value]
     * @param {boolean} [properties.noninteraction]
     *
     * @link https://marketing.adobe.com/resources/help/en_US/sc/implement/js_implementation.html
     */
    eventTrack(action: string, properties: any): void;
    private setPageName();
    setUserProperties(properties: any): void;
}
