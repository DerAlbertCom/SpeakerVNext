angular.module("tat", ["ui.router", "tat-home", "tat-speakers", "tat-shared", "ngMaterial"])
    .config(Configuration.routing);
