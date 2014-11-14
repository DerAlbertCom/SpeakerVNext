module Configuration {
    "use strict";

    export function getPath(which: string): string {
        return angular.element(document.body).data(which);
    }

    export function mainRoute(moduleName: string): any {
        var name = moduleName.toLocaleLowerCase();
        var base = "/app/modules/" + name;
        return {
            url: '/' + name,
            views: {
                '': {
                    templateUrl: base + "/views/" + name + ".html",
                    controllerAs: "ctrl",
                    controller: moduleName + "Controller"
                }
            }
        };
    }
    export function actionRoute(moduleName: string, action: string, url: string = null): any {
        var name = moduleName.toLocaleLowerCase();
        var actionName = action.toLocaleLowerCase();
        var base = "/app/modules/" + name;
        return {
            url: url || '/' + actionName,
            views: {
                '': {
                    templateUrl: base + "/views/" + actionName + ".html",
                    controllerAs: "ctrl",
                    controller: moduleName + action + "Controller"
                }
            }
        };
    }
    export var routing: any = [
        "$stateProvider", "$urlRouterProvider",
        routingConfiguration
    ];

    function routingConfiguration($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider): void {
        $urlRouterProvider
            .otherwise("/home");
        $stateProvider
            .state('home', mainRoute("Home"));

    }
}