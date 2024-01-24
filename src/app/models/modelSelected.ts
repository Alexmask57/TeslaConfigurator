export class ModelSelected {
  code: string = '';
  color: string = '';
  config: string = '';


  // constructor(code: string) {
  //   this.code = code;
  // }

  step1IsValid() {
    return !this.areNullOrEmpty([this.code, this.color]);
  }

  step2IsValid() {
    return !this.areNullOrEmpty([this.code, this.color, this.config]);
  }

  private isNullOrEmpty(test: string){
    return test === null || test.length == 0;
  }

  private areNullOrEmpty(tests: string[]){
    for (let test of tests){
      if (this.isNullOrEmpty(test))
        return true;
    }
    return false;
  }

}
