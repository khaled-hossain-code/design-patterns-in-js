# Interface Segregation Principle (ISP)

instead of inheriting lots of unimplemented method we should separate those methods into interfaces so that classes can take whatever they want. for example
we have a `Machine` abstract class which has several features like printing, scanning, faxing. when `MultiFunctionPrinter` class extends this class its happy but when `OldPrinter` class extends it, it does not know what to do with `scan` method or `fax` method which is a problem.

```javascript
class Machine {
  constructor() {
    if (this.constructor.name === "Machine")
      throw new Error("Machine is abstract!");
  }

  print(doc) {}
  scan(doc) {}
  fax(doc) {}
}

class MultiFunctionPrinter extends Machine {
  print(doc) {
    //printing shining pages
  }
  scan(doc) {
    //scanning fast
  }
  fax(doc) {
    //can fax too
  }
}

class OldPrinter extends Machine {
  print(doc) {
    // i can print
  }
  scan(doc) {
    // :( burden, dont know what to do
  }
}
```

## Solution

we should create 3 separate interface for `print`, `scan`, `fax` and then any class can extends them according to their need.
