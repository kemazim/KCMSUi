import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private recordUrl: string = "http://localhost:7177/api/Record/"

  constructor(private http: HttpClient) { }

  createRecord(record: any) {
    return this.http.post<any>(`${this.recordUrl}createRecord`, record)
  }

  getRecords() {
    return this.http.get<any[]>(`${this.recordUrl}getRecords`)
  }

  deleteRecord(id: any) {
    return this.http.delete<any>(`${this.recordUrl}deleteRecord?unitNo=`+id)
  }
}
