import "reflect-metadata";

const jsonMetadataKey = "jsonProperty";

export interface IJsonMetaData<T> {
    name?: string,
    clazz?: { new (): T }
}

export function JsonProperty<T>(metadata?: IJsonMetaData<T> | string): any {      
    if (metadata instanceof String || typeof metadata === "string") {
        console.log('metadata instanceof String || typeof metadata === "string"');
        return Reflect.metadata(jsonMetadataKey, {
            name: metadata,
            clazz: undefined
        });
    } else {
        let metadataObj = <IJsonMetaData<T>>metadata;
        console.log('metadata '+metadataObj.name+' instanceof else');
        return Reflect.metadata(jsonMetadataKey, {
            name: metadataObj ? metadataObj.name : undefined,
            clazz: metadataObj ? metadataObj.clazz : undefined
        });
    }
}

export function getClazz(target: any, propertyKey: string): any {
    return Reflect.getMetadata("design:type", target, propertyKey)
}

export function getJsonProperty<T>(target: any, propertyKey: string): IJsonMetaData<T> {
    return Reflect.getMetadata(jsonMetadataKey, target, propertyKey);
}

const formatMetadataKey = Symbol("format");

export  function format(formatString: string) {    
    return Reflect.metadata(formatMetadataKey, formatString);
}

export function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}