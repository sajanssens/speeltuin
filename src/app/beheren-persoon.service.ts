import { Injectable } from '@angular/core';

import { Request } from 'anva-core';
import { PersoonUri, PersoonUriVars } from 'anva-contracts';
import { Observable } from 'rxjs/Observable';

import { Persoon } from './domain/objects/persoon';

@Injectable()
export class BeherenPersoonService {

    constructor(private request: Request) {
    }

    public get(id: string): Promise<Persoon> {
        return this.request.get<Persoon>(PersoonUri.persoon.var(PersoonUriVars.id, id));
    }

    public post(p: Persoon): Promise<Persoon> {
        return this.request.post<Persoon>(PersoonUri.personen, p);
    }

    public put(p: Persoon): Promise<Persoon> {
        return this.request.put<Persoon>(PersoonUri.persoon.var(PersoonUriVars.id, p.id), p);
    }

}
