export class AuthTokenHandle {
  private token: string | null= null;
  private expirationDate: Date = new Date();
  private scopes: string[] = [
  'unit.serviceplattform.externos',
  'unit.serviceplattform.cotizaciones',
  'unit.serviceplattform.polizas',
  'unit.serviceplattform.emitir.paratumascota',
  'unit.serviceplattform.emitir.paratusequipos',
  'unit.serviceplattform.emitir.paratusegurodeley',
  'unit.serviceplattform.emitir.paratuauto',
  'unit.serviceplattform.emitir.porloqueconduces',
  'unit.serviceplattform.emitir.porsipierdestuauto',
  'unit.serviceplattform.emitir.porsichocas'
]

  async generateToken() {
    try {
      const response = await fetch('https://idp-qa.azurewebsites.net/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + 'VW5pdC5TZXJ2aWNlUGxhdHRmb3JtLlN0aTpkZDM4NmEzNS0zNTVmLTI5YjktNjRjNS03N2ZhMDk0ZmU0MDI=',
        'Accept': 'application/json',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: this.scopes.join(' '),
      }),
    })

      const data = await response.json();
      if (!response.ok) {
        throw new Error('Error al obtener el token');
      }
      console.log('Token obtenido:', data);
      this.token = data.access_token as string;
      this.expirationDate = new Date();
      this.expirationDate.setHours(this.expirationDate.getHours() + 1);

      return this.token;
    } catch (error) {
      console.error('Error al obtener el token:', error);
      throw error;
    }
    
  }

  async getToken(): Promise<string> {
    if (this.token && this.expirationDate < new Date()) {
      return this.token;
    }

    return this.generateToken();
  }
}

export const tokenHandler = new AuthTokenHandle();
