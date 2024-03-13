import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Records } from 'src/app/models/records';

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

  deleteRecord(recordToDelete: Records) {
    return this.http.delete<any>(`${this.recordUrl}deleteRecord?unitNo=${recordToDelete.unitNo}&icNo=${recordToDelete.icNo}`);
  }
}
