export interface ClientInterface {
  id: number;
  name: string;
  email: string;
}

class ClientModel {
  public id: number;
  public name: string;
  public email: string;

  constructor({ id, name, email }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

export default ClientModel;
