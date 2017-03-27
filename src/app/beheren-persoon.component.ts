import { Person2Input } from './person2input';
import { Person1 } from './person1';
import { Person2 } from './person2';
import { Person3 } from './person3';
import { Person3Input } from './person3input';

// import { Greeter } from './greeter';
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

        let json = {
            "voornaam": "Mark",
            "surname": "Galea",
            "age": 30,
            "bank": "1234",
            "address":
            // [
            {
                "first-line": "Some where",
                "second-line": "Over Here",
                "city": "In This City"
                // },
                // {  
                // "first-line":"Some where2",
                // "second-line":"Over Here2",
                // "city":"In This City2"
            }
            // ]
        }

        let p1: Person1 = MapUtils.deserialize(Person1, json);
        console.log('p1=' + JSON.stringify(p1));
        console.log('p1.bank.isValid=' + p1.bank.isValid());

        let p2: Person2 = Person2.of(json);
        console.log('p2=' + JSON.stringify(p2));

        // let pi = MapUtils.deserialize(Person3Input, json);
        // console.log('pi=' + JSON.stringify(pi));
        let p3: Person3 = Person3.of(MapUtils.deserialize(Person3Input, json));
        console.log('p3=' + JSON.stringify(p3));
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
            .then((json) => {
                console.log('p instanceof Persoon: ' + (json instanceof Persoon));
                console.log('p instanceof Object: ' + (json instanceof Object));
                console.log('beherenPersoonService.get returned: ' + JSON.stringify(json));
                MapUtils.deserialize(Persoon, json);
                let p2: Person2 = Person2.of(json);

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