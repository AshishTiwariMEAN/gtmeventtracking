import { angulartics2, GoogleAnalyticsSettings, UserTimings } from 'gtmeventtracking';
export declare class GoogleAnalyticsDefaults implements GoogleAnalyticsSettings {
    additionalAccountNames: any[];
    userId: any;
    transport: string;
}
export declare class Angulartics2GoogleAnalytics {
    private angulartics2;
    dimensionsAndMetrics: any[];
    constructor(angulartics2: gtmeventtracking);
    pageTrack(path: string): void;
    /**
     * Track Event in GA
     *
     * @param action Associated with the event
     * @param properties Comprised of:
     *  - category (string) and optional
     *  - label (string)
     *  - value (integer)
     *  - noninteraction (boolean)
     *
     * @link https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     */
    eventTrack(action: string, properties: any): void;
    /**
     * Exception Track Event in GA
     *
     * @param properties Comprised of the optional fields:
     *  - fatal (string)
     *  - description (string)
     *
     * @https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     */
    exceptionTrack(properties: any): void;
    /**
     * User Timings Event in GA
     * @name userTimings
     *
     * @param properties Comprised of the mandatory fields:
     *  - timingCategory (string)
     *  - timingVar (string)
     *  - timingValue (number)
     * Properties can also have the optional fields:
     *  - timingLabel (string)
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings
     */
    userTimings(properties: UserTimings): void;
    setUsername(userId: string): void;
    setUserProperties(properties: any): void;
    private setDimensionsAndMetrics(properties);
}
