module Home {
    module Services {
        "use strict";
    }

    module Controllers {
        "use strict";

        export interface IHomeScope extends ng.IScope {

        }

        export class HomeController {
            private hallo: string;

            constructor($scope: IHomeScope) {
                this.hallo = "Willkommen bei Da ist ein Ding";
            }
        }
        HomeController.$inject = ["$scope"];

        export class HomeNavigationController {
            private hallo: string;

            constructor($scope: ng.IScope) {
                this.hallo = "Willkommen bei den Navigation";
            }
        }
        HomeNavigationController.$inject = ["$scope"];
    }

    angular.module("tat-home",[])
        .controller(Controllers)
        .factory(Services);
}

