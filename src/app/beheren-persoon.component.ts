import { Greeter } from './greeter';
import { Person } from './person';
import { MapUtils } from './domain/objects/maputils';
import { IBAN } from './domain/values/iban';
import { Persoon } from './domain/objects/persoon';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent, UseCaseManager, UseCase, UseCases } from 'anva-contracts';
import { Try } from 'anva-core';
import { BeherenPersoonService } from './beheren-persoon.service';

@Component({
    templateUrl: './beheren-persoon.component.html'
})

export class BeherenPersoonComponent extends BaseComponent implements OnInit {

    private persoon: Persoon = new Persoon();
    private persoonId: string;

    constructor(
        private beherenPersoonService: BeherenPersoonService,
        public useCaseManager: UseCaseManager,
        public route: ActivatedRoute
    ) {
        super(useCaseManager, route);
    }

    public ngOnInit(): void {
        this.speeltuin();
        // super.ngOnInit();
        // this.initPersoon();
    }

    private speeltuin(): void {
        // let g = new Greeter('test');
        // console.log('g.greeting=' + g.greeting);
        // console.log('g.greet()=' + g.greet());

        let p: Person = MapUtils.deserialize(Person, {  
            "voornaam":"Mark",
            "surname":"Galea",
            "age":30,
            "bank":"1234",
            "address":
                // [  
                {  
                    "first-line":"Some where",
                    "second-line":"Over Here",
                    "city":"In This City"
                // },
                // {  
                    // "first-line":"Some where2",
                    // "second-line":"Over Here2",
                    // "city":"In This City2"
                }
            // ]
        })

        console.log('p=' + JSON.stringify(p));

    }

    private initPersoon(): void {
        this.initPersoonId();
        this.createEmptyPersoon();
    }

    private initPersoonId(): Try<any> {
        return Try.ofNonNull(() => this.route.snapshot.params['id'])
            .accept((id) => this.persoonId = id);
    }

    private createEmptyPersoon(): Try<void> {
        return Try.of<Persoon>(() => new Persoon())
            .map((p) => this.persoon = p)
            .filter(() => !this.isAdding())
            .map(() => this.getPersoon());
    }

    private getPersoon(): void {
        this.beherenPersoonService.get(this.persoonId)
            .then((p) => {
                console.log('p instanceof Persoon: ' + (p instanceof Persoon));
                console.log('p instanceof Object: ' + (p instanceof Object));
                console.log('beherenPersoonService.get returned: ' + JSON.stringify(p));
                MapUtils.deserialize(Persoon, p);


                // this.persoon.ibanVal = IBAN.of(p.iban);                
                // console.log('this.persoon.iban.isValid()=' + this.persoon.ibanVal.isValid());;
                // console.log('this.persoon.ibanVal.isValid()=' + this.persoon.ibanVal.isValid());;
            });
    }

    private isAdding(): boolean {
        return !this.persoonId;
    }

    public onSubmit() {
        // this.persoon.iban = this.persoon.iban.get(); // TODO

        if (this.isAdding()) {
            this.beherenPersoonService.post(this.persoon);
            //.then(() => {          
            // this.useCaseManager.ok();
            // });
        } else { // wijzigen
            this.beherenPersoonService.put(this.persoon);
            //.then(() => {          
            // this.useCaseManager.ok();
            // });
        }
    }
}