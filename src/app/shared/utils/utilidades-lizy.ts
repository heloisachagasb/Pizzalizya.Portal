export class UtilidadesLizy{
  
  id_aleatorio_para_elementos: string;

  constructor() {
    this.id_aleatorio_para_elementos = Math.floor(Math.random() * 10000).toString()
  }

  public focarNoElemento(id: string, adicionarIdAleatorio: boolean = true, buscarPorIdAproximado = false) {
    let idElemento = id;

    if(adicionarIdAleatorio)
      idElemento += this.id_aleatorio_para_elementos;

    let element = document.getElementById(idElemento);

    if(buscarPorIdAproximado)
      element = document.querySelector(`[id^="${id}"]`)

    if(element == null)
        return;
    else
        element.focus();
  }

  public gerarIdUnicoElemento(idBase:string): string{
    return idBase + this.id_aleatorio_para_elementos;
  }
}