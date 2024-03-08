import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EwaService {
  headers = {
    'X-Session-Id': 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNTY5OTVhZS01MmE0LTRiMzYtOTBmMy01YjFiZDRkNjg2ZjUiLCJyb2xlIjoidXNlciIsImxhbmciOiJmYSIsImlhdCI6MTY2MDU3MDUzNX0.NT2Go2VpGDYYWbQ_Ggyk5yjvo-2rxF-yuWBszuC2n4vofEq_gRbk7VKnxHX3ydy0',
  };

  constructor(
    protected readonly httpService: HttpService,
  ) {
    //
  }

  getCourses() {
    return this.httpService.axiosRef
      .get('https://api.appewa.com/api/v12/courses', {headers: this.headers})
      .then((response) => response.data.result.rows);
  }

  getCourse(id) {
    return this.httpService.axiosRef
      .get(`https://api.appewa.com/api/v12/courses/${id}`, {headers: this.headers})
      .then((response) => response.data.result.course);
  }

  getLesson(id) {
    return this.httpService.axiosRef
      .get(`https://api.appewa.com/api/v12/lessons/${id}`, {headers: this.headers})
      .then((response) => response.data.result.lesson)
      .catch((e) => {
        console.log(`Lesson ${id} Failed.`);

        return null;
      });
  }
}
