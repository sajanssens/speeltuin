// import { MapUtils } from './maputils';
import "reflect-metadata";
import { Value } from './../values/value';
import { IBAN } from './../values/iban';
import { getClazz, getJsonProperty } from "./util"

export class MapUtils {
    static isPrimitive(obj) {
        switch (typeof obj) {
            case "string":
            case "number":
            case "boolean":
                return true;
        }
        return !!(obj instanceof String || obj === String ||
            obj instanceof Number || obj === Number ||
            obj instanceof Boolean || obj === Boolean);
    }

    static isArray(object) {
        if (object === Array) {
            return true;
        } else if (typeof Array.isArray === "function") {
            return Array.isArray(object);
        }
        else {
            return !!(object instanceof Array);
        }
    }

    static isValue(obj) {       
        return (obj instanceof Value || obj === Value);
    }

    static deserialize<T>(clazz: { new (): T }, jsonObject): T {
        console.log('deserialize ' + clazz + ' from ' + JSON.stringify(jsonObject));
        if(clazz instanceof IBAN){
            console.log('clazz instanceof IBAN');
        }
        if ((clazz === undefined) || (jsonObject === undefined)) return undefined;

        let obj = new clazz();
        Object.keys(obj).forEach((key) => {
            let propertyMetadataFn: (IJsonMetaData) => any = (propertyMetadata) => {
                let propertyName = propertyMetadata.name || key;
                let innerJson = jsonObject ? jsonObject[propertyName] : undefined;
                let clazz = getClazz(obj, key);

                if (MapUtils.isValue(clazz)) {
                    console.log('clazz isValue!');
                } else if (MapUtils.isArray(clazz)) {
                    console.log('clazz isArray!');
                    let metadata = getJsonProperty(obj, key);
                    if (metadata.clazz || MapUtils.isPrimitive(clazz)) {
                        if (innerJson && MapUtils.isArray(innerJson)) {
                            return innerJson.map(
                                (item) => MapUtils.deserialize(metadata.clazz, item)
                            );
                        } else {
                            return undefined;
                        }
                    } else {
                        return innerJson;
                    }
                } else if (!MapUtils.isPrimitive(clazz)) {
                    console.log('clazz isPrimitive!');
                    return MapUtils.deserialize(clazz, innerJson);
                } else {
                    console.log('clazz is else!');
                    return jsonObject ? jsonObject[propertyName] : undefined;
                }
            };

            let propertyMetadata = getJsonProperty(obj, key);
            if (propertyMetadata) {
                obj[key] = propertyMetadataFn(propertyMetadata);
            } else {
                if (jsonObject && jsonObject[key] !== undefined) {
                    obj[key] = jsonObject[key];
                }
            }
        });
        return obj;
    }
}