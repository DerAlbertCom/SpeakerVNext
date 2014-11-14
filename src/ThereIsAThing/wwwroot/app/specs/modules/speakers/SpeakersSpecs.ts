describe('tat-speakers, module', ()=> {
    var $ctrlProvider:ng.IControllerService;
    var $rootScopeService : ng.IRootScopeService;

    beforeEach(
        ModuleBuilder.forModule('tat-speakers')
            .serviceWithMocks(('SpeakersService'))
            .controllerWithMocks('SpeakersController')
            .controllerWithMocks('SpeakersNewController')
            .build()
    );

    beforeEach(()=> {
        inject(($controller,$rootScope) => {
            $rootScopeService=$rootScope;
            $ctrlProvider = $controller;
        });
    })


    describe('after initialization', ()=> {

        it('should contain SpeakersService  service',
            inject(SpeakersService=> {
                expect(SpeakersService).not.toBeNull();
            }));

        it('should contain an SpeakersController',
            ()=> expect($ctrlProvider('SpeakersController')).not.toBeNull());

        it('should contain an SpeakersNewController',
            ()=> expect($ctrlProvider('SpeakersNewController',{$mdDialog:{}})).not.toBeNull());
    });
})
