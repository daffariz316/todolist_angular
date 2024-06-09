import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  isEdit: boolean = false;
  editIndex: number | null = null;
  task: string = '';
  taskArray: Array<{ taskName: string, completed: boolean }> = [];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(taskForm: any) {
    if (!this.isEdit) {
      this.taskArray.push({ taskName: taskForm.value.task, completed: false });
    } else {
      this.taskArray[this.editIndex!] = { taskName: taskForm.value.task, completed: this.taskArray[this.editIndex!].completed };
      this.isEdit = false;
      this.editIndex = null;
      this.task = '';
    }
    taskForm.resetForm();
  }

  onCheck(index: number) {
    this.taskArray[index].completed = !this.taskArray[index].completed;
  }

  onDelete(index: number) {
    this.taskArray.splice(index, 1);
  }

  onEdit(index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.task = this.taskArray[index].taskName;
  }
  onUpdate(taskForm: any) {
    if (this.editIndex !== null) {
      this.taskArray[this.editIndex].taskName = this.task;
      this.isEdit = false;
      this.editIndex = null;
      this.task = '';
      taskForm.resetForm();
    }
  }

  onCancel() {
    this.isEdit = false;
    this.editIndex = null;
    this.task = '';
  }
}
