import { Component } from "@angular/core";


  @Component({
      selector:'app-empty',
      template:`
        <div class="text-center my-5">
            <div class="img-holder">
                <img src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" width="50%" height="150px"
                max-height="250px"> 
            </div>
          <p class="mb-4 font-weight-bold"> No Data —</p>
        </div>
      `
  })
  export class EmptyComponent{
  }
  