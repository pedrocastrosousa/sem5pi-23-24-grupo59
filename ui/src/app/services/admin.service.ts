// admin.service.ts
import { Injectable } from '@angular/core';
import { Task } from '../domain/task';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private tasks: Task[] = [
    { id: 1, name: 'Task 1', description: 'Description for Task 1' },
    { id: 2, name: 'Task 2', description: 'Description for Task 2' },
    // Add more tasks as needed
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }
}
