module Slide {
    import ISpreadsheetRow = csComp.Services.ISpreadsheetRow;
    import Technology      = TechRadar.Technology;

    export interface ISlideScope extends ng.IScope {
        vm: SlideCtrl;
    }

    export class SlideCtrl {
        private scope     : ISlideScope;
        private technology: Technology;

        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        public static $inject = [
            '$scope',
            'busService'
        ];

        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        constructor(
            private $scope     : ISlideScope,
            private busService : csComp.Services.MessageBusService
            ) {
            $scope.vm = this;

            busService.subscribe('technology', (title, technology: Technology) => {
                if (title !== 'selected') return;
                this.technology = technology;
                if (this.$scope.$root.$$phase != '$apply' && this.$scope.$root.$$phase != '$digest') { this.$scope.$apply(); }
            });
            busService.subscribe('slide', (title, slide) => {
                if (title !== 'newSlide') return;
                this.showSlide(slide);
            });
        }

        private showSlide(slide: ISpreadsheetRow) {

            if (this.$scope.$root.$$phase != '$apply' && this.$scope.$root.$$phase != '$digest') { this.$scope.$apply(); }
        }
    }
}
