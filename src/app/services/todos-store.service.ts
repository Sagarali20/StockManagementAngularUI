import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ZustandBaseService } from "ngx-zustand";
import { create } from "zustand";
import { User } from "../models/User";


interface TodosState {
  todos: User[];
  loadTodos: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class TodosStore extends ZustandBaseService<TodosState> {


  constructor(private http: HttpClient) {
    super();
    this.initStore();
  }

  initStore() {
    return create<TodosState>((set) => ({
      todos: [],
      loadTodos: () => {
        this.http.get<User[]>('http://localhost:5275/api/User/').subscribe((todos) => set({ todos }));
      },
    }));
  }
}