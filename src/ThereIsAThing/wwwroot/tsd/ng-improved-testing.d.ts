/**
 * Created by Albert on 05.11.2014.
 */
declare var ModuleBuilder:ng.improvedTesting.ModuleBuilder;

declare module ng.improvedTesting {
    interface ModuleBuilder {
        forModule(modules:string) : ng.improvedTesting.IModuleBuilder;
    }
    export interface  IModuleBuilder {
        serviceWithMocksFor(serviceName, ...toBeMockedDependencies : string[]) : IModuleBuilder;
        serviceWithMocks(serviceName) : IModuleBuilder;
        serviceWithMocksExcept(serviceName,...notToBeMockedDependencies:string[]) : IModuleBuilder;
        serviceAsIs(serviceName) : IModuleBuilder;
        filterWithMocks(filterName) : IModuleBuilder;
        filterWithMocksFor(filterName, ...toBeMockedDependencies : string[]) : IModuleBuilder;
        filterWithMocksExcept(filterName,...notToBeMockedDependencies:string[]) : IModuleBuilder;
        filterAsIs(filterName) : IModuleBuilder;

        controllerWithMocks(controllerName) : IModuleBuilder;
        controllerWithMocksFor(controllerName, ...toBeMockedDependencies : string[]) : IModuleBuilder;
        controllerWithMocksExcept(controllerName,...notToBeMockedDependencies:string[]) : IModuleBuilder;

        controllerAsIs(controllerName) : IModuleBuilder;
        directiveWithMocks(directiveName) : IModuleBuilder;
        directiveWithMocksFor(directiveName, ...toBeMockedDependencies : string[]) : IModuleBuilder;
        directiveWithMocksExcept(directiveName,...notToBeMockedDependencies:string[]) : IModuleBuilder;
        directiveAsIs(directiveName) : IModuleBuilder;

        build();
        includeComponent(type, componentName, componentKind, dependenciesUsage, dependencies);
        ensureNotAConstantOrValueService(serviceName)
    }
}

