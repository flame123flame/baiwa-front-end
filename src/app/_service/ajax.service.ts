import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { empty } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from './user.service.';
import { CommonService } from './common.service';

declare var apiPath: string;

@Injectable()
export class AjaxService {

  public static JSON_HEADER = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
  });
  public static FORM_HEADER = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
  });

  public static CONTEXT_PATH = apiPath+"/api/";
  //  public static CONTEXT_PATH = "/BaiwaB/api/";
  // public static CONTEXT_PATH = "/api/";
  public static isDebug = false;
  public headerAuth :any;
  constructor(
    private http: Http,
    private httpClient: HttpClient,
    private router: Router,
    private user : UserService,
    private commonService: CommonService
  ) { 
    // console.log("user token "+ user.getToken());
    // console.log("user.currentUserValue",user.currentUserValue.token);
    
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  doPost(url: string, body: any) {
    console.log("this.headerAuth", this.headerAuth);
    this.headerAuth = new HttpHeaders({
      // // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Headers": "Content-Type",
      // "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      // "Authorization": `Bearer ${this.user.currentUserValue.token}`
    });
    if (AjaxService.isDebug) {
      console.log("URL : ", AjaxService.CONTEXT_PATH + url);
      console.log("Params : ", body);
    }
    return this.httpClient.post(AjaxService.CONTEXT_PATH + url, body, {headers: this.headerAuth}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err, caught) => {
        if (err.status == 401 && "security/user-profile" != url) {
          window.location.reload();
          if (AjaxService.isDebug) {
            console.error("Redirect to LoginPage");
          }
        } else {
          if ("security/user-profile" == url) {
            this.router.navigate(["/login"]);
          }
          if (err.status != 401) {
            console.error("Message Error => ", err, caught);
          }
        }
        return empty();
      })
    );
  }

  doGet(url: string) {
    if (AjaxService.isDebug) {
      console.log("URL : ", AjaxService.CONTEXT_PATH + url);
    }
    return this.httpClient.get(AjaxService.CONTEXT_PATH + url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.doHandleError)
    );
  }

  doPut(url: string, body: any) {
    if (AjaxService.isDebug) {
      console.log("URL : ", AjaxService.CONTEXT_PATH + url);
      console.log("Params : ", body);
    }
    return this.httpClient.put(AjaxService.CONTEXT_PATH + url, body).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.doHandleError)
    );
  }

  doDelete(url: string) {
    if (AjaxService.isDebug) {
      console.log("URL : ", AjaxService.CONTEXT_PATH + url);
    }
    return this.httpClient.delete(AjaxService.CONTEXT_PATH + url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.doHandleError)
    );
  }

  private doHandleError(err, caught) {
    if (err.status == 401) {
      window.location.reload();
      if (AjaxService.isDebug) {
        console.error("Redirect to LoginPage");
      }
    } else {
      if (AjaxService.isDebug) {
        console.error("Message Error => ", err, caught);
      }
    }
    return empty();
  }

  upload(url: string, body: any, success: any, error?: any, header?: Headers) {
    if (AjaxService.isDebug) {
      console.log("URL : ", AjaxService.CONTEXT_PATH + url);
      console.log("Params : ", body);
    }
    var headers = new Headers();
    let errorFn = this.handleError;
    if (error) {
      errorFn = error;
    }
    console.log(body, " ", headers);

    return this.http
      .post(AjaxService.CONTEXT_PATH + url, body, { headers: headers })
      .toPromise()
      .then(success)
      .catch(errorFn);
  }

  download(url: string) {
    let full_url = AjaxService.CONTEXT_PATH + url;
    window.open(full_url, 'Download');
  }

  downloadfileInajax(url: string) {
    window.location.href = AjaxService.CONTEXT_PATH + url;
  }

  doPostLogin(url: string, body: any) {
    this.commonService.loading();
    if (AjaxService.isDebug) {
      console.log("URL : ", url);
      console.log("Params : ", body);
    }
    return this.httpClient.post(url, body).pipe(
      map((response: any) => {
        this.commonService.unLoading();
        return response;
      }),
      catchError((err, caught) => {
        this.commonService.unLoading();
        if (err.status == 401 && "token/generate-token" != url) {
          window.location.reload();
          if (AjaxService.isDebug) {
            console.error("Redirect to LoginPage");
          }
        } else {
          return err;
        }
        return empty();
      })
    );
  }
}
