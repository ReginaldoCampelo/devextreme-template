export class Change<T> {
    type: 'insert' | 'update' | 'remove';
  
    key: any;
  
    data: Partial<T>;
  }