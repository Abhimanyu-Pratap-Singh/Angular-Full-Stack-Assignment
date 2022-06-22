import { HttpClient } from '@angular/common/http';
import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component } from '@angular/core';
export class Product{
  constructor(
    public id:any,
    public catid:any,
    public pname:any,
    public price:any,
    public quantity:any,
    public description:any,
    public category:any
    ){}
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mernapp';
  data:any;
  send:Product;
  delete:Product;
  constructor(private httpClient : HttpClient){
    this.send = new Product('','','','','','','');
    this.delete = new Product('','','','','','','');
  }

  public getProd(){
    this.httpClient.get('http://localhost:8080/amazon/product/getAllProducts').subscribe(response =>{
      console.log(response);
      this.data = response;
    });
  }
  sendData(){
    this.send.catid = (<HTMLInputElement>document.getElementById("catid")).value;
    this.send.pname = (<HTMLInputElement>document.getElementById("pname")).value;
    this.send.price = (<HTMLInputElement>document.getElementById("price")).value;
    this.send.quantity = (<HTMLInputElement>document.getElementById("quantity")).value;
    this.send.description = (<HTMLInputElement>document.getElementById("description")).value;
    console.log(this.send);
    this.httpClient.post<any>('http://localhost:8080/amazon/product/addProduct',this.send).subscribe(response =>{
      console.log(response);
    });
  }
  del(id:any){
    this.delete.id = id;
    this.httpClient.post<any>('http://localhost:8080/amazon/product/deleteProduct',this.delete).subscribe(res =>{
      console.log(id);
    })
     this.getProd();
  }
}
