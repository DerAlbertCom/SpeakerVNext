module Shared {
    export function mal(a : number,b : number)
    {
      return a*b;
    };
    export function plus(a : number,b : number)
    {
        return a+b;
    };

    module Services {
        export interface MenuItem {
            name : string;
            state : string;
            active? : boolean;
        }
        export interface IMenuData {
            mainMenu : MenuItem[];
            title : string;
        }
        export interface INavigationService {
            data : IMenuData;
            getMainMenus() : MenuItem[];
            setPageTitle(title:string);
        }


        class NavigationServiceImpl implements INavigationService {
            data:IMenuData;

            constructor() {
                this.data = {
                    mainMenu: [
                        {name: 'Startseite', state: 'home', active: true},
                        {name: 'Sprecher', state: 'speakers.list'}

                    ],
                    title: 'not set'
                };
            }

            getMainMenus():MenuItem[] {
                return this.data.mainMenu;
            }

            setPageTitle(title:string) {
                this.data.title = title;
            }

        }
        export function NavigationService() {
            return new NavigationServiceImpl();
        }
    }


    module Controllers {

        export class NavigationController {
            public title:string;
            public menus:Services.MenuItem[];
            public state:any;
            public data:Services.IMenuData;

            constructor($rootScope:ng.IRootScopeService, private $state:ng.ui.IStateService, private service:Services.INavigationService, private $mdSidenav) {
                var self = this;
                this.title = "There Is A Thing";
                this.menus = service.getMainMenus();
                this.data = service.data;
                self.setActiveState($state.current);
                $rootScope.$on("$stateChangeSuccess", function (event:ng.IAngularEvent, toState:ng.ui.IState, toParams, fromState:ng.ui.IState, fromParams) {
                    self.setActiveState(toState);
                });
            }

            setActiveState(state:ng.ui.IState) {
                if (state.url  == '^')
                    return;
                var parts = state.name.split('.');
                _.forEach(this.menus, function (menu) {
                    menu.active = false;;
                })
                var mainMenu : Services.MenuItem = _.first(_.where(this.menus, (m)=> m.state.indexOf(parts[0])==0));
                mainMenu.active = true;
                this.service.setPageTitle(mainMenu.name);
            }

            showSideBar() {
                this.$mdSidenav('left').open()
            }
        }

        NavigationController.$inject = ["$rootScope", "$state", "NavigationService", "$mdSidenav"];

    }

    angular.module('tat-shared', ['ngMaterial'])
        .factory(Services)
        .controller(Controllers);
}