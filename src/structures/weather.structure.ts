export interface Weather{
  name ?: string;
  cod ?: number;
  icon ?: string;
  description ?: string;
  temp ?: number;
  main ?: string;
  minMaxTemp ?: MinMaxInterface;
}

// el date es el numero del dia en el mes
// day es el numero en la semana (1-6)
interface MinMaxInterface{
  date ?: number;
  day ?:number;
  month ?:number;
  min ?:number;
  max ?:number;
}
