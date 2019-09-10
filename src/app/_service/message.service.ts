import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  public static MSG = {
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
    DUPLICATE_DATA: 'DUPLICATE_DATA',
    FAILED_CALLBACK: 'กรุณาติดต่อผู้ดูแลระบบ',
    REQUIRE_FIELD: 'กรุณากรอกข้อมูลให้ถูกต้อง'
  };
}
