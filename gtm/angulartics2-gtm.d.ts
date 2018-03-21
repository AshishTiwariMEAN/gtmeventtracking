import { Angulartics2, GoogleTagManagerSettings } from 'angulartics2';
export declare class GoogleTagManagerDefaults implements GoogleTagManagerSettings {
    userId: any;
}
export declare class Angulartics2GoogleTagManager {
    protected angulartics2: Angulartics2;
    constructor(angulartics2: Angulartics2);
    pageTrack(path: string): void;
    /**
     * Send interactions to the dataLayer, i.e. for event tracking in Google Analytics
     *
     * @param action associated with the event
     * @param properties
     * @param {string} properties.category
     * @param {string} [properties.label]
     * @param {number} [properties.value]
     * @param {boolean} [properties.noninteraction]
     */
    eventTrack(action: string, properties: any): void;
    /**
     * Exception Track Event in GTM
     *
     * @param {Object} properties
     * @param {string} properties.appId
     * @param {string} properties.appName
     * @param {string} properties.appVersion
     * @param {string} [properties.description]
     * @param {boolean} [properties.fatal]
     */
    exceptionTrack(properties: any): void;
    /**
     * Set userId for use with Universal Analytics User ID feature
     *
     * @param userId used to identify user cross-device in Google Analytics
     */
    setUsername(userId: string): void;
}
