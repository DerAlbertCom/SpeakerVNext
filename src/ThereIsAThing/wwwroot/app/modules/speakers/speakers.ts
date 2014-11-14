module Speakers {

    interface TalkModel {
        id : string;
        abstract : string;
        level : Number;
        duration : Number;
    }

    interface SpeakerModel {
        id : string;
        salutation: string;
        firstName : string;
        lastName: string;
        talks : TalkModel[];
    }

    module Services {
        export interface ISpeakerService {
            getSpeaker(speakerId:string):SpeakerModel;
            getSpeakers():SpeakerModel[];
            addSpeaker(model:SpeakerModel);
        }
        "use strict";
        export function SpeakersService():ISpeakerService {
            var speakers:SpeakerModel[];

            speakers = [
                {id: '1', salutation: "Herr", firstName: "Albert", lastName: "Weinert", talks: []},
                {id: '2', salutation: "Herr", firstName: "Peter", lastName: "Schmitz", talks: []},
                {id: '3', salutation: "Frau", firstName: "Jutta", lastName: "Westphal", talks: []},
                {id: '4', salutation: "Herr", firstName: "Timo", lastName: "Beil", talks: []},
                {id: '5', salutation: "Frau", firstName: "Wo-Da", lastName: "Fone", talks: []}
            ];

            var service:ISpeakerService = {
                getSpeaker: (speakerId:string):SpeakerModel => {
                    return _.first(_.where(speakers, {id: speakerId}));
                },
                getSpeakers: ():SpeakerModel[] => {
                    return speakers;
                },
                addSpeaker: (model)=> {
                    speakers.push(model);
                }
            };
            return service;
        }
        SpeakersService.$inject=[];

    }

    module Controllers {
        "use strict";

        export class SpeakersController {
            private hallo:string;

            constructor() {
                this.hallo = "Willkommen bei den Sprechern";
            }
        }

        SpeakersController.$inject = [];

        export class SpeakersNewController {
            private title: string;
            private speaker : SpeakerModel;
            private data  : SpeakerModel;

            constructor(private speakerService : Services.ISpeakerService, private $state : ng.ui.IStateService, private $mdDialog) {
                this.title = "Sprecher anlegen";
                this.speaker= { id:'', salutation:'',firstName:'',lastName:'',eMail:'',talks:[]};
                this.data = this.speaker;
            }

            public cancel() {
                this.$mdDialog.cancel();
            }

            public create(isValid : boolean) {
                console.log(isValid);
                if (isValid){
                    this.$mdDialog.hide(this.speaker);
                }
            }
        }

        SpeakersNewController.$inject = ['SpeakersService','$state', '$mdDialog'];

        export class SpeakersListController {
            private hallo:string;

            public speakers:SpeakerModel[];

            constructor(private speakerService:Services.ISpeakerService,private $mdDialog) {
                this.hallo = "SpeakersList";
                this.speakers = speakerService.getSpeakers();
            }

            addSpeaker($event:ng.IAngularEvent) {
                this.$mdDialog.show({
                    targetEvent : $event,
                    controller: 'SpeakersNewController',
                    controllerAs: 'ctrl',
                    templateUrl: '/app/modules/speakers/views/new.html'
                }).then((speaker : SpeakerModel)=>{
                    speaker.id = "" + Math.random()*2000;
                    this.speakerService.addSpeaker(speaker);
                });
            }
        }
        SpeakersListController.$inject = ["SpeakersService","$mdDialog"];

        export class SpeakersDetailController {
            private hallo:string;
            private speaker:SpeakerModel;

            constructor($stateParams:ng.ui.IStateParamsService, speakerService:Services.ISpeakerService) {
                var id = $stateParams['speakerId'];
                this.hallo = "Speaker " + id;
                this.speaker = speakerService.getSpeaker(id);
                console.log(this.speaker);
            }
        }

        SpeakersDetailController.$inject = ["$stateParams", "SpeakersService"];


    }

    function routing($stateProvider:ng.ui.IStateProvider) {
        var base = 'speakers';
        $stateProvider
            .state(base, Configuration.mainRoute("Speakers"))
            .state(base + '.list', Configuration.actionRoute("Speakers", "List"))
            .state(base + '.detail', Configuration.actionRoute("Speakers", "Detail", '/detail/{speakerId}'))
            .state(base + '.new', Configuration.actionRoute("Speakers", "New"));

    }


    routing.$inject = ["$stateProvider"];
    angular.module("tat-speakers", ['ngMaterial','ngMessages','ui.router'])
        .controller(Controllers)
        .factory(Services)
        .config(routing);
}