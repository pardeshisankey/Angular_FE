import { TokenStorageService } from './../_services/tokenStorage.service';
import { SankeyUserService } from '../_services/sankeyuser.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'username', 'email', 'address', 'city', 'phoneNo', 'hobbies']
  searchKey: string = ''
  sortingKey: string = ''
  sortOrder: string = ''
  page: number = 0
  filterCity: string = ''

  dataSource = new MatTableDataSource([])
  totalData = 1
  pageSizes = [2]
  filter = ['Thane', 'Mumbai']

  // @ViewChild('userTbSort') userTbSort= new MatSort();
  // @ViewChild('paginator') paginator: MatPaginator;

  constructor(private sankeyUserService: SankeyUserService, private tokenStorageService: TokenStorageService) { }

  sortData(event:any) {
    // console.log(event)
    this.sortingKey = event.active
    this.sortOrder = event.direction
    console.log(this.sortingKey)
    console.log(this.sortOrder)
    const token = this.tokenStorageService.getToken()
    this.sankeyUserService.getSankeyUsers(token, this.searchKey, this.sortingKey, this.sortOrder, this.page, this.filterCity)
    .subscribe({
      next: (response) => {
        this.dataSource = response.data[0].rows
        this.totalData = response.data[0].count
        // console.log('Data Source', this.dataSource)
        // console.log('totalData', this.totalData)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  paginateData(event: any) {
    this.page = event.pageIndex
    // console.log(event)
    console.log('Page NO ', this.page)
    const token = this.tokenStorageService.getToken()
    this.sankeyUserService.getSankeyUsers(token, this.searchKey, this.sortingKey, this.sortOrder, this.page, this.filterCity)
    .subscribe({
      next: (response) => {
        this.dataSource = response.data[0].rows
        this.totalData = response.data[0].count
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  applyFilter(event: any) {
    this.searchKey = event.target.value
    console.log('SEARCH KEY ', this.searchKey)
    const token = this.tokenStorageService.getToken()
    this.sankeyUserService.getSankeyUsers(token, this.searchKey, this.sortingKey, this.sortOrder, this.page, this.filterCity)
    .subscribe({
      next: (response) => {
        this.dataSource = response.data[0].rows
        this.totalData = response.data[0].count
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  filterChange(event: any) {
    this.filterCity = event.target.value
    // console.log(event.target.value)
    console.log('FILTER CITY ', this.filterCity)

    const token = this.tokenStorageService.getToken()
    this.sankeyUserService.getSankeyUsers(token, this.searchKey, this.sortingKey, this.sortOrder, this.page, this.filterCity)
    .subscribe({
      next: (response) => {
        this.dataSource = response.data[0].rows
        this.totalData = response.data[0].count
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  ngOnInit(): void {
    const token = this.tokenStorageService.getToken()
    this.sankeyUserService.getSankeyUsers(token, this.searchKey, this.sortingKey, this.sortOrder, this.page, this.filterCity)
    .subscribe({
      next: (response) => {
        this.dataSource = response.data[0].rows
        this.totalData = response.data[0].count
        // console.log('Data Source', this.dataSource)
        // if(this.userTbSort){
          // this.dataSource.sort = this.userTbSort
          // console.log('DATASOURCE SORT', this.dataSource.sort)
        // }
      },
      error: (error) => {
        console.log(error)
      }
    }
    )
  }
}
