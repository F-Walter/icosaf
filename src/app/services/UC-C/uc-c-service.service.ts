import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UCCService {

  setSolveAction(solve_action_text: string, operator_ass_id: number, cobot_id: number, solve_act_mast_id: number, error_id: number): Observable<any> {
    let url = `http://icowms.cloud.reply.eu/Details/insertSolveAction?solve_action=${solve_action_text}&operator_ass_id=${operator_ass_id}&cobot_id=${cobot_id}&solve_act_mast_id=${solve_act_mast_id}&error_id=${error_id}`
    return this.http.get<any>(url).pipe(retry(3))
  }


  getLastActionError(task_id: number) {
    let url = `http://icowms.cloud.reply.eu/Details/getLastActError?task_id=${task_id}`
    return this.http.get<any>(url).pipe(retry(3))

  }

  constructor(private http: HttpClient) { }
}
