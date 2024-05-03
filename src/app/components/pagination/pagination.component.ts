import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() pageNumber:number = 0;
  @Input() pageSize:number = 0;
  startIndex:number = 0;

  @Output() pageClick = new EventEmitter<any>();

  buttonClick(event:string){
    this.pageClick.emit({action:event,startIndex:this.startIndex})
  }

  getIndex(){
    this.startIndex = this.pageNumber*this.pageSize;
    return ''
  }
}
