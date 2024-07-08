import { Pipe, PipeTransform } from "@angular/core";

@Pipe({

    name: 'propertGetter',
    standalone:true
  
  })
  
  export class PropertGetterPipe implements PipeTransform {
  
    transform(value: any, key:string,isNested:boolean): any {
        let finalValue = null;
        function searchNested(key:any,value:any){
    
            if(!key || ! value){
                finalValue= null;
                return null
            }
            else{
               if(value.hasOwnProperty(key)){
                finalValue = value[key];
                return finalValue;
               }
               else{
                for(let newkey in value){
                    if(typeof value[newkey] ==='object'){
                        searchNested(key,value[newkey])
                    }
                }
               }
            }

        }
        if(isNested){
            let path = key.split('.');
            finalValue = value;
            for(let i=0;i<path.length;i++){
                let p=path[i];
                if(finalValue.hasOwnProperty(p)){
                    finalValue = finalValue[p];
                }else{
                    searchNested(path[path.length-1],finalValue);
                }
                 
            }

        }else{

            
            searchNested(key,value);
        }
        
        return finalValue;
    }
  
  }