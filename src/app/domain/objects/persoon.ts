import { IBAN } from './../values/iban';
import { Adres } from './adres';
import { JsonProperty/*, format*/} from './util';

export class Persoon {
    id: string;
    
    titel: string;
    voorletters: string;
    voornaam: string;
    voorvoegsel: string;

    achternaam: string;    
    
    email: string;
    
    geboortedatum: string;
    geslacht: string;
   
    // @JsonProperty('iban') 
    ibanVal: IBAN = IBAN.empty();

    // @JsonProperty({clazz: Adres})
    woonadres: Adres = new Adres();
}

class Address {
    constructor(public firstLine: string, 
                public secondLine: string, 
                public city: string){}
}

