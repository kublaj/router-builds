import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/every';
import 'rxjs/add/observable/from';
import { Observable } from 'rxjs/Observable';
import { RouterConfig } from './config';
import { ActivatedRoute, RouterState, RouterStateSnapshot } from './router_state';
import { Params } from './shared';
import { UrlTree } from './url_tree';
export interface NavigationExtras {
    relativeTo?: ActivatedRoute;
    queryParams?: Params;
    fragment?: string;
}
/**
 * An event triggered when a navigation starts
 */
export declare class NavigationStart {
    id: number;
    url: string;
    constructor(id: number, url: string);
    toString(): string;
}
/**
 * An event triggered when a navigation ends successfully
 */
export declare class NavigationEnd {
    id: number;
    url: string;
    urlAfterRedirects: string;
    constructor(id: number, url: string, urlAfterRedirects: string);
    toString(): string;
}
/**
 * An event triggered when a navigation is canceled
 */
export declare class NavigationCancel {
    id: number;
    url: string;
    constructor(id: number, url: string);
    toString(): string;
}
/**
 * An event triggered when a navigation fails due to unexpected error
 */
export declare class NavigationError {
    id: number;
    url: string;
    error: any;
    constructor(id: number, url: string, error: any);
    toString(): string;
}
/**
 * An event triggered when routes are recognized
 */
export declare class RoutesRecognized {
    id: number;
    url: string;
    urlAfterRedirects: string;
    state: RouterStateSnapshot;
    constructor(id: number, url: string, urlAfterRedirects: string, state: RouterStateSnapshot);
    toString(): string;
}
export declare type Event = NavigationStart | NavigationEnd | NavigationCancel | NavigationError;
/**
 * The `Router` is responsible for mapping URLs to components.
 */
export declare class Router {
    private rootComponentType;
    private resolver;
    private urlSerializer;
    private outletMap;
    private location;
    private injector;
    private currentUrlTree;
    private currentRouterState;
    private locationSubscription;
    private routerEvents;
    private navigationId;
    private config;
    /**
     * Returns the current route state.
     */
    routerState: RouterState;
    /**
     * Returns the current url.
     */
    url: string;
    /**
     * Returns an observable of route events
     */
    events: Observable<Event>;
    /**
     * Resets the configuration used for navigation and generating links.
     *
     * ### Usage
     *
     * ```
     * router.resetConfig([
     *  { path: 'team/:id', component: TeamCmp, children: [
     *    { path: 'simple', component: SimpleCmp },
     *    { path: 'user/:name', component: UserCmp }
     *  ] }
     * ]);
     * ```
     */
    resetConfig(config: RouterConfig): void;
    /**
     * Applies an array of commands to the current url tree and creates
     * a new url tree.
     *
     * When given an activate route, applies the given commands starting from the route.
     * When not given a route, applies the given command starting from the root.
     *
     * ### Usage
     *
     * ```
     * // create /team/33/user/11
     * router.createUrlTree(['/team', 33, 'user', 11]);
     *
     * // create /team/33;expand=true/user/11
     * router.createUrlTree(['/team', 33, {expand: true}, 'user', 11]);
     *
     * // you can collapse static fragments like this
     * router.createUrlTree(['/team/33/user', userId]);
     *
     * // assuming the current url is `/team/33/user/11` and the route points to `user/11`
     *
     * // navigate to /team/33/user/11/details
     * router.createUrlTree(['details'], {relativeTo: route});
     *
     * // navigate to /team/33/user/22
     * router.createUrlTree(['../22'], {relativeTo: route});
     *
     * // navigate to /team/44/user/22
     * router.createUrlTree(['../../team/44/user/22'], {relativeTo: route});
     * ```
     */
    createUrlTree(commands: any[], {relativeTo, queryParams, fragment}?: NavigationExtras): UrlTree;
    /**
     * Navigate based on the provided url. This navigation is always absolute.
     *
     * Returns a promise that:
     * - is resolved with 'true' when navigation succeeds
     * - is resolved with 'false' when navigation fails
     * - is rejected when an error happens
     *
     * ### Usage
     *
     * ```
     * router.navigateByUrl("/team/33/user/11");
     * ```
     */
    navigateByUrl(url: string | UrlTree): Promise<boolean>;
    /**
     * Navigate based on the provided array of commands and a starting point.
     * If no starting route is provided, the navigation is absolute.
     *
     * Returns a promise that:
     * - is resolved with 'true' when navigation succeeds
     * - is resolved with 'false' when navigation fails
     * - is rejected when an error happens
     *
     * ### Usage
     *
     * ```
     * router.navigate(['team', 33, 'team', '11], {relativeTo: route});
     * ```
     */
    navigate(commands: any[], extras?: NavigationExtras): Promise<boolean>;
    /**
     * Serializes a {@link UrlTree} into a string.
     */
    serializeUrl(url: UrlTree): string;
    /**
     * Parse a string into a {@link UrlTree}.
     */
    parseUrl(url: string): UrlTree;
    private scheduleNavigation(url, preventPushState);
    private setUpLocationChangeListener();
    private runNavigate(url, preventPushState, id);
}
