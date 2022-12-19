import localStorage from 'react-native-sync-localstorage';

export class Database {

  create(id: string, data: any){
    localStorage.setItem(id, JSON.stringify(data));
  }

  delete(id: string){
    localStorage.removeItem(id);
  }

  get(id: string){
    const data = localStorage.getItem(id);
    if (data === undefined || data === null) {
      return "";
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }

}

// Singleton instance of the Firebase for convenience
export const DatabaseService = new Database()
