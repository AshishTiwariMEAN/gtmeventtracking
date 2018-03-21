import { ModuleWithProviders, Provider } from '@angular/core';
import { Angulartics2Settings } from './angulartics2-config';
export declare class Angulartics2Module {
    static forRoot(providers: Provider[], settings?: Partial<Angulartics2Settings>): ModuleWithProviders;
}
